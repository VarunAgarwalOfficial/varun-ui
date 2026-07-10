<script lang="ts">
  import LineChart from "$lib/components/varunui/component/line-chart.svelte";
  import ChartFigure from "$lib/components/varunui/piece/chart-figure.svelte";

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const series = [
    { name: "Completed", values: [18, 24, 21, 31, 36, 42], tone: "purple" as const },
    { name: "Planned", values: [22, 25, 28, 32, 37, 40], tone: "cyan" as const },
  ];
</script>

<div class="w-full">
  <ChartFigure captionLabel="Figure 01" captionMeta="Updated Jul 10">
    {#snippet header()}
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold">Weekly delivery</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Completed work against the plan.
          </p>
        </div>
        <p class="font-mono text-sm font-semibold tabular-nums">42 shipped</p>
      </div>
    {/snippet}

    <LineChart {labels} {series} ariaLabel="Weekly delivery" />

    {#snippet caption()}
      Completed work rose through the week and finished two items above plan.
    {/snippet}
  </ChartFigure>
</div>
