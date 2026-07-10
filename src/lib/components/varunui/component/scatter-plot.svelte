<script lang="ts" module>
  import type { ChartTone } from "./chart.js";

  export interface ScatterPlotPoint {
    label: string;
    x: number;
    y: number;
    size?: number;
    tone?: ChartTone;
  }

  export interface ScatterPlotProps {
    data?: ScatterPlotPoint[];
    xLabel?: string;
    yLabel?: string;
    xFormat?: (value: number) => string;
    yFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const scatterPlotDemo: ScatterPlotProps = {
    data: [
      { label: "Starter", x: 18, y: 42, size: 34, tone: "yellow" },
      { label: "Studio", x: 31, y: 58, size: 48, tone: "purple" },
      { label: "Teams", x: 44, y: 67, size: 64, tone: "blue" },
      { label: "Business", x: 61, y: 76, size: 82, tone: "green" },
      { label: "Enterprise", x: 78, y: 84, size: 96, tone: "pink" },
      { label: "Education", x: 36, y: 73, size: 41, tone: "cyan" },
      { label: "Nonprofit", x: 24, y: 65, size: 28, tone: "red" },
    ],
    xLabel: "Weekly use",
    yLabel: "Satisfaction",
    ariaLabel: "Relationship between weekly use and satisfaction by plan",
  };
</script>

<script lang="ts">
  import { extent, scaleLinear, scaleSqrt } from "d3";
  import ChartTooltip from "$lib/components/varunui/component/internal/chart-tooltip.svelte";
  import {
    chartToneTextClasses,
    formatChartValue,
    nextChartIndex,
    observeChartReveal,
    observeChartWidth,
    toneAt,
  } from "./chart.js";

  let {
    data = [],
    xLabel = "X value",
    yLabel = "Y value",
    xFormat = formatChartValue,
    yFormat = formatChartValue,
    ariaLabel = "Relationship between two measures",
  }: ScatterPlotProps = $props();

  const height = 288;
  const top = 16;
  const right = 18;
  const bottom = 46;
  const left = 52;

  let width = $state(640);
  let activeIndex = $state(-1);
  let focused = $state(false);

  let xExtent = $derived(extent(data, (item) => item.x) as [number, number]);
  let yExtent = $derived(extent(data, (item) => item.y) as [number, number]);
  let sizeExtent = $derived(
    extent(data, (item) => item.size ?? 1) as [number, number],
  );
  let xPadding = $derived(Math.max(1, (xExtent[1] - xExtent[0]) * 0.08));
  let yPadding = $derived(Math.max(1, (yExtent[1] - yExtent[0]) * 0.1));
  let x = $derived(
    scaleLinear()
      .domain([
        (xExtent[0] ?? 0) - xPadding,
        (xExtent[1] ?? 1) + xPadding,
      ])
      .nice(4)
      .range([left, width - right]),
  );
  let y = $derived(
    scaleLinear()
      .domain([
        (yExtent[0] ?? 0) - yPadding,
        (yExtent[1] ?? 1) + yPadding,
      ])
      .nice(4)
      .range([height - bottom, top]),
  );
  let radius = $derived(
    scaleSqrt()
      .domain([sizeExtent[0] ?? 1, sizeExtent[1] ?? 1])
      .range([4, 9]),
  );
  let xTicks = $derived(x.ticks(5));
  let yTicks = $derived(y.ticks(4));
  let active = $derived(data[activeIndex]);
  let activeTone = $derived(
    active ? toneAt(activeIndex, active.tone) : "purple",
  );

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, data.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, data.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="scatter-plot"
  data-chart-visible="false"
  class="chart-reveal relative w-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive chart"
  aria-label={`${ariaLabel}. Use arrow keys to inspect each point.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, data.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={active
    ? `${active.label}. ${xLabel}: ${xFormat(active.x)}. ${yLabel}: ${yFormat(active.y)}`
    : "No point selected"}
  tabindex="0"
  onfocus={() => {
    focused = true;
    if (activeIndex < 0 && data.length > 0) activeIndex = 0;
  }}
  onblur={() => {
    focused = false;
    activeIndex = -1;
  }}
  onkeydown={handleKeydown}
  onpointerleave={() => {
    if (!focused) activeIndex = -1;
  }}
>
  <svg
    viewBox={`0 0 ${width} ${height}`}
    class="block h-[var(--chart-height-plot)] w-full overflow-visible"
    aria-hidden="true"
  >
    {#if data.length === 0}
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
        >{yFormat(tick)}</text>
      {/each}
      {#each xTicks as tick (tick)}
        {@const tickX = x(tick)}
        <line
          x1={tickX}
          x2={tickX}
          y1={top}
          y2={height - bottom}
          class="stroke-border/40"
          vector-effect="non-scaling-stroke"
        />
        <text
          x={tickX}
          y={height - 24}
          text-anchor="middle"
          class="fill-muted-foreground font-mono text-[10px] tabular-nums"
        >{xFormat(tick)}</text>
      {/each}

      <text
        x={(left + width - right) / 2}
        y={height - 6}
        text-anchor="middle"
        class="fill-muted-foreground text-[10px] font-medium"
      >{xLabel}</text>
      <text
        transform={`translate(12 ${(top + height - bottom) / 2}) rotate(-90)`}
        text-anchor="middle"
        class="fill-muted-foreground text-[10px] font-medium"
      >{yLabel}</text>

      {#each data as item, index (`${item.label}-${index}`)}
        {@const itemTone = toneAt(index, item.tone)}
        {@const pointX = x(item.x)}
        {@const pointY = y(item.y)}
        {@const pointRadius = radius(item.size ?? 1)}
        <circle
          cx={pointX}
          cy={pointY}
          r="15"
          class="fill-transparent"
          role="presentation"
          onpointerenter={() => (activeIndex = index)}
        />
        <circle
          cx={pointX}
          cy={pointY}
          r={pointRadius}
          class={`motion-chart-arc motion-interactive fill-current ${chartToneTextClasses[itemTone]} ${activeIndex >= 0 && activeIndex !== index ? "opacity-35" : "opacity-85"}`}
          style={`--chart-motion-delay: ${index * 45}ms`}
          pointer-events="none"
        />
      {/each}

      {#if active}
        <circle
          cx={x(active.x)}
          cy={y(active.y)}
          r={radius(active.size ?? 1) + 4}
          fill="none"
          class={`stroke-current ${chartToneTextClasses[activeTone]}`}
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
        <ChartTooltip
          x={x(active.x)}
          y={y(active.y)}
          plotWidth={width}
          heading={active.label}
          items={[
            { label: xLabel, value: xFormat(active.x), tone: activeTone },
            { label: yLabel, value: yFormat(active.y), tone: activeTone },
          ]}
        />
      {/if}
    {/if}
  </svg>

  <p class="sr-only" aria-live="polite">
    {active
      ? `${active.label}. ${xLabel}: ${xFormat(active.x)}. ${yLabel}: ${yFormat(active.y)}`
      : ""}
  </p>
</div>
