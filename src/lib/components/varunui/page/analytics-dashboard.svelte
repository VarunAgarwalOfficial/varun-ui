<script lang="ts" module>
  export interface AnalyticsDashboardProps {
    className?: string;
  }

  export const analyticsDashboardDemo: AnalyticsDashboardProps = {};
</script>

<script lang="ts">
  import type { LineChartSeries } from "$lib/components/varunui/component/line-chart.svelte";
  import AreaChart from "$lib/components/varunui/component/area-chart.svelte";
  import BarChart from "$lib/components/varunui/component/bar-chart.svelte";
  import DonutChart from "$lib/components/varunui/component/donut-chart.svelte";
  import HeatmapMatrix from "$lib/components/varunui/component/heatmap-matrix.svelte";
  import HistogramChart from "$lib/components/varunui/component/histogram-chart.svelte";
  import LineChart from "$lib/components/varunui/component/line-chart.svelte";
  import RadarChart from "$lib/components/varunui/component/radar-chart.svelte";
  import ScatterPlot from "$lib/components/varunui/component/scatter-plot.svelte";
  import SelectMenu from "$lib/components/varunui/component/select-menu.svelte";
  import StackedBarChart from "$lib/components/varunui/component/stacked-bar-chart.svelte";
  import DecisionLog from "$lib/components/varunui/block/decision-log.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ChartFigure from "$lib/components/varunui/piece/chart-figure.svelte";
  import MetricTrend from "$lib/components/varunui/piece/metric-trend.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import { cn } from "$lib/utils.js";

  type RangeKey = "7d" | "30d" | "90d";

  const rangeOptions = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
  ];

  const rangeData: Record<
    RangeKey,
    { labels: string[]; current: number[]; previous: number[] }
  > = {
    "7d": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday"],
      current: [124, 148, 139, 172, 188, 176, 214],
      previous: [112, 121, 136, 144, 153, 168, 174],
    },
    "30d": {
      labels: ["W1", "W2", "W3", "W4", "Now"],
      current: [482, 528, 574, 642, 711],
      previous: [438, 461, 503, 546, 592],
    },
    "90d": {
      labels: ["Apr", "May", "Jun", "Jul"],
      current: [1380, 1642, 1928, 2284],
      previous: [1214, 1378, 1596, 1812],
    },
  };

  const channels = [
    { label: "Direct", value: 4820 },
    { label: "Search", value: 3610 },
    { label: "Referral", value: 2480 },
    { label: "Social", value: 1640 },
    { label: "Email", value: 980 },
  ];

  const workMix = [
    { label: "Product", value: 42, tone: "purple" as const },
    { label: "Growth", value: 26, tone: "blue" as const },
    { label: "Support", value: 19, tone: "green" as const },
    { label: "Operations", value: 13, tone: "yellow" as const },
  ];

  const retention = [
    [100, 64, 48, 41, 38],
    [100, 71, 55, 46, 34],
    [100, 68, 52, 43, 0],
    [100, 74, 57, 0, 0],
    [100, 69, 0, 0, 0],
  ];

  const throughput = [
    { label: "Mon", value: 184 },
    { label: "Tue", value: 242 },
    { label: "Wed", value: 218 },
    { label: "Thu", value: 296 },
    { label: "Fri", value: 328 },
    { label: "Sat", value: 274 },
    { label: "Sunday", value: 351 },
  ];

  const decisionOutcomes = [
    { name: "Accepted", values: [34, 41, 46, 52], tone: "green" as const },
    { name: "Revised", values: [18, 16, 14, 11], tone: "yellow" as const },
    { name: "Deferred", values: [8, 7, 5, 6], tone: "purple" as const },
  ];

  const reviewSignals = [
    { label: "Launch brief", x: 86, y: 1.2, size: 42, tone: "green" as const },
    { label: "Pricing review", x: 74, y: 1.8, size: 31, tone: "blue" as const },
    { label: "Onboarding", x: 68, y: 2.4, size: 37, tone: "yellow" as const },
    { label: "Navigation", x: 61, y: 2.8, size: 28, tone: "pink" as const },
    { label: "Permissions", x: 48, y: 3.6, size: 24, tone: "purple" as const },
    { label: "Import flow", x: 39, y: 4.2, size: 19, tone: "red" as const },
  ];

  const reviewHours = [
    1.2, 1.5, 1.8, 2.1, 2.2, 2.4, 2.5, 2.7, 2.8, 3.1, 3.2, 3.4,
    3.5, 3.7, 3.9, 4.1, 4.2, 4.6, 5.1, 5.8, 6.4, 7.2,
  ];

  const releaseProfile = [
    { label: "Structure", value: 88 },
    { label: "Clarity", value: 94 },
    { label: "Coverage", value: 82 },
    { label: "Motion", value: 76 },
    { label: "Character", value: 84 },
  ];

  let { className }: AnalyticsDashboardProps = $props();
  let selectedRange = $state<RangeKey>("30d");
  let selected = $derived(rangeData[selectedRange]);
  let activitySeries = $derived<LineChartSeries[]>([
    { name: "Current", values: selected.current, tone: "purple" },
    { name: "Previous", values: selected.previous, tone: "cyan" },
  ]);
</script>

<Section container="max">
  <div class={cn("w-full", className)}>
    <Stack gap="xl">
      <SectionHeader
        kicker="Analytics"
        markerTone="yellow"
        title="See the signal, then decide."
        description="A complete analytics page starts with the decision context, moves through trend and comparison, then exposes the diagnostic detail. Every plot supports hover and keyboard inspection."
        align="left"
        size="lg"
        level={1}
      >
        {#snippet actions()}
          <SelectMenu
            label="Reporting period"
            options={rangeOptions}
            bind:value={selectedRange}
            size="sm"
            width="fit"
          />
        {/snippet}
      </SectionHeader>

      <Grid columns={4} gap="md">
        <div class="border-y border-border py-4">
          <MetricTrend
            label="Active teams"
            value="4,821"
            delta="6.8%"
            direction="up"
            values={[22, 28, 24, 33, 31, 40, 38, 46, 44, 52, 58, 64]}
            tone="blue"
            graphAriaLabel="Active teams trend"
          />
        </div>
        <div class="border-y border-border py-4">
          <MetricTrend
            label="Completed work"
            value="12,408"
            delta="9.2%"
            direction="up"
            values={[18, 22, 27, 24, 31, 34, 38, 42, 45, 51, 55, 61]}
            tone="green"
            graphAriaLabel="Completed work trend"
          />
        </div>
        <div class="border-y border-border py-4">
          <MetricTrend
            label="Response time"
            value="2.4h"
            delta="12.1%"
            direction="down"
            values={[48, 44, 46, 39, 41, 34, 32, 30, 28, 27, 25, 24]}
            tone="yellow"
            graphAriaLabel="Response time trend"
          />
        </div>
        <div class="border-y border-border py-4">
          <MetricTrend
            label="Retention"
            value="84.6%"
            delta="1.7%"
            direction="up"
            values={[76, 77, 79, 78, 80, 81, 82, 82, 83, 84, 84, 85]}
            tone="purple"
            graphAriaLabel="Retention trend"
          />
        </div>
      </Grid>

      <ChartFigure captionLabel="Figure 01" captionMeta="Updated Jul 10">
        {#snippet header()}
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold">Active teams</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Current period against the previous period.
              </p>
            </div>
            <p class="font-mono text-sm font-semibold tabular-nums text-foreground">
              +20.1% period over period
            </p>
          </div>
        {/snippet}

        {#key selectedRange}
          <LineChart
            labels={selected.labels}
            series={activitySeries}
            ariaLabel="Active teams over the selected reporting period"
          />
        {/key}

        {#snippet caption()}
          Active teams finished 20.1% above the previous reporting period.
        {/snippet}
      </ChartFigure>

      <Grid columns={2} gap="lg">
        <ChartFigure>
          {#snippet header()}
            <div>
              <h2 class="text-lg font-semibold">Acquisition channels</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Sessions by source, ordered for comparison.
              </p>
            </div>
          {/snippet}
          <BarChart
            data={channels}
            tone="blue"
            ariaLabel="Sessions by acquisition channel"
          />
        </ChartFigure>

        <ChartFigure>
          {#snippet header()}
            <div>
              <h2 class="text-lg font-semibold">Work allocation</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Where the team spent its time this period.
              </p>
            </div>
          {/snippet}
          <DonutChart data={workMix} ariaLabel="Work allocation by function" />
        </ChartFigure>
      </Grid>

      <Grid columns={2} gap="lg">
        <ChartFigure>
          {#snippet header()}
            <div>
              <h2 class="text-lg font-semibold">Weekly throughput</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Completed items per day, grounded at zero.
              </p>
            </div>
          {/snippet}
          <AreaChart
            data={throughput}
            tone="green"
            ariaLabel="Completed items by day"
          />
        </ChartFigure>

        <ChartFigure>
          {#snippet header()}
            <div>
              <h2 class="text-lg font-semibold">Cohort retention</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Weekly return rate after the first active week.
              </p>
            </div>
          {/snippet}
          <HeatmapMatrix
            values={retention}
            rowLabels={["May 06", "May 13", "May 20", "May 27", "Jun 03"]}
            columnLabels={["W0", "W1", "W2", "W3", "W4"]}
            tone="green"
            max={100}
            ariaLabel="Weekly cohort retention"
          />
        </ChartFigure>
      </Grid>

      <ChartFigure captionLabel="Figure 02" captionMeta="Four-week view">
        {#snippet header()}
          <div>
            <h2 class="text-xl font-semibold">Decision outcomes</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Accepted, revised, and deferred reviews each week.
            </p>
          </div>
        {/snippet}
        <StackedBarChart
          labels={["W1", "W2", "W3", "W4"]}
          series={decisionOutcomes}
          ariaLabel="Decision outcomes over four weeks"
        />
        {#snippet caption()}
          Accepted decisions grew while revision volume fell across the month.
        {/snippet}
      </ChartFigure>

      <Grid columns={2} gap="lg">
        <ChartFigure captionLabel="Figure 03">
          {#snippet header()}
            <div>
              <h2 class="text-lg font-semibold">Clarity and revision</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Brief clarity against average revision rounds.
              </p>
            </div>
          {/snippet}
          <ScatterPlot
            data={reviewSignals}
            xLabel="Brief clarity"
            yLabel="Revision rounds"
            xFormat={(value) => `${Math.round(value)}%`}
            yFormat={(value) => value.toFixed(1)}
            ariaLabel="Relationship between brief clarity and revision rounds"
          />
          {#snippet caption()}
            Clearer briefs needed fewer revision rounds in this sample.
          {/snippet}
        </ChartFigure>

        <ChartFigure captionLabel="Figure 04" captionMeta="22 reviews">
          {#snippet header()}
            <div>
              <h2 class="text-lg font-semibold">Review turnaround</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Distribution of hours from request to decision.
              </p>
            </div>
          {/snippet}
          <HistogramChart
            values={reviewHours}
            binCount={7}
            valueLabel="Review hours"
            valueFormat={(value) => `${value.toFixed(1)}h`}
            ariaLabel="Distribution of review turnaround times"
          />
          {#snippet caption()}
            Most reviews closed between two and four hours.
          {/snippet}
        </ChartFigure>
      </Grid>

      <ChartFigure captionLabel="Figure 05" captionMeta="Release 1.4 review">
        {#snippet header()}
          <div>
            <h2 class="text-xl font-semibold">Release quality profile</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Five system qualities scored against the release checklist.
            </p>
          </div>
        {/snippet}
        <RadarChart
          axes={releaseProfile}
          tone="purple"
          ariaLabel="Release quality across structure, clarity, coverage, motion, and character"
        />
        {#snippet caption()}
          Clarity leads this review; motion coverage is the next useful improvement.
        {/snippet}
      </ChartFigure>
    </Stack>
  </div>
</Section>

<DecisionLog />
