<script lang="ts">
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import FeatureCard from "$lib/components/varunui/piece/feature-card.svelte";
  import {
    CheckCircle,
    LineChart,
    Users,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
</script>

<Section>
  <Stack gap="xl">
    <SectionHeader
      kicker="Workspace"
      title="A grid for related product capabilities."
      description="Cards share equal rhythm while each item keeps real copy, icons, and action-ready structure."
    />
    <Grid columns={3}>
      <FeatureCard>
        {#snippet leading()}<CheckCircle class="size-5" aria-hidden="true" />{/snippet}
        <h3 class="text-lg font-semibold">Approval queue</h3>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Track copy, design, and legal approvals in one review pass.
        </p>
      </FeatureCard>
      <FeatureCard>
        {#snippet leading()}<LineChart class="size-5" aria-hidden="true" />{/snippet}
        <h3 class="text-lg font-semibold">Launch health</h3>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Show adoption, support load, and activation together.
        </p>
      </FeatureCard>
      <FeatureCard>
        {#snippet leading()}<Users class="size-5" aria-hidden="true" />{/snippet}
        <h3 class="text-lg font-semibold">Team handoff</h3>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Keep owners, dates, and customer-facing notes aligned.
        </p>
      </FeatureCard>
    </Grid>
  </Stack>
</Section>
