<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface WelcomeEmailProps {
    recipientName?: string;
    workspaceName?: string;
    action?: { label: string; href: string };
  }

  export const welcomeDemo: WelcomeEmailProps = {
    recipientName: "Mina",
    workspaceName: "varunUI Studio",
    action: { label: "Open varunUI Studio", href: "?" },
  };
</script>

<script lang="ts">
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmailAction from "$lib/components/varunui/email/internal/email-action.svelte";
  import EmailBrand from "$lib/components/varunui/email/internal/email-brand.svelte";
  import EmailDocument from "$lib/components/varunui/email/internal/email-document.svelte";
  import EmailFooter from "$lib/components/varunui/email/internal/email-footer.svelte";
  import EmailKicker from "$lib/components/varunui/email/internal/email-kicker.svelte";
  import EmailStory from "$lib/components/varunui/email/internal/email-story.svelte";

  let {
    recipientName = welcomeDemo.recipientName,
    workspaceName = welcomeDemo.workspaceName,
    action = welcomeDemo.action,
  }: WelcomeEmailProps = $props();
</script>

<EmailDocument preheader={`${workspaceName} is ready for its first useful decision.`}>
  {#snippet header()}
    <EmailBrand label="Welcome" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Your workspace" tone="green" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">
        Welcome to {workspaceName}, {recipientName}.
      </h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        The workspace is ready. Start with one brief, name its owner, and ask for the first review only when the decision is clear.
      </p>
    </div>

    <EmailStory
      src={peepStanding10Asset}
      alt="A character ready to begin work"
      tone="green"
    />

    <ol class="w-full divide-y divide-[var(--email-border)] border-y border-[var(--email-border)] text-sm">
      <li class="py-3"><strong>1.</strong> Create the first brief.</li>
      <li class="py-3"><strong>2.</strong> Add the people who own the decision.</li>
      <li class="py-3"><strong>3.</strong> Publish the next review time.</li>
    </ol>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}
  </Stack>

  {#snippet footer()}
    <EmailFooter
      reason={`You received this because you created the ${workspaceName} workspace.`}
      manageLabel="Manage workspace emails"
    />
  {/snippet}
</EmailDocument>
