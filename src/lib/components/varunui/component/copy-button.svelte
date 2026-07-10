<script lang="ts" module>
  export interface CopyButtonProps {
    value: string;
    label?: string;
    prefix?: string;
    onCopy?: () => void;
  }

  export const copyButtonDemo: CopyButtonProps = {
    value: "npm install varunui",
    prefix: "$",
  };
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { CheckIcon, CopyIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  let {
    value,
    label,
    prefix,
    onCopy,
  }: CopyButtonProps = $props();

  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    value;
    copied = false;
  });

  onDestroy(() => {
    if (resetTimer) clearTimeout(resetTimer);
  });

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      onCopy?.();
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copied = false;
      }, 1600);
    } catch {
      copied = false;
    }
  }
</script>

<Button
  type="button"
  variant="outline"
  onclick={handleClick}
  aria-label={copied ? "Copied to clipboard" : `Copy "${value}" to clipboard`}
  class="group/copy-button h-auto min-h-[var(--control-height-md)] w-fit gap-3 font-mono"
>
  <span class="flex items-center gap-2 whitespace-nowrap">
    {#if prefix}
      <span class="text-muted-foreground" aria-hidden="true">{prefix}</span>
    {/if}
    {label ?? value}
  </span>
  <span class="relative grid size-4 place-items-center" aria-hidden="true">
    <CopyIcon
      class={`absolute size-4 motion-interactive ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
    />
    <CheckIcon
      class={`absolute size-4 text-success motion-interactive ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
    />
  </span>
  <span aria-live="polite" class="sr-only">
    {copied ? "Copied to clipboard" : ""}
  </span>
</Button>
