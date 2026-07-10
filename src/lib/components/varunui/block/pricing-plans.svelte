<script lang="ts" module>
  interface PricingAction {
    label: string;
    href?: string;
    variant?: "primary" | "outline";
  }

  interface PricingTier {
    name: string;
    description?: string;
    monthlyPrice?: number;
    yearlyPrice?: number;
    features?: string[];
    isPopular?: boolean;
    button?: PricingAction;
  }

  export interface PricingPlansProps {
    kicker?: string;
    heading?: string;
    description?: string;
    tiers?: PricingTier[];
    labels?: {
      monthly?: string;
      yearly?: string;
      billingAriaLabel?: string;
      currency?: string;
      perMonth?: string;
      perYear?: string;
      popular?: string;
    };
  }

  export const pricingPlansDemo: PricingPlansProps = {
    kicker: "Pricing",
    heading: "Plans that are easy to compare.",
    description: "Start with the team you have. Change plans when the work changes.",
    tiers: [
      {
        name: "Solo",
        description: "For one person organising active work.",
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
          "Up to 3 projects",
          "Core analytics",
          "Community support",
          "1 GB storage",
        ],
        button: { label: "Start solo", href: "?", variant: "outline" },
      },
      {
        name: "Team",
        description: "For teams reviewing and shipping together.",
        monthlyPrice: 29,
        yearlyPrice: 290,
        isPopular: true,
        features: [
          "Unlimited projects",
          "Shared analytics",
          "Priority support",
          "50 GB storage",
          "Connected tools",
          "Review workflows",
        ],
        button: {
          label: "Start a trial",
          href: "?",
          variant: "primary",
        },
      },
      {
        name: "Company",
        description: "For companies that need control and support.",
        monthlyPrice: 99,
        yearlyPrice: 990,
        features: [
          "Everything in Team",
          "Unlimited storage",
          "Dedicated support",
          "SSO and SAML",
          "Custom contracts",
          "Service agreement",
          "Private deployment",
        ],
        button: { label: "Talk to sales", href: "?", variant: "outline" },
      },
    ],
    labels: {
      monthly: "Monthly",
      yearly: "Yearly",
      billingAriaLabel: "Billing cadence",
      currency: "$",
      perMonth: "/mo",
      perYear: "/yr",
      popular: "Recommended",
    },
  };
</script>

<script lang="ts">
  import type { PricingPlanGridPlan } from "$lib/components/varunui/piece/pricing-plan-grid.svelte";
  import SegmentedControl from "$lib/components/varunui/component/segmented-control.svelte";
  import PricingPlanGrid from "$lib/components/varunui/piece/pricing-plan-grid.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let props: PricingPlansProps = $props();
  let billing = $state<"monthly" | "yearly">("monthly");
  let data = $derived({
    ...pricingPlansDemo,
    ...props,
    labels: { ...pricingPlansDemo.labels, ...(props.labels ?? {}) },
    tiers: props.tiers ?? pricingPlansDemo.tiers ?? [],
  });
  const billingOptions = $derived([
    { label: data.labels.monthly as string, value: "monthly" },
    { label: data.labels.yearly as string, value: "yearly" },
  ]);

  const gridTiers = $derived(
    data.tiers.map((tier) => {
      const yearly = billing === "yearly";
      const price = yearly
        ? (tier.yearlyPrice ?? tier.monthlyPrice ?? 0)
        : (tier.monthlyPrice ?? tier.yearlyPrice ?? 0);

      return {
        title: tier.name,
        description: tier.description,
        price: price,
        currency: data.labels.currency,
        period: yearly ? data.labels.perYear : data.labels.perMonth,
        features: tier.features,
        featuresLabel: "Includes",
        highlighted: tier.isPopular,
        highlightLabel: tier.isPopular ? data.labels.popular : undefined,
      };
    }),
  );
</script>

{#snippet PlanAction(_plan: PricingPlanGridPlan, highlighted: boolean, index: number)}
  {@const button = data.tiers[index]?.button}
  {#if button}
    <Button
      href={button.href}
      variant={button.variant ?? (highlighted ? "primary" : "outline")}
      size="lg"
      class="w-full"
    >
      {button.label}
    </Button>
  {/if}
{/snippet}

<Section>
  <Stack gap="xl">
    <SectionHeader
      kicker={data.kicker}
      title={data.heading}
      description={data.description}
      markerTone="yellow"
    />
    <div class="flex justify-center">
      <SegmentedControl
        bind:value={billing}
        items={billingOptions}
        label={data.labels.billingAriaLabel as string}
      />
    </div>

    <PricingPlanGrid
      plans={gridTiers}
      action={PlanAction}
    />
  </Stack>
</Section>
