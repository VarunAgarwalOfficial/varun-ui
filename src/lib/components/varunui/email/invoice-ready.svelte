<script lang="ts" module>
  export interface InvoiceReadyEmailProps {
    recipientName?: string;
    invoiceNumber?: string;
    billingPeriod?: string;
    amountDue?: string;
    dueDate?: string;
    action?: { label: string; href: string };
  }

  export const invoiceReadyDemo: InvoiceReadyEmailProps = {
    recipientName: "Mina",
    invoiceNumber: "INV-2048",
    billingPeriod: "1–31 July 2026",
    amountDue: "$48.00 AUD",
    dueDate: "17 July 2026",
    action: { label: "View invoice", href: "?" },
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
    recipientName = invoiceReadyDemo.recipientName ?? "there",
    invoiceNumber = invoiceReadyDemo.invoiceNumber ?? "INV-2048",
    billingPeriod = invoiceReadyDemo.billingPeriod ?? "1–31 July 2026",
    amountDue = invoiceReadyDemo.amountDue ?? "$48.00 AUD",
    dueDate = invoiceReadyDemo.dueDate ?? "17 July 2026",
    action = invoiceReadyDemo.action,
  }: InvoiceReadyEmailProps = $props();
</script>

<EmailDocument preheader={`Invoice ${invoiceNumber} for ${amountDue} is ready.`}>
  {#snippet header()}
    <EmailBrand label="Billing" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Invoice ready" tone="blue" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">Your July invoice is ready, {recipientName}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        Review the invoice before the due date or keep this email for your records.
      </p>
    </div>

    <div
      data-tone="blue"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={2} gap="md">
        <EmailFact label="Amount due" value={amountDue} />
        <EmailFact label="Due" value={dueDate} />
        <EmailFact label="Invoice" value={invoiceNumber} />
        <EmailFact label="Billing period" value={billingPeriod} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      The saved payment method will be charged on the due date. No action is needed if the details are correct.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`This billing email was sent for invoice ${invoiceNumber}.`} manageLabel="Manage billing contacts" />
  {/snippet}
</EmailDocument>
