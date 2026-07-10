<script lang="ts" module>
  export interface CardExpiringEmailProps {
    workspaceName?: string;
    cardEnding?: string;
    expiry?: string;
    nextCharge?: string;
    action?: { label: string; href: string };
  }

  export const cardExpiringDemo: CardExpiringEmailProps = {
    workspaceName: "varunUI Studio",
    cardEnding: "4242",
    expiry: "07/26",
    nextCharge: "$48.00 AUD on 10 August 2026",
    action: { label: "Update card", href: "?" },
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
    workspaceName = cardExpiringDemo.workspaceName ?? "your workspace",
    cardEnding = cardExpiringDemo.cardEnding ?? "4242",
    expiry = cardExpiringDemo.expiry ?? "07/26",
    nextCharge = cardExpiringDemo.nextCharge ?? "$48.00 AUD on 10 August 2026",
    action = cardExpiringDemo.action,
  }: CardExpiringEmailProps = $props();
</script>

<EmailDocument preheader={`The card ending ${cardEnding} expires soon.`}>
  {#snippet header()}
    <EmailBrand label="Billing" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Card expiring" tone="yellow" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">Update the card before the next charge.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        The saved card for {workspaceName} expires before the next billing date.
      </p>
    </div>

    <div
      data-tone="yellow"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={2} gap="md">
        <EmailFact label="Card" value={`Ending ${cardEnding}`} />
        <EmailFact label="Expires" value={expiry} />
        <EmailFact label="Workspace" value={workspaceName} />
        <EmailFact label="Next charge" value={nextCharge} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      This is an early reminder. No payment has failed.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`This required billing reminder was sent for ${workspaceName}.`} manageLabel="Manage billing contacts" />
  {/snippet}
</EmailDocument>
