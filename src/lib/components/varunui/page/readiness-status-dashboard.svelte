<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    CheckCircle2,
    Circle,
    Loader2,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  type ServiceStatus = "ready" | "in-progress" | "planned";

  interface Service {
    name: string;
    description: string;
    status: ServiceStatus;
  }

  interface ServiceGroup {
    title: string;
    services: Service[];
  }

  export interface ReadinessStatusDashboardProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    groups?: ServiceGroup[];
    labels?: {
      ready?: string;
      inProgress?: string;
      planned?: string;
      overallStatus?: string;
    };
    className?: string;
  }

  export const readinessStatusDashboardDemo: ReadinessStatusDashboardProps = {
    badge: { label: "Launch Status", variant: "muted" },
    heading: "Almost ready for takeoff",
    description:
      "Track the release areas still in motion. We launch only when every owner has cleared the quality bar.",
    groups: [
      {
        title: "Core workspace",
        services: [
          {
            name: "Authentication & SSO",
            description: "OAuth, SAML, and passwordless login",
            status: "ready",
          },
          {
            name: "Dashboard",
            description: "Analytics, reporting, and real-time metrics",
            status: "ready",
          },
          {
            name: "API Gateway",
            description: "REST and GraphQL endpoints with rate limiting",
            status: "in-progress",
          },
        ],
      },
      {
        title: "Integrations",
        services: [
          {
            name: "Slack & Teams",
            description: "Real-time notifications and bot commands",
            status: "in-progress",
          },
          {
            name: "Webhooks",
            description: "Custom event triggers and payloads",
            status: "in-progress",
          },
          {
            name: "Zapier & Make",
            description: "No-code automation workflows",
            status: "planned",
          },
        ],
      },
      {
        title: "Enterprise",
        services: [
          {
            name: "Role-Based Access",
            description: "Granular permissions and team management",
            status: "in-progress",
          },
          {
            name: "Audit Logs",
            description: "Compliance-ready activity tracking",
            status: "planned",
          },
          {
            name: "Custom SLA",
            description: "Dedicated support and uptime guarantees",
            status: "planned",
          },
        ],
      },
    ],
    labels: {
      ready: "Ready",
      inProgress: "In Progress",
      planned: "Planned",
      overallStatus: "{ready} of {total} services ready",
    },
  };

  const statusConfig: Record<
    ServiceStatus,
    { icon: Component; className: string; labelClassName: string }
  > = {
    ready: {
      icon: CheckCircle2,
      className: "text-success",
      labelClassName:
        "bg-success/10 text-success",
    },
    "in-progress": {
      icon: Loader2,
      className: "text-warning",
      labelClassName:
        "bg-warning/10 text-warning",
    },
    planned: {
      icon: Circle,
      className: "text-muted-foreground/50",
      labelClassName: "bg-muted text-muted-foreground",
    },
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import { cn } from "$lib/utils.js";

  let {
    badge,
    heading,
    description,
    groups = [],
    labels,
    className,
  }: ReadinessStatusDashboardProps = $props();

  const allServices = $derived(groups.flatMap((group) => group.services));
  const readyCount = $derived(
    allServices.filter((service) => service.status === "ready").length,
  );
  const totalCount = $derived(allServices.length);
  const overallLabel = $derived(
    (labels?.overallStatus ?? "{ready} of {total} services ready")
      .replace("{ready}", String(readyCount))
      .replace("{total}", String(totalCount)),
  );
  const layoutClassName = $derived(
    groups.length <= 2
      ? "grid grid-cols-1 md:grid-cols-2"
      : groups.length === 3
        ? "grid grid-cols-1 md:grid-cols-3"
        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  );

  function getStatusLabel(status: ServiceStatus) {
    if (status === "ready") return labels?.ready ?? "Ready";
    if (status === "in-progress") return labels?.inProgress ?? "In Progress";
    return labels?.planned ?? "Planned";
  }
</script>

<div class={cn("w-full", className)}>
  <Section container="md">
    <div class="flex flex-col items-center gap-6 text-center md:gap-8">
      {#if badge}
        <div>
          <Badge variant={badge.variant ?? "primary"}>{badge.label}</Badge>
        </div>
      {/if}

      {#if heading}
        <h1
          class="max-w-4xl text-balance text-4xl font-bold md:text-5xl lg:text-6xl"
        >
          {heading}
        </h1>
      {/if}

      {#if description}
        <p
          class="max-w-[var(--layout-prose)] text-balance text-lg text-muted-foreground md:text-xl"
        >
          {description}
        </p>
      {/if}

      {#if totalCount > 0}
        <div class="text-sm text-muted-foreground">{overallLabel}</div>
      {/if}

      {#if groups.length > 0}
        <div class={cn("mt-2 w-full gap-4", layoutClassName)}>
          {#each groups as group, groupIndex (groupIndex)}
            <div class="rounded-none border bg-surface p-6 text-left">
              <h3 class="mb-4 font-semibold">{group.title}</h3>
              <div class="space-y-4">
                {#each group.services as service, serviceIndex (serviceIndex)}
                  {@const config = statusConfig[service.status]}
                  {@const Icon = config.icon}
                  <div class="flex gap-3">
                    <div class={cn("mt-0.5 shrink-0", config.className)}>
                      <Icon
                        class={cn(
                          "size-5",
                          service.status === "in-progress" && "motion-spinner",
                        )}
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center gap-2">
                        <span
                          class="truncate text-sm font-medium"
                          title={service.name}
                        >
                          {service.name}
                        </span>
                        <span
                          class={cn(
                            "rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
                            config.labelClassName,
                          )}
                        >
                          {getStatusLabel(service.status)}
                        </span>
                      </div>
                      <p class="mt-0.5 text-xs text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </Section>
</div>
