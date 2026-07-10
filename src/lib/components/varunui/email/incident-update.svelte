<script lang="ts" module>
  interface IncidentUpdate {
    time: string;
    text: string;
  }

  export interface IncidentUpdateEmailProps {
    status?: string;
    incidentTitle?: string;
    affectedArea?: string;
    updates?: IncidentUpdate[];
    action?: { label: string; href: string };
  }

  export const incidentUpdateDemo: IncidentUpdateEmailProps = {
    status: "Monitoring",
    incidentTitle: "Large imports are moving again",
    affectedArea: "Markdown and CSV imports",
    updates: [
      { time: "15:42", text: "Queued imports began processing at normal speed." },
      { time: "15:18", text: "Additional capacity was added to the import workers." },
      { time: "14:56", text: "The team identified a queue-capacity limit." },
    ],
    action: { label: "View current status", href: "?" },
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
    status = incidentUpdateDemo.status ?? "Monitoring",
    incidentTitle = incidentUpdateDemo.incidentTitle ?? "Service update",
    affectedArea = incidentUpdateDemo.affectedArea ?? "Imports",
    updates = incidentUpdateDemo.updates ?? [],
    action = incidentUpdateDemo.action,
  }: IncidentUpdateEmailProps = $props();
</script>

<EmailDocument preheader={`${status}: ${incidentTitle}.`}>
  {#snippet header()}
    <EmailBrand label="Service status" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label={status} tone="red" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">{incidentTitle}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        The service is stable while we watch the queue. No imported data was lost.
      </p>
    </div>

    <div
      data-tone="red"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <p class="text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--email-muted-ink)]">Affected area</p>
      <p class="mt-1 text-sm font-semibold">{affectedArea}</p>
    </div>

    <div class="w-full divide-y divide-[var(--email-border)] border-y border-[var(--email-border)]">
      {#each updates as update (update.time)}
        <div class="grid gap-1 py-3 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-4">
          <time class="font-mono text-xs text-[var(--email-muted-ink)]">{update.time}</time>
          <p class="text-sm leading-6">{update.text}</p>
        </div>
      {/each}
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}
  </Stack>

  {#snippet footer()}
    <EmailFooter
      reason="You receive incident updates for the varunUI Studio workspace."
      manageLabel="Change status subscriptions"
    />
  {/snippet}
</EmailDocument>
