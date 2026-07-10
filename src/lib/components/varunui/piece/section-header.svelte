<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { MarkerTone } from "$lib/components/varunui/component/marker.svelte";

  export type SectionHeaderAlign = "left" | "center";
  export type SectionHeaderSize = "sm" | "md" | "lg";
  export type SectionHeaderLevel = 1 | 2 | 3;

  export interface SectionHeaderProps {
    kicker?: string;
    markerTone?: MarkerTone;
    title?: string;
    description?: string;
    align?: SectionHeaderAlign;
    size?: SectionHeaderSize;
    level?: SectionHeaderLevel;
    actions?: Snippet;
    children?: Snippet;
  }

  export const sectionHeaderDemo: SectionHeaderProps = {
    kicker: "The useful bit",
    markerTone: "yellow",
    title: "A section starts with a point of view.",
    description:
      "Use one marked kicker, one clear statement, and only the context needed to continue.",
  };
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";

  let {
    kicker,
    markerTone = "yellow",
    title,
    description,
    align = "center",
    size = "md",
    level = 2,
    actions,
    children,
  }: SectionHeaderProps = $props();

  const headingTag = $derived(`h${level}`);

  const alignClasses: Record<SectionHeaderAlign, string> = {
    left: "items-start text-left",
    center: "mx-auto items-center text-center",
  };

  const titleClasses: Record<SectionHeaderSize, string> = {
    sm: "text-2xl font-semibold tracking-tight md:text-3xl",
    md: "text-3xl font-semibold tracking-tight md:text-4xl",
    lg: "text-4xl font-semibold tracking-tight md:text-5xl",
  };

  const descriptionClasses: Record<SectionHeaderSize, string> = {
    sm: "text-sm leading-relaxed text-muted-foreground md:text-base",
    md: "text-base leading-relaxed text-muted-foreground md:text-lg",
    lg: "text-lg leading-relaxed text-muted-foreground",
  };
</script>

<header
  data-slot="section-header"
  class={`flex max-w-[var(--layout-prose)] flex-col gap-[var(--layout-gap-sm)] ${alignClasses[align]}`}
>
  {#if kicker}
    <p class="text-sm font-semibold uppercase tracking-[var(--tracking-kicker)] text-foreground">
      <Marker text={kicker} tone={markerTone} emphasis />
    </p>
  {/if}

  {#if title}
    <svelte:element this={headingTag} class={titleClasses[size]}>
      {title}
    </svelte:element>
  {/if}

  {#if description}
    <p class={descriptionClasses[size]}>{description}</p>
  {/if}

  {@render actions?.()}
  {@render children?.()}
</header>
