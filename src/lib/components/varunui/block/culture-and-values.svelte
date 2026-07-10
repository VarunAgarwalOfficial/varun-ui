<script lang="ts" module>
  export interface CultureValue {
    title: string;
    description: string;
  }

  export interface CultureAndValuesProps {
    kicker?: string;
    heading?: string;
    description?: string;
    items?: CultureValue[];
  }

  export const cultureAndValuesDemo: CultureAndValuesProps = {
    kicker: "How we work",
    heading: "Clear enough to disagree. Kind enough to keep going.",
    description:
      "The system is opinionated and the team is curious. We make decisions visible, then improve them together.",
    items: [
      {
        title: "Own the handoff",
        description: "The next person should know what changed, why it changed, and what they can do now.",
      },
      {
        title: "Show the reasoning",
        description: "A decision without context becomes the next team's mystery. Keep the useful part visible.",
      },
      {
        title: "Write it down",
        description: "Good notes beat another status meeting and give quieter voices room to contribute.",
      },
      {
        title: "Leave room to learn",
        description: "Strong opinions are starting points. Evidence can change the system and the plan.",
      },
    ],
  };
</script>

<script lang="ts">
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = cultureAndValuesDemo.kicker,
    heading = cultureAndValuesDemo.heading,
    description = cultureAndValuesDemo.description,
    items = cultureAndValuesDemo.items ?? [],
  }: CultureAndValuesProps = $props();
</script>

<Section container="lg">
  <Stack gap="xl">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      markerTone="pink"
    />
    <Grid columns={2} gap="md">
      {#each items as item (item.title)}
        <PastelField tone="pink">
          <h3 class="text-lg font-semibold text-foreground">{item.title}</h3>
          <p class="mt-2 max-w-[var(--layout-prose)] text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </PastelField>
      {/each}
    </Grid>
  </Stack>
</Section>
