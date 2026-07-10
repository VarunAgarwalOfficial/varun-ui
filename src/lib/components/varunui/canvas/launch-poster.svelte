<script lang="ts" module>
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface LaunchPosterProps {
    kicker?: string;
    headline?: string;
    date?: string;
    edition?: string;
    character?: PosterCharacter;
  }

  export const launchPosterDemo: LaunchPosterProps = {
    kicker: "varunUI is live",
    headline: "Build pages people remember.",
    date: "18 AUG 2026",
    edition: "RELEASE / 001",
    character: {
      src: peepStanding18Asset,
      alt: "A person celebrating the release",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import RotatingTextSeal from "$lib/components/varunui/component/rotating-text-seal.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: LaunchPosterProps = $props();
  let data = $derived({ ...launchPosterDemo, ...props });
</script>

<CanvasFrame label={data.headline ?? "Launch poster"}>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <PosterMasthead
      kicker={data.kicker ?? "varunUI is live"}
      folio={data.date ?? "18 AUG 2026"}
      tone="yellow"
    />

    <div class="grid min-h-0 grid-cols-[1.12fr_0.88fr]">
      <div
        data-tone="blue"
        class="surface-pastel relative flex min-w-0 flex-col border-r border-foreground p-[var(--canvas-safe-area)]"
      >
        <div class="mb-[5cqi]">
          <PosterRegistration />
        </div>
        <h2
          class="max-w-[7ch] text-[10.5cqi] font-semibold leading-[0.82] tracking-[-0.07em]"
        >
          {data.headline}
        </h2>
        <p
          class="mt-auto border-t border-foreground pt-[2.4cqi] font-mono text-[length:var(--canvas-type-label)] font-semibold tracking-[0.11em]"
        >
          {data.edition}
        </p>
      </div>

      <div
        data-tone="green"
        class="surface-pastel surface-pastel-art relative flex min-w-0 items-end overflow-hidden px-[2cqi] pt-[12cqi]"
      >
        <div class="absolute right-[4cqi] top-[4cqi] z-10 bg-background p-[0.8cqi]">
          <RotatingTextSeal text="READY WHEN YOU ARE • " size="sm" />
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
