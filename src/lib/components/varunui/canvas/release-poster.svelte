<script lang="ts" module>
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface ReleasePosterProps {
    kicker?: string;
    version?: string;
    headline?: string;
    changes?: string[];
    footer?: string;
    character?: PosterCharacter;
  }

  export const releasePosterDemo: ReleasePosterProps = {
    kicker: "New release",
    version: "0.9",
    headline: "The system found its rhythm.",
    changes: ["Square post canvases", "Five-axis radar chart", "One onboarding flow"],
    footer: "SHIP NOTE / 07",
    character: {
      src: peepSitting8Asset,
      alt: "A person relaxing after the release",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: ReleasePosterProps = $props();
  let data = $derived({ ...releasePosterDemo, ...props });
  let changes = $derived((data.changes ?? []).slice(0, 3));
</script>

<CanvasFrame label={`${data.kicker} ${data.version}: ${data.headline}`}>
  <div class="grid h-full grid-rows-[auto_1fr_0.37fr]">
    <PosterMasthead
      kicker={data.kicker ?? "New release"}
      folio={data.footer ?? "SHIP NOTE / 07"}
      tone="blue"
    />

    <div class="grid min-h-0 grid-cols-[0.9fr_1.1fr]">
      <div class="flex min-w-0 flex-col border-r border-foreground p-[var(--canvas-safe-area)]">
        <p
          class="font-mono text-[18cqi] font-semibold leading-[0.76] tracking-[-0.09em] tabular-nums"
        >
          {data.version}
        </p>
        <h2
          class="mt-auto max-w-[10ch] text-[5.2cqi] font-semibold leading-[0.93] tracking-[-0.05em]"
        >
          {data.headline}
        </h2>
      </div>

      <div data-tone="blue" class="surface-pastel flex min-w-0 flex-col p-[5cqi]">
        <PosterRegistration />
        <p class="mt-[5cqi] font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.11em]">
          Three things that changed
        </p>
        <ol class="mt-auto">
          {#each changes as change, index (change)}
            <li
              class="grid grid-cols-[3cqi_1fr] gap-[1.5cqi] border-t border-foreground py-[2.3cqi] text-[2.6cqi] font-medium leading-tight"
            >
              <span class="font-mono text-[length:var(--canvas-type-label)] font-semibold tabular-nums">0{index + 1}</span>
              <span>{change}</span>
            </li>
          {/each}
        </ol>
      </div>
    </div>

    <div
      data-tone="yellow"
      class="surface-pastel surface-pastel-art relative grid min-h-0 grid-cols-[1fr_0.9fr] overflow-hidden border-t border-foreground"
    >
      <p
        class="self-center px-[var(--canvas-safe-area)] text-[4.2cqi] font-semibold leading-[0.95] tracking-[-0.04em]"
      >
        Small system.<br />Big point of view.
      </p>
      {#if data.character}
        <div class="self-end pr-[2cqi] pt-[1cqi]">
          <StoryArt
            src={data.character.src}
            alt={data.character.alt}
            frame="landscape"
          />
        </div>
      {/if}
    </div>
  </div>
</CanvasFrame>
