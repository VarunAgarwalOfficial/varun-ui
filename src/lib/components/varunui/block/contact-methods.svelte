<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    BookOpen,
    Calendar,
    ChatCircleIcon as MessageCircle,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface ContactMethod {
    icon?: Component;
    title: string;
    description: string;
    detail: string;
    href?: string;
  }

  export interface ContactMethodsProps {
    kicker?: string;
    heading?: string;
    description?: string;
    methods?: ContactMethod[];
  }

  export const contactMethodsDemo: ContactMethodsProps = {
    kicker: "Talk to a person",
    heading: "Choose the shortest path to a useful answer.",
    description:
      "Use support for a concrete problem, a call for a scoped handoff, or the help centre when you want to keep moving now.",
    methods: [
      {
        icon: MessageCircle,
        title: "Send a support note",
        description: "Share the goal, what changed, and where the work is stuck.",
        detail: "Reply within one workday",
        href: "?",
      },
      {
        icon: Calendar,
        title: "Book a project call",
        description: "Use thirty minutes to clarify a migration, review, or team handoff.",
        detail: "Choose a time",
        href: "?",
      },
      {
        icon: BookOpen,
        title: "Browse the help centre",
        description: "Find the answer for setup, permissions, billing, or releases.",
        detail: "Read the guides",
        href: "?",
      },
    ],
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = contactMethodsDemo.kicker,
    heading = contactMethodsDemo.heading,
    description = contactMethodsDemo.description,
    methods = contactMethodsDemo.methods ?? [],
  }: ContactMethodsProps = $props();
</script>

<Section container="lg">
  <Stack gap="xl">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      markerTone="pink"
    />

    <Grid columns={3} gap="md">
      {#each methods as method (method.title)}
        {@const Icon = method.icon}
        <svelte:element
          this={method.href ? "a" : "article"}
          href={method.href}
          data-tone="pink"
          class="surface-pastel surface-pastel-interactive group/contact-method flex h-full flex-col border border-border p-[var(--surface-padding-lg)] outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
        >
          {#if Icon}
            <span class="grid size-10 place-items-center rounded-md border border-border bg-background text-pink">
              <Icon class="size-5" aria-hidden="true" />
            </span>
          {/if}
          <h3 class="mt-[var(--layout-gap-md)] text-lg font-semibold">
            {method.title}
          </h3>
          <p class="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
            {method.description}
          </p>
          <span class="mt-[var(--layout-gap-md)] inline-flex items-center gap-2 text-sm font-semibold">
            {method.detail}
            {#if method.href}
              <ArrowRight
                class="size-4 motion-transform motion-safe:group-hover/contact-method:translate-x-1 motion-safe:group-focus-visible/contact-method:translate-x-1"
                aria-hidden="true"
              />
            {/if}
          </span>
        </svelte:element>
      {/each}
    </Grid>
  </Stack>
</Section>
