<script lang="ts" module>
  interface BillingCycle {
    id: string;
    label: string;
    price: string;
    period: string;
    savingsBadge?: string;
  }

  interface PaymentMethod {
    id: string;
    label: string;
  }

  export interface BillingCycleSetupProps {
    kicker?: string;
    heading?: string;
    description?: string;
    cycles?: BillingCycle[];
    methods?: PaymentMethod[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      cycleTitle?: string;
      methodTitle?: string;
      couponTitle?: string;
      couponPlaceholder?: string;
      couponButton?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const billingCycleSetupDemo: BillingCycleSetupProps = {
    kicker: "Billing",
    heading: "Choose the billing rhythm before confirming.",
    description:
      "Compare the recurring amount, choose one payment route, and review the exact charge before continuing.",
    cycles: [
      {
        id: "monthly",
        label: "Monthly",
        price: "$19",
        period: "/month",
      },
      {
        id: "yearly",
        label: "Yearly",
        price: "$15",
        period: "/month",
        savingsBadge: "Save 20%",
      },
    ],
    methods: [
      { id: "card", label: "Credit card" },
      { id: "bank", label: "Bank transfer" },
      { id: "wallet", label: "Digital wallet" },
    ],
    primaryButton: { label: "Confirm billing", href: "?" },
    secondaryButton: { label: "Continue without billing", href: "?" },
    labels: {
      cycleTitle: "Billing cycle",
      methodTitle: "Payment method",
      couponTitle: "Have a coupon?",
      couponPlaceholder: "Enter coupon code",
      couponButton: "Apply",
    },
    currentStep: 3,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import RadioGroupField from "$lib/components/varunui/component/radio-group-field.svelte";
  import SegmentedControl from "$lib/components/varunui/component/segmented-control.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import StatusLine from "$lib/components/varunui/piece/status-line.svelte";

  let {
    kicker,
    heading,
    description,
    cycles = [],
    methods = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: BillingCycleSetupProps = $props();

  let selectedCycle = $state("");
  let selectedMethod = $state("");
  let initialized = $state(false);
  let coupon = $state("");
  let couponStatus = $state<"idle" | "success" | "error">("idle");

  $effect(() => {
    if (!initialized && (cycles.length > 0 || methods.length > 0)) {
      selectedCycle = cycles[0]?.id ?? "";
      selectedMethod = methods[0]?.id ?? "";
      initialized = true;
    }
  });

  const activeCycle = $derived(cycles.find((cycle) => cycle.id === selectedCycle));
  const cycleOptions = $derived(
    cycles.map((cycle) => ({ value: cycle.id, label: cycle.label })),
  );
  const methodOptions = $derived(
    methods.map((method) => ({ value: method.id, label: method.label })),
  );

  function applyCoupon(event: SubmitEvent) {
    event.preventDefault();
    couponStatus = coupon.trim().toUpperCase() === "SAVE20" ? "success" : "error";
  }
</script>

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="purple"
  {className}
>
        <Stack gap="lg">
      {#if cycles.length > 0}
        <div>
          <h3 class="mb-4 text-sm font-medium text-muted-foreground">
            {labels?.cycleTitle ?? "Billing cycle"}
          </h3>
          <SegmentedControl
            bind:value={selectedCycle}
            items={cycleOptions}
            label={labels?.cycleTitle ?? "Billing cycle"}
          />
          {#if activeCycle}
            <p class="mt-4 border-y border-border bg-background p-4 text-center">
              <span class="text-2xl font-bold">{activeCycle.price}</span>
              <span class="ml-1 text-sm text-muted-foreground">{activeCycle.period}</span>
              {#if activeCycle.savingsBadge}
                <span class="ml-2 text-sm font-semibold text-primary">{activeCycle.savingsBadge}</span>
              {/if}
            </p>
          {/if}
        </div>
      {/if}

      {#if methods.length > 0}
        <div>
          <RadioGroupField
            label={labels?.methodTitle ?? "Payment method"}
            options={methodOptions}
            bind:value={selectedMethod}
          />
        </div>
      {/if}

          <form onsubmit={applyCoupon}>
            <Stack gap="sm">
              <div class="grid gap-[var(--layout-gap-sm)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <InputField
                  label={labels?.couponTitle ?? "Have a coupon?"}
                  placeholder={labels?.couponPlaceholder ?? "Enter coupon code"}
                  bind:value={coupon}
                />
                <Button type="submit" variant="outline">
                  {labels?.couponButton ?? "Apply"}
                </Button>
              </div>
              {#if couponStatus !== "idle"}
                <StatusLine
                  label={couponStatus === "success" ? "20% discount applied." : "That code is not valid."}
                  tone={couponStatus === "success" ? "success" : "danger"}
                />
              {/if}
            </Stack>
          </form>
        </Stack>

  {#snippet actions()}
        {#if primaryButton}
          <Button size="lg" href={primaryButton.href}>
            {primaryButton.label}
            <ArrowRight class="size-4" />
          </Button>
        {/if}
        {#if secondaryButton}
          <Link href={secondaryButton.href} label={secondaryButton.label} />
        {/if}
  {/snippet}
</OnboardingStep>
