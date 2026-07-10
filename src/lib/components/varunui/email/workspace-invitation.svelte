<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  export interface WorkspaceInvitationEmailProps {
    recipientName?: string;
    inviterName?: string;
    workspaceName?: string;
    role?: string;
    expiresOn?: string;
    action?: { label: string; href: string };
  }

  export const workspaceInvitationDemo: WorkspaceInvitationEmailProps = {
    recipientName: "Ari",
    inviterName: "Mina Chen",
    workspaceName: "varunUI Studio",
    role: "Editor",
    expiresOn: "17 July 2026",
    action: { label: "Join varunUI Studio", href: "?" },
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
  import EmailStory from "$lib/components/varunui/email/internal/email-story.svelte";

  let {
    recipientName = workspaceInvitationDemo.recipientName,
    inviterName = workspaceInvitationDemo.inviterName,
    workspaceName = workspaceInvitationDemo.workspaceName,
    role = workspaceInvitationDemo.role ?? "Editor",
    expiresOn = workspaceInvitationDemo.expiresOn ?? "17 July 2026",
    action = workspaceInvitationDemo.action,
  }: WorkspaceInvitationEmailProps = $props();
</script>

<EmailDocument preheader={`${inviterName} invited you to work in ${workspaceName}.`}>
  {#snippet header()}
    <EmailBrand label="Invitation" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Work together" tone="pink" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">{recipientName}, join {workspaceName}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        {inviterName} invited you to review briefs, record decisions, and keep the next handoff visible.
      </p>
    </div>

    <EmailStory
      src={peepStanding23Asset}
      alt="A character welcoming a teammate"
      tone="pink"
    />

    <div class="w-full border-y border-[var(--email-border)] py-[var(--surface-padding-md)]">
      <Grid columns={2} gap="md">
        <EmailFact label="Role" value={role} />
        <EmailFact label="Invite expires" value={expiresOn} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`This invitation was sent by ${inviterName} from ${workspaceName}.`} />
  {/snippet}
</EmailDocument>
