<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    Calendar,
    FigmaLogoIcon,
    Github,
    MessageSquare,
    NotePencilIcon,
    Zap,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  type ConnectionStatus = "available" | "coming-soon" | "connected";

  interface Integration {
    id: string;
    name: string;
    icon?: Component;
    status: ConnectionStatus;
  }

  export interface IntegrationSelectorProps {
    kicker?: string;
    heading?: string;
    description?: string;
    integrations?: Integration[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      connected?: string;
      connect?: string;
      comingSoon?: string;
      connectedCount?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const integrationSelectorDemo: IntegrationSelectorProps = {
    kicker: "Integrations",
    heading: "Connect only the tools that carry useful context.",
    description:
      "Start with the places that own source files, conversations, or delivery. More can be connected later.",
    integrations: [
      {
        id: "slack",
        name: "Slack",
        icon: MessageSquare,
        status: "connected",
      },
      {
        id: "github",
        name: "GitHub",
        icon: Github,
        status: "available",
      },
      {
        id: "google",
        name: "Google Calendar",
        icon: Calendar,
        status: "available",
      },
      {
        id: "notion",
        name: "Notion",
        icon: NotePencilIcon,
        status: "available",
      },
      {
        id: "figma",
        name: "Figma",
        icon: FigmaLogoIcon,
        status: "available",
      },
      {
        id: "linear",
        name: "Linear",
        icon: Zap,
        status: "coming-soon",
      },
    ],
    primaryButton: { label: "Continue", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    labels: {
      connected: "Connected",
      connect: "Connect",
      comingSoon: "Coming soon",
      connectedCount: "{count} connected",
    },
    currentStep: 4,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight, Check } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";

  let {
    kicker,
    heading,
    description,
    integrations = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: IntegrationSelectorProps = $props();

  let connected = $state<Set<string>>(new Set());
  let initialized = $state(false);
  const connectedLabel = $derived(
    (labels?.connectedCount ?? "{count} connected").replace(
      "{count}",
      String(connected.size),
    ),
  );

  function toggleConnect(id: string) {
    const next = new Set(connected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    connected = next;
  }

  $effect(() => {
    if (!initialized && integrations.length > 0) {
      connected = new Set(
        integrations
          .filter((integration) => integration.status === "connected")
          .map((integration) => integration.id),
      );
      initialized = true;
    }
  });
</script>

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="blue"
  container="md"
  {className}
>
      {#if integrations.length > 0}
        <Grid columns={3} gap="sm">
          {#each integrations as integration (integration.id)}
            {@const isConnected = connected.has(integration.id)}
            {@const isComingSoon = integration.status === "coming-soon"}
            <div
              class={`flex min-w-0 items-center gap-3 border p-4 text-left motion-interactive ${isConnected ? "border-primary/40 bg-primary/5" : isComingSoon ? "border-dashed border-border bg-background opacity-65" : "border-border bg-background"}`}
            >
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground"
              >
                {#if integration.icon}
                  {@const Icon = integration.icon}
                  <Icon class="size-5" />
                {/if}
              </div>

              <div class="min-w-0 flex-1">
                <span class="block truncate text-sm font-semibold">{integration.name}</span>
                {#if isComingSoon}
                  <span class="mt-1 block text-xs text-muted-foreground">{labels?.comingSoon ?? "Coming soon"}</span>
                {:else if isConnected}
                  <span class="mt-1 flex items-center gap-1 text-xs font-semibold text-success">
                    <Check class="size-3" /> {labels?.connected ?? "Connected"}
                  </span>
                {:else}
                  <Button
                    size="sm"
                    variant="outline"
                    class="text-xs"
                    onclick={() => toggleConnect(integration.id)}
                  >
                    {labels?.connect ?? "Connect"}
                  </Button>
                {/if}
              </div>
            </div>
          {/each}
          </Grid>
      {/if}

  {#snippet status()}
    <p>{connectedLabel}</p>
  {/snippet}

  {#snippet actions()}
        {#if primaryButton}
          <Button size="lg" href={primaryButton.href}>
            {primaryButton.label}
            <ArrowRight class="size-4" />
          </Button>
        {/if}
        {#if secondaryButton}
          <Link href={secondaryButton.href} label={secondaryButton.label} />
        {/if}
  {/snippet}
</OnboardingStep>
