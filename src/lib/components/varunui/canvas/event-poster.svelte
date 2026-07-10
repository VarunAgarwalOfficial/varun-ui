<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface EventPosterProps {
    kicker?: string;
    headline?: string;
    day?: string;
    month?: string;
    time?: string;
    location?: string;
    character?: PosterCharacter;
  }

  export const eventPosterDemo: EventPosterProps = {
    kicker: "varunUI workshop",
    headline: "Build a page with us.",
    day: "24",
    month: "SEP",
    time: "THU / 6:30 PM",
    location: "ONLINE / OPEN STUDIO",
    character: {
      src: peepSitting13Asset,
      alt: "A person arriving by bicycle for the workshop",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: EventPosterProps = $props();
  let data = $derived({ ...eventPosterDemo, ...props });
</script>

<CanvasFrame label={data.headline ?? "Event poster"}>
  <div class="grid h-full grid-rows-[auto_1fr_auto]">
    <PosterMasthead
      kicker={data.kicker ?? "varunUI workshop"}
      folio="POSTER / 03"
      tone="green"
    />

    <div class="grid min-h-0 grid-cols-[0.96fr_1.04fr]">
      <div class="flex min-w-0 flex-col border-r border-foreground p-[var(--canvas-safe-area)]">
        <h2
          class="max-w-[7ch] text-[9.2cqi] font-semibold leading-[0.83] tracking-[-0.065em]"
        >
          {data.headline}
        </h2>
        <div class="mt-auto flex items-end gap-[2cqi] border-t border-foreground pt-[3cqi]">
          <span class="font-mono text-[14cqi] font-semibold leading-[0.7] tracking-[-0.08em]"
            >{data.day}</span
          >
          <span
            class="pb-[0.6cqi] font-mono text-[3cqi] font-semibold tracking-[0.08em]"
            >{data.month}</span
          >
        </div>
      </div>

      <div
        data-tone="green"
        class="surface-pastel surface-pastel-art relative grid min-w-0 place-items-end overflow-hidden px-[2cqi] pt-[12cqi]"
      >
        <div class="absolute left-[var(--canvas-safe-area)] top-[var(--canvas-safe-area)]">
          <PosterRegistration />
        </div>
        {#if data.character}
          <StoryArt
            src={data.character.src}
            alt={data.character.alt}
            frame="landscape"
          />
        {/if}
      </div>
    </div>

    <div
      data-tone="yellow"
      class="surface-pastel grid grid-cols-[0.96fr_1.04fr] border-t border-foreground font-mono font-semibold uppercase tracking-[0.09em]"
    >
      <p class="px-[var(--canvas-safe-area)] py-[4cqi] text-[length:var(--canvas-type-label)]">{data.time}</p>
      <p class="border-l border-foreground px-[5cqi] py-[4cqi] text-right text-[length:var(--canvas-type-label)]">{data.location}</p>
    </div>
  </div>
</CanvasFrame>
