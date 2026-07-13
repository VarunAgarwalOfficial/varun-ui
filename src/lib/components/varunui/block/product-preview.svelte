<script lang="ts" module>
  import type { AppShellLabels } from "$lib/components/varunui/component/app-shell.svelte";
  import type { SidebarNavSection } from "$lib/components/varunui/component/sidebar-nav.svelte";
  import type { SidebarProfilePerson } from "$lib/components/varunui/component/sidebar-profile.svelte";
  import type { MetricTrendDirection } from "$lib/components/varunui/piece/metric-trend.svelte";
  import type { SparklineTone } from "$lib/components/varunui/component/sparkline.svelte";

  export interface ProductPreviewFeature {
    title: string;
    description: string;
  }

  export interface ProductPreviewMetric {
    value: string;
    label: string;
    delta?: string;
    direction?: MetricTrendDirection;
    tone?: SparklineTone;
    values: number[];
  }

  export interface ProductPreviewProps {
    kicker?: string;
    heading?: string;
    description?: string;
    action?: { label: string; href: string };
    features?: ProductPreviewFeature[];
    navigation?: { label: string; sections: SidebarNavSection[] };
    profile?: { label: string; href?: string; person: SidebarProfilePerson };
    metrics?: ProductPreviewMetric[];
    labels?: {
      windowTitle: string;
      workspaceTitle: string;
      sidebar: AppShellLabels;
    };
  }

  export const productPreviewDemo: ProductPreviewProps = {
    kicker: "See it work",
    heading: "The interface that stays out of the way.",
    description:
      "varunUI keeps briefs, files, and feedback on one quiet canvas. The next action stays visible without another layer of navigation.",
    action: { label: "Take the tour", href: "?" },
    features: [
      {
        title: "Command-first",
        description: "Jump to any project, asset, or thread with one shortcut.",
      },
      {
        title: "Quiet by default",
        description: "Alerts stay folded until the moment they need attention.",
      },
      {
        title: "Built for focus",
        description: "Paper surfaces and clear ownership keep the work legible.",
      },
    ],
    navigation: {
      label: "varunUI workspace navigation",
      sections: [
        {
          label: "Workspace",
          items: [
            { label: "Overview", active: true },
            { label: "Briefs", badge: "12" },
            { label: "Assets" },
            { label: "Threads" },
          ],
        },
        { label: "Admin", items: [{ label: "Settings" }] },
      ],
    },
    profile: {
      label: "Open account",
      person: { name: "Maya Chen", detail: "Product design" },
    },
    metrics: [
      {
        value: "24",
        label: "Active briefs",
        delta: "6.8%",
        direction: "up",
        tone: "blue",
        values: [22, 26, 24, 29, 31, 34, 38, 41],
      },
      {
        value: "86%",
        label: "On time",
        delta: "4.2%",
        direction: "up",
        tone: "green",
        values: [72, 75, 74, 78, 80, 82, 84, 86],
      },
      {
        value: "3.2h",
        label: "Review time",
        delta: "11%",
        direction: "down",
        tone: "yellow",
        values: [48, 45, 46, 41, 39, 37, 35, 32],
      },
    ],
    labels: {
      windowTitle: "varunui.example / overview",
      workspaceTitle: "Overview",
      sidebar: {
        title: "Workspace navigation",
        open: "Open workspace navigation",
        close: "Close workspace navigation",
        expand: "Expand workspace navigation",
        collapse: "Collapse workspace navigation",
      },
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import AppShell from "$lib/components/varunui/component/app-shell.svelte";
  import LineChart from "$lib/components/varunui/component/line-chart.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import SidebarNav from "$lib/components/varunui/component/sidebar-nav.svelte";
  import SidebarProfile from "$lib/components/varunui/component/sidebar-profile.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import BrowserFrame from "$lib/components/varunui/piece/browser-frame.svelte";
  import MetricTrend from "$lib/components/varunui/piece/metric-trend.svelte";

  let {
    kicker = productPreviewDemo.kicker,
    heading = productPreviewDemo.heading,
    description = productPreviewDemo.description,
    action = productPreviewDemo.action,
    features = productPreviewDemo.features ?? [],
    navigation = productPreviewDemo.navigation,
    profile = productPreviewDemo.profile,
    metrics = productPreviewDemo.metrics ?? [],
    labels = productPreviewDemo.labels,
  }: ProductPreviewProps = $props();

  const activitySeries = [
    { name: "Current", values: [42, 48, 47, 55, 58, 64], tone: "purple" as const },
    { name: "Previous", values: [38, 41, 45, 48, 51, 54], tone: "cyan" as const },
  ];
</script>

<Section container="lg">
  <div class="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
    <div>
      {#if kicker}
        <Marker text={kicker} tone="blue" emphasis={true} />
      {/if}

      {#if heading}
        <h2 class="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {heading}
        </h2>
      {/if}

      {#if description}
        <p class="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      {/if}

      {#if features.length > 0}
        <ul class="mt-8 border-y border-border">
          {#each features as feature (feature.title)}
            <li class="grid gap-1 border-b border-border py-4 last:border-b-0">
              <h3 class="font-semibold tracking-tight">{feature.title}</h3>
              <p class="text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </li>
          {/each}
        </ul>
      {/if}

      {#if action}
        <div class="mt-8">
          <Button href={action.href} size="lg">{action.label}</Button>
        </div>
      {/if}
    </div>

    {#if labels && navigation && profile}
      <BrowserFrame title={labels.workspaceTitle} url={labels.windowTitle} secure={true}>
        <div class="h-[34rem] overflow-hidden [&_[data-slot=app-shell-sidebar]]:!min-h-full [&_[data-slot=app-shell]]:!min-h-full">
          <AppShell labels={labels.sidebar} width="sm" collapse="none" contentLandmark={false}>
            {#snippet sidebar(collapsed)}
              <div class="flex min-h-0 flex-1 flex-col">
                <SidebarNav
                  label={navigation.label}
                  sections={navigation.sections}
                  {collapsed}
                />
              </div>
            {/snippet}

            {#snippet header()}
              <div class="flex min-w-0 items-center justify-between gap-3">
                <p class="truncate text-sm font-semibold text-foreground">
                  {labels.workspaceTitle}
                </p>
                <Button size="xs">New brief</Button>
              </div>
            {/snippet}

            {#snippet footer(collapsed)}
              <SidebarProfile
                label={profile.label}
                person={profile.person}
                href={profile.href}
                {collapsed}
              />
            {/snippet}

            <div class="grid gap-6 p-5">
              <div class="grid gap-3 sm:grid-cols-3">
                {#each metrics as metric (metric.label)}
                  <div class="border-y border-border py-3">
                    <MetricTrend
                      label={metric.label}
                      value={metric.value}
                      delta={metric.delta}
                      direction={metric.direction}
                      values={metric.values}
                      tone={metric.tone}
                      graphAriaLabel={`${metric.label} trend`}
                    />
                  </div>
                {/each}
              </div>

              <div class="border-y border-border py-4">
                <LineChart
                  labels={["Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
                  series={activitySeries}
                  ariaLabel="Active briefs over six months"
                />
              </div>
            </div>
          </AppShell>
        </div>
      </BrowserFrame>
    {/if}
  </div>
</Section>
