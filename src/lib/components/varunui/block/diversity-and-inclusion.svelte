<script lang="ts" module>
  interface Practice {
    title: string;
    description: string;
  }

  export interface DiversityAndInclusionProps {
    kicker?: string;
    heading?: string;
    description?: string;
    practices?: Practice[];
    className?: string;
  }

  export const diversityAndInclusionDemo: DiversityAndInclusionProps = {
    kicker: "Belonging by design",
    heading: "Make the team easier to enter and safer to challenge.",
    description:
      "Inclusion is visible in how roles are written, interviews are scored, work is discussed, and support is requested.",
    practices: [
      { title: "Write the role plainly", description: "Separate the skills needed now from the ones a person can learn here." },
      { title: "Score the same evidence", description: "Use a shared rubric before interviews begin and record the reason behind each decision." },
      { title: "Make access ordinary", description: "Offer accommodations early, privately, and without asking candidates to justify the need." },
      { title: "Publish the next step", description: "Every candidate leaves a stage knowing who owns the decision and when to expect it." },
    ],
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = diversityAndInclusionDemo.kicker,
    heading = diversityAndInclusionDemo.heading,
    description = diversityAndInclusionDemo.description,
    practices = diversityAndInclusionDemo.practices ?? [],
    className,
  }: DiversityAndInclusionProps = $props();
</script>

<section data-slot="diversity-and-inclusion" class={className}>
  <Section container="lg">
    <Stack gap="xl">
      <SectionHeader {kicker} title={heading} {description} align="left" markerTone="pink" />
      <ul class="grid grid-cols-1 border border-border md:grid-cols-2">
        {#each practices as practice, index (`${practice.title}-${index}`)}
          <li
            data-tone="pink"
            class="surface-pastel border-b border-border p-[var(--surface-padding-md)] last:border-b-0 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <p class="font-semibold">{practice.title}</p>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">{practice.description}</p>
          </li>
        {/each}
      </ul>
    </Stack>
  </Section>
</section>
