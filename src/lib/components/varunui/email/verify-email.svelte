<script lang="ts" module>
  export interface VerifyEmailProps {
    recipientEmail?: string;
    verificationCode?: string;
    expiresIn?: string;
    action?: { label: string; href: string };
  }

  export const verifyEmailDemo: VerifyEmailProps = {
    recipientEmail: "mina@varunui.example",
    verificationCode: "482 731",
    expiresIn: "15 minutes",
    action: { label: "Confirm email address", href: "?" },
  };
</script>

<script lang="ts">
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmailAction from "$lib/components/varunui/email/internal/email-action.svelte";
  import EmailBrand from "$lib/components/varunui/email/internal/email-brand.svelte";
  import EmailDocument from "$lib/components/varunui/email/internal/email-document.svelte";
  import EmailFooter from "$lib/components/varunui/email/internal/email-footer.svelte";
  import EmailKicker from "$lib/components/varunui/email/internal/email-kicker.svelte";

  let {
    recipientEmail = verifyEmailDemo.recipientEmail,
    verificationCode = verifyEmailDemo.verificationCode,
    expiresIn = verifyEmailDemo.expiresIn,
    action = verifyEmailDemo.action,
  }: VerifyEmailProps = $props();
</script>

<EmailDocument preheader="Confirm this email address to finish securing your varunUI account.">
  {#snippet header()}
    <EmailBrand label="Account security" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Confirm email" tone="purple" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">Is this email yours?</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        Confirm <strong class="text-[var(--email-ink)]">{recipientEmail}</strong> to finish setting up the account. The code and button perform the same action.
      </p>
    </div>

    <div
      data-tone="purple"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)] text-center"
    >
      <p class="text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--email-muted-ink)]">Verification code</p>
      <p class="mt-2 font-mono text-3xl font-semibold tracking-[0.18em]">{verificationCode}</p>
      <p class="mt-2 text-xs text-[var(--email-muted-ink)]">Valid for {expiresIn}</p>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      If you did not create a varunUI account, no action is needed.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason="This security email cannot be unsubscribed from." />
  {/snippet}
</EmailDocument>
