<script lang="ts" module>
  export interface PlanChangedEmailProps {
    workspaceName?: string;
    previousPlan?: string;
    currentPlan?: string;
    effectiveDate?: string;
    nextCharge?: string;
    action?: { label: string; href: string };
  }

  export const planChangedDemo: PlanChangedEmailProps = {
    workspaceName: "varunUI Studio",
    previousPlan: "Starter",
    currentPlan: "Studio",
    effectiveDate: "10 July 2026",
    nextCharge: "$48.00 AUD on 10 August 2026",
    action: { label: "Review billing", href: "?" },
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
    workspaceName = planChangedDemo.workspaceName ?? "your workspace",
    previousPlan = planChangedDemo.previousPlan ?? "Starter",
    currentPlan = planChangedDemo.currentPlan ?? "Studio",
    effectiveDate = planChangedDemo.effectiveDate ?? "10 July 2026",
    nextCharge = planChangedDemo.nextCharge ?? "$48.00 AUD on 10 August 2026",
    action = planChangedDemo.action,
  }: PlanChangedEmailProps = $props();
</script>

<EmailDocument preheader={`${workspaceName} is now on the ${currentPlan} plan.`}>
  {#snippet header()}
    <EmailBrand label="Billing" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Plan changed" tone="blue" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">{workspaceName} is now on {currentPlan}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        The change is complete. Here is the exact billing effect for your records.
      </p>
    </div>

    <div
      data-tone="blue"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={2} gap="md">
        <EmailFact label="Previous plan" value={previousPlan} />
        <EmailFact label="Current plan" value={currentPlan} />
        <EmailFact label="Effective" value={effectiveDate} />
        <EmailFact label="Next charge" value={nextCharge} />
      </Grid>
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}

    <p class="text-sm leading-6 text-[var(--email-muted-ink)]">
      Existing workspace content and permissions are unchanged.
    </p>
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`This billing confirmation was sent for ${workspaceName}.`} manageLabel="Manage billing contacts" />
  {/snippet}
</EmailDocument>
