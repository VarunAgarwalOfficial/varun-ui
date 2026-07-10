<script lang="ts" module>
  interface Goal {
    id: string;
    title: string;
    description: string;
  }

  export interface GoalSelectorProps {
    kicker?: string;
    heading?: string;
    description?: string;
    goals?: Goal[];
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

  export const goalSelectorDemo: GoalSelectorProps = {
    kicker: "Your goals",
    heading: "What do you want to achieve?",
    description:
      "Pick the work you want to make easier first. You can change this later.",
    goals: [
      {
        id: "launch",
        title: "Launch a product",
        description: "Ship your first project fast",
      },
      {
        id: "scale",
        title: "Make reviews clearer",
        description: "Keep feedback beside the work",
      },
      {
        id: "collaborate",
        title: "Bring the team together",
        description: "Give ownership and handoffs one home",
      },
      {
        id: "explore",
        title: "Learn the workspace",
        description: "Browse the workflow at my own pace",
      },
      {
        id: "secure",
        title: "Prepare a release",
        description: "Track decisions before work ships",
      },
      {
        id: "learn",
        title: "Build a shared system",
        description: "Make repeated work easier to follow",
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

  let {
    kicker,
    heading,
    description,
    goals = [],
    primaryButton,
    secondaryButton,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: GoalSelectorProps = $props();

  let selected = $state<Set<string>>(new Set());
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
      {#if goals.length > 0}
          <Grid columns={2} gap="sm">
          {#each goals as goal (goal.id)}
            <div
              class="surface-pastel-interactive border border-border bg-background p-[var(--surface-padding-sm)]"
            >
              <CheckboxField
                id={`goal-${goal.id}`}
                label={goal.title}
                description={goal.description}
                checked={selected.has(goal.id)}
                onCheckedChange={(checked) => setSelected(goal.id, checked)}
              />
            </div>
          {/each}
          </Grid>
      {/if}

  {#snippet status()}
      <p class="text-sm text-muted-foreground" aria-live="polite">
        {selected.size} {selected.size === 1 ? "goal" : "goals"} selected
      </p>
  {/snippet}

  {#snippet actions()}
        {#if primaryButton}
          <Button
            size="lg"
            disabled={selected.size === 0}
            href={selected.size > 0 ? primaryButton.href : undefined}
          >
            {primaryButton.label}
            <ArrowRight class="size-4" />
          </Button>
        {/if}
        {#if secondaryButton}
          <Link href={secondaryButton.href} label={secondaryButton.label} />
        {/if}
  {/snippet}
</OnboardingStep>
