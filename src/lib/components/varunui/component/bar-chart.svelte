<script lang="ts" module>
  import type { ChartDatum, ChartTone } from "./chart.js";

  export type { ChartDatum as BarChartDatum, ChartTone as BarChartTone };

  export interface BarChartProps {
    data?: ChartDatum[];
    tone?: ChartTone;
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const barChartDemo: BarChartProps = {
    data: [
      { label: "Direct", value: 4820 },
      { label: "Search", value: 3610 },
      { label: "Referral", value: 2480 },
      { label: "Social", value: 1640 },
      { label: "Email", value: 980 },
    ],
    tone: "blue",
    ariaLabel: "Sessions by acquisition channel",
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
  } from "./chart.js";

  let {
    data = [],
    tone = "blue",
    valueFormat = formatChartValue,
    ariaLabel = "Categorical comparison",
  }: BarChartProps = $props();

  const height = 288;
  const top = 12;
  const bottom = 24;
  const right = 56;

  let width = $state(640);
  let activeIndex = $state(-1);

  let labelWidth = $derived(
    Math.min(
      144,
      Math.max(72, ...data.map((item) => item.label.length * 6.5 + 12)),
    ),
  );
  let plotRight = $derived(width - right);
  let x = $derived(
    scaleLinear()
      .domain([0, max(data, (item) => Math.max(0, item.value)) ?? 1])
      .nice(4)
      .range([labelWidth, plotRight]),
  );
  let y = $derived(
    scaleBand<string>()
      .domain(data.map((item) => item.label))
      .range([top, height - bottom])
      .padding(0.34),
  );
  let ticks = $derived(x.ticks(4));
  let active = $derived(data[activeIndex]);
  let activeTone = $derived(active?.tone ?? tone);
  let activeY = $derived(
    active ? (y(active.label) ?? 0) + y.bandwidth() / 2 : 0,
  );
  let activeX = $derived(active ? x(Math.max(0, active.value)) : 0);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, data.length, 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, data.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="bar-chart"
  data-chart-visible="false"
  class="chart-reveal relative w-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive chart"
  aria-label={`${ariaLabel}. Use arrow keys to inspect each bar.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, data.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={active
    ? `${active.label}: ${valueFormat(active.value)}`
    : "No bar selected"}
  tabindex="0"
  onfocus={() => {
    if (activeIndex < 0 && data.length > 0) activeIndex = 0;
  }}
  onblur={() => (activeIndex = -1)}
  onkeydown={handleKeydown}
  onpointerleave={() => (activeIndex = -1)}
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
      {#each ticks as tick (tick)}
        {@const tickX = x(tick)}
        <line
          x1={tickX}
          x2={tickX}
          y1={top}
          y2={height - bottom}
          class="stroke-border/70"
          vector-effect="non-scaling-stroke"
        />
        <text
          x={tickX}
          y={height - 6}
          text-anchor="middle"
          class="fill-muted-foreground font-mono text-[10px] tabular-nums"
        >{valueFormat(tick)}</text>
      {/each}

      {#each data as item, index (`${item.label}-${index}`)}
        {@const barY = y(item.label) ?? 0}
        {@const barWidth = Math.max(0, x(Math.max(0, item.value)) - labelWidth)}
        {@const itemTone = item.tone ?? tone}
        {@const isActive = index === activeIndex}
        <text
          x={labelWidth - 10}
          y={barY + y.bandwidth() / 2 + 4}
          text-anchor="end"
          class={isActive
            ? "fill-foreground text-[11px] font-semibold"
            : "fill-muted-foreground text-[11px]"}
        >{item.label}</text>
        <rect
          x={labelWidth}
          y={barY}
          width={barWidth}
          height={y.bandwidth()}
          class={`motion-chart-bar motion-interactive fill-current ${chartToneTextClasses[itemTone]} ${isActive ? "opacity-100" : "opacity-80"}`}
          style={`--chart-motion-delay: ${index * 35}ms`}
          role="presentation"
          onpointerenter={() => (activeIndex = index)}
        />
        <text
          x={Math.min(plotRight + 8, x(Math.max(0, item.value)) + 8)}
          y={barY + y.bandwidth() / 2 + 4}
          class="fill-foreground font-mono text-[10px] font-semibold tabular-nums"
        >{valueFormat(item.value)}</text>
      {/each}

      {#if active}
        <ChartTooltip
          x={activeX}
          y={activeY}
          plotWidth={width}
          heading={active.label}
          items={[
            {
              label: "Value",
              value: valueFormat(active.value),
              tone: activeTone,
            },
          ]}
        />
      {/if}
    {/if}
  </svg>

  <p class="sr-only" aria-live="polite">
    {active ? `${active.label}: ${valueFormat(active.value)}` : ""}
  </p>
</div>
