<script lang="ts" module>
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface EditorialPosterProps {
    issue?: string;
    kicker?: string;
    headline?: string;
    deck?: string;
    footer?: string;
    character?: PosterCharacter;
  }

  export const editorialPosterDemo: EditorialPosterProps = {
    issue: "DESIGN NOTE / 04",
    kicker: "A point of view",
    headline: "Useful does not have to look boring.",
    deck: "Keep the structure quiet. Give the idea somewhere memorable to live.",
    footer: "varunUI / components for real pages",
    character: {
      src: peepStanding1Asset,
      alt: "A person presenting the design note",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: EditorialPosterProps = $props();
  let data = $derived({ ...editorialPosterDemo, ...props });
</script>

<CanvasFrame label={data.headline ?? "Editorial poster"}>
  <div class="grid h-full grid-rows-[auto_auto_1fr_auto]">
    <PosterMasthead
      kicker={data.kicker ?? "A point of view"}
      folio={data.issue ?? "DESIGN NOTE / 04"}
      tone="yellow"
    />

    <div class="relative border-b border-foreground px-[var(--canvas-safe-area)] py-[5cqi]">
      <div class="absolute right-[var(--canvas-safe-area)] top-[var(--canvas-safe-area)]">
        <PosterRegistration />
      </div>
      <h2
        class="max-w-[12ch] text-[9.25cqi] font-semibold leading-[0.82] tracking-[-0.065em]"
      >
        {data.headline}
      </h2>
    </div>

    <div class="grid min-h-0 grid-cols-[0.82fr_1.18fr]">
      <div
        data-tone="pink"
        class="surface-pastel surface-pastel-art grid min-w-0 place-items-end overflow-hidden border-r border-foreground px-[1.5cqi] pt-[4cqi]"
      >
        {#if data.character}
          <StoryArt
            src={data.character.src}
            alt={data.character.alt}
            frame="portrait"
          />
        {/if}
      </div>

      <div
        data-tone="yellow"
        class="surface-pastel flex min-w-0 flex-col justify-between p-[5cqi]"
      >
        <p class="max-w-[19ch] text-[3.1cqi] font-medium leading-[1.18] tracking-[-0.025em]">
          {data.deck}
        </p>
        <p class="font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.1em]">READ / KEEP / USE</p>
      </div>
    </div>

    <p
      class="border-t border-foreground px-[var(--canvas-safe-area)] py-[3.2cqi] font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.11em]"
    >
      {data.footer}
    </p>
  </div>
</CanvasFrame>
