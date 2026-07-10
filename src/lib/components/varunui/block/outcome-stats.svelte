<script lang="ts" module>
  export interface OutcomeStat {
    value: string;
    label: string;
  }

  export interface OutcomeStatsProps {
    kicker?: string;
    heading?: string;
    description?: string;
    stats?: OutcomeStat[];
  }

  export const outcomeStatsDemo: OutcomeStatsProps = {
    kicker: "System facts",
    heading: "Fewer decisions left to chance.",
    description:
      "A small set of visible constraints keeps every route recognisably varunUI.",
    stats: [
      { value: "4px", label: "Base spacing rhythm" },
      { value: "2", label: "Paper themes" },
      { value: "1", label: "Primary action color" },
      { value: "0px", label: "Default card radius" },
    ],
  };
</script>

<script lang="ts">
  import StatValue from "$lib/components/varunui/component/stat-value.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = outcomeStatsDemo.kicker,
    heading = outcomeStatsDemo.heading,
    description = outcomeStatsDemo.description,
    stats = outcomeStatsDemo.stats ?? [],
  }: OutcomeStatsProps = $props();
</script>

{#if stats.length > 0}
  <Section container="md">
    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        size="lg"
        markerTone="yellow"
      />
      <Grid columns={4} gap="lg">
        {#each stats as stat (stat.label)}
          <div class="border-y border-border py-4">
            <StatValue value={stat.value} size="lg" animate={false} />
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              {stat.label}
            </p>
          </div>
        {/each}
      </Grid>
    </Stack>
  </Section>
{/if}
