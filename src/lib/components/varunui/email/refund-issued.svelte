<script lang="ts" module>
  export interface RefundIssuedEmailProps {
    recipientName?: string;
    orderNumber?: string;
    refundAmount?: string;
    cardEnding?: string;
    arrivalWindow?: string;
    action?: { label: string; href: string };
  }

  export const refundIssuedDemo: RefundIssuedEmailProps = {
    recipientName: "Mina",
    orderNumber: "VUI-2048",
    refundAmount: "$28.00 AUD",
    cardEnding: "4242",
    arrivalWindow: "5–10 business days",
    action: { label: "View order", href: "?" },
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
    recipientName = refundIssuedDemo.recipientName ?? "there",
    orderNumber = refundIssuedDemo.orderNumber ?? "VUI-2048",
    refundAmount = refundIssuedDemo.refundAmount ?? "$28.00 AUD",
    cardEnding = refundIssuedDemo.cardEnding ?? "4242",
    arrivalWindow = refundIssuedDemo.arrivalWindow ?? "5–10 business days",
    action = refundIssuedDemo.action,
  }: RefundIssuedEmailProps = $props();
</script>

<EmailDocument preheader={`A refund of ${refundAmount} has been issued for order ${orderNumber}.`}>
  {#snippet header()}
    <EmailBrand label="Refund" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Refund issued" tone="green" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">The refund is on its way, {recipientName}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        We sent the funds back to the original payment method. Your bank controls when the credit appears.
      </p>
    </div>

    <div
      data-tone="green"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={2} gap="md">
        <EmailFact label="Refund" value={refundAmount} />
        <EmailFact label="Card" value={`Ending ${cardEnding}`} />
        <EmailFact label="Order" value={orderNumber} />
        <EmailFact label="Expected" value={arrivalWindow} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      If the credit has not appeared after {arrivalWindow}, contact your bank with the order number above.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`This refund confirmation was sent for order ${orderNumber}.`} />
  {/snippet}
</EmailDocument>
