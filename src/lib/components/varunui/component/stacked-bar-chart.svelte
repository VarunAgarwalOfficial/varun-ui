<script lang="ts" module>
  import type { ChartTone } from "./chart.js";

  export interface StackedBarChartSeries {
    name: string;
    values: number[];
    tone?: ChartTone;
  }

  export interface StackedBarChartProps {
    labels?: string[];
    series?: StackedBarChartSeries[];
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const stackedBarChartDemo: StackedBarChartProps = {
    labels: ["W1", "W2", "W3", "W4"],
    series: [
      { name: "Accepted", values: [34, 41, 46, 52], tone: "green" },
      { name: "Revised", values: [18, 16, 14, 11], tone: "yellow" },
      { name: "Deferred", values: [8, 7, 5, 6], tone: "purple" },
    ],
    ariaLabel: "Decision outcomes by week",
  };
</script>

<script lang="ts">
  import { max, scaleBand, scaleLinear } from "d3";
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
    labels = [],
    series = [],
    valueFormat = formatChartValue,
    ariaLabel = "Stacked category comparison",
  }: StackedBarChartProps = $props();

  const height = 288;
  const top = 16;
  const right = 18;
  const bottom = 34;
  const left = 44;

  let width = $state(640);
  let activeIndex = $state(-1);
  let focused = $state(false);

  let groups = $derived(
    labels.map((label, labelIndex) => {
      let start = 0;
      const segments = series.map((item, seriesIndex) => {
        const value = Math.max(0, item.values[labelIndex] ?? 0);
        const segment = {
          name: item.name,
          value,
          start,
          end: start + value,
          tone: toneAt(seriesIndex, item.tone),
        };
        start += value;
        return segment;
      });
      return { label, total: start, segments };
    }),
  );
  let maxTotal = $derived(Math.max(1, max(groups, (group) => group.total) ?? 1));
  let x = $derived(
    scaleBand<string>()
      .domain(labels)
      .range([left, width - right])
      .padding(0.28),
  );
  let y = $derived(
    scaleLinear().domain([0, maxTotal]).nice(4).range([height - bottom, top]),
  );
  let yTicks = $derived(y.ticks(4));
  let active = $derived(groups[activeIndex]);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, groups.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, groups.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="stacked-bar-chart"
  data-chart-visible="false"
  class="chart-reveal relative w-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive chart"
  aria-label={`${ariaLabel}. Use arrow keys to inspect each group.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, groups.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={active
    ? `${active.label}. Total ${valueFormat(active.total)}.`
    : "No group selected"}
  tabindex="0"
  onfocus={() => {
    focused = true;
    if (activeIndex < 0 && groups.length > 0) activeIndex = 0;
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
    {#if groups.length === 0 || series.length === 0}
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

      {#each groups as group, groupIndex (group.label)}
        {@const groupX = x(group.label) ?? left}
        {#each group.segments as segment, segmentIndex (`${group.label}-${segment.name}`)}
          <rect
            x={groupX}
            y={y(segment.end)}
            width={x.bandwidth()}
            height={Math.max(0, y(segment.start) - y(segment.end))}
            class={`motion-chart-column fill-current ${chartToneTextClasses[segment.tone]} ${activeIndex >= 0 && activeIndex !== groupIndex ? "opacity-35" : "opacity-90"}`}
            style={`--chart-motion-delay: ${(groupIndex * series.length + segmentIndex) * 35}ms`}
          />
        {/each}
        <rect
          x={groupX - 6}
          y={top}
          width={x.bandwidth() + 12}
          height={height - bottom - top}
          class="fill-transparent"
          role="presentation"
          onpointerenter={() => (activeIndex = groupIndex)}
        />
        <text
          x={groupX + x.bandwidth() / 2}
          y={height - 12}
          text-anchor="middle"
          class="fill-muted-foreground font-mono text-[10px]"
        >{group.label}</text>
      {/each}

      {#if active}
        <ChartTooltip
          x={(x(active.label) ?? left) + x.bandwidth() / 2}
          y={y(active.total)}
          plotWidth={width}
          heading={active.label}
          items={active.segments.map((segment) => ({
            label: segment.name,
            value: valueFormat(segment.value),
            tone: segment.tone,
          }))}
        />
      {/if}
    {/if}
  </svg>

  {#if series.length > 0}
    <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
      {#each series as item, index (item.name)}
        {@const tone = toneAt(index, item.tone)}
        <span class="inline-flex items-center gap-2">
          <span class={`size-2 bg-current ${chartToneTextClasses[tone]}`} aria-hidden="true"></span>
          {item.name}
        </span>
      {/each}
    </div>
  {/if}

  <p class="sr-only" aria-live="polite">
    {active
      ? `${active.label}. ${active.segments
          .map((segment) => `${segment.name}: ${valueFormat(segment.value)}`)
          .join(". ")}`
      : ""}
  </p>
</div>
