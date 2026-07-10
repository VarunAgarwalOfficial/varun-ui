<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface PricingPlanGridPlan {
    title: string;
    description?: string;
    price: string | number;
    currency?: string;
    period?: string;
    features?: string[];
    featuresLabel?: string;
    highlighted?: boolean;
    highlightLabel?: string;
    meta?: string;
    footnote?: string;
  }

  export interface PricingPlanGridProps {
    plans: PricingPlanGridPlan[];
    action?: Snippet<[PricingPlanGridPlan, boolean, number]>;
    footer?: Snippet<[PricingPlanGridPlan, boolean, number]>;
  }

  export const pricingPlanGridDemo: PricingPlanGridProps = {
    plans: [
      {
        title: "Starter",
        description: "For a small team trying the product.",
        price: 19,
        currency: "$",
        period: "/month",
        featuresLabel: "Includes",
        features: ["Three seats", "Core analytics", "Community support"],
      },
      {
        title: "Growth",
        description: "For teams running work in production.",
        price: 49,
        currency: "$",
        period: "/month",
        featuresLabel: "Includes",
        features: ["Unlimited seats", "Advanced analytics", "Priority support"],
        highlighted: true,
        highlightLabel: "Most popular",
      },
      {
        title: "Enterprise",
        description: "For larger organizations with custom needs.",
        price: "Custom",
        period: "annual contract",
        featuresLabel: "Includes",
        features: ["SSO", "Dedicated support", "Compliance review"],
      },
    ],
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import PlanFeatureList from "$lib/components/varunui/piece/plan-feature-list.svelte";
  import PriceDisplay from "$lib/components/varunui/piece/price-display.svelte";

  let { plans, action, footer }: PricingPlanGridProps = $props();
</script>

{#if plans.length > 0}
  <div data-slot="pricing-plan-grid" class="grid w-full items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
    {#each plans as plan, index (`${plan.title}-${index}`)}
      {@const highlighted = Boolean(plan.highlighted)}
      <article
        class={`relative flex h-full flex-col rounded-none border p-[var(--surface-padding-lg)] ${highlighted ? "border-primary ring-1 ring-primary" : "border-border"}`}
      >
        {#if highlighted && plan.highlightLabel}
          <div class="mb-5">
            <Badge>{plan.highlightLabel}</Badge>
          </div>
        {/if}

        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-semibold text-foreground">{plan.title}</h3>
            {#if plan.description}
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                {plan.description}
              </p>
            {/if}
          </div>
          {#if plan.meta}
            <span class="shrink-0 font-mono text-xs uppercase tracking-[var(--tracking-label)] text-muted-foreground">
              {plan.meta}
            </span>
          {/if}
        </div>

        <div class="mt-6">
          <PriceDisplay
            value={plan.price}
            currency={plan.currency}
            period={plan.period}
            size="md"
          />
        </div>

        {#if plan.features?.length}
          <div class="mt-6 border-t border-border pt-6">
            <PlanFeatureList
              features={plan.features}
              heading={plan.featuresLabel}
            />
          </div>
        {/if}

        <div class="mt-auto pt-8">
          {@render action?.(plan, highlighted, index)}
          {#if plan.footnote}
            <p class="mt-3 text-sm leading-5 text-muted-foreground">
              {plan.footnote}
            </p>
          {/if}
          {@render footer?.(plan, highlighted, index)}
        </div>
      </article>
    {/each}
  </div>
{/if}
