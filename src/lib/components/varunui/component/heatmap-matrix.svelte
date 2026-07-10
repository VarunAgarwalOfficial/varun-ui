<script lang="ts" module>
  import type { ChartTone } from "./chart.js";

  export interface HeatmapMatrixProps {
    values?: number[][];
    rowLabels?: string[];
    columnLabels?: string[];
    tone?: ChartTone;
    max?: number;
    valueFormat?: (value: number) => string;
    ariaLabel?: string;
  }

  export const heatmapMatrixDemo: HeatmapMatrixProps = {
    values: [
      [100, 64, 48, 41, 38],
      [100, 71, 55, 46, 34],
      [100, 68, 52, 43, 0],
      [100, 74, 57, 0, 0],
      [100, 69, 0, 0, 0],
    ],
    rowLabels: ["May 06", "May 13", "May 20", "May 27", "Jun 03"],
    columnLabels: ["W0", "W1", "W2", "W3", "W4"],
    tone: "green",
    max: 100,
    ariaLabel: "Weekly cohort retention",
  };
</script>

<script lang="ts">
  import { max as d3Max, scaleBand, scaleLinear } from "d3";
  import ChartTooltip from "$lib/components/varunui/component/internal/chart-tooltip.svelte";
  import {
    chartToneTextClasses,
    formatChartValue,
    observeChartReveal,
    observeChartWidth,
  } from "./chart.js";

  let {
    values = [],
    rowLabels = [],
    columnLabels = [],
    tone = "green",
    max,
    valueFormat = formatChartValue,
    ariaLabel = "Heatmap matrix",
  }: HeatmapMatrixProps = $props();

  const height = 288;
  const top = 34;
  const right = 12;
  const bottom = 12;

  let width = $state(640);
  let activeIndex = $state(-1);
  let focused = $state(false);

  let columnCount = $derived(
    Math.max(columnLabels.length, ...values.map((row) => row.length), 0),
  );
  let columns = $derived(
    Array.from(
      { length: columnCount },
      (_, index) => columnLabels[index] ?? `${index + 1}`,
    ),
  );
  let rows = $derived(
    values.map((row, index) => ({
      label: rowLabels[index] ?? `${index + 1}`,
      values: columns.map((_, columnIndex) => row[columnIndex] ?? 0),
    })),
  );
  let cells = $derived(
    rows.flatMap((row, rowIndex) =>
      row.values.map((value, columnIndex) => ({
        rowIndex,
        columnIndex,
        rowLabel: row.label,
        columnLabel: columns[columnIndex] ?? "",
        value,
      })),
    ),
  );
  let left = $derived(
    Math.min(
      116,
      Math.max(54, ...rows.map((row) => row.label.length * 6.5 + 12)),
    ),
  );
  let x = $derived(
    scaleBand<string>()
      .domain(columns)
      .range([left, width - right])
      .padding(0.08),
  );
  let y = $derived(
    scaleBand<string>()
      .domain(rows.map((row) => row.label))
      .range([top, height - bottom])
      .padding(0.1),
  );
  let resolvedMax = $derived(
    Math.max(max ?? d3Max(cells, (cell) => cell.value) ?? 1, 1),
  );
  let opacity = $derived(
    scaleLinear().domain([0, resolvedMax]).range([0.12, 1]).clamp(true),
  );
  let active = $derived(cells[activeIndex]);
  let activeX = $derived(
    active
      ? (x(active.columnLabel) ?? left) + x.bandwidth() / 2
      : width / 2,
  );
  let activeY = $derived(
    active
      ? (y(active.rowLabel) ?? top) + y.bandwidth() / 2
      : height / 2,
  );
  let showValues = $derived(x.bandwidth() >= 38 && y.bandwidth() >= 26);

  function move(rowDelta: number, columnDelta: number) {
    if (cells.length === 0 || columnCount === 0) return;
    const current = activeIndex < 0 ? 0 : activeIndex;
    const row = Math.floor(current / columnCount);
    const column = current % columnCount;
    const nextRow = Math.max(0, Math.min(rows.length - 1, row + rowDelta));
    const nextColumn = Math.max(
      0,
      Math.min(columnCount - 1, column + columnDelta),
    );
    activeIndex = nextRow * columnCount + nextColumn;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(0, 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(0, -1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1, 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1, 0);
    } else if (event.key === "Escape") {
      activeIndex = -1;
    }
  }
</script>

<div
  data-slot="heatmap-matrix"
  data-chart-visible="false"
  class="chart-reveal relative w-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
  use:observeChartReveal
  use:observeChartWidth={(nextWidth) => (width = nextWidth)}
  role="slider"
  aria-roledescription="interactive heatmap"
  aria-label={`${ariaLabel}. Use arrow keys to inspect each cell.`}
  aria-valuemin="1"
  aria-valuemax={Math.max(1, cells.length)}
  aria-valuenow={Math.max(1, activeIndex + 1)}
  aria-valuetext={active
    ? `${active.rowLabel}, ${active.columnLabel}: ${valueFormat(active.value)}`
    : "No cell selected"}
  tabindex="0"
  onfocus={() => {
    focused = true;
    if (activeIndex < 0 && cells.length > 0) activeIndex = 0;
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
    {#if cells.length === 0}
      <text
        x={width / 2}
        y={height / 2}
        text-anchor="middle"
        class="fill-muted-foreground text-xs"
      >No data to plot.</text>
    {:else}
      {#each columns as column (column)}
        <text
          x={(x(column) ?? left) + x.bandwidth() / 2}
          y="18"
          text-anchor="middle"
          class="fill-muted-foreground font-mono text-[10px]"
        >{column}</text>
      {/each}

      {#each rows as row (row.label)}
        <text
          x={left - 8}
          y={(y(row.label) ?? top) + y.bandwidth() / 2 + 3.5}
          text-anchor="end"
          class="fill-muted-foreground font-mono text-[10px]"
        >{row.label}</text>
      {/each}

      {#each cells as cell, index (`${cell.rowIndex}-${cell.columnIndex}`)}
        {@const cellX = x(cell.columnLabel) ?? left}
        {@const cellY = y(cell.rowLabel) ?? top}
        {@const isActive = index === activeIndex}
        <rect
          x={cellX}
          y={cellY}
          width={x.bandwidth()}
          height={y.bandwidth()}
          class={cell.value <= 0
            ? "motion-interactive fill-muted"
            : `motion-chart-arc motion-interactive fill-current ${chartToneTextClasses[tone]}`}
          style={cell.value <= 0
            ? undefined
            : `opacity: ${isActive ? 1 : opacity(cell.value)}; --chart-motion-delay: ${index * 18}ms`}
          role="presentation"
          onpointerenter={() => (activeIndex = index)}
        />
        {#if showValues && cell.value > 0}
          <text
            x={cellX + x.bandwidth() / 2}
            y={cellY + y.bandwidth() / 2 + 3.5}
            text-anchor="middle"
            class={cell.value / resolvedMax >= 0.58
              ? "pointer-events-none fill-background font-mono text-[10px] font-semibold"
              : "pointer-events-none fill-foreground font-mono text-[10px] font-semibold"}
          >{valueFormat(cell.value)}</text>
        {/if}
      {/each}

      {#if active}
        <rect
          x={(x(active.columnLabel) ?? left) - 2}
          y={(y(active.rowLabel) ?? top) - 2}
          width={x.bandwidth() + 4}
          height={y.bandwidth() + 4}
          fill="none"
          class="stroke-foreground"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
        <ChartTooltip
          x={activeX}
          y={activeY}
          plotWidth={width}
          heading={`${active.rowLabel} · ${active.columnLabel}`}
          items={[
            {
              label: "Value",
              value: valueFormat(active.value),
              tone,
            },
          ]}
        />
      {/if}
    {/if}
  </svg>

  <p class="sr-only" aria-live="polite">
    {active
      ? `${active.rowLabel}, ${active.columnLabel}: ${valueFormat(active.value)}`
      : ""}
  </p>
</div>
