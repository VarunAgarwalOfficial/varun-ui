<script lang="ts" module>
  import type { ChartSeries } from "./chart.js";

  export type { ChartSeries as LineChartSeries };

  export interface LineChartProps {
    labels?: string[];
    series?: ChartSeries[];
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const lineChartDemo: LineChartProps = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    series: [
      {
        name: "This year",
        values: [28, 35, 33, 47, 52, 61, 68, 74],
        tone: "purple",
      },
      {
        name: "Last year",
        values: [22, 26, 31, 37, 42, 46, 51, 58],
        tone: "cyan",
      },
    ],
    ariaLabel: "Monthly active teams this year compared with last year",
  };
</script>

<script lang="ts">
  import {
    curveMonotoneX,
    extent,
    line,
    scaleLinear,
    scalePoint,
  } from "d3";
  import ChartTooltip from "$lib/components/varunui/component/internal/chart-tooltip.svelte";
  import {
    chartToneTextClasses,
    formatChartValue,
    nextChartIndex,
    observeChartReveal,
    observeChartWidth,
    pointerPosition,
    toneAt,
  } from "./chart.js";

  let {
    labels = [],
    series = [],
    valueFormat = formatChartValue,
    ariaLabel = "Time series",
  }: LineChartProps = $props();

  const height = 288;
  const top = 16;
  const right = 18;
  const bottom = 34;
  const left = 44;

  let width = $state(640);
  let activeIndex = $state(-1);
  let focused = $state(false);

  let allValues = $derived(
    series.flatMap((item) => item.values).filter(Number.isFinite),
  );
  let valueExtent = $derived(extent(allValues) as [number, number]);
  let yPadding = $derived(
    Math.max(1, ((valueExtent[1] ?? 1) - (valueExtent[0] ?? 0)) * 0.12),
  );
  let x = $derived(
    scalePoint<string>()
      .domain(labels)
      .range([left, width - right]),
  );
  let y = $derived(
    scaleLinear()
      .domain([
        (valueExtent[0] ?? 0) - yPadding,
        (valueExtent[1] ?? 1) + yPadding,
      ])
      .nice(4)
      .range([height - bottom, top]),
  );
  let yTicks = $derived(y.ticks(4));
  let labelTicks = $derived.by(() => {
    if (labels.length <= 6) return labels;
    const interval = Math.ceil(labels.length / 6);
    return labels.filter(
      (_, index) => index % interval === 0 || index === labels.length - 1,
    );
  });
  let paths = $derived(
    series.map((item) =>
      line<number>()
        .defined(Number.isFinite)
        .x((_, index) => x(labels[index] ?? "") ?? left)
        .y((value) => y(value))
        .curve(curveMonotoneX)(item.values),
    ),
  );
  let activeLabel = $derived(labels[activeIndex]);
  let activeX = $derived(activeLabel ? (x(activeLabel) ?? left) : left);
  let activeItems = $derived(
    activeIndex < 0
      ? []
      : series.flatMap((item, index) => {
          const value = item.values[activeIndex];
          return Number.isFinite(value)
            ? [
                {
                  label: item.name,
                  value: valueFormat(value),
                  tone: toneAt(index, item.tone),
                },
              ]
            : [];
        }),
  );
  let activeY = $derived.by(() => {
    if (activeIndex < 0) return height / 2;
    const values = series
      .map((item) => item.values[activeIndex])
      .filter(Number.isFinite);
    return values.length > 0 ? y(Math.max(...values)) : height / 2;
  });

  function inspectAt(pointerX: number) {
    if (labels.length === 0) return;
    const usable = Math.max(1, width - left - right);
    const ratio = Math.max(0, Math.min(1, (pointerX - left) / usable));
    activeIndex = Math.round(ratio * (labels.length - 1));
  }

  function handlePointermove(event: PointerEvent) {
    inspectAt(pointerPosition(event, event.currentTarget as SVGSVGElement, width, height).x);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, labels.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, labels.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="line-chart"
  data-chart-visible="false"
  class="chart-reveal grid w-full gap-3 outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive chart"
  aria-label={`${ariaLabel}. Use left and right arrow keys to inspect each point.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, labels.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={activeLabel
    ? `${activeLabel}. ${activeItems.map((item) => `${item.label}: ${item.value}`).join(". ")}`
    : "No point selected"}
  tabindex="0"
  onfocus={() => {
    focused = true;
    if (activeIndex < 0 && labels.length > 0) activeIndex = 0;
  }}
  onblur={() => {
    focused = false;
    activeIndex = -1;
  }}
  onkeydown={handleKeydown}
  onpointermove={handlePointermove}
  onpointerleave={() => {
    if (!focused) activeIndex = -1;
  }}
>
  <svg
    viewBox={`0 0 ${width} ${height}`}
    class="block h-[var(--chart-height-plot)] w-full overflow-visible"
    aria-hidden="true"
  >
    {#if labels.length === 0 || series.length === 0}
      <text
        x={width / 2}
        y={height / 2}
        text-anchor="middle"
        class="fill-muted-foreground text-xs"
      >No data to plot.</text>
    {:else}
      {#each yTicks as tick (tick)}
        {@const tickY = y(tick)}
        <line
          x1={left}
          x2={width - right}
          y1={tickY}
          y2={tickY}
          class="stroke-border/70"
          vector-effect="non-scaling-stroke"
        />
        <text
          x={left - 8}
          y={tickY + 3.5}
          text-anchor="end"
          class="fill-muted-foreground font-mono text-[10px] tabular-nums"
        >{valueFormat(tick)}</text>
      {/each}

      {#each labelTicks as label (label)}
        <text
          x={x(label)}
          y={height - 8}
          text-anchor="middle"
          class="fill-muted-foreground text-[10px]"
        >{label}</text>
      {/each}

      {#each series as item, seriesIndex (`${item.name}-${seriesIndex}`)}
        {@const itemTone = toneAt(seriesIndex, item.tone)}
        <path
          d={paths[seriesIndex] ?? ""}
          pathLength="1"
          fill="none"
          class={`motion-chart-line stroke-current ${chartToneTextClasses[itemTone]}`}
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      {/each}

      {#if activeIndex >= 0 && activeLabel}
        <line
          x1={activeX}
          x2={activeX}
          y1={top}
          y2={height - bottom}
          class="stroke-foreground/40"
          vector-effect="non-scaling-stroke"
        />
        {#each series as item, seriesIndex (`active-${item.name}-${seriesIndex}`)}
          {@const value = item.values[activeIndex]}
          {@const itemTone = toneAt(seriesIndex, item.tone)}
          {#if Number.isFinite(value)}
            <circle
              cx={activeX}
              cy={y(value)}
              r="4"
              class={`fill-background stroke-current ${chartToneTextClasses[itemTone]}`}
              stroke-width="2.5"
              vector-effect="non-scaling-stroke"
            />
          {/if}
        {/each}
        <ChartTooltip
          x={activeX}
          y={activeY}
          plotWidth={width}
          heading={activeLabel}
          items={activeItems}
        />
      {/if}
    {/if}
  </svg>

  {#if series.length > 0}
    <ul class="flex flex-wrap gap-x-4 gap-y-2 text-xs" aria-label="Legend">
      {#each series as item, index (`legend-${item.name}-${index}`)}
        {@const itemTone = toneAt(index, item.tone)}
        <li class="flex items-center gap-2 text-muted-foreground">
          <span
            class={`h-0.5 w-5 bg-current ${chartToneTextClasses[itemTone]}`}
            aria-hidden="true"
          ></span>
          {item.name}
        </li>
      {/each}
    </ul>
  {/if}

  <p class="sr-only" aria-live="polite">
    {activeLabel
      ? `${activeLabel}. ${activeItems.map((item) => `${item.label}: ${item.value}`).join(". ")}`
      : ""}
  </p>
</div>
