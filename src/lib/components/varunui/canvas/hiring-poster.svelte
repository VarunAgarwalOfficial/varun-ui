<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  import type { PosterCharacter } from "./canvas.js";

  export interface HiringPosterProps {
    kicker?: string;
    role?: string;
    details?: string[];
    deadline?: string;
    footer?: string;
    character?: PosterCharacter;
  }

  export const hiringPosterDemo: HiringPosterProps = {
    kicker: "We are hiring",
    role: "Senior product designer",
    details: ["Permanent", "Remote", "AEST overlap"],
    deadline: "APPLY BY / 04 SEP",
    footer: "varunUI / careers",
    character: {
      src: peepStanding10Asset,
      alt: "A future teammate standing beside the open role",
    },
  };
</script>

<script lang="ts">
  import CanvasFrame from "$lib/components/varunui/canvas/internal/canvas-frame.svelte";
  import StoryArt from "$lib/components/varunui/character/story-art.svelte";
  import PosterMasthead from "$lib/components/varunui/canvas/internal/poster-masthead.svelte";
  import PosterRegistration from "$lib/components/varunui/canvas/internal/poster-registration.svelte";

  let props: HiringPosterProps = $props();
  let data = $derived({ ...hiringPosterDemo, ...props });
  let details = $derived((data.details ?? []).slice(0, 3));
</script>

<CanvasFrame label={`${data.kicker}: ${data.role}`}>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <PosterMasthead
      kicker={data.kicker ?? "We are hiring"}
      folio="JOIN THE CAST / 06"
      tone="pink"
    />

    <div class="grid min-h-0 grid-cols-[0.42fr_0.58fr]">
      <div
        data-tone="pink"
        class="surface-pastel surface-pastel-art relative flex min-w-0 flex-col overflow-hidden border-r border-foreground"
      >
        <div class="absolute left-[var(--canvas-safe-area)] top-[var(--canvas-safe-area)]">
          <PosterRegistration />
        </div>
        {#if data.character}
          <div class="mt-auto pl-[5cqi] pr-[1cqi] pt-[10cqi]">
            <StoryArt
              src={data.character.src}
              alt={data.character.alt}
              frame="portrait"
            />
          </div>
        {/if}
      </div>

      <div class="flex min-w-0 flex-col p-[var(--canvas-safe-area)]">
        <h2
          class="max-w-[8ch] text-[9.3cqi] font-semibold leading-[0.82] tracking-[-0.065em]"
        >
          {data.role}
        </h2>

        <div class="mt-auto border-t border-foreground">
          {#each details as detail (detail)}
            <p
              class="border-b border-foreground py-[1.8cqi] font-mono text-[length:var(--canvas-type-label)] font-semibold uppercase tracking-[0.09em]"
            >
              {detail}
            </p>
          {/each}
        </div>
        <div class="mt-[4cqi] flex items-end justify-between gap-[2cqi]">
          <p class="font-mono text-[length:var(--canvas-type-label)] font-semibold tracking-[0.1em]">{data.deadline}</p>
          <p class="text-right font-mono text-[length:var(--canvas-type-label)] font-semibold tracking-[0.1em]">{data.footer}</p>
        </div>
      </div>
    </div>
  </div>
</CanvasFrame>
