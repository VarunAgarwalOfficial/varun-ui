<script lang="ts" module>
  export interface HiringProcessItem {
    title: string;
    description: string;
    timing?: string;
  }

  export interface HiringProcessProps {
    kicker?: string;
    heading?: string;
    description?: string;
    items?: HiringProcessItem[];
  }

  export const hiringProcessDemo: HiringProcessProps = {
    kicker: "Hiring process",
    heading: "Know what happens after you apply.",
    description:
      "Four useful conversations, one named contact, and a clear answer at every handoff.",
    items: [
      {
        title: "Review your work",
        description: "We read the application and the examples you chose to share.",
        timing: "Within 5 workdays",
      },
      {
        title: "Meet the team",
        description: "Talk about the role, how we work, and what you want to learn next.",
        timing: "30 minutes",
      },
      {
        title: "Work through a real problem",
        description: "Discuss one small, relevant problem with the people doing the work.",
        timing: "60 minutes",
      },
      {
        title: "Decide together",
        description: "We share the decision, context, and next step without a long silence.",
        timing: "Within 2 workdays",
      },
    ],
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = hiringProcessDemo.kicker,
    heading = hiringProcessDemo.heading,
    description = hiringProcessDemo.description,
    items = hiringProcessDemo.items ?? [],
  }: HiringProcessProps = $props();
</script>

<Section container="md">
  <Stack gap="xl">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      markerTone="pink"
    />

    <ol class="border-y border-border">
      {#each items as item (item.title)}
        <li class="grid gap-2 border-b border-border py-5 last:border-b-0 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6">
          <div>
            <h3 class="font-semibold text-foreground">{item.title}</h3>
            <p class="mt-2 max-w-[var(--layout-prose)] text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
          {#if item.timing}
            <p class="font-mono text-xs text-muted-foreground md:text-right">
              {item.timing}
            </p>
          {/if}
        </li>
      {/each}
    </ol>
  </Stack>
</Section>
