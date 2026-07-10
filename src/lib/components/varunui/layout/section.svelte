<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type SectionSize = "sm" | "md" | "lg";
  export type SectionContainer =
    | "form"
    | "panel"
    | "prose"
    | "sm"
    | "md"
    | "lg"
    | "max"
    | "full";
  export type SectionElement = "section" | "main" | "div" | "footer";

  export interface SectionProps {
    size?: SectionSize;
    container?: SectionContainer;
    as?: SectionElement;
    bleed?: boolean;
    className?: string;
    children?: Snippet;
  }

  export const sectionDemo: SectionProps = {
    size: "md",
    container: "lg",
  };
</script>

<script lang="ts">
  let {
    size = "md",
    container = "lg",
    as = "section",
    bleed = false,
    className,
    children,
  }: SectionProps = $props();

  const sizeClasses: Record<SectionSize, string> = {
    sm: "py-[var(--layout-section-space-sm)]",
    md: "py-[var(--layout-section-space)]",
    lg: "py-[var(--layout-section-space-lg)]",
  };

  const containerClasses: Record<SectionContainer, string> = {
    form: "max-w-[var(--layout-form)]",
    panel: "max-w-[var(--layout-panel-md)]",
    prose: "max-w-[var(--layout-prose)]",
    sm: "max-w-[var(--layout-content-sm)]",
    md: "max-w-[var(--layout-content-md)]",
    lg: "max-w-[var(--layout-content-lg)]",
    max: "max-w-[var(--layout-content-max)]",
    full: "max-w-none",
  };
</script>

<svelte:element
  this={as}
  data-slot="section"
  class={`w-full ${sizeClasses[size]} ${className ?? ""}`}
>
  {#if bleed}
    {@render children?.()}
  {:else}
    <div
      data-slot="section-container"
      class={`mx-auto px-[var(--layout-gutter)] ${containerClasses[container]}`}
    >
      {@render children?.()}
    </div>
  {/if}
</svelte:element>
