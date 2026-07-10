<script lang="ts" module>
  import type { ButtonVariant } from "$lib/components/varunui/component/button.svelte";
  import type { CostSummaryLineItem } from "$lib/components/varunui/piece/cost-summary.svelte";

  export interface BuildYourOwnPlanAction {
    label: string;
    href?: string;
    variant?: ButtonVariant;
  }

  export type BuildYourOwnPlanAddOn = {
    id: string;
    name: string;
    description?: string;
    price: number;
  };

  export type BuildYourOwnPlanProps = {
    badge?: string;
    heading?: string;
    description?: string;
    basePlanName?: string;
    basePlanDescription?: string;
    basePrice?: number;
    baseFeatures?: string[];
    addOns?: BuildYourOwnPlanAddOn[];
    button?: BuildYourOwnPlanAction;
    labels?: {
      currency?: string;
      perMonth?: string;
      basePlan?: string;
      addOns?: string;
      total?: string;
      selected?: string;
    };
  };

  export const buildYourOwnPlanDemo: BuildYourOwnPlanProps = {
    badge: "Customize Your Plan",
    heading: "Build your perfect package",
    description: "Start with essentials and add what you need.",
    basePlanName: "Starter",
    basePlanDescription: "Everything you need to get started",
    basePrice: 29,
    baseFeatures: ["5 team members", "10GB storage", "Basic analytics"],
    addOns: [
      {
        id: "extra-storage",
        name: "Extra Storage",
        description: "Add 100GB of cloud storage",
        price: 10,
      },
      {
        id: "priority-support",
        name: "Priority Support",
        description: "24/7 phone and chat support",
        price: 15,
      },
      {
        id: "advanced-analytics",
        name: "Advanced Analytics",
        description: "Custom reports and dashboards",
        price: 20,
      },
      {
        id: "api-access",
        name: "API Access",
        description: "Full REST API with 10k requests/day",
        price: 25,
      },
      {
        id: "sso",
        name: "SSO Integration",
        description: "SAML and OAuth support",
        price: 30,
      },
    ],
    button: {
      label: "Get Started",
      variant: "primary",
    },
    labels: {
      currency: "$",
      perMonth: "/month",
      basePlan: "Base plan",
      addOns: "Add-ons",
      total: "Total",
      selected: "selected",
    },
  };
</script>

<script lang="ts">
  import { ArrowRightIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import CostSummary from "$lib/components/varunui/piece/cost-summary.svelte";
  import PlanFeatureList from "$lib/components/varunui/piece/plan-feature-list.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    badge,
    heading,
    description,
    basePlanName,
    basePlanDescription,
    basePrice,
    baseFeatures = [],
    addOns = [],
    button,
    labels: labelOverrides = {},
  }: BuildYourOwnPlanProps = $props();

  const labels = $derived({
    currency: labelOverrides.currency ?? "$",
    perMonth: labelOverrides.perMonth ?? "/month",
    basePlan: labelOverrides.basePlan ?? "Base plan",
    addOns: labelOverrides.addOns ?? "Add-ons",
    total: labelOverrides.total ?? "Total",
    selected: labelOverrides.selected ?? "selected",
  });

  let selectedAddOns = $state<string[]>([]);
  const selectedAddOnItems = $derived(
    addOns.filter((addon) => selectedAddOns.includes(addon.id)),
  );
  const addOnsTotal = $derived(
    selectedAddOnItems.reduce((sum, addon) => sum + addon.price, 0),
  );
  const totalPrice = $derived((basePrice ?? 0) + addOnsTotal);
  const summaryItems: CostSummaryLineItem[] = $derived([
    ...(basePlanName || basePrice !== undefined
      ? [
          {
            label: basePlanName ?? labels.basePlan,
            value: basePrice ?? 0,
          },
        ]
      : []),
    ...selectedAddOnItems.map((addon) => ({
      label: addon.name,
      value: addon.price,
    })),
  ]);
  const selectedCaption = $derived(
    selectedAddOns.length > 0
      ? `${selectedAddOns.length} ${labels.addOns.toLowerCase()} ${labels.selected}`
      : undefined,
  );
  const hasBasePlan = $derived(
    Boolean(
      basePlanName ||
      basePlanDescription ||
      basePrice !== undefined ||
      baseFeatures.length > 0,
    ),
  );

  function chooseAddOn(id: string, checked: boolean) {
    selectedAddOns = checked
      ? [...selectedAddOns, id]
      : selectedAddOns.filter((selectedId) => selectedId !== id);
  }
</script>

{#snippet SummaryFooter()}
  {#if button}
    <Button href={button.href} variant={button.variant ?? "primary"} size="lg" class="w-full">
      {button.label}
      <ArrowRightIcon aria-hidden="true" />
    </Button>
  {/if}
{/snippet}

<Section>
  <Stack gap="xl">
    <SectionHeader kicker={badge} title={heading} {description} />
  <Rail side="right">
    {#snippet rail()}
      <CostSummary
        heading={labels.total}
        items={summaryItems}
        currency={labels.currency}
        total={{
          label: labels.total,
          value: totalPrice,
          currency: labels.currency,
          period: labels.perMonth,
          caption: selectedCaption,
        }}
        footer={button ? SummaryFooter : undefined}
      />
    {/snippet}

    {#if hasBasePlan}
      <article class="rounded-none border border-border bg-surface p-6">
        <p
          class="text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          {labels.basePlan}
        </p>

        <div
          class="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            {#if basePlanName}
              <h3 class="text-xl font-semibold text-foreground">
                {basePlanName}
              </h3>
            {/if}
            {#if basePlanDescription}
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                {basePlanDescription}
              </p>
            {/if}
          </div>

          {#if basePrice !== undefined}
            <div class="shrink-0 sm:text-right">
              <span class="text-2xl font-bold text-foreground">
                {labels.currency}{basePrice.toLocaleString()}
              </span>
              <span class="text-sm text-muted-foreground">
                {labels.perMonth}
              </span>
            </div>
          {/if}
        </div>

        {#if baseFeatures.length > 0}
          <div class="mt-5 border-t border-border pt-5">
            <PlanFeatureList features={baseFeatures} />
          </div>
        {/if}
      </article>
    {/if}

    {#if addOns.length > 0}
      <div class="border-y border-border">
        <p class="border-b border-border py-[var(--layout-gap-sm)] text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {labels.addOns}
        </p>
        {#each addOns as addOn (addOn.id)}
          <div class="grid gap-[var(--layout-gap-sm)] border-b border-border py-[var(--layout-gap-md)] last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
            <CheckboxField
              checked={selectedAddOns.includes(addOn.id)}
              label={addOn.name}
              description={addOn.description}
              onCheckedChange={(checked) => chooseAddOn(addOn.id, checked)}
            />
            <p class="pl-7 text-sm font-semibold tabular-nums sm:pl-0">
              {labels.currency}{addOn.price.toLocaleString()}
              <span class="font-normal text-muted-foreground">{labels.perMonth}</span>
            </p>
          </div>
        {/each}
      </div>
    {/if}
    </Rail>
  </Stack>
</Section>
