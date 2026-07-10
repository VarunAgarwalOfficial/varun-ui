<script lang="ts" module>
  import type {
    CostSummaryLineItem,
    CostSummaryTotal,
  } from "$lib/components/varunui/piece/cost-summary.svelte";

  export interface CheckoutProps {
    heading?: string;
    description?: string;
    items?: CostSummaryLineItem[];
    total?: CostSummaryTotal;
    submitLabel?: string;
    onComplete?: () => void;
  }

  const defaultItems: CostSummaryLineItem[] = [
    {
      label: "varunUI annual plan",
      description: "Annual workspace for up to 12 people",
      value: 320,
    },
    { label: "GST", value: 32 },
  ];

  const defaultTotal: CostSummaryTotal = {
    label: "Due today",
    value: 352,
    caption: "Renews annually. Cancel before the next renewal.",
  };

  export const checkoutDemo: CheckoutProps = {
    heading: "Finish setting up varunUI.",
    description:
      "Confirm the account, billing address, and payment method. Your workspace opens immediately after checkout.",
    items: defaultItems,
    total: defaultTotal,
    submitLabel: "Confirm and pay $352",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import CostSummary from "$lib/components/varunui/piece/cost-summary.svelte";
  import BreadcrumbNav from "$lib/components/varunui/component/breadcrumb-nav.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import RadioGroupField from "$lib/components/varunui/component/radio-group-field.svelte";
  import SelectField from "$lib/components/varunui/component/select-field.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StatusLine from "$lib/components/varunui/piece/status-line.svelte";

  let {
    heading = "Finish setting up varunUI.",
    description = "Confirm the account, billing address, and payment method. Your workspace opens immediately after checkout.",
    items = defaultItems,
    total = defaultTotal,
    submitLabel = "Confirm and pay $352",
    onComplete,
  }: CheckoutProps = $props();

  let paymentMethod = $state("saved-card");
  let termsAccepted = $state(true);
  let complete = $state(false);

  function completeCheckout(event: SubmitEvent) {
    event.preventDefault();
    if (!termsAccepted) return;
    complete = true;
    onComplete?.();
  }
</script>

<Section container="max" size="md">
  <Stack gap="xl">
    <BreadcrumbNav
      homeHref="?"
      homeLabel="varunUI home"
      items={[
        { label: "Plans", href: "?" },
        { label: "Checkout", current: true },
      ]}
    />

    <SectionHeader
      kicker="Checkout"
      markerTone="yellow"
      title={heading}
      {description}
      align="left"
      size="lg"
      level={1}
    />

    <Rail side="right">
      {#snippet rail()}
        <CostSummary
          heading="Order summary"
          currency="$"
          {items}
          {total}
          note="Payment is encrypted and a tax invoice will be emailed to the workspace owner."
        />
      {/snippet}

      <form onsubmit={completeCheckout}>
        <Stack gap="lg">
          <section
            aria-labelledby="checkout-account-heading"
            class="border-y border-border py-[var(--surface-padding-lg)]"
          >
            <Stack gap="md">
              <div>
                <h2 id="checkout-account-heading" class="text-xl font-semibold tracking-tight">
                  Account and billing
                </h2>
                <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
                  The receipt and renewal notice will go to this account.
                </p>
              </div>

              <div class="grid gap-[var(--layout-gap-md)] md:grid-cols-2">
                <InputField
                  label="Full name"
                  value="Maya Chen"
                  autocomplete="name"
                  required
                />
                <InputField
                  label="Work email"
                  value="maya@varunui.example"
                  type="email"
                  autocomplete="email"
                  required
                />
              </div>

              <InputField
                label="Organisation"
                value="Design team"
                autocomplete="organization"
                required
              />
              <InputField
                label="Billing address"
                value="18 Paper Street"
                autocomplete="street-address"
                required
              />

              <div class="grid gap-[var(--layout-gap-md)] md:grid-cols-2">
                <InputField
                  label="City"
                  value="Sydney"
                  autocomplete="address-level2"
                  required
                />
                <SelectField
                  label="Country"
                  value="au"
                  options={[
                    { label: "Australia", value: "au" },
                    { label: "New Zealand", value: "nz" },
                    { label: "United Kingdom", value: "gb" },
                    { label: "United States", value: "us" },
                  ]}
                  required
                />
              </div>
            </Stack>
          </section>

          <section
            aria-labelledby="checkout-payment-heading"
            class="border-y border-border py-[var(--surface-padding-lg)]"
          >
            <Stack gap="md">
              <div>
                <h2 id="checkout-payment-heading" class="text-xl font-semibold tracking-tight">
                  Payment
                </h2>
                <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
                  Use the saved company card or request an invoice for finance.
                </p>
              </div>

              <RadioGroupField
                label="Payment method"
                bind:value={paymentMethod}
                orientation="grid"
                options={[
                  {
                    label: "Company card ending 4242",
                    value: "saved-card",
                    description: "Visa · expires 08/28",
                  },
                  {
                    label: "Invoice",
                    value: "invoice",
                    description: "Due in 14 days for approved teams",
                  },
                ]}
              />

              <CheckboxField
                bind:checked={termsAccepted}
                label="I agree to the workspace terms and annual renewal."
                description="You can cancel from billing settings before the next renewal date."
                required
                invalid={!termsAccepted}
                message={!termsAccepted ? "Accept the terms to complete checkout." : undefined}
                messageTone={!termsAccepted ? "error" : "neutral"}
              />

              {#if complete}
                <StatusLine
                  label="Payment confirmed"
                  description="varunUI is ready. A receipt is on its way to your inbox."
                  meta="Done"
                  tone="success"
                />
              {:else}
                <Button type="submit" size="lg" disabled={!termsAccepted}>
                  {submitLabel}
                </Button>
              {/if}
            </Stack>
          </section>
        </Stack>
      </form>
    </Rail>
  </Stack>
</Section>
