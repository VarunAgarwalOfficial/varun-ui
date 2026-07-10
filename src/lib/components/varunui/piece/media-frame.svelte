<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import type { Snippet } from "svelte";

  export type MediaFrameObjectPosition = "center" | "top" | "bottom";

  export type MediaFrameMedia =
    | {
        type: "image";
        src: string;
        alt: string;
        position?: MediaFrameObjectPosition;
      }
    | {
        type: "video";
        src: string;
        label?: string;
        poster?: string;
        position?: MediaFrameObjectPosition;
      };

  export interface MediaFrameProps {
    media?: MediaFrameMedia;
    scrim?: boolean;
    children?: Snippet;
  }

  export const mediaFrameDemo: MediaFrameProps = {
    media: {
      type: "image",
      src: peepStanding12Asset,
      alt: "Team dashboard projected across a collaborative workspace",
    },
  };
</script>

<script lang="ts">
  let { media, scrim = true, children }: MediaFrameProps = $props();

  const positionClasses: Record<MediaFrameObjectPosition, string> = {
    center: "object-center",
    top: "object-top",
    bottom: "object-bottom",
  };
  const mediaClass = $derived(
    `absolute inset-0 size-full object-cover ${positionClasses[media?.position ?? "center"]}`,
  );
</script>

<div
  data-slot="media-frame"
  class="relative h-full min-h-[var(--layout-media-md)] overflow-hidden bg-muted"
>
  {#if media}
    {#if media.type === "video"}
      <video
        src={media.src}
        poster={media.poster}
        autoplay
        loop
        muted
        playsinline
        aria-label={media.label}
        aria-hidden={media.label ? undefined : "true"}
        class={mediaClass}
      ></video>
    {:else}
      <img src={media.src} alt={media.alt} class={mediaClass} />
    {/if}
  {/if}

  {#if scrim}
    <div class="absolute inset-0 bg-foreground/45 dark:bg-background/55"></div>
  {/if}

  {#if children}
    <div class="absolute inset-0 flex items-center p-[var(--surface-padding-lg)]">
      {@render children()}
    </div>
  {/if}
</div>
