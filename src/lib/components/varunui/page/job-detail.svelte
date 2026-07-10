<script lang="ts" module>
  export interface JobDetailProps {
    kicker?: string;
    heading?: string;
    description?: string;
    facts?: { label: string; value: string }[];
    about?: string;
    responsibilities?: string[];
    requirements?: string[];
    usefulExperience?: string[];
    applyHref?: string;
    className?: string;
  }

  export const jobDetailDemo: JobDetailProps = {
    kicker: "Engineering",
    heading: "Senior Frontend Engineer",
    description: "Build the components and page systems that make product decisions easier to follow.",
    facts: [
      { label: "Location", value: "Remote" },
      { label: "Type", value: "Full-time" },
      { label: "Level", value: "Senior" },
    ],
    about:
      "You will shape the public component API, work closely with design, and turn repeated interface decisions into a smaller system the team can maintain.",
    responsibilities: [
      "Build accessible Svelte components with clear behavioral ownership",
      "Turn product flows into reusable Layouts, Blocks, and complete Pages",
      "Review interaction, responsive behavior, and reduced-motion states",
      "Explain tradeoffs in short decision notes beside the work",
    ],
    requirements: [
      "Strong HTML, CSS, accessibility, and TypeScript fundamentals",
      "Experience maintaining a shared component or design system",
      "Evidence of simplifying an API without reducing capability",
      "Clear written communication and collaborative judgment",
    ],
    usefulExperience: [
      "Svelte or another compiler-led UI framework",
      "Data visualization and keyboard interaction",
      "Design tooling or documentation systems",
    ],
    applyHref: "?",
  };
</script>

<script lang="ts">
  import { Check } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = jobDetailDemo.kicker,
    heading = jobDetailDemo.heading,
    description = jobDetailDemo.description,
    facts = jobDetailDemo.facts ?? [],
    about = jobDetailDemo.about,
    responsibilities = jobDetailDemo.responsibilities ?? [],
    requirements = jobDetailDemo.requirements ?? [],
    usefulExperience = jobDetailDemo.usefulExperience ?? [],
    applyHref = jobDetailDemo.applyHref,
    className,
  }: JobDetailProps = $props();
</script>

{#snippet requirementList(title: string, items: string[])}
  {#if items.length > 0}
    <section>
      <h2 class="text-xl font-semibold">{title}</h2>
      <ul class="mt-4 divide-y divide-border border-y border-border">
        {#each items as item (`${title}-${item}`)}
          <li class="flex gap-3 py-3 text-sm text-muted-foreground">
            <Check class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
{/snippet}

<main data-slot="job-detail" class={className}>
  <Section container="md">
    <Stack gap="xl">
      <SectionHeader {kicker} title={heading} {description} align="left" size="lg" level={1} markerTone="pink" />

      {#if facts.length > 0}
        <dl class="grid border-y border-border sm:grid-cols-3">
          {#each facts as fact, index (`${fact.label}-${index}`)}
            <div class="border-b border-border py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
              <dt class="text-xs uppercase tracking-[var(--tracking-label)] text-muted-foreground">{fact.label}</dt>
              <dd class="mt-1 font-semibold">{fact.value}</dd>
            </div>
          {/each}
        </dl>
      {/if}

      {#if about}
        <section>
          <h2 class="text-xl font-semibold">About the role</h2>
          <p class="mt-3 max-w-[var(--layout-prose)] leading-7 text-muted-foreground">{about}</p>
        </section>
      {/if}

      {@render requirementList("What you will do", responsibilities)}
      {@render requirementList("What you bring", requirements)}
      {@render requirementList("Useful experience", usefulExperience)}

      {#if applyHref}<Button href={applyHref} size="lg" class="w-fit">Apply for this role</Button>{/if}
    </Stack>
  </Section>
</main>
