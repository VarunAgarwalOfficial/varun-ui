<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface DataPosterMetric {
    label: string;
    value: string;
  }

  export interface DataPosterProps {
    kicker?: string;
    title?: string;
    value?: string;
    change?: string;
    note?: string;
    metrics?: DataPosterMetric[];
    character?: PosterCharacter;
  }

  export const dataPosterDemo: DataPosterProps = {
    kicker: "Weekly signal",
    title: "Release readiness",
    value: "84%",
    change: "+9 pts this week",
    note: "The system is moving in the right direction. Accessibility is the next review.",
    metrics: [
      { label: "Checks", value: "42 / 50" },
      { label: "Blocked", value: "03" },
      { label: "Owners", value: "08" },
    ],
    character: {
      src: peepStanding5Asset,
      alt: "A person reviewing the weekly signal",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: DataPosterProps = $props();
  let data = $derived({ ...dataPosterDemo, ...props });
  let metrics = $derived((data.metrics ?? []).slice(0, 3));
</script>

<CanvasFrame label={`${data.title}: ${data.value}`}>
  <div class="grid h-full grid-rows-[auto_1fr_auto]">
    <PosterMasthead
      kicker={data.kicker ?? "Weekly signal"}
      folio="SIGNAL / 05"
      tone="green"
    />

    <div class="grid min-h-0 grid-cols-[1.3fr_0.7fr]">
      <div class="flex min-w-0 flex-col border-r border-foreground p-[var(--canvas-safe-area)]">
        <p class="font-mono text-[2.2cqi] font-semibold uppercase tracking-[0.1em]">{data.title}</p>
        <p
          class="mt-[4cqi] font-mono text-[18cqi] font-semibold leading-[0.78] tracking-[-0.085em] tabular-nums"
        >
          {data.value}
        </p>
        <p class="mt-[3cqi] font-mono text-[2.3cqi] font-semibold text-success">{data.change}</p>
        <p class="mt-auto max-w-[27ch] text-[2.75cqi] font-medium leading-[1.2] tracking-[-0.02em]">
          {data.note}
        </p>
      </div>

      <div
        data-tone="green"
        class="surface-pastel surface-pastel-art relative flex min-w-0 flex-col overflow-hidden"
      >
        <div class="absolute right-[var(--canvas-safe-area)] top-[var(--canvas-safe-area)]">
          <PosterRegistration />
        </div>
        {#if data.character}
          <div class="mt-auto px-[1cqi] pt-[7cqi]">
            <StoryArt
              src={data.character.src}
              alt={data.character.alt}
              frame="portrait"
            />
          </div>
        {/if}
      </div>
    </div>

    <div class="grid grid-cols-[1.3fr_0.7fr] border-t border-foreground">
      <div class="grid min-w-0 grid-cols-2">
        {#each metrics.slice(0, 2) as metric, index (metric.label)}
          <div
            class:border-l={index > 0}
            class="min-w-0 border-foreground px-[4cqi] py-[3.5cqi]"
          >
            <p class="font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
              {metric.label}
            </p>
            <p class="mt-[1.2cqi] font-mono text-[3.1cqi] font-semibold tabular-nums">{metric.value}</p>
          </div>
        {/each}
      </div>

      {#if metrics[2]}
        <div class="min-w-0 border-l border-foreground px-[4cqi] py-[3.5cqi]">
          <p class="font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.11em] text-muted-foreground">
            {metrics[2].label}
          </p>
          <p class="mt-[1.2cqi] font-mono text-[3.1cqi] font-semibold tabular-nums">{metrics[2].value}</p>
        </div>
      {/if}
    </div>
  </div>
</CanvasFrame>
