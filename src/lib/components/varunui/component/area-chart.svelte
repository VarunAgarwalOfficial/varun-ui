<script lang="ts" module>
  import type { ChartDatum, ChartTone } from "./chart.js";

  export type { ChartDatum as AreaChartDatum, ChartTone as AreaChartTone };

  export interface AreaChartProps {
    data?: ChartDatum[];
    tone?: ChartTone;
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const areaChartDemo: AreaChartProps = {
    data: [
      { label: "Mon", value: 1840 },
      { label: "Tue", value: 2420 },
      { label: "Wed", value: 2180 },
      { label: "Thu", value: 2960 },
      { label: "Fri", value: 3280 },
      { label: "Sat", value: 2740 },
      { label: "Sunday", value: 3510 },
    ],
    tone: "green",
    ariaLabel: "Daily completed work",
  };
</script>

<script lang="ts">
  import {
    area,
    curveMonotoneX,
    line,
    max,
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
  } from "./chart.js";

  let {
    data = [],
    tone = "green",
    valueFormat = formatChartValue,
    ariaLabel = "Volume over time",
  }: AreaChartProps = $props();

  const height = 288;
  const top = 16;
  const right = 18;
  const bottom = 34;
  const left = 44;

  let width = $state(640);
  let activeIndex = $state(-1);
  let focused = $state(false);

  let x = $derived(
    scalePoint<string>()
      .domain(data.map((item) => item.label))
      .range([left, width - right]),
  );
  let y = $derived(
    scaleLinear()
      .domain([0, max(data, (item) => Math.max(0, item.value)) ?? 1])
      .nice(4)
      .range([height - bottom, top]),
  );
  let yTicks = $derived(y.ticks(4));
  let linePath = $derived(
    line<ChartDatum>()
      .defined((item) => Number.isFinite(item.value))
      .x((item) => x(item.label) ?? left)
      .y((item) => y(Math.max(0, item.value)))
      .curve(curveMonotoneX)(data),
  );
  let areaPath = $derived(
    area<ChartDatum>()
      .defined((item) => Number.isFinite(item.value))
      .x((item) => x(item.label) ?? left)
      .y0(y(0))
      .y1((item) => y(Math.max(0, item.value)))
      .curve(curveMonotoneX)(data),
  );
  let active = $derived(data[activeIndex]);
  let activeX = $derived(active ? (x(active.label) ?? left) : left);
  let activeY = $derived(active ? y(Math.max(0, active.value)) : height / 2);

  function inspectAt(pointerX: number) {
    if (data.length === 0) return;
    const usable = Math.max(1, width - left - right);
    const ratio = Math.max(0, Math.min(1, (pointerX - left) / usable));
    activeIndex = Math.round(ratio * (data.length - 1));
  }

  function handlePointermove(event: PointerEvent) {
    inspectAt(pointerPosition(event, event.currentTarget as SVGSVGElement, width, height).x);
  }

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
  data-slot="area-chart"
  data-chart-visible="false"
  class="chart-reveal relative w-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive chart"
  aria-label={`${ariaLabel}. Use left and right arrow keys to inspect each point.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, data.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={active
    ? `${active.label}: ${valueFormat(active.value)}`
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
        >{valueFormat(tick)}</text>
      {/each}

      {#each data as item (item.label)}
        <text
          x={x(item.label)}
          y={height - 8}
          text-anchor="middle"
          class="fill-muted-foreground text-[10px]"
        >{item.label}</text>
      {/each}

      <path
        d={areaPath ?? ""}
        class={`motion-chart-area fill-current opacity-20 ${chartToneTextClasses[tone]}`}
      />
      <path
        d={linePath ?? ""}
        pathLength="1"
        fill="none"
        class={`motion-chart-line stroke-current ${chartToneTextClasses[tone]}`}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />

      {#if active}
        <line
          x1={activeX}
          x2={activeX}
          y1={top}
          y2={height - bottom}
          class="stroke-foreground/40"
          vector-effect="non-scaling-stroke"
        />
        <circle
          cx={activeX}
          cy={activeY}
          r="4"
          class={`fill-background stroke-current ${chartToneTextClasses[tone]}`}
          stroke-width="2.5"
          vector-effect="non-scaling-stroke"
        />
        <ChartTooltip
          x={activeX}
          y={activeY}
          plotWidth={width}
          heading={active.label}
          items={[
            { label: "Volume", value: valueFormat(active.value), tone },
          ]}
        />
      {/if}
    {/if}
  </svg>

  <p class="sr-only" aria-live="polite">
    {active ? `${active.label}: ${valueFormat(active.value)}` : ""}
  </p>
</div>
