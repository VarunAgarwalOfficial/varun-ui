<script lang="ts">
  import AppShell from "$lib/components/varunui/component/app-shell.svelte";
  import SidebarNav from "$lib/components/varunui/component/sidebar-nav.svelte";
  import SidebarProfile from "$lib/components/varunui/component/sidebar-profile.svelte";
  import SearchField from "$lib/components/varunui/component/search-field.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StatusLine from "$lib/components/varunui/piece/status-line.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Activity,
    Calendar,
    FolderIcon,
    Gauge,
    Settings,
    Users,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  const labels = {
    title: "Navigation",
    open: "Open navigation",
    close: "Close navigation",
    expand: "Expand navigation",
    collapse: "Collapse navigation",
  } as const;

  const sections = [
    {
      label: "Workspace",
      items: [
        {
          label: "Overview",
          href: "?",
          icon: Gauge,
          active: true,
        },
        {
          id: "projects",
          label: "Projects",
          icon: FolderIcon,
          badge: "8",
          children: [
            { label: "Website refresh", href: "?" },
            { label: "Mobile polish", href: "?" },
          ],
        },
        { label: "Calendar", href: "?", icon: Calendar },
      ],
    },
    {
      label: "Team",
      items: [
        { label: "Members", href: "?", icon: Users },
        { label: "Activity", href: "?", icon: Activity },
        { label: "Settings", href: "?", icon: Settings },
      ],
    },
  ];

  const metrics = [
    { label: "Open tasks", value: "24" },
    { label: "Review time", value: "2.4h" },
    { label: "Active members", value: "12" },
  ] as const;

  let open = $state(true);
</script>

<section class="h-[calc(var(--layout-viewport-height)-3rem)] min-h-[40rem] w-full overflow-hidden border-b border-border bg-background text-foreground">
  <AppShell {labels} bind:open width="sm" height="fill">
    {#snippet sidebar(collapsed)}
      <div class="border-b border-border px-3 py-2">
        {#if collapsed}
          <p
            class="flex size-8 items-center justify-center text-sm font-semibold text-foreground"
          >
            N
          </p>
        {:else}
          <p class="text-sm font-semibold text-foreground">varunUI Studio</p>
          <p class="mt-0.5 text-xs text-muted-foreground">varunUI workspace</p>
        {/if}
      </div>
      <SidebarNav
        label="Preview navigation"
        sections={sections}
        {collapsed}
        expandedIds={["projects"]}
      />
    {/snippet}

    {#snippet header()}
      <div class="flex min-w-0 items-center justify-between gap-3">
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-foreground">varunUI Studio / Overview</p>
        </div>
        <div class="hidden w-56 shrink-0 sm:block">
          <SearchField
            label="Search workspace"
            placeholder="Search"
            size="sm"
            clearable={false}
          />
        </div>
      </div>
    {/snippet}

    {#snippet footer(collapsed)}
      <SidebarProfile
        label="Open account"
        href="?"
        {collapsed}
        person={{
          name: "Mira Chen",
          detail: "Design systems",
        }}
      />
    {/snippet}

    <Section container="max" size="sm">
      <Stack gap="xl">
        <SectionHeader
          kicker="Workspace"
          title="Good morning, Mira."
          description="The decisions that need attention today, without turning the overview into a dashboard wall."
          align="left"
          size="md"
          level={1}
        >
          {#snippet actions()}
            <Button size="sm">New project</Button>
          {/snippet}
        </SectionHeader>

        <Grid columns={3} gap="md">
          {#each metrics as metric (metric.label)}
            <div class="border-y border-border py-[var(--surface-padding-md)]">
              <InlineStat value={metric.value} label={metric.label} animate={false} />
            </div>
          {/each}
        </Grid>

        <Grid columns={2} gap="lg">
          <section class="border-y border-border py-[var(--surface-padding-md)]">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-lg font-semibold">Review queue</h2>
              <span class="text-xs font-medium text-warning">2 pending</span>
            </div>
            <div class="mt-3 divide-y divide-border border-t border-border">
              <div class="flex items-center justify-between gap-3 py-3 text-sm">
                <span>Homepage copy review</span>
                <span class="text-xs text-muted-foreground">Mira</span>
              </div>
              <div class="flex items-center justify-between gap-3 py-3 text-sm">
                <span>Billing flow QA</span>
                <span class="text-xs text-muted-foreground">Jon</span>
              </div>
              <div class="flex items-center justify-between gap-3 py-3 text-sm">
                <span>Release notes</span>
                <span class="text-xs text-muted-foreground">Ari</span>
              </div>
            </div>
          </section>

          <section class="border-y border-border bg-blue/15 px-[var(--surface-padding-md)]">
            <StatusLine
              label="Launch review is on track"
              description="Three owners have confirmed their work. Copy and billing QA remain."
              meta="Today"
              tone="info"
            />
            <StatusLine
              label="Next team check-in"
              description="Bring only decisions that need the group."
              meta="14:30"
              tone="muted"
            />
          </section>
        </Grid>
      </Stack>
    </Section>
  </AppShell>
</section>
