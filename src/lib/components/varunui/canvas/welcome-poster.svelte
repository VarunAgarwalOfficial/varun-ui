<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface WelcomePosterProps {
    kicker?: string;
    headline?: string;
    note?: string;
    folio?: string;
    character?: PosterCharacter;
  }

  export const welcomePosterDemo: WelcomePosterProps = {
    kicker: "Welcome in",
    headline: "Come in. Make something useful.",
    note: "varunUI / made for real pages",
    folio: "POSTER 01 / HELLO",
    character: {
      src: peepStanding23Asset,
      alt: "A person waving from the welcome poster",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: WelcomePosterProps = $props();
  let data = $derived({ ...welcomePosterDemo, ...props });
</script>

<CanvasFrame label={data.headline ?? "Welcome poster"}>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <PosterMasthead
      kicker={data.kicker ?? "Welcome in"}
      folio={data.folio ?? "POSTER 01 / HELLO"}
      tone="yellow"
    />

    <div class="grid min-h-0 grid-cols-[1.08fr_0.92fr]">
      <div class="flex min-w-0 flex-col p-[var(--canvas-safe-area)] pr-[6cqi]">
        <PosterRegistration />

        <h2
          class="mt-[7cqi] max-w-[8ch] text-[9.5cqi] font-semibold leading-[0.84] tracking-[-0.065em]"
        >
          {data.headline}
        </h2>

        <p
          class="mt-auto border-t border-foreground pt-[2.5cqi] font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.11em]"
        >
          {data.note}
        </p>
      </div>

      <div
        data-tone="pink"
        class="surface-pastel surface-pastel-art relative grid min-w-0 overflow-hidden border-l border-foreground"
      >
        {#if data.character}
          <div class="relative mt-auto grid h-full place-items-end px-[2cqi] pt-[7cqi]">
            <StoryArt
              src={data.character.src}
              alt={data.character.alt}
              frame="portrait"
            />
          </div>
        {/if}
      </div>
    </div>
  </div>
</CanvasFrame>
