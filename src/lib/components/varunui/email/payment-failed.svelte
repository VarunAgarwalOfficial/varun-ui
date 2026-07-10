<script lang="ts" module>
  export interface PaymentFailedEmailProps {
    workspaceName?: string;
    amount?: string;
    cardEnding?: string;
    failedOn?: string;
    retryDate?: string;
    action?: { label: string; href: string };
  }

  export const paymentFailedDemo: PaymentFailedEmailProps = {
    workspaceName: "varunUI Studio",
    amount: "$48.00 AUD",
    cardEnding: "4242",
    failedOn: "10 July 2026",
    retryDate: "13 July 2026",
    action: { label: "Update payment method", href: "?" },
  };
</script>

<script lang="ts">
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmailAction from "$lib/components/varunui/email/internal/email-action.svelte";
  import EmailBrand from "$lib/components/varunui/email/internal/email-brand.svelte";
  import EmailDocument from "$lib/components/varunui/email/internal/email-document.svelte";
  import EmailFact from "$lib/components/varunui/email/internal/email-fact.svelte";
  import EmailFooter from "$lib/components/varunui/email/internal/email-footer.svelte";
  import EmailKicker from "$lib/components/varunui/email/internal/email-kicker.svelte";

  let {
    workspaceName = paymentFailedDemo.workspaceName ?? "your workspace",
    amount = paymentFailedDemo.amount ?? "$48.00 AUD",
    cardEnding = paymentFailedDemo.cardEnding ?? "4242",
    failedOn = paymentFailedDemo.failedOn ?? "10 July 2026",
    retryDate = paymentFailedDemo.retryDate ?? "13 July 2026",
    action = paymentFailedDemo.action,
  }: PaymentFailedEmailProps = $props();
</script>

<EmailDocument preheader={`Payment of ${amount} failed for ${workspaceName}.`}>
  {#snippet header()}
    <EmailBrand label="Billing" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Payment failed" tone="red" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">We could not process this payment.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        Update the payment method for {workspaceName} before we retry. Your workspace remains available in the meantime.
      </p>
    </div>

    <div
      data-tone="red"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={2} gap="md">
        <EmailFact label="Amount" value={amount} />
        <EmailFact label="Card" value={`Ending ${cardEnding}`} />
        <EmailFact label="Failed" value={failedOn} />
        <EmailFact label="Next retry" value={retryDate} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      If the retry succeeds, we will send a receipt. If you already updated the card, there is nothing else to do.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`This required billing notice was sent for ${workspaceName}.`} manageLabel="Manage billing contacts" />
  {/snippet}
</EmailDocument>
