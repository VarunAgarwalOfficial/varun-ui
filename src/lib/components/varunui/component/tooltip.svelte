<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type TooltipAlign = "start" | "center" | "end";
  export type TooltipSide = "top" | "right" | "bottom" | "left";

  export interface TooltipProps {
    label: string;
    triggerLabel: string;
    shortcut?: string;
    side?: TooltipSide;
    align?: TooltipAlign;
    delayDuration?: number;
    disabled?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: Snippet;
  }

  export const tooltipDemo: TooltipProps = {
    label: "Pin to favorites",
    triggerLabel: "Hover for tooltip",
    shortcut: "P",
    open: true,
  };
</script>

<script lang="ts">
  import { Tooltip } from "bits-ui";

  let {
    label,
    triggerLabel,
    shortcut,
    side = "top",
    align = "center",
    delayDuration = 450,
    disabled = false,
    open = $bindable(false),
    onOpenChange,
    trigger,
  }: TooltipProps = $props();

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange?.(nextOpen);
  }
</script>

<Tooltip.Root
  bind:open
  {delayDuration}
  {disabled}
  onOpenChange={handleOpenChange}
>
  <Tooltip.Trigger
    type="button"
    {disabled}
    aria-label={trigger ? triggerLabel : undefined}
    class="motion-interactive inline-flex max-w-full items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
  >
    {#if trigger}
      {@render trigger()}
    {:else}
      <span class="truncate">{triggerLabel}</span>
    {/if}
  </Tooltip.Trigger>

  <Tooltip.Portal>
    <Tooltip.Content
      {side}
      {align}
      sideOffset={6}
      class="data-open:motion-popover data-closed:motion-popover-out ring-background/10 z-50 flex max-w-72 origin-(--transform-origin) items-center gap-2 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background ring-1 outline-hidden"
    >
      <span>{label}</span>
      {#if shortcut}
        <kbd
          class="inline-flex h-4 min-w-4 items-center justify-center rounded-sm bg-background/15 px-1 font-mono text-[10px] text-background/80"
        >
          {shortcut}
        </kbd>
      {/if}
      <Tooltip.Arrow class="fill-foreground" />
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>
