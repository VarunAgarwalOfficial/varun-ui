<script lang="ts" module>
  import type { ChartTone } from "./chart.js";

  export type { ChartTone as SparklineTone };

  export interface SparklineProps {
    values: number[];
    labels?: string[];
    tone?: ChartTone;
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const sparklineDemo: SparklineProps = {
    values: [12, 18, 14, 22, 20, 28, 24, 32, 30, 38, 36, 44],
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    tone: "blue",
    ariaLabel: "Revenue trend over the last 12 weeks",
  };
</script>

<script lang="ts">
  import { curveMonotoneX, extent, line, scaleLinear } from "d3";
  import {
    chartToneTextClasses,
    formatChartValue,
    nextChartIndex,
    observeChartReveal,
    observeChartWidth,
    pointerPosition,
  } from "./chart.js";

  let {
    values,
    labels = [],
    tone = "blue",
    valueFormat = formatChartValue,
    ariaLabel = "Trend",
  }: SparklineProps = $props();

  const height = 40;
  const padding = 3;

  let width = $state(160);
  let activeIndex = $state(-1);
  let focused = $state(false);

  let domain = $derived(extent(values) as [number, number]);
  let domainPadding = $derived(
    Math.max(1, ((domain[1] ?? 1) - (domain[0] ?? 0)) * 0.08),
  );
  let x = $derived(
    scaleLinear()
      .domain([0, Math.max(1, values.length - 1)])
      .range([padding, width - padding]),
  );
  let y = $derived(
    scaleLinear()
      .domain([
        (domain[0] ?? 0) - domainPadding,
        (domain[1] ?? 1) + domainPadding,
      ])
      .range([height - padding, padding]),
  );
  let path = $derived(
    line<number>()
      .defined(Number.isFinite)
      .x((_, index) => x(index))
      .y((value) => y(value))
      .curve(curveMonotoneX)(values),
  );
  let activeValue = $derived(values[activeIndex]);
  let activeX = $derived(activeIndex >= 0 ? x(activeIndex) : padding);
  let activeY = $derived(
    Number.isFinite(activeValue) ? y(activeValue) : height / 2,
  );
  let tooltipLeft = $derived(
    Math.max(18, Math.min(82, (activeX / width) * 100)),
  );

  function inspectAt(pointerX: number) {
    if (values.length === 0) return;
    const ratio = Math.max(
      0,
      Math.min(1, (pointerX - padding) / Math.max(1, width - padding * 2)),
    );
    activeIndex = Math.round(ratio * (values.length - 1));
  }

  function handlePointermove(event: PointerEvent) {
    inspectAt(pointerPosition(event, event.currentTarget as SVGSVGElement, width, height).x);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, values.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, values.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="sparkline"
  data-chart-visible="false"
  class="chart-reveal relative h-[var(--chart-height-compact)] w-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive sparkline"
  aria-label={`${ariaLabel}. Use left and right arrow keys to inspect each point.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, values.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={activeIndex >= 0 && Number.isFinite(activeValue)
    ? `${labels[activeIndex] ?? `Point ${activeIndex + 1}`}: ${valueFormat(activeValue)}`
    : "No point selected"}
  tabindex="0"
  onfocus={() => {
    focused = true;
    if (activeIndex < 0 && values.length > 0) activeIndex = values.length - 1;
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
    class={`block h-full w-full overflow-visible ${chartToneTextClasses[tone]}`}
    aria-hidden="true"
  >
    {#if path}
      <path
        d={path}
        pathLength="1"
        fill="none"
        class="motion-chart-line stroke-current"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    {/if}
    {#if activeIndex >= 0 && Number.isFinite(activeValue)}
      <line
        x1={activeX}
        x2={activeX}
        y1="0"
        y2={height}
        class="stroke-border"
        vector-effect="non-scaling-stroke"
      />
      <circle
        cx={activeX}
        cy={activeY}
        r="3.5"
        class="fill-background stroke-current"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />
    {/if}
  </svg>

  {#if activeIndex >= 0 && Number.isFinite(activeValue)}
    <div
      class="motion-chart-tooltip pointer-events-none absolute -top-8 z-10 -translate-x-1/2 border border-border bg-background px-2 py-1 font-mono text-[10px] font-semibold whitespace-nowrap text-foreground tabular-nums"
      style:left={`${tooltipLeft}%`}
      aria-hidden="true"
    >
      {labels[activeIndex] ? `${labels[activeIndex]} · ` : ""}{valueFormat(activeValue)}
    </div>
  {/if}

  <p class="sr-only" aria-live="polite">
    {activeIndex >= 0 && Number.isFinite(activeValue)
      ? `${labels[activeIndex] ?? `Point ${activeIndex + 1}`}: ${valueFormat(activeValue)}`
      : ""}
  </p>
</div>
