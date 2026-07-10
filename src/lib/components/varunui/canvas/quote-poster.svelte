<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface QuotePosterProps {
    kicker?: string;
    quote?: string;
    name?: string;
    role?: string;
    folio?: string;
    character?: PosterCharacter;
  }

  export const quotePosterDemo: QuotePosterProps = {
    kicker: "From the studio",
    quote: "The page finally feels like it belongs to the product.",
    name: "Maya Chen",
    role: "Product designer",
    folio: "FIELD NOTE / 08",
    character: {
      src: peepStanding12Asset,
      alt: "Maya sharing a note from the studio",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: QuotePosterProps = $props();
  let data = $derived({ ...quotePosterDemo, ...props });
</script>

<CanvasFrame label={`${data.quote} — ${data.name}`}>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <PosterMasthead
      kicker={data.kicker ?? "From the studio"}
      folio={data.folio ?? "FIELD NOTE / 08"}
      tone="green"
    />

    <div class="grid min-h-0 grid-cols-[1.16fr_0.84fr]">
      <div
        data-tone="green"
        class="surface-pastel relative flex min-w-0 flex-col border-r border-foreground p-[var(--canvas-safe-area)]"
      >
        <span class="font-serif text-[17cqi] leading-[0.55] text-primary" aria-hidden="true">“</span>
        <h2
          class="mt-[3cqi] max-w-[12ch] font-serif text-[6.9cqi] font-semibold leading-[0.98] tracking-[-0.035em]"
        >
          {data.quote}
        </h2>
        <div class="mt-auto border-t border-foreground pt-[2.7cqi]">
          <p class="text-[2.5cqi] font-semibold">{data.name}</p>
          <p class="mt-[0.6cqi] font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.1em]">
            {data.role}
          </p>
        </div>
      </div>

      <div
        data-tone="pink"
        class="surface-pastel surface-pastel-art relative flex min-w-0 items-end overflow-hidden px-[1cqi] pt-[9cqi]"
      >
        <div class="absolute right-[var(--canvas-safe-area)] top-[var(--canvas-safe-area)]">
          <PosterRegistration />
        </div>
        {#if data.character}
          <StoryArt
            src={data.character.src}
            alt={data.character.alt}
            frame="portrait"
          />
        {/if}
      </div>
    </div>
  </div>
</CanvasFrame>
