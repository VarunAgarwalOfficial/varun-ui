<script lang="ts" module>
  interface DigestItem {
    title: string;
    owner: string;
    meta: string;
  }

  export interface WeeklyDigestEmailProps {
    workspaceName?: string;
    period?: string;
    items?: DigestItem[];
    action?: { label: string; href: string };
  }

  export const weeklyDigestDemo: WeeklyDigestEmailProps = {
    workspaceName: "varunUI Studio",
    period: "6–10 July 2026",
    items: [
      { title: "Homepage copy review", owner: "Mina", meta: "Decision due Monday" },
      { title: "Billing flow QA", owner: "Jon", meta: "2 unresolved notes" },
      { title: "Release note approval", owner: "Ari", meta: "Ready to publish" },
    ],
    action: { label: "Open the review queue", href: "?" },
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
    workspaceName = weeklyDigestDemo.workspaceName,
    period = weeklyDigestDemo.period ?? "6–10 July 2026",
    items = weeklyDigestDemo.items ?? [],
    action = weeklyDigestDemo.action,
  }: WeeklyDigestEmailProps = $props();
</script>

<EmailDocument preheader={`${items.length} decisions need attention in ${workspaceName}.`}>
  {#snippet header()}
    <EmailBrand label="Weekly digest" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label={period} tone="yellow" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">The short list for {workspaceName}.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        These are the decisions most likely to block a handoff next week. Everything else can wait.
      </p>
    </div>

    <div
      data-tone="yellow"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={3} gap="md">
        <EmailFact label="Needs review" value={String(items.length)} />
        <EmailFact label="Ready" value="1" />
        <EmailFact label="Blocked" value="0" />
      </Grid>
    </div>

    <div class="w-full divide-y divide-[var(--email-border)] border-y border-[var(--email-border)]">
      {#each items as item (item.title)}
        <div class="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-4">
          <div>
            <p class="text-sm font-semibold">{item.title}</p>
            <p class="mt-1 text-xs text-[var(--email-muted-ink)]">{item.meta}</p>
          </div>
          <p class="text-xs font-semibold text-[var(--email-muted-ink)]">{item.owner}</p>
        </div>
      {/each}
    </div>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}
  </Stack>

  {#snippet footer()}
    <EmailFooter
      reason={`You receive the weekly digest for ${workspaceName}.`}
      manageLabel="Change digest settings"
      unsubscribeLabel="Pause this digest"
    />
  {/snippet}
</EmailDocument>
