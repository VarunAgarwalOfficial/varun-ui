<script lang="ts" module>
  interface GoalItem {
    title: string;
    description?: string;
    progress: number;
    progressLabel?: string;
  }

  type ButtonVariant = "primary" | "outline" | "quiet" | "danger";

  interface ButtonItem {
    label: string;
    href?: string;
    variant?: ButtonVariant;
  }

  export interface GoalProgressProps {
    kicker?: string;
    heading?: string;
    description?: string;
    items?: GoalItem[];
    action?: ButtonItem;
  }

  export const goalProgressDemo: GoalProgressProps = {
    kicker: "Release readiness",
    heading: "What is left before 1.4 can ship.",
    description: "Three shared checks keep the release decision visible without turning it into a vanity dashboard.",
    items: [
      {
        title: "Component review",
        description: "Interaction, naming, and responsive states reviewed by an owner.",
        progress: 90,
        progressLabel: "18 of 20 checked",
      },
      {
        title: "Docs and examples",
        description: "Public APIs paired with a focused example and migration note.",
        progress: 75,
        progressLabel: "12 of 16 ready",
      },
      {
        title: "Accessibility pass",
        description: "Keyboard, focus, contrast, and reduced-motion checks complete.",
        progress: 88,
        progressLabel: "28 of 32 checked",
      },
    ],
    action: { label: "Review open checks", href: "?" },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    items = [],
    action,
  }: GoalProgressProps = $props();
</script>

{#if items.length > 0}
  <Section>
    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        markerTone="green"
      />
      <div class="divide-y divide-border border-y border-border">
        {#each items as item (item.title)}
          <article class="grid gap-[var(--layout-gap-md)] py-[var(--surface-padding-md)] md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.75fr)_4rem] md:items-center">
            <div>
              <h3 class="font-semibold">{item.title}</h3>
              {#if item.description}
                <p class="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              {/if}
            </div>

            <div>
              <ProgressMeter
                value={item.progress}
                tone="success"
                ariaLabel={`${item.title} progress`}
                ariaValueText={item.progressLabel}
              />
              {#if item.progressLabel}
                <p class="mt-2 text-xs text-muted-foreground">{item.progressLabel}</p>
              {/if}
            </div>

            <p class="font-mono text-2xl font-semibold tabular-nums md:text-right">{item.progress}%</p>
          </article>
        {/each}
      </div>

      {#if action}
        <div>
          <Button href={action.href ?? "?"} variant={action.variant ?? "primary"}>
            {action.label}
          </Button>
        </div>
      {/if}
    </Stack>
  </Section>
{/if}
