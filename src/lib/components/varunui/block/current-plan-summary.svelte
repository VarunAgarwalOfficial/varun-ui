<script lang="ts" module>
  interface PlanFeature {
    name: string;
    included: boolean;
  }

  export interface CurrentPlanSummaryProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    plan?: {
      name: string;
      price: string;
      interval: string;
      features: PlanFeature[];
      renewalDate?: string;
      status: "active" | "canceled" | "past_due";
    };
    labels?: {
      currentPlan?: string;
      active?: string;
      canceled?: string;
      pastDue?: string;
      renewsOn?: string;
      changePlan?: string;
      cancelPlan?: string;
      reactivate?: string;
      perMonth?: string;
      perYear?: string;
      includedFeatures?: string;
      noSubscription?: string;
    };
    changePlanUrl?: string;
    cancelPlanUrl?: string;
    reactivateUrl?: string;
    className?: string;
  }

  export const currentPlanSummaryDemo: CurrentPlanSummaryProps = {
    badge: { label: "Billing", variant: "muted" },
    heading: "Current Plan",
    description: "Manage your subscription and billing details.",
    plan: {
      name: "Pro",
      price: "$29",
      interval: "month",
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom integrations", included: true },
        { name: "Team collaboration", included: true },
        { name: "API access", included: true },
      ],
      renewalDate: "Feb 15, 2024",
      status: "active",
    },
    labels: {
      currentPlan: "Current Plan",
      active: "Active",
      canceled: "Canceled",
      pastDue: "Past Due",
      renewsOn: "Renews on",
      changePlan: "Change Plan",
      cancelPlan: "Cancel Plan",
      reactivate: "Reactivate",
      perMonth: "/month",
      perYear: "/year",
      includedFeatures: "Included in your plan:",
      noSubscription: "No active subscription",
    },
    changePlanUrl: "?",
    cancelPlanUrl: "?",
    reactivateUrl: "?",
  };
</script>

<script lang="ts">
  import {
    Check,
    CreditCard,
    Crown,
    Sparkles,
    Zap,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    badge,
    heading,
    description,
    plan,
    labels = {},
    changePlanUrl,
    cancelPlanUrl,
    reactivateUrl,
    className,
  }: CurrentPlanSummaryProps = $props();

  const currentPlanLabel = $derived(labels.currentPlan);
  const activeLabel = $derived(labels.active);
  const canceledLabel = $derived(labels.canceled);
  const pastDueLabel = $derived(labels.pastDue);
  const renewsOnLabel = $derived(labels.renewsOn);
  const changePlanLabel = $derived(labels.changePlan);
  const cancelPlanLabel = $derived(labels.cancelPlan);
  const reactivateLabel = $derived(labels.reactivate);
  const perMonthLabel = $derived(labels.perMonth);
  const perYearLabel = $derived(labels.perYear);
  const includedFeaturesLabel = $derived(labels.includedFeatures);
  const noSubscriptionLabel = $derived(labels.noSubscription);
</script>

<Section container="sm" className={className}>
    <div class="space-y-6">
      <div>
        {#if badge?.label}
          <Badge variant={badge.variant} class="mb-3">
            <CreditCard class="size-3" />
            {badge.label}
          </Badge>
        {/if}
        {#if heading}
          <h2 class="text-2xl font-bold tracking-tight md:text-3xl">
            {heading}
          </h2>
        {/if}
        {#if description}
          <p class="mt-2 text-muted-foreground">{description}</p>
        {/if}
      </div>

      {#if plan}
        <div class="rounded-none border bg-surface p-6">
          <div class="space-y-6">
            <div
              class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <div class="flex gap-4">
                <div
                  class="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
                >
                  {#if plan.name.toLowerCase() === "pro"}
                    <Zap class="size-6" />
                  {:else if plan.name.toLowerCase() === "enterprise"}
                    <Crown class="size-6" />
                  {:else}
                    <Sparkles class="size-6" />
                  {/if}
                </div>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="text-xl font-semibold">{plan.name}</h3>
                    {#if plan.status === "active"}
                      <Badge
                        variant="outline"
                        class="border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                      >
                        <Check class="size-3" />
                        {activeLabel}
                      </Badge>
                    {:else if plan.status === "canceled"}
                      <Badge variant="outline">{canceledLabel}</Badge>
                    {:else}
                      <Badge variant="danger">{pastDueLabel}</Badge>
                    {/if}
                  </div>
                  <p class="mt-1 text-sm text-muted-foreground">
                    {currentPlanLabel}
                  </p>
                </div>
              </div>
              <div class="sm:text-right">
                <div class="text-3xl font-bold">
                  {plan.price}
                  <span class="text-sm font-normal text-muted-foreground">
                    {plan.interval === "month" ? perMonthLabel : perYearLabel}
                  </span>
                </div>
                {#if plan.renewalDate && plan.status === "active"}
                  <p class="mt-1 text-sm text-muted-foreground">
                    {renewsOnLabel}
                    {plan.renewalDate}
                  </p>
                {/if}
              </div>
            </div>

            <div class="border-t pt-6">
              <h4 class="font-medium">{includedFeaturesLabel}</h4>
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                {#each plan.features as feature}
                  <div
                    class={cn(
                      "flex items-center gap-2 text-sm",
                      !feature.included && "text-muted-foreground line-through",
                    )}
                  >
                    <Check
                      class={cn(
                        "size-4",
                        feature.included
                          ? "text-emerald-600"
                          : "text-muted-foreground",
                      )}
                    />
                    {feature.name}
                  </div>
                {/each}
              </div>
            </div>

            <div class="flex flex-wrap gap-3 border-t pt-6">
              <Button href={changePlanUrl ?? "?"}>{changePlanLabel}</Button>
              {#if plan.status === "active"}
                <Button variant="outline" href={cancelPlanUrl ?? "?"}>
                  {cancelPlanLabel}
                </Button>
              {/if}
              {#if plan.status === "canceled"}
                <Button variant="outline" href={reactivateUrl ?? "?"}>
                  {reactivateLabel}
                </Button>
              {/if}
            </div>
          </div>
        </div>
      {:else}
        <div
          class="flex flex-col items-center gap-3 bg-muted/30 p-8 text-center"
        >
          <CreditCard class="size-12 text-muted-foreground" />
          <p class="text-muted-foreground">{noSubscriptionLabel}</p>
          <Button href={changePlanUrl ?? "?"}>{changePlanLabel}</Button>
        </div>
      {/if}
    </div>
</Section>
