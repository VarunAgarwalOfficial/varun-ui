<script lang="ts" module>
  import type { StatusHistoryStripState } from "$lib/components/varunui/piece/status-history-strip.svelte";
  import type { StatusTone } from "$lib/components/varunui/piece/status-line.svelte";

  export interface StatusService {
    name: string;
    description: string;
    availability: string;
    tone: StatusTone;
    history: StatusHistoryStripState[];
  }

  export interface StatusProps {
    heading?: string;
    description?: string;
    services?: StatusService[];
  }

  const stableHistory: StatusHistoryStripState[] = [
    "up", "up", "up", "up", "up", "up", "up", "up", "up", "up", "up", "up",
  ];

  const defaultServices: StatusService[] = [
    {
      name: "Workspace app",
      description: "Projects, comments, and member settings",
      availability: "99.99%",
      tone: "success",
      history: stableHistory,
    },
    {
      name: "Sync and imports",
      description: "File imports and background workspace sync",
      availability: "99.94%",
      tone: "success",
      history: ["up", "up", "up", "degraded", "up", "up", "up", "up", "up", "up", "up", "up"],
    },
    {
      name: "Notifications",
      description: "Email, digest, and in-product delivery",
      availability: "99.98%",
      tone: "success",
      history: stableHistory,
    },
    {
      name: "Public API",
      description: "REST endpoints, webhooks, and integrations",
      availability: "99.97%",
      tone: "success",
      history: ["up", "up", "up", "up", "up", "up", "degraded", "up", "up", "up", "up", "up"],
    },
  ];

  export const statusDemo: StatusProps = {
    heading: "varunUI is operating normally.",
    description:
      "Current service health, recent incidents, and the maintenance work that may affect your workspace.",
    services: defaultServices,
  };
</script>

<script lang="ts">
  import StatValue from "$lib/components/varunui/component/stat-value.svelte";
  import StatusHistoryStrip from "$lib/components/varunui/piece/status-history-strip.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StatusLine from "$lib/components/varunui/piece/status-line.svelte";
  import TimelineEntry from "$lib/components/varunui/piece/timeline-entry.svelte";

  let {
    heading = "varunUI is operating normally.",
    description = "Current service health, recent incidents, and the maintenance work that may affect your workspace.",
    services = defaultServices,
  }: StatusProps = $props();
</script>

<Section container="lg" size="md">
  <Stack gap="xl">
    <SectionHeader
      kicker="System status"
      markerTone="green"
      title={heading}
      {description}
      align="left"
      size="lg"
      level={1}
    >
      <p class="font-mono text-xs uppercase tracking-[var(--tracking-label)] text-muted-foreground">
        Updated two minutes ago
      </p>
    </SectionHeader>

    <div
      data-tone="green"
      class="surface-pastel border-y border-success/35 p-[var(--surface-padding-md)]"
    >
      <div class="flex flex-wrap items-center justify-between gap-[var(--layout-gap-md)]">
        <div class="min-w-0 flex-1">
          <StatusLine
            label="All systems operational"
            description="No active incidents are affecting varunUI customers."
            meta="Live"
            tone="success"
            pulse
          />
        </div>
        <Link href="?" label="Subscribe to updates" />
      </div>
    </div>

    <Grid columns={3} gap="md">
      <div class="space-y-2">
        <StatValue value="99.98%" size="lg" animate={false} ariaLabel="99.98% 30-day availability" />
        <p class="text-sm text-muted-foreground">30-day availability</p>
      </div>
      <div class="space-y-2">
        <StatValue value="0" size="lg" animate={false} ariaLabel="0 active incidents" />
        <p class="text-sm text-muted-foreground">Active incidents</p>
      </div>
      <div class="space-y-2">
        <StatValue value="18 min" size="lg" animate={false} ariaLabel="18 minute median incident update" />
        <p class="text-sm text-muted-foreground">Median incident update</p>
      </div>
    </Grid>

    <Split align="start" gap="lg">
      {#snippet media()}
        <Stack gap="md">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">Services</h2>
            <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
              A clear current state for each part of the product.
            </p>
          </div>
          <div class="border-y border-border bg-surface px-[var(--surface-padding-md)]">
            {#each services as service (service.name)}
              <StatusLine
                label={service.name}
                description={service.description}
                meta="Operational"
                tone={service.tone}
              />
            {/each}
          </div>
        </Stack>
      {/snippet}

      <Stack gap="md">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight">Thirty-day history</h2>
          <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
            Green is normal service; yellow marks a period of degraded performance.
          </p>
        </div>
        <div class="grid gap-[var(--layout-gap-sm)] sm:grid-cols-2 lg:grid-cols-1">
          {#each services as service (service.name)}
            <StatusHistoryStrip
              label={service.name}
              value={service.availability}
              history={service.history}
              startLabel="30 days ago"
              endLabel="Today"
              ariaLabel={`${service.name} 30-day status history`}
            />
          {/each}
        </div>
      </Stack>
    </Split>

    <div class="border-t border-border pt-[var(--layout-gap-lg)]">
      <Stack gap="md">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight">Recent history</h2>
          <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
            Resolved incidents stay visible so teams can understand what changed.
          </p>
        </div>
        <TimelineEntry
          marker="01"
          title="Import queue delay resolved"
          description="Large Markdown imports took up to twelve minutes. Capacity was added and queued work completed without data loss."
          meta="2 July"
          tone="muted"
        />
        <TimelineEntry
          marker="02"
          title="Scheduled database maintenance completed"
          description="The maintenance window finished seven minutes early. No customer action was required."
          meta="18 June"
          tone="muted"
          last
        />
      </Stack>
    </div>
  </Stack>
</Section>
