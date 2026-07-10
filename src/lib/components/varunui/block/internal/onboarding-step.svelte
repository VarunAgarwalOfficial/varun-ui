<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";

  export interface OnboardingStepProps {
    kicker?: string;
    title?: string;
    description?: string;
    currentStep?: number;
    totalSteps?: number;
    tone?: StorySceneTone;
    container?: "sm" | "md";
    className?: string;
    children?: Snippet;
    actions?: Snippet;
    status?: Snippet;
  }
</script>

<script lang="ts">
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";
  import Cluster from "$lib/components/varunui/layout/cluster.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    title,
    description,
    currentStep = 1,
    totalSteps = 4,
    tone = "yellow",
    container = "sm",
    className,
    children,
    actions,
    status,
  }: OnboardingStepProps = $props();

  const safeTotal = $derived(Math.max(1, totalSteps));
  const safeStep = $derived(Math.min(Math.max(1, currentStep), safeTotal));
</script>

<Section {container} className={className}>
  <Stack gap="xl">
    <Stack gap="md">
      <div class="grid gap-2">
        <p class="text-xs font-semibold uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">
          Step {safeStep} of {safeTotal}
        </p>
        <ProgressMeter
          value={safeStep}
          max={safeTotal}
          tone="foreground"
          size="xs"
          ariaLabel="Onboarding progress"
          ariaValueText={`Step ${safeStep} of ${safeTotal}`}
        />
      </div>

      <SectionHeader
        {kicker}
        {title}
        {description}
        align="left"
        size="lg"
        markerTone={tone}
      />
    </Stack>

    <PastelField {tone} className="border-y border-border">
      {@render children?.()}
    </PastelField>

    {#if status}
      <div class="text-sm text-muted-foreground" aria-live="polite">
        {@render status()}
      </div>
    {/if}

    {#if actions}
      <Cluster gap="md" align="center">
        {@render actions()}
      </Cluster>
    {/if}
  </Stack>
</Section>
