<script lang="ts" module>
  interface Topic {
    id: string;
    label: string;
  }

  interface TopicGroup {
    title: string;
    topics: Topic[];
  }

  export interface InterestTagPickerProps {
    kicker?: string;
    heading?: string;
    description?: string;
    groups?: TopicGroup[];
    minSelection?: number;
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const interestTagPickerDemo: InterestTagPickerProps = {
    kicker: "Interests",
    heading: "Which parts of the system matter first?",
    description:
      "Choose at least three. varunUI will put the most relevant examples at the front of your workspace.",
    minSelection: 3,
    groups: [
      {
        title: "Product work",
        topics: [
          { id: "briefs", label: "Briefs" },
          { id: "reviews", label: "Reviews" },
          { id: "decisions", label: "Decisions" },
          { id: "releases", label: "Releases" },
        ],
      },
      {
        title: "System craft",
        topics: [
          { id: "components", label: "Components" },
          { id: "layouts", label: "Layouts" },
          { id: "accessibility", label: "Accessibility" },
          { id: "motion", label: "Motion" },
        ],
      },
      {
        title: "Outputs",
        topics: [
          { id: "product-ui", label: "Product UI" },
          { id: "marketing-pages", label: "Marketing pages" },
          { id: "emails", label: "Emails" },
          { id: "posters", label: "Posts and posters" },
        ],
      },
    ],
    primaryButton: { label: "Continue", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    currentStep: 2,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";

  let {
    kicker,
    heading,
    description,
    groups = [],
    minSelection = 3,
    primaryButton,
    secondaryButton,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: InterestTagPickerProps = $props();

  let selected = $state<Set<string>>(new Set());
  const hasEnough = $derived(selected.size >= minSelection);

  function setSelected(id: string, checked: boolean) {
    const next = new Set(selected);
    if (checked) next.add(id);
    else next.delete(id);
    selected = next;
  }
</script>

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="yellow"
  container="md"
  {className}
>
      {#if groups.length > 0}
          <Stack gap="lg">
          {#each groups as group (group.title)}
            <fieldset class="grid gap-[var(--layout-gap-sm)]">
              <legend class="mb-2 text-sm font-semibold">{group.title}</legend>
              <Grid columns={2} gap="sm">
                {#each group.topics as topic}
                  <div class="border bg-background p-3">
                    <CheckboxField
                      id={`interest-${topic.id}`}
                      label={topic.label}
                      checked={selected.has(topic.id)}
                      onCheckedChange={(checked) => setSelected(topic.id, checked)}
                    />
                  </div>
                {/each}
              </Grid>
            </fieldset>
          {/each}
          </Stack>
      {/if}

  {#snippet status()}
      <p
        class={hasEnough ? "font-semibold text-success" : "text-muted-foreground"}
        aria-live="polite"
      >
        {selected.size} of {minSelection}+ selected
      </p>
  {/snippet}

  {#snippet actions()}
        {#if primaryButton}
          <Button size="lg" disabled={!hasEnough} href={hasEnough ? primaryButton.href : undefined}>
            {primaryButton.label}
            <ArrowRight class="size-4" />
          </Button>
        {/if}
        {#if secondaryButton}
          <Link href={secondaryButton.href} label={secondaryButton.label} />
        {/if}
  {/snippet}
</OnboardingStep>
