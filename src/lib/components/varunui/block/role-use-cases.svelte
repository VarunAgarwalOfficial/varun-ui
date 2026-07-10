<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    Briefcase,
    ClipboardCheck,
    Palette,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface ActionLink {
    label: string;
    href?: string;
  }

  interface UseCase {
    icon: Component;
    role: string;
    title: string;
    description: string;
    link: ActionLink;
  }

  export interface RoleUseCasesProps {
    kicker?: string;
    heading?: string;
    description?: string;
    items?: UseCase[];
  }

  export const roleUseCasesDemo: RoleUseCasesProps = {
    kicker: "Who it's for",
    heading: "One workspace, shaped around each role",
    description:
      "The same system reads differently depending on your day. Everyone gets the view they need without the clutter of the ones they don't.",
    items: [
      {
        icon: Briefcase,
        role: "Product",
        title: "Decisions stay attached",
        description:
          "Briefs, owners, and decisions share one history, so planning starts with context instead of reconstruction.",
        link: { label: "For product teams", href: "?" },
      },
      {
        icon: Palette,
        role: "Design",
        title: "Reviews have a point",
        description:
          "Feedback lands against the work and the decision it affects, without another presentation deck or status layer.",
        link: { label: "For design teams", href: "?" },
      },
      {
        icon: ClipboardCheck,
        role: "Operations",
        title: "The handoff is visible",
        description:
          "Owners and next steps stay explicit, turning recurring coordination into a quick review instead of a chase.",
        link: { label: "For operations", href: "?" },
      },
    ],
  };
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Ruled from "$lib/components/varunui/layout/ruled.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";

  let { kicker, heading, description, items = [] }: RoleUseCasesProps = $props();
</script>

{#snippet Heading()}
  {#if heading}
    <h2 class="text-3xl font-light leading-[1.1] tracking-tight md:text-5xl">
      {heading}
    </h2>
  {/if}
{/snippet}

{#snippet Aside()}
  {#if description}
    <p class="max-w-md text-base leading-relaxed text-muted-foreground">
      {description}
    </p>
  {/if}
{/snippet}

<Section>
  <Stack gap="md">
    {#if kicker}
      <Marker text={kicker} tone="blue" emphasis />
    {/if}

    <Ruled
      columns="three"
      lead={heading ? Heading : undefined}
      aside={description ? Aside : undefined}
    >
      {#each items as item}
        {@const Icon = item.icon}
        <div
          data-tone="blue"
          class="surface-pastel surface-pastel-interactive group/roleUseCases flex flex-col border border-border p-[var(--surface-padding-lg)]"
        >
          <span
            class="flex size-10 items-center justify-center rounded-md border border-border bg-background text-blue"
            aria-hidden="true"
          >
            <Icon class="size-5" />
          </span>
          <p class="mt-5 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            {item.role}
          </p>
          <h3 class="mt-2 text-xl font-medium">{item.title}</h3>
          <p class="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
            {item.description}
          </p>
          <div class="mt-6">
            <Link href={item.link.href ?? "?"} label={item.link.label} />
          </div>
        </div>
      {/each}
    </Ruled>
  </Stack>
</Section>
