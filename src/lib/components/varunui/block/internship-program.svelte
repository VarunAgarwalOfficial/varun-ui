<script lang="ts" module>
  interface ProgramPrinciple {
    title: string;
    description: string;
  }

  interface ProgramFact {
    label: string;
    value: string;
  }

  interface ProgramAction {
    label: string;
    href: string;
    variant?: "primary" | "outline";
  }

  export interface InternshipProgramProps {
    kicker?: string;
    heading?: string;
    description?: string;
    principles?: ProgramPrinciple[];
    facts?: ProgramFact[];
    actions?: ProgramAction[];
    className?: string;
  }

  export const internshipProgramDemo: InternshipProgramProps = {
    kicker: "Early career",
    heading: "An internship with real work and named support.",
    description:
      "Spend twelve weeks shipping one useful outcome with a mentor, a reviewer, and time protected for learning.",
    principles: [
      { title: "Own a bounded problem", description: "Work on a production need with a clear user, scope, and decision owner." },
      { title: "Review twice a week", description: "Share work early with the same mentor instead of waiting for a final presentation." },
      { title: "Learn in the work", description: "Use weekly sessions to unpack the system decisions behind the project." },
      { title: "Leave with evidence", description: "Finish with shipped work, a written retrospective, and direct feedback." },
    ],
    facts: [
      { label: "Duration", value: "12 weeks" },
      { label: "Format", value: "Paid, hybrid or remote" },
      { label: "Support", value: "One mentor and one reviewer" },
      { label: "Timing", value: "Applications open in March" },
    ],
    actions: [
      { label: "View internship roles", href: "?" },
      { label: "Read how we hire", href: "?", variant: "outline" },
    ],
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = internshipProgramDemo.kicker,
    heading = internshipProgramDemo.heading,
    description = internshipProgramDemo.description,
    principles = internshipProgramDemo.principles ?? [],
    facts = internshipProgramDemo.facts ?? [],
    actions = internshipProgramDemo.actions ?? [],
    className,
  }: InternshipProgramProps = $props();
</script>

<section data-slot="internship-program" class={className}>
  <Section container="lg">
    <Rail side="right" sticky={false}>
      {#snippet rail()}
        <PastelField tone="pink" className="border-y border-border">
          <h3 class="text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">Program facts</h3>
          <dl class="mt-[var(--layout-gap-md)] divide-y divide-border">
            {#each facts as fact (`${fact.label}-${fact.value}`)}
              <div class="grid gap-1 py-[var(--layout-gap-sm)] first:pt-0 last:pb-0">
                <dt class="text-xs text-muted-foreground">{fact.label}</dt>
                <dd class="text-sm font-semibold">{fact.value}</dd>
              </div>
            {/each}
          </dl>
        </PastelField>
      {/snippet}

      <Stack gap="xl">
        <SectionHeader {kicker} title={heading} {description} align="left" markerTone="pink" />
        <ul class="divide-y divide-border border-y border-border">
          {#each principles as principle (`${principle.title}`)}
            <li class="py-[var(--layout-gap-md)] first:pt-0 last:pb-0">
              <div class="max-w-[var(--layout-prose)]">
                <h3 class="text-base font-semibold">{principle.title}</h3>
                <p class="mt-1 text-sm leading-6 text-muted-foreground">{principle.description}</p>
              </div>
            </li>
          {/each}
        </ul>
        {#if actions.length > 0}
          <ActionRow align="left">
            {#each actions.slice(0, 2) as action, index (`${action.label}-${index}`)}
              <Button href={action.href} variant={action.variant ?? (index === 0 ? "primary" : "outline")}>{action.label}</Button>
            {/each}
          </ActionRow>
        {/if}
      </Stack>
    </Rail>
  </Section>
</section>
