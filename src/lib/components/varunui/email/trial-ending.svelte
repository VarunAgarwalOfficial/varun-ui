<script lang="ts" module>
  export interface TrialEndingEmailProps {
    workspaceName?: string;
    daysRemaining?: number;
    endsOn?: string;
    trialPlan?: string;
    afterTrial?: string;
    action?: { label: string; href: string };
  }

  export const trialEndingDemo: TrialEndingEmailProps = {
    workspaceName: "varunUI Studio",
    daysRemaining: 4,
    endsOn: "14 July 2026",
    trialPlan: "Studio",
    afterTrial: "The workspace becomes read-only",
    action: { label: "Choose a plan", href: "?" },
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
    workspaceName = trialEndingDemo.workspaceName ?? "your workspace",
    daysRemaining = trialEndingDemo.daysRemaining ?? 4,
    endsOn = trialEndingDemo.endsOn ?? "14 July 2026",
    trialPlan = trialEndingDemo.trialPlan ?? "Studio",
    afterTrial = trialEndingDemo.afterTrial ?? "The workspace becomes read-only",
    action = trialEndingDemo.action,
  }: TrialEndingEmailProps = $props();
</script>

<EmailDocument preheader={`${daysRemaining} days remain in the ${workspaceName} trial.`}>
  {#snippet header()}
    <EmailBrand label="Trial" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label={`${daysRemaining} days left`} tone="yellow" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">Your {trialPlan} trial ends on {endsOn}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        Choose a plan to keep {workspaceName} active. We will not charge a card unless you confirm a plan.
      </p>
    </div>

    <div
      data-tone="yellow"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={2} gap="md">
        <EmailFact label="Trial plan" value={trialPlan} />
        <EmailFact label="Ends" value={endsOn} />
        <EmailFact label="Workspace" value={workspaceName} />
        <EmailFact label="After the trial" value={afterTrial} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      You can export workspace content before the trial ends from workspace settings.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`You receive trial notices for ${workspaceName}.`} manageLabel="Manage trial notifications" />
  {/snippet}
</EmailDocument>
