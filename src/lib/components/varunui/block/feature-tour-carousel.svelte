<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    BarChart3,
    Layers,
    Shield,
    Zap,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface FeatureSlide {
    icon?: Component;
    title: string;
    description: string;
    highlights: string[];
  }

  export interface FeatureTourCarouselProps {
    kicker?: string;
    heading?: string;
    description?: string;
    slides?: FeatureSlide[];
    primaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      next?: string;
      back?: string;
      finish?: string;
      slideOf?: string;
    };
    className?: string;
  }

  export const featureTourCarouselDemo: FeatureTourCarouselProps = {
    kicker: "Quick tour",
    heading: "Meet the parts you will use every day.",
    description:
      "A short, skippable tour should teach the product map without delaying the first useful action.",
    slides: [
      {
        icon: Layers,
        title: "Projects and workspaces",
        description:
          "Keep each body of work, its owners, and its connected tools in one named workspace.",
        highlights: [
          "Unlimited projects",
          "Custom workflows",
          "Shared templates",
        ],
      },
      {
        icon: BarChart3,
        title: "Analytics and decisions",
        description:
          "Inspect project health without separating the number from the decision it should inform.",
        highlights: ["Real-time dashboards", "Custom reports", "Export to CSV"],
      },
      {
        icon: Zap,
        title: "Useful automations",
        description:
          "Move repetitive handoffs out of the way with readable triggers, conditions, and actions.",
        highlights: ["50+ triggers", "Conditional logic", "Webhook support"],
      },
      {
        icon: Shield,
        title: "Security and access",
        description:
          "Give each person the access they need and preserve a legible record of important changes.",
        highlights: ["SOC 2 certified", "SSO & SAML", "Audit logs"],
      },
    ],
    primaryButton: { label: "Open the workspace", href: "?" },
    labels: {
      next: "Next",
      back: "Back",
      finish: "Get Started",
      slideOf: "{current} of {total}",
    },
  };
</script>

<script lang="ts">
  import {
    ArrowRight,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import CarouselNav from "$lib/components/varunui/component/carousel-nav.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    slides = [],
    primaryButton,
    labels,
    className,
  }: FeatureTourCarouselProps = $props();

  let activeSlide = $state(0);

  const slide = $derived(slides[activeSlide]);
</script>

{#snippet FinishTour()}
  {#if primaryButton}
    <Button size="sm" href={primaryButton.href}>
      {labels?.finish ?? "Get started"}
      <ArrowRight class="size-4" />
    </Button>
  {:else}
    <Button size="sm">
      {labels?.finish ?? "Get started"}
      <ArrowRight class="size-4" />
    </Button>
  {/if}
{/snippet}

<Section container="panel" className={className}>
  <Stack gap="lg" align="center">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      size="sm"
      markerTone="yellow"
    />

    {#if slide}
      <div
        data-tone="blue"
        class="surface-pastel w-full border-y border-border px-[var(--surface-padding-lg)] py-[var(--layout-gap-lg)]"
      >
        <Stack gap="md" align="center">
          <span class="flex size-10 items-center justify-center border border-border bg-background text-foreground">
            {#if slide.icon}
              {@const Icon = slide.icon}
              <Icon class="size-5" aria-hidden="true" />
            {/if}
          </span>
          <h3 class="text-center text-xl font-semibold">{slide.title}</h3>
          <p class="max-w-md text-center text-sm leading-relaxed text-muted-foreground">
            {slide.description}
          </p>

          {#if slide.highlights.length > 0}
            <ul class="w-full divide-y divide-border border-y border-border text-sm">
              {#each slide.highlights as highlight}
                <li class="py-2.5 text-center text-foreground">{highlight}</li>
              {/each}
            </ul>
          {/if}

          <CarouselNav
            count={slides.length}
            label="Feature tour"
            previousLabel={labels?.back ?? "Back"}
            nextLabel={labels?.next ?? "Next"}
            finish={FinishTour}
            bind:value={activeSlide}
          />
        </Stack>
      </div>
    {/if}
  </Stack>
</Section>
