<script lang="ts" module>
  export type StoryArtFrame = "auto" | "portrait" | "landscape" | "square";

  export interface StoryArtProps {
    src: string;
    alt: string;
    frame?: StoryArtFrame;
  }
</script>

<script lang="ts">
  let { src, alt, frame = "auto" }: StoryArtProps = $props();
  let ready = $state(false);

  const filename = $derived(src.split("/").pop() ?? "");
  const inferredFrame = $derived<Exclude<StoryArtFrame, "auto">>(
    filename.startsWith("peep-standing-") || filename.startsWith("peep-sitting-1")
      ? "portrait"
      : filename.startsWith("peep-1")
        ? "square"
        : "landscape",
  );
  const resolvedFrame = $derived<Exclude<StoryArtFrame, "auto">>(
    frame === "auto" ? inferredFrame : frame,
  );
  const frameClasses: Record<Exclude<StoryArtFrame, "auto">, string> = {
    portrait: "aspect-[3/4] max-w-sm",
    landscape: "aspect-[4/3] max-w-lg",
    square: "aspect-square max-w-md",
  };
</script>

<div
  data-slot="story-art"
  data-frame={resolvedFrame}
  class={`grid w-full place-items-center overflow-hidden bg-transparent ${frameClasses[resolvedFrame]}`}
>
  <img
    data-story-art
    {src}
    {alt}
    loading="eager"
    decoding="sync"
    data-ready={ready}
    onload={() => (ready = true)}
    onerror={() => (ready = true)}
    class="motion-character-load size-full object-contain p-[var(--surface-padding-md)]"
  />
</div>
