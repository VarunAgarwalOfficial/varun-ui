<script lang="ts" module>
  export interface AcceptableUsePolicyProps {
    title?: string;
    description?: string;
    allowed?: string[];
    prohibited?: string[];
    labels?: {
      allowed?: string;
      prohibited?: string;
      reportButton?: string;
      footer?: string;
    };
    onReport?: () => void;
    className?: string;
  }

  export const acceptableUsePolicyDemo: AcceptableUsePolicyProps = {
    title: "Acceptable use policy",
    description:
      "By using our services, you agree to the following acceptable use terms.",
    allowed: [
      "Building and hosting legitimate applications",
      "Automated testing and CI/CD pipelines",
      "Storing and serving static assets via CDN",
      "Running background jobs and scheduled tasks",
    ],
    prohibited: [
      "Cryptocurrency mining or proof-of-work computation",
      "Distributing malware, phishing, or spam content",
      "Circumventing rate limits or usage quotas",
      "Reselling or sublicensing access without authorization",
      "Hosting content that violates applicable laws",
    ],
    labels: {
      allowed: "Permitted use",
      prohibited: "Prohibited use",
      reportButton: "Report a violation",
      footer:
        "Violations may result in immediate suspension or termination of your account without prior notice.",
    },
  };
</script>

<script lang="ts">
  import { Check, GavelIcon, X } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import { cn } from "$lib/utils.js";

  let {
    title,
    description,
    allowed = [],
    prohibited = [],
    labels = {},
    onReport,
    className,
  }: AcceptableUsePolicyProps = $props();
</script>

<div class={cn("w-full bg-background", className)}>
  <Section container="md" size="lg">
    <Stack gap="2xl">
      <SectionHeader
        kicker="Policy"
        markerTone="red"
        {title}
        {description}
        align="left"
        size="lg"
        level={1}
      />

      <Grid columns={2} gap="lg">
        {#if allowed.length > 0}
          <section
            data-tone="green"
            class="surface-pastel border-y border-border p-[var(--surface-padding-lg)]"
          >
            <h2 class="text-2xl font-semibold tracking-tight">
              {labels.allowed ?? "Permitted use"}
            </h2>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              Use varunUI for legitimate product work, delivery, testing, and operations.
            </p>
            <ul class="mt-[var(--layout-gap-md)] divide-y divide-border border-t border-border">
              {#each allowed as item}
                <li class="flex min-h-14 items-start gap-3 py-3 text-sm leading-6">
                  <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center text-success">
                    <Check class="size-4" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if prohibited.length > 0}
          <section
            data-tone="red"
            class="surface-pastel border-y border-border p-[var(--surface-padding-lg)]"
          >
            <h2 class="text-2xl font-semibold tracking-tight">
              {labels.prohibited ?? "Prohibited use"}
            </h2>
            <p class="mt-2 text-sm leading-6 text-muted-foreground">
              Do not use the service to harm people, evade safeguards, or abuse shared infrastructure.
            </p>
            <ul class="mt-[var(--layout-gap-md)] divide-y divide-border border-t border-border">
              {#each prohibited as item}
                <li class="flex min-h-14 items-start gap-3 py-3 text-sm leading-6">
                  <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center text-danger">
                    <X class="size-4" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              {/each}
            </ul>
          </section>
        {/if}
      </Grid>

      <section
        data-tone="yellow"
        class="surface-pastel border-y border-border p-[var(--surface-padding-lg)]"
      >
        <Stack gap="md" align="start">
          <span class="flex size-10 items-center justify-center border border-border bg-background text-foreground">
            <GavelIcon class="size-5" aria-hidden="true" />
          </span>
          <div class="max-w-[var(--layout-prose)]">
            <h2 class="text-2xl font-semibold tracking-tight">Report misuse</h2>
            {#if labels.footer}
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                {labels.footer}
              </p>
            {/if}
          </div>
          {#if labels.reportButton}
            <Button variant="outline" onclick={onReport}>{labels.reportButton}</Button>
          {/if}
        </Stack>
      </section>
    </Stack>
  </Section>
</div>
