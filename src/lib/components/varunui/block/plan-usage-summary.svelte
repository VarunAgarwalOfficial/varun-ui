<script lang="ts" module>
  interface UsageLimit {
    label: string;
    used: number;
    total: number;
    unit: string;
  }

  interface PlanFeature {
    text: string;
    included: boolean;
  }

  export interface PlanUsageSummaryProps {
    kicker?: string;
    heading?: string;
    description?: string;
    planName?: string;
    planBadge?: string;
    usageLimits?: UsageLimit[];
    features?: PlanFeature[];
    primaryButton?: {
      label: string;
      href: string;
    };
    upgradeButton?: {
      label: string;
      href: string;
    };
    labels?: {
      usageTitle?: string;
      includedTitle?: string;
    };
    className?: string;
  }

  export const planUsageSummaryDemo: PlanUsageSummaryProps = {
    kicker: "Plan usage",
    heading: "Know the limit before it interrupts the work.",
    description:
      "Current use, plan limits, and unavailable capabilities belong in one factual billing view.",
    planName: "Studio plan",
    planBadge: "Current",
    usageLimits: [
      { label: "Storage", used: 12, total: 50, unit: " GB" },
      { label: "Workspace members", used: 8, total: 25, unit: " seats" },
      { label: "API requests", used: 4280, total: 10000, unit: " / month" },
      { label: "Active projects", used: 6, total: 20, unit: " projects" },
    ],
    features: [
      { text: "Unlimited viewers", included: true },
      { text: "Community support", included: true },
      { text: "Basic analytics", included: true },
      { text: "Custom domains", included: false },
      { text: "Priority support", included: false },
      { text: "Advanced permissions", included: false },
    ],
    primaryButton: { label: "Manage plan", href: "?" },
    upgradeButton: { label: "Compare plans", href: "?" },
    labels: {
      usageTitle: "Usage limits",
      includedTitle: "What's included",
    },
  };
</script>

<script lang="ts">
  import { ArrowRight, Check } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import { cn } from "$lib/utils.js";

  let {
    kicker,
    heading,
    description,
    planName,
    planBadge,
    usageLimits = [],
    features = [],
    primaryButton,
    upgradeButton,
    labels,
    className,
  }: PlanUsageSummaryProps = $props();
</script>

<Section container="sm" className={className}>
  <Stack gap="xl">
    <SectionHeader {kicker} title={heading} {description} align="left" markerTone="yellow" />

    <PastelField tone="yellow" className="border-y border-border">
      {#if planName}
        <div class="mb-6 flex items-center justify-between">
          <span class="text-lg font-bold">{planName}</span>
          {#if planBadge}
            <Badge variant="muted">{planBadge}</Badge>
          {/if}
        </div>
      {/if}

      {#if usageLimits.length > 0}
        <div>
          <h3 class="mb-4 text-sm font-medium text-muted-foreground">
            {labels?.usageTitle ?? "Usage limits"}
          </h3>
          <div class="space-y-4">
            {#each usageLimits as limit}
              {@const percentage =
                limit.total > 0
                  ? Math.round((limit.used / limit.total) * 100)
                  : 0}
              <div>
                <div class="mb-1.5 flex items-center justify-between text-sm">
                  <span class="font-medium">{limit.label}</span>
                  <span class="text-muted-foreground">
                    {limit.used.toLocaleString()} / {limit.total.toLocaleString()}
                    {limit.unit}
                  </span>
                </div>
                <ProgressMeter
                  value={percentage}
                  tone="warning"
                  ariaLabel={`${limit.label} usage`}
                  ariaValueText={`${limit.used.toLocaleString()} of ${limit.total.toLocaleString()}${limit.unit}`}
                />
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if usageLimits.length > 0 && features.length > 0}
        <div class="my-6 border-t"></div>
      {/if}

      {#if features.length > 0}
        <div>
          <h3 class="mb-4 text-sm font-medium text-muted-foreground">
            {labels?.includedTitle ?? "What's included"}
          </h3>
          <div class="grid grid-cols-2 gap-2">
            {#each features as feature}
              <div class="flex items-center gap-2">
                {#if feature.included}
                  <Check class="size-4 shrink-0 text-primary" />
                {:else}
                  <div class="flex size-4 shrink-0 items-center justify-center">
                    <div
                      class="size-1 rounded-full bg-muted-foreground/30"
                    ></div>
                  </div>
                {/if}
                <span
                  class={cn(
                    "text-sm",
                    feature.included
                      ? "text-foreground"
                      : "text-muted-foreground/50",
                  )}
                >
                  {feature.text}
                </span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </PastelField>

    <div class="flex flex-wrap items-center gap-[var(--layout-gap-md)]">
      {#if primaryButton}
        <Button size="lg" href={primaryButton.href}>
          {primaryButton.label}
          <ArrowRight class="size-4" />
        </Button>
      {/if}
      {#if upgradeButton}
        <Link href={upgradeButton.href} label={upgradeButton.label} />
      {/if}
    </div>
  </Stack>
</Section>
