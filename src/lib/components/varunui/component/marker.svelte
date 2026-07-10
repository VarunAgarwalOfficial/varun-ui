<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type MarkerTone =
    | "primary"
    | "red"
    | "pink"
    | "yellow"
    | "green"
    | "blue"
    | "purple";
  export type MarkerUnderline = "none" | "solid" | "wavy";

  export interface MarkerProps {
    text?: string;
    tone?: MarkerTone;
    underline?: MarkerUnderline;
    emphasis?: boolean;
    animated?: boolean;
    children?: Snippet;
  }

  export const markerDemo: MarkerProps = {
    text: "Made for real work",
    tone: "primary",
    emphasis: true,
  };
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js";

  const underlineClasses: Record<MarkerUnderline, string> = {
    none: "",
    solid: "underline underline-offset-4",
    wavy: "underline decoration-wavy underline-offset-4",
  };

  let {
    text,
    tone = "primary",
    underline = "none",
    emphasis = false,
    animated = true,
    children,
  }: MarkerProps = $props();

  let visible = $state(false);

  function reveal(node: HTMLElement) {
    if (!animated || typeof IntersectionObserver === "undefined") {
      visible = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        visible = true;
        observer.disconnect();
      },
      { threshold: 0.6, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<mark
  use:reveal
  data-tone={tone}
  class={cn(
    "marker rounded-sm px-0.5 text-foreground box-decoration-clone",
    animated && visible && "motion-draw-left-active",
    animated && !visible && "marker-pending",
    !animated && "marker-static",
    underlineClasses[underline],
    emphasis && "font-semibold",
  )}
>
  {#if children}
    {@render children()}
  {:else if text}
    {text}
  {/if}
</mark>

<style>
  .marker {
    position: relative;
    z-index: 0;
    background: transparent;
  }

  .marker::before {
    position: absolute;
    z-index: -1;
    inset: 0.58em -0.06em 0.08em;
    border-radius: 0.38em 0.16em 0.3em 0.2em / 0.18em 0.28em 0.16em 0.24em;
    background: var(--marker-color);
    clip-path: polygon(0 16%, 96% 4%, 100% 78%, 3% 100%);
    content: "";
    --motion-draw-transform: rotate(-1.1deg) skewX(-3deg);
    --motion-draw-opacity: 0.2;
  }

  .marker[data-tone="primary"] {
    --marker-color: var(--color-primary);
    text-decoration-color: var(--color-primary);
  }

  .marker[data-tone="red"] { --marker-color: var(--color-red); }
  .marker[data-tone="pink"] { --marker-color: var(--color-pink); }
  .marker[data-tone="yellow"] {
    --marker-color: var(--color-yellow);
    --motion-draw-opacity: 0.28;
  }
  .marker[data-tone="green"] { --marker-color: var(--color-green); }
  .marker[data-tone="blue"] { --marker-color: var(--color-blue); }
  .marker[data-tone="purple"] { --marker-color: var(--color-purple); }

  .marker-static::before {
    opacity: var(--motion-draw-opacity);
    transform: scaleX(1) var(--motion-draw-transform);
  }

  .marker-pending::before {
    opacity: 0;
    transform: scaleX(0.001) var(--motion-draw-transform);
  }
</style>
