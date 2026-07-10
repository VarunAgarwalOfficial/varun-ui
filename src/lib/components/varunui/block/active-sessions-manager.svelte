<script lang="ts" module>
  type BadgeVariant = "primary" | "muted" | "outline";

  interface Session {
    device: string;
    browser: string;
    location: string;
    ip: string;
    lastActive: string;
    current: boolean;
  }

  export interface ActiveSessionsManagerProps {
    badge?: {
      label: string;
      variant?: BadgeVariant;
    };
    heading?: string;
    description?: string;
    sessions?: Session[];
    signOutAllText?: string;
    signOutAllTextShort?: string;
    labels?: {
      cardTitle?: string;
      activeSessionsCount?: string;
      thisDevice?: string;
    };
    className?: string;
  }

  export const activeSessionsManagerDemo: ActiveSessionsManagerProps = {
    badge: {
      label: "Security",
      variant: "muted",
    },
    heading: "Active Sessions",
    description: "Manage your active sessions and sign out from other devices.",
    signOutAllText: "Sign out all other sessions",
    signOutAllTextShort: "Sign out all",
    sessions: [
      {
        device: "laptop",
        browser: "Chrome on macOS",
        location: "San Francisco, CA",
        ip: "192.168.1.***",
        lastActive: "Now",
        current: true,
      },
      {
        device: "mobile",
        browser: "Safari on iOS",
        location: "San Francisco, CA",
        ip: "192.168.1.***",
        lastActive: "2 hours ago",
        current: false,
      },
      {
        device: "desktop",
        browser: "Firefox on Windows",
        location: "New York, NY",
        ip: "10.0.0.***",
        lastActive: "Yesterday",
        current: false,
      },
      {
        device: "tablet",
        browser: "Chrome on Android",
        location: "Los Angeles, CA",
        ip: "172.16.0.***",
        lastActive: "3 days ago",
        current: false,
      },
    ],
    labels: {
      cardTitle: "Your Sessions",
      activeSessionsCount: "active sessions",
      thisDevice: "This device",
    },
  };
</script>

<script lang="ts">
  import {
    Globe,
    Laptop,
    LogOut,
    Monitor,
    Smartphone,
    Tablet,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  const deviceIcons = {
    desktop: Monitor,
    laptop: Laptop,
    tablet: Tablet,
    mobile: Smartphone,
  };

  function iconForDevice(device: string) {
    return deviceIcons[device as keyof typeof deviceIcons] ?? Laptop;
  }

  let {
    badge,
    heading,
    description,
    sessions = [],
    signOutAllText,
    signOutAllTextShort,
    labels = {},
    className,
  }: ActiveSessionsManagerProps = $props();

  const cardTitle = $derived(labels.cardTitle);
  const activeSessionsCount = $derived(labels.activeSessionsCount);
  const thisDeviceLabel = $derived(labels.thisDevice);
</script>

<Section container="sm" className={className}>
    {#if badge || heading || description}
      <div class="mx-auto mb-10 max-w-[var(--layout-prose)] text-center">
        {#if badge}
          <div class="mb-4 flex justify-center">
            <Badge variant={badge.variant ?? "primary"} class="gap-1.5">
              <Globe class="size-4" aria-hidden="true" />
              {badge.label}
            </Badge>
          </div>
        {/if}
        {#if heading}
          <h2 class="text-2xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h2>
        {/if}
        {#if description}
          <p class="mt-4 text-muted-foreground">{description}</p>
        {/if}
      </div>
    {/if}

    <div class="overflow-hidden rounded-none border bg-surface">
      <div
        class="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          {#if cardTitle}
            <h3 class="font-semibold tracking-tight">{cardTitle}</h3>
          {/if}
          {#if activeSessionsCount}
            <p class="mt-1 text-sm text-muted-foreground">
              {sessions.length}
              {activeSessionsCount}
            </p>
          {/if}
        </div>

        {#if signOutAllText || signOutAllTextShort}
          <Button variant="outline" size="sm" class="shrink-0">
            <LogOut class="size-4" aria-hidden="true" />
            {#if signOutAllTextShort}
              <span class="sm:hidden">{signOutAllTextShort}</span>
            {/if}
            {#if signOutAllText}
              <span class="hidden sm:inline">{signOutAllText}</span>
            {/if}
          </Button>
        {/if}
      </div>

      <div class="p-4">
        <div class="divide-y divide-border">
          {#each sessions as session, index (index)}
            {@const DeviceIcon = iconForDevice(session.device)}
            <div
              class={cn(
                "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between",
                session.current && "bg-primary/5",
              )}
            >
              <div class="flex min-w-0 items-center gap-4">
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
                >
                  <DeviceIcon class="size-5" aria-hidden="true" />
                </div>
                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <p class="font-medium">{session.browser}</p>
                    {#if session.current && thisDeviceLabel}
                      <Badge variant="muted">{thisDeviceLabel}</Badge>
                    {/if}
                  </div>
                  <div
                    class="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span>{session.location}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{session.ip}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3 sm:justify-end">
                <p class="text-sm text-muted-foreground">
                  {session.lastActive}
                </p>
                {#if !session.current}
                  <Button
                    variant="outline"
                    size="sm"
                    iconOnly
                    aria-label={`Sign out ${session.browser}`}
                  >
                    <LogOut class="size-4" aria-hidden="true" />
                  </Button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
</Section>
