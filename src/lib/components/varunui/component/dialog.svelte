<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface DialogProps {
    triggerLabel: string;
    title: string;
    description?: string;
    closeLabel?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: Snippet;
    children?: Snippet;
    footer?: Snippet<[close: () => void]>;
  }

  export const dialogDemo: DialogProps = {
    triggerLabel: "Open dialog",
    title: "Share this review?",
    description:
      "Anyone with the link can read the brief and the latest decision notes.",
    open: true,
  };
</script>

<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui";
  import { X } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  let {
    triggerLabel,
    title,
    description,
    closeLabel = "Done",
    open = $bindable(false),
    onOpenChange,
    trigger,
    children,
    footer,
  }: DialogProps = $props();

  let triggerElement = $state<HTMLButtonElement | null>(null);

  function setOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
    if (!nextOpen && typeof window !== "undefined") {
      window.setTimeout(() => triggerElement?.focus(), 0);
    }
  }

  function close() {
    setOpen(false);
  }
</script>

<DialogPrimitive.Root bind:open onOpenChange={setOpen}>
  <DialogPrimitive.Trigger
    bind:ref={triggerElement}
    type="button"
    class="motion-interactive inline-flex h-[var(--control-height-md)] items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-4 text-sm font-medium whitespace-nowrap text-background outline-none hover:bg-primary/85 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50"
  >
    {#if trigger}
      {@render trigger()}
    {:else}
      {triggerLabel}
    {/if}
  </DialogPrimitive.Trigger>

  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      class="fixed inset-0 z-40 bg-foreground/20 data-closed:motion-dialog-overlay-out data-open:motion-dialog-overlay"
    />
    <DialogPrimitive.Content
      class="fixed top-1/2 left-1/2 z-50 grid max-h-[min(80dvh,42rem)] w-[min(calc(100%-2rem),32rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-background text-foreground outline-none data-closed:motion-dialog-out data-open:motion-dialog"
    >
      <div class="grid gap-2 border-b border-border px-5 py-5 pr-14 md:px-6">
        <DialogPrimitive.Title class="text-xl font-semibold tracking-tight">
          {title}
        </DialogPrimitive.Title>
        {#if description}
          <DialogPrimitive.Description
            class="max-w-[var(--layout-prose)] text-sm leading-6 text-muted-foreground"
          >
            {description}
          </DialogPrimitive.Description>
        {/if}
      </div>

      <button
        type="button"
        class="motion-interactive absolute top-3 right-3 inline-grid size-[var(--control-height-xs)] place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
        aria-label="Close dialog"
        onclick={close}
      >
        <X class="size-4" aria-hidden="true" />
      </button>

      {#if children}
        <div data-slot="dialog-body" class="overflow-y-auto px-5 py-5 md:px-6">
          {@render children()}
        </div>
      {/if}

      <div
        data-slot="dialog-footer"
        class="flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4 md:px-6"
      >
        {#if footer}
          {@render footer(close)}
        {:else}
          <Button variant="primary" onclick={close}>{closeLabel}</Button>
        {/if}
      </div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
</DialogPrimitive.Root>
