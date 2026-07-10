<script lang="ts" module>
  import type { Component } from "svelte";
  import { Check, Circle, Clock } from "$lib/components/varunui/internal/icons/phosphor.js";

  type PhaseStatus = "completed" | "current" | "upcoming";

  interface Phase {
    title: string;
    description: string;
    date: string;
    status: PhaseStatus;
  }

  export interface LaunchRoadmapProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    phases?: Phase[];
    labels?: {
      completed?: string;
      current?: string;
      upcoming?: string;
    };
    className?: string;
  }

  export const launchRoadmapDemo: LaunchRoadmapProps = {
    badge: { label: "Roadmap", variant: "muted" },
    heading: "Our path to launch",
    description:
      "We're building in public. Here's our timeline so you know exactly when to expect each milestone.",
    phases: [
      {
        title: "Foundation",
        description: "Core infrastructure, authentication, and API layer",
        date: "Q1 2025",
        status: "completed",
      },
      {
        title: "Beta Release",
        description:
          "Invite-only access for early adopters and feedback collection",
        date: "Q2 2025",
        status: "completed",
      },
      {
        title: "Public Preview",
        description: "Open access with core features and integrations",
        date: "Q3 2025",
        status: "current",
      },
      {
        title: "Enterprise Launch",
        description: "Team features, SSO, and advanced admin controls",
        date: "Q4 2025",
        status: "upcoming",
      },
      {
        title: "Workspace Expansion",
        description: "Marketplace, third-party plugins, and developer API",
        date: "Q1 2026",
        status: "upcoming",
      },
    ],
    labels: {
      completed: "Completed",
      current: "In Progress",
      upcoming: "Upcoming",
    },
  };

  const statusConfig: Record<
    PhaseStatus,
    { icon: Component; className: string; lineClassName: string }
  > = {
    completed: {
      icon: Check,
      className: "bg-primary text-background",
      lineClassName: "bg-primary",
    },
    current: {
      icon: Clock,
      className: "border-2 border-primary bg-primary/20 text-primary",
      lineClassName: "bg-border",
    },
    upcoming: {
      icon: Circle,
      className: "bg-muted text-muted-foreground",
      lineClassName: "bg-border",
    },
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    badge,
    heading,
    description,
    phases = [],
    labels,
    className,
  }: LaunchRoadmapProps = $props();

  function getStatusLabel(status: PhaseStatus) {
    if (status === "completed") return labels?.completed ?? "Completed";
    if (status === "current") return labels?.current ?? "In Progress";
    return labels?.upcoming ?? "Upcoming";
  }
</script>

<Section container="sm" className={className}>
    <div class="flex flex-col items-center gap-6 text-center md:gap-8">
      {#if badge}
        <div>
          <Badge variant={badge.variant ?? "primary"}>{badge.label}</Badge>
        </div>
      {/if}

      {#if heading}
        <h2
          class="max-w-4xl text-balance text-4xl font-bold md:text-5xl lg:text-6xl"
        >
          {heading}
        </h2>
      {/if}

      {#if description}
        <p
          class="max-w-[var(--layout-prose)] text-balance text-lg text-muted-foreground md:text-xl"
        >
          {description}
        </p>
      {/if}

      {#if phases.length > 0}
        <div class="mt-4 w-full max-w-[var(--layout-prose)]">
          <div class="relative">
            {#each phases as phase, index (index)}
              {@const config = statusConfig[phase.status]}
              {@const Icon = config.icon}
              {@const isLast = index === phases.length - 1}
              <div class="relative flex gap-4 pb-8 last:pb-0 md:gap-6">
                <div class="flex flex-col items-center">
                  <div
                    class={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full",
                      config.className,
                    )}
                  >
                    <Icon class="size-5" />
                  </div>
                  {#if !isLast}
                    <div
                      class={cn("mt-2 w-0.5 flex-1", config.lineClassName)}
                    ></div>
                  {/if}
                </div>

                <div class="flex-1 pb-4 text-left">
                  <div
                    class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
                  >
                    <h3 class="text-lg font-semibold">{phase.title}</h3>
                    <span
                      class={cn(
                        "text-xs font-medium",
                        phase.status === "upcoming"
                          ? "text-muted-foreground"
                          : "text-primary",
                      )}
                    >
                      {getStatusLabel(phase.status)}
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                  <span class="mt-2 inline-block text-xs text-muted-foreground">
                    {phase.date}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
</Section>
