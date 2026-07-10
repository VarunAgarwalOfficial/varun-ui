<script lang="ts" module>
  export interface AccessibilityStatementProps {
    title?: string;
    standard?: string;
    conformanceLevel?: "A" | "AA" | "AAA";
    features?: string[];
    lastReviewed?: string;
    contactEmail?: string;
    onReport?: () => void;
    labels?: {
      guidelinesTemplate?: string;
      levelTemplate?: string;
      commitment?: string;
      featuresTitle?: string;
      barrierQuestion?: string;
      reportButton?: string;
    };
    className?: string;
  }

  export const accessibilityStatementDemo: AccessibilityStatementProps = {
    title: "Accessibility statement",
    standard: "WCAG 2.2",
    conformanceLevel: "AA",
    features: [
      "Keyboard navigation support",
      "Screen reader compatibility",
      "High contrast mode available",
      "Resizable text up to 200%",
      "Alternative text for images",
      "Captions for video content",
    ],
    lastReviewed: "July 2026",
    contactEmail: "accessibility@varunui.example",
    labels: {
      guidelinesTemplate: "{standard} Guidelines",
      levelTemplate: "Level {level}",
      commitment:
        "We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.",
      featuresTitle: "Accessibility features",
      barrierQuestion: "Encountered an accessibility barrier?",
      reportButton: "Report an accessibility issue",
    },
  };
</script>

<script lang="ts">
  import { Check, Mail } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import FactList from "$lib/components/varunui/piece/fact-list.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import { cn } from "$lib/utils.js";

  let {
    title,
    standard,
    conformanceLevel,
    features = [],
    lastReviewed,
    contactEmail,
    onReport,
    labels = {},
    className,
  }: AccessibilityStatementProps = $props();

  const guidelinesText = $derived(
    standard && labels.guidelinesTemplate
      ? labels.guidelinesTemplate.replace("{standard}", standard)
      : undefined,
  );
  const levelText = $derived(
    conformanceLevel && labels.levelTemplate
      ? labels.levelTemplate.replace("{level}", conformanceLevel)
      : undefined,
  );
  const facts = $derived(
    [guidelinesText, levelText, lastReviewed ? `Reviewed ${lastReviewed}` : undefined]
      .filter((label): label is string => Boolean(label))
      .map((label) => ({ label })),
  );
</script>

<div class={cn("w-full bg-background", className)}>
  <Section container="md" size="lg">
    <Stack gap="2xl">
      <SectionHeader
        kicker="Accessibility"
        markerTone="blue"
        {title}
        description={labels.commitment}
        align="left"
        size="lg"
        level={1}
      >
        {#if facts.length > 0}
          <FactList items={facts} />
        {/if}
      </SectionHeader>

      {#if features.length > 0}
        <section aria-labelledby="accessibility-features-title">
          <Stack gap="lg">
            <div class="max-w-[var(--layout-prose)] border-t border-border pt-[var(--layout-gap-md)]">
              <h2 id="accessibility-features-title" class="text-2xl font-semibold tracking-tight">
                {labels.featuresTitle ?? "Accessibility features"}
              </h2>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                The baseline support we review across the product and its public content.
              </p>
            </div>

            <Grid columns={2} gap="md">
              {#each features as feature}
                <div class="flex min-h-16 items-start gap-3 border-t border-border pt-3">
                  <span
                    data-tone="green"
                    class="surface-pastel mt-0.5 flex size-7 shrink-0 items-center justify-center border border-border text-success"
                  >
                    <Check class="size-4" aria-hidden="true" />
                  </span>
                  <p class="text-sm font-medium leading-6">{feature}</p>
                </div>
              {/each}
            </Grid>
          </Stack>
        </section>
      {/if}

      <section
        data-tone="blue"
        class="surface-pastel border-y border-border p-[var(--surface-padding-lg)]"
      >
        <Stack gap="md" align="start">
          <span class="flex size-10 items-center justify-center border border-border bg-background text-foreground">
            <Mail class="size-5" aria-hidden="true" />
          </span>
          <div class="max-w-[var(--layout-prose)]">
            <h2 class="text-2xl font-semibold tracking-tight">
              {labels.barrierQuestion ?? "Found an accessibility barrier?"}
            </h2>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              Tell us what happened, what you were trying to do, and which assistive technology or browser you were using. We will reply with a useful next step.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-[var(--layout-gap-md)]">
            {#if labels.reportButton}
              <Button onclick={onReport}>{labels.reportButton}</Button>
            {/if}
            {#if contactEmail}
              <Link href="?" label={contactEmail} />
            {/if}
          </div>
        </Stack>
      </section>
    </Stack>
  </Section>
</div>
