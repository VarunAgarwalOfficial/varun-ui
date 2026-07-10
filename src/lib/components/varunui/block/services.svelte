<script lang="ts" module>
  type FeatureIcon = "zap" | "chart" | "shield" | "globe" | "check" | "help";

  interface FeatureItem {
    icon?: FeatureIcon;
    title: string;
    description: string;
  }

  type ButtonVariant = "primary" | "outline" | "quiet" | "danger";

  interface ButtonItem {
    label: string;
    href?: string;
    variant?: ButtonVariant;
  }

  export interface ServicesProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    features?: FeatureItem[];
    button?: ButtonItem;
    bottomText?: string;
  }

  export const servicesDemo: ServicesProps = {
    badge: { label: "Services", variant: "primary" },
    heading: "All-in-one web solutions",
    description:
      "Our web agency offers a complete suite of tools and services to build, grow, and optimize your online presence.",
    features: [
      {
        icon: "zap",
        title: "Blazing fast websites",
        description:
          "High-performance sites optimized for speed and user experience.",
      },
      {
        icon: "chart",
        title: "SEO and analytics",
        description:
          "Boost rankings and track performance with advanced SEO and analytics tools.",
      },
      {
        icon: "shield",
        title: "Robust security",
        description:
          "Industry-standard encryption and protection for every customer touchpoint.",
      },
      {
        icon: "globe",
        title: "Global scalability",
        description:
          "Reach audiences worldwide with scalable, cloud-based infrastructure.",
      },
      {
        icon: "check",
        title: "Tool integrations",
        description:
          "Connect to the tools and platforms your team already runs on.",
      },
      {
        icon: "help",
        title: "Dedicated support",
        description:
          "Round-the-clock expert support so your site stays online and on-brand.",
      },
    ],
    button: { label: "Launch your site", href: "?" },
    bottomText: "No upfront costs. Start your free consultation today.",
  };
</script>

<script lang="ts">
  import {
    ChartBarIcon,
    CheckIcon,
    GlobeIcon,
    LightningIcon,
    QuestionIcon,
    ShieldIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import FeatureCard from "$lib/components/varunui/piece/feature-card.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  const icons = {
    zap: LightningIcon,
    chart: ChartBarIcon,
    shield: ShieldIcon,
    globe: GlobeIcon,
    check: CheckIcon,
    help: QuestionIcon,
  };

  let {
    badge,
    heading,
    description,
    features = [],
    button,
    bottomText,
  }: ServicesProps = $props();
</script>

<Section>
  <Stack gap="xl">
    <SectionHeader
      kicker={badge?.label}
      title={heading}
      {description}
    />
    <Grid columns={3}>
      {#each features as feature, index (index)}
        {@const Icon = feature.icon ? icons[feature.icon] : undefined}
        <FeatureCard>
          {#snippet leading()}
            {#if Icon}
              <Icon class="size-5" aria-hidden="true" />
            {:else}
              <span class="font-mono text-sm font-semibold">{index + 1}</span>
            {/if}
          {/snippet}
          <h3 class="text-lg font-semibold">{feature.title}</h3>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">
            {feature.description}
          </p>
        </FeatureCard>
      {/each}
    </Grid>

    {#if button || bottomText}
      <div class="flex flex-col items-center gap-4 text-center">
        {#if button}
          <ActionRow>
            <Button href={button.href ?? "?"} variant={button.variant ?? "primary"}>
              {button.label}
            </Button>
          </ActionRow>
        {/if}

        {#if bottomText}
          <p class="text-sm text-muted-foreground">{bottomText}</p>
        {/if}
      </div>
    {/if}
  </Stack>
</Section>
