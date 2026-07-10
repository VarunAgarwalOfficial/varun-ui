<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type BrowserFrameStatusTone =
    "danger" | "warning" | "success" | "muted";

  export interface BrowserFrameStatusDot {
    tone?: BrowserFrameStatusTone;
    label?: string;
  }

  export interface BrowserFrameProps {
    title?: string;
    url?: string;
    secure?: boolean;
    statusDots?: BrowserFrameStatusDot[];
    chromeEnd?: Snippet;
    children?: Snippet;
  }

  export const browserFrameDemo: BrowserFrameProps = {
    title: "Dashboard",
    url: "app.varunui.dev/projects",
    secure: true,
    statusDots: [
      { tone: "danger", label: "Close" },
      { tone: "warning", label: "Minimize" },
      { tone: "success", label: "Fullscreen" },
    ],
  };
</script>

<script lang="ts">
  import { GlobeIcon, LockIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  const dotClasses: Record<BrowserFrameStatusTone, string> = {
    danger: "bg-danger",
    warning: "bg-warning",
    success: "bg-success",
    muted: "bg-muted-foreground/50",
  };

  let {
    title,
    url,
    secure = false,
    statusDots = [],
    chromeEnd,
    children,
  }: BrowserFrameProps = $props();

  const hasChromeStart = $derived(statusDots.length > 0);
  const UrlIcon = $derived(secure ? LockIcon : GlobeIcon);
</script>

{#snippet chromeStart()}
  {#if hasChromeStart}
    <div class="flex items-center gap-1.5" aria-label="Window controls">
      {#each statusDots as dot, index (index)}
        <span
          class={`size-2.5 shrink-0 rounded-full ${dotClasses[dot.tone ?? "muted"]}`}
          title={dot.label}
          aria-hidden={dot.label ? undefined : "true"}
          aria-label={dot.label}
        ></span>
      {/each}
    </div>
  {/if}
{/snippet}

{#snippet chromeMiddle()}
  <div class="flex min-w-0 flex-1 items-center justify-center gap-2">
    {#if title && url}
      <span
        class="hidden max-w-24 truncate font-mono text-xs text-muted-foreground sm:block"
      >
        {title}
      </span>
    {/if}

    {#if url}
      <div
        class="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-0.5 text-muted-foreground"
      >
        <UrlIcon class="size-3 shrink-0" aria-hidden="true" />
        <span class="truncate font-mono text-xs">{url}</span>
      </div>
    {:else if title}
      <span
        class="truncate font-mono text-xs text-muted-foreground"
      >
        {title}
      </span>
    {/if}
  </div>
{/snippet}

<div
  data-slot="browser-frame"
  class="flex w-full flex-col overflow-hidden rounded-md border border-border bg-surface text-foreground"
>
  <div
    data-slot="browser-frame-chrome"
    class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b border-border bg-muted/50 px-3 py-2"
  >
    {@render chromeStart()}
    {@render chromeMiddle()}
    <div>{@render chromeEnd?.()}</div>
  </div>

  <div data-slot="browser-frame-body" class="min-h-24">
    {@render children?.()}
  </div>
</div>
