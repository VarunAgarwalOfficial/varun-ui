<script lang="ts" module>
  import type { ChartTone } from "./chart.js";

  export interface RadarChartAxis {
    label: string;
    value: number;
    max?: number;
  }

  export interface RadarChartProps {
    axes?: RadarChartAxis[];
    tone?: ChartTone;
    valueFormat?: (value: number, max: number) => string;
    ariaLabel?: string;
  }

  export const radarChartDemo: RadarChartProps = {
    axes: [
      { label: "Structure", value: 88 },
      { label: "Clarity", value: 94 },
      { label: "Coverage", value: 82 },
      { label: "Motion", value: 76 },
      { label: "Character", value: 84 },
    ],
    tone: "purple",
    ariaLabel: "varunUI release quality profile",
  };
</script>

<script lang="ts">
  import { curveLinearClosed, line, scaleLinear } from "d3";
  import ChartTooltip from "$lib/components/varunui/component/internal/chart-tooltip.svelte";
  import {
    chartToneTextClasses,
    nextChartIndex,
    observeChartReveal,
  } from "./chart.js";

  interface RadarPoint {
    x: number;
    y: number;
  }

  let {
    axes = [],
    tone = "purple",
    valueFormat = (value: number, max: number) =>
      max === 100 ? `${Math.round(value)}%` : `${value} / ${max}`,
    ariaLabel = "Five-axis profile",
  }: RadarChartProps = $props();

  const size = 420;
  const center = size / 2;
  const radius = 126;
  const labelRadius = 166;
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const radialScale = scaleLinear().domain([0, 1]).range([0, radius]).clamp(true);
  const closedLine = line<RadarPoint>()
    .x((point) => point.x)
    .y((point) => point.y)
    .curve(curveLinearClosed);

  let activeIndex = $state(-1);
  let focused = $state(false);
  let valid = $derived(axes.length === 5);
  let points = $derived(
    valid
      ? axes.map((axis, index) => pointAt(index, normalizedValue(axis)))
      : [],
  );
  let polygonPath = $derived(closedLine(points) ?? "");
  let active = $derived(axes[activeIndex]);
  let activePoint = $derived(points[activeIndex]);

  function normalizedValue(axis: RadarChartAxis) {
    const max = Number.isFinite(axis.max) && (axis.max ?? 0) > 0 ? (axis.max ?? 100) : 100;
    const value = Number.isFinite(axis.value) ? axis.value : 0;
    return Math.min(1, Math.max(0, value / max));
  }

  function angleAt(index: number) {
    return -Math.PI / 2 + (index * Math.PI * 2) / 5;
  }

  function pointAt(index: number, ratio: number, customRadius = radius): RadarPoint {
    const angle = angleAt(index);
    const distance = customRadius === radius ? radialScale(ratio) : customRadius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  }

  function gridPath(level: number) {
    return closedLine(Array.from({ length: 5 }, (_, index) => pointAt(index, level))) ?? "";
  }

  function labelPoint(index: number) {
    return pointAt(index, 1, labelRadius);
  }

  function labelAnchor(index: number) {
    if (index === 0) return "middle";
    return index === 1 || index === 2 ? "start" : "end";
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, axes.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, axes.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="radar-chart"
  data-chart-visible="false"
  class="chart-reveal relative mx-auto w-full max-w-[32rem] outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  role="slider"
  aria-roledescription="interactive five-axis chart"
  aria-label={`${ariaLabel}. Use arrow keys to inspect each axis.`}
  aria-valuemin="1"
  aria-valuemax="5"
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={active
    ? `${active.label}: ${valueFormat(active.value, active.max ?? 100)}`
    : valid
      ? "No axis selected"
      : "Five axes are required"}
  tabindex="0"
  onfocus={() => {
    focused = true;
    if (activeIndex < 0 && valid) activeIndex = 0;
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
    viewBox={`0 0 ${size} ${size}`}
    class="block aspect-square w-full overflow-visible"
    aria-hidden="true"
  >
    {#if !valid}
      <text
        x={center}
        y={center}
        text-anchor="middle"
        class="fill-muted-foreground text-xs"
      >Five axes are required.</text>
    {:else}
      {#each gridLevels as level (level)}
        <path
          d={gridPath(level)}
          fill="none"
          class="stroke-border"
          stroke-width={level === 1 ? 1.25 : 1}
          vector-effect="non-scaling-stroke"
        />
      {/each}

      {#each axes as axis, index (axis.label)}
        {@const end = pointAt(index, 1)}
        {@const label = labelPoint(index)}
        <line
          x1={center}
          y1={center}
          x2={end.x}
          y2={end.y}
          class="stroke-border/80"
          vector-effect="non-scaling-stroke"
        />
        <text
          x={label.x}
          y={label.y - 3}
          text-anchor={labelAnchor(index)}
          class="fill-foreground text-[11px] font-semibold"
        >{axis.label}</text>
        <text
          x={label.x}
          y={label.y + 13}
          text-anchor={labelAnchor(index)}
          class="fill-muted-foreground font-mono text-[10px] tabular-nums"
        >{valueFormat(axis.value, axis.max ?? 100)}</text>
      {/each}

      <path
        d={polygonPath}
        class={`motion-chart-area fill-current opacity-15 ${chartToneTextClasses[tone]}`}
      />
      <path
        d={polygonPath}
        fill="none"
        pathLength="1"
        class={`motion-chart-line stroke-current ${chartToneTextClasses[tone]}`}
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />

      {#each points as point, index (axes[index]?.label)}
        <circle
          cx={point.x}
          cy={point.y}
          r="16"
          class="fill-transparent"
          role="presentation"
          onpointerenter={() => (activeIndex = index)}
        />
        <circle
          cx={point.x}
          cy={point.y}
          r={activeIndex === index ? 5 : 3.5}
          class={`motion-chart-arc fill-current ${chartToneTextClasses[tone]}`}
          style={`--chart-motion-delay: ${index * 45}ms`}
          pointer-events="none"
        />
      {/each}

      {#if active && activePoint}
        <line
          x1={center}
          y1={center}
          x2={activePoint.x}
          y2={activePoint.y}
          class={`stroke-current ${chartToneTextClasses[tone]}`}
          stroke-dasharray="3 3"
          vector-effect="non-scaling-stroke"
        />
        <ChartTooltip
          x={activePoint.x}
          y={activePoint.y}
          plotWidth={size}
          heading={active.label}
          items={[
            {
              label: "Score",
              value: valueFormat(active.value, active.max ?? 100),
              tone,
            },
          ]}
        />
      {/if}
    {/if}
  </svg>

  <p class="sr-only" aria-live="polite">
    {active ? `${active.label}: ${valueFormat(active.value, active.max ?? 100)}` : ""}
  </p>
</div>
