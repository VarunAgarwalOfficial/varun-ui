<script lang="ts">
  import FeatureCard from "$lib/components/varunui/piece/feature-card.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  const cards = [
    {
      marker: "01",
      title: "Confirm owners",
      description: "Every open item has a reviewer, due date, and escalation path.",
    },
    {
      marker: "02",
      title: "Resolve blockers",
      description: "Design and support risks are grouped before the weekly review.",
    },
    {
      marker: "03",
      title: "Send update",
      description: "The team summary is ready for product, support, and sales.",
    },
  ] as const;
</script>

<Section>
  <Stack gap="xl">
    <SectionHeader
      kicker="Readiness"
      title="A weekly checkpoint for cross-functional work."
      description="Three compact cards keep ownership, risk, and communication visible."
    />
    <Grid columns={3}>
      {#each cards as card (card.marker)}
        <FeatureCard>
          {#snippet leading()}
            <span class="font-mono text-sm font-semibold">{card.marker}</span>
          {/snippet}
          <h3 class="text-lg font-semibold">{card.title}</h3>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">
            {card.description}
          </p>
        </FeatureCard>
      {/each}
    </Grid>
  </Stack>
</Section>
