<script lang="ts" module>
  export interface PasswordResetEmailProps {
    recipientName?: string;
    requestedFrom?: string;
    expiresIn?: string;
    action?: { label: string; href: string };
  }

  export const passwordResetDemo: PasswordResetEmailProps = {
    recipientName: "Mina",
    requestedFrom: "Sydney · Chrome on macOS",
    expiresIn: "30 minutes",
    action: { label: "Choose a new password", href: "?" },
  };
</script>

<script lang="ts">
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmailAction from "$lib/components/varunui/email/internal/email-action.svelte";
  import EmailBrand from "$lib/components/varunui/email/internal/email-brand.svelte";
  import EmailDocument from "$lib/components/varunui/email/internal/email-document.svelte";
  import EmailFooter from "$lib/components/varunui/email/internal/email-footer.svelte";
  import EmailFact from "$lib/components/varunui/email/internal/email-fact.svelte";
  import EmailKicker from "$lib/components/varunui/email/internal/email-kicker.svelte";

  let {
    recipientName = passwordResetDemo.recipientName,
    requestedFrom = passwordResetDemo.requestedFrom ?? "Sydney · Chrome on macOS",
    expiresIn = passwordResetDemo.expiresIn ?? "30 minutes",
    action = passwordResetDemo.action,
  }: PasswordResetEmailProps = $props();
</script>

<EmailDocument preheader="A password reset was requested for your varunUI account.">
  {#snippet header()}
    <EmailBrand label="Account security" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Password reset" tone="purple" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">Reset requested, {recipientName}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        Use the button below if this was you. The link expires automatically and can be used once.
      </p>
    </div>

    <div class="w-full border-y border-[var(--email-border)] py-[var(--surface-padding-md)]">
      <Grid columns={2} gap="md">
        <EmailFact label="Requested from" value={requestedFrom} />
        <EmailFact label="Expires in" value={expiresIn} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      Did not request this? Leave the password unchanged and review active sessions from account settings.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason="This security email cannot be unsubscribed from." />
  {/snippet}
</EmailDocument>
