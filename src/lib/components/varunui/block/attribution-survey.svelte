<script lang="ts" module>
  interface SurveyOption {
    id: string;
    label: string;
    hasInput?: boolean;
    inputPlaceholder?: string;
  }

  export interface AttributionSurveyProps {
    kicker?: string;
    heading?: string;
    description?: string;
    options?: SurveyOption[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      thankYou?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const attributionSurveyDemo: AttributionSurveyProps = {
    kicker: "Quick question",
    heading: "How did varunUI reach you?",
    description:
      "Choose the closest source. This is optional and never changes the setup path.",
    options: [
      { id: "search", label: "Search" },
      { id: "community", label: "Design or developer community" },
      { id: "social", label: "Social post" },
      { id: "friend", label: "Friend or colleague" },
      { id: "event", label: "Talk or event" },
      {
        id: "other",
        label: "Other",
        hasInput: true,
        inputPlaceholder: "Name the source",
      },
    ],
    primaryButton: { label: "Save and continue", href: "?" },
    secondaryButton: { label: "Skip", href: "?" },
    labels: {
      thankYou: "Thanks for the context.",
    },
    currentStep: 4,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";

  let {
    kicker,
    heading,
    description,
    options = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: AttributionSurveyProps = $props();

  let selected = $state<Set<string>>(new Set());

  function setOption(id: string, checked: boolean) {
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
  tone="pink"
  {className}
>
      {#if options.length > 0}
        <Grid columns={2} gap="sm">
          {#each options as option (option.id)}
            {@const isSelected = selected.has(option.id)}
            <div class={option.hasInput ? "sm:col-span-2" : undefined}>
              <div
                class={`border bg-background p-4 motion-colors ${isSelected ? "border-primary" : "border-border"}`}
              >
                <CheckboxField
                  id={`attribution-${option.id}`}
                  label={option.label}
                  checked={isSelected}
                  onCheckedChange={(checked) => setOption(option.id, checked)}
                />

                {#if option.hasInput && isSelected}
                  <div class="mt-4 border-t border-border pt-4">
                    <InputField
                      label="Other source"
                      placeholder={option.inputPlaceholder ?? "Tell us more..."}
                    />
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </Grid>
      {/if}

  {#snippet status()}
    <p>{selected.size > 0 ? (labels?.thankYou ?? "Thanks for the context.") : "Optional · choose any that apply."}</p>
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
