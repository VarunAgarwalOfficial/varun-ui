<script lang="ts">
  import type {
    ChartTone,
    ChartTooltipItem,
  } from "$lib/components/varunui/component/chart.js";
  import { chartToneTextClasses } from "$lib/components/varunui/component/chart.js";

  let {
    x,
    y,
    plotWidth,
    heading,
    items,
  }: {
    x: number;
    y: number;
    plotWidth: number;
    heading: string;
    items: ChartTooltipItem[];
  } = $props();

  const tooltipWidth = 176;
  const headingHeight = 26;
  const rowHeight = 18;

  let tooltipHeight = $derived(headingHeight + items.length * rowHeight + 8);
  let left = $derived(
    Math.max(8, Math.min(plotWidth - tooltipWidth - 8, x - tooltipWidth / 2)),
  );
  let top = $derived(
    y - tooltipHeight - 12 < 8 ? y + 12 : y - tooltipHeight - 12,
  );

  function toneClass(tone?: ChartTone) {
    return chartToneTextClasses[tone ?? "purple"];
  }
</script>

<g
  data-slot="chart-tooltip"
  transform={`translate(${left} ${top})`}
  class="motion-chart-tooltip pointer-events-none"
  aria-hidden="true"
>
  <rect
    width={tooltipWidth}
    height={tooltipHeight}
    class="fill-background stroke-border"
    vector-effect="non-scaling-stroke"
  />
  <text
    x="12"
    y="18"
    class="fill-foreground text-[11px] font-semibold"
  >
    {heading}
  </text>
  <line
    x1="0"
    x2={tooltipWidth}
    y1={headingHeight}
    y2={headingHeight}
    class="stroke-border"
    vector-effect="non-scaling-stroke"
  />
  {#each items as item, index (`${item.label}-${index}`)}
    {@const rowY = headingHeight + 14 + index * rowHeight}
    <circle
      cx="12"
      cy={rowY - 3.5}
      r="3"
      class={`fill-current ${toneClass(item.tone)}`}
    />
    <text x="22" y={rowY} class="fill-muted-foreground text-[10px]">
      {item.label}
    </text>
    <text
      x={tooltipWidth - 12}
      y={rowY}
      text-anchor="end"
      class="fill-foreground font-mono text-[10px] font-semibold tabular-nums"
    >
      {item.value}
    </text>
  {/each}
</g>
