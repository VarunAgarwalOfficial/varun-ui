<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface CarouselNavProps {
    count: number;
    value?: number;
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    finish?: Snippet;
    onValueChange?: (value: number) => void;
  }

  export const carouselNavDemo: CarouselNavProps = {
    count: 4,
    value: 1,
    label: "Feature tour",
  };
</script>

<script lang="ts">
  import {
    ChevronLeft,
    ChevronRight,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  let {
    count,
    value = $bindable(0),
    label = "Carousel navigation",
    previousLabel = "Back",
    nextLabel = "Next",
    finish,
    onValueChange,
  }: CarouselNavProps = $props();

  const lastIndex = $derived(Math.max(0, count - 1));
  const isFirst = $derived(value <= 0);
  const isLast = $derived(value >= lastIndex);

  function choose(index: number) {
    const nextValue = Math.min(Math.max(index, 0), lastIndex);
    if (nextValue === value) return;

    value = nextValue;
    onValueChange?.(nextValue);
  }
</script>

<nav data-slot="carousel-nav" aria-label={label} class="grid gap-3">
  <div class="flex items-center justify-center gap-1" aria-label="Choose slide">
    {#each Array(count) as _, index}
      <button
        type="button"
        class="group/carousel-dot grid size-[var(--control-height-xs)] place-items-center rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
        aria-label={`Go to slide ${index + 1}`}
        aria-current={index === value ? "step" : undefined}
        onclick={() => choose(index)}
      >
        <span
          class={`h-2 rounded-full motion-interactive ${
            index === value
              ? "w-6 bg-primary"
              : "w-2 bg-muted-foreground/35 group-hover/carousel-dot:bg-muted-foreground/60"
          }`}
          aria-hidden="true"
        ></span>
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
    <Button
      variant="quiet"
      size="sm"
      class="justify-self-start"
      disabled={isFirst}
      onclick={() => choose(value - 1)}
    >
      <ChevronLeft class="size-4" aria-hidden="true" />
      {previousLabel}
    </Button>

    <span class="text-xs tabular-nums text-muted-foreground" aria-live="polite">
      {Math.min(value + 1, count)} of {count}
    </span>

    <div class="justify-self-end">
      {#if isLast && finish}
        {@render finish()}
      {:else}
        <Button
          variant="quiet"
          size="sm"
          disabled={isLast}
          onclick={() => choose(value + 1)}
        >
          {nextLabel}
          <ChevronRight class="size-4" aria-hidden="true" />
        </Button>
      {/if}
    </div>
  </div>
</nav>
