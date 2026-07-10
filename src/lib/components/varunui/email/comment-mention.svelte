<script lang="ts" module>
  export interface CommentMentionEmailProps {
    recipientName?: string;
    mentionedBy?: string;
    briefTitle?: string;
    comment?: string;
    action?: { label: string; href: string };
  }

  export const commentMentionDemo: CommentMentionEmailProps = {
    recipientName: "Mina",
    mentionedBy: "Ari Patel",
    briefTitle: "Homepage copy review",
    comment: "Can you confirm whether the new pricing note belongs before or after the comparison table?",
    action: { label: "Reply in the brief", href: "?" },
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
    recipientName = commentMentionDemo.recipientName,
    mentionedBy = commentMentionDemo.mentionedBy,
    briefTitle = commentMentionDemo.briefTitle,
    comment = commentMentionDemo.comment,
    action = commentMentionDemo.action,
  }: CommentMentionEmailProps = $props();
</script>

<EmailDocument preheader={`${mentionedBy} mentioned you in ${briefTitle}.`}>
  {#snippet header()}
    <EmailBrand label="Mention" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="You were mentioned" tone="pink" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">{recipientName}, {mentionedBy} needs your call.</h1>
      <p class="mt-3 text-sm font-semibold text-[var(--email-muted-ink)]">{briefTitle}</p>
    </div>

    <blockquote
      data-tone="pink"
      class="surface-pastel w-full border-l-4 border-pink p-[var(--surface-padding-md)] text-base leading-7"
    >
      “{comment}”
    </blockquote>

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      Reply where the decision lives so the next person sees the answer with its context.
    </p>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}
  </Stack>

  {#snippet footer()}
    <EmailFooter
      reason="You received this because a teammate mentioned you in a brief."
      manageLabel="Manage mention emails"
    />
  {/snippet}
</EmailDocument>
