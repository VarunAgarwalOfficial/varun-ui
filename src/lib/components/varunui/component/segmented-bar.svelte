<script lang="ts" module>
  import type { ChartTone } from "./chart.js";

  export interface SegmentedBarSegment {
    label: string;
    value: number;
    valueLabel?: string;
    tone?: ChartTone;
  }

  export interface SegmentedBarProps {
    segments?: SegmentedBarSegment[];
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const segmentedBarDemo: SegmentedBarProps = {
    segments: [
      { label: "Product", value: 44, tone: "purple" },
      { label: "Sales", value: 32, tone: "blue" },
      { label: "Support", value: 24, tone: "green" },
    ],
    ariaLabel: "Team allocation by function",
  };
</script>

<script lang="ts">
  import {
    chartToneBackgroundClasses,
    chartToneTextClasses,
    formatChartValue,
    nextChartIndex,
    observeChartReveal,
    toneAt,
  } from "./chart.js";

  let {
    segments = [],
    valueFormat = formatChartValue,
    ariaLabel = "Compact part to whole comparison",
  }: SegmentedBarProps = $props();

  let activeIndex = $state(-1);
  let focused = $state(false);
  let total = $derived(
    segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0),
  );
  let safeTotal = $derived(total || 1);
  let active = $derived(segments[activeIndex]);
  let activeTone = $derived(
    active ? toneAt(activeIndex, active.tone) : "purple",
  );
  let activeCenter = $derived.by(() => {
    if (activeIndex < 0) return 50;
    const before = segments
      .slice(0, activeIndex)
      .reduce((sum, segment) => sum + Math.max(0, segment.value), 0);
    return Math.max(
      16,
      Math.min(
        84,
        ((before + Math.max(0, segments[activeIndex]?.value ?? 0) / 2) /
          safeTotal) *
          100,
      ),
    );
  });

  function percentage(value: number) {
    return total > 0 ? Math.round((Math.max(0, value) / total) * 100) : 0;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, segments.length, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = nextChartIndex(activeIndex, segments.length, -1);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="segmented-bar"
  data-chart-visible="false"
  class="chart-reveal grid gap-3"
  use:observeChartReveal
>
  <div class="relative pt-1">
    <div
      class="flex h-2.5 w-full overflow-hidden rounded-sm bg-muted outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
      role="slider"
      aria-roledescription="interactive chart"
      aria-label={`${ariaLabel}. Use arrow keys to inspect each segment.`}
      aria-valuemin="1"
      aria-valuemax={Math.max(1, segments.length)}
      aria-valuenow={Math.max(1, activeIndex + 1)}
      aria-valuetext={active
        ? `${active.label}: ${active.valueLabel ?? valueFormat(active.value)}, ${percentage(active.value)} percent of total`
        : "No segment selected"}
      tabindex="0"
      onfocus={() => {
        focused = true;
        if (activeIndex < 0 && segments.length > 0) activeIndex = 0;
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
      {#each segments as segment, index (`${segment.label}-${index}`)}
        {@const itemTone = toneAt(index, segment.tone)}
        <span
          class={`motion-chart-bar motion-interactive block h-full ${chartToneBackgroundClasses[itemTone]} ${activeIndex >= 0 && activeIndex !== index ? "opacity-45" : "opacity-100"}`}
          style={`width: ${(Math.max(0, segment.value) / safeTotal) * 100}%; --chart-motion-delay: ${index * 55}ms`}
          role="presentation"
          onpointerenter={() => (activeIndex = index)}
        ></span>
      {/each}
    </div>

    {#if active}
      <div
        class="motion-chart-tooltip pointer-events-none absolute -top-8 z-10 -translate-x-1/2 border border-border bg-background px-2 py-1 font-mono text-[10px] font-semibold whitespace-nowrap text-foreground tabular-nums"
        style:left={`${activeCenter}%`}
        aria-hidden="true"
      >
        {active.label} · {active.valueLabel ?? valueFormat(active.value)}
      </div>
    {/if}
  </div>

  <ul class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" aria-label="Legend">
    {#each segments as segment, index (`${segment.label}-legend-${index}`)}
      {@const itemTone = toneAt(index, segment.tone)}
      <li
        class={`motion-interactive flex min-w-0 items-center gap-2 ${activeIndex === index ? "text-foreground" : "text-muted-foreground"}`}
        onpointerenter={() => (activeIndex = index)}
        onpointerleave={() => {
          if (!focused) activeIndex = -1;
        }}
      >
        <span
          class={`size-2.5 shrink-0 bg-current ${chartToneTextClasses[itemTone]}`}
          aria-hidden="true"
        ></span>
        <span class="truncate">{segment.label}</span>
        <span class="font-mono font-semibold tabular-nums text-foreground">
          {segment.valueLabel ?? `${percentage(segment.value)}%`}
        </span>
      </li>
    {/each}
  </ul>

  <p class="sr-only" aria-live="polite">
    {active
      ? `${active.label}: ${active.valueLabel ?? valueFormat(active.value)}, ${percentage(active.value)} percent of total`
      : ""}
  </p>
</div>
