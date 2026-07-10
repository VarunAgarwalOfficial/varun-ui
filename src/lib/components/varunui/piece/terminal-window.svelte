<script lang="ts" module>
  export interface TerminalWindowProps {
    title?: string;
    prompt?: string;
    command?: string;
    output?: string[];
    success?: string;
  }

  export const terminalWindowDemo: TerminalWindowProps = {
    title: "deploy",
    prompt: "$",
    command: "varunui deploy --prod",
    output: ["Building application...", "Uploading assets..."],
    success: "Deployed in 4.2s",
  };
</script>

<script lang="ts">
  import { CheckIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    title,
    prompt = "$",
    command,
    output = [],
    success,
  }: TerminalWindowProps = $props();

  const frameClass = $derived(
    "w-full overflow-hidden rounded-md border border-border bg-foreground font-mono text-xs text-background",
  );
</script>

<div
  data-slot="terminal-window"
  class={frameClass}
>
  <div
    data-slot="terminal-window-chrome"
    class="flex items-center justify-between border-b border-border bg-background/10 px-3 py-2"
  >
    <div class="flex items-center gap-1.5" aria-hidden="true">
      <span class="size-2.5 rounded-full bg-danger"></span>
      <span class="size-2.5 rounded-full bg-warning"></span>
      <span class="size-2.5 rounded-full bg-success"></span>
    </div>

    {#if title}
      <span class="truncate text-background/70">{title}</span>
    {/if}
  </div>

  <div data-slot="terminal-window-body" class="flex min-h-24 flex-col gap-1.5 px-3 py-3">
    {#if command}
      <div class="flex gap-2">
        <span class="shrink-0 text-success">{prompt}</span>
        <span>{command}</span>
      </div>
    {/if}

    {#each output as line, index (index)}
      <span class="text-background/65">{line}</span>
    {/each}

    {#if success}
      <span class="flex items-center gap-1.5 text-success">
        <CheckIcon class="size-3.5 shrink-0" aria-hidden="true" />
        {success}
      </span>
    {/if}
  </div>
</div>
