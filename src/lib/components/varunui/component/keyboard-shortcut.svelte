<script lang="ts" module>
  export interface KeyboardShortcutProps {
    keys: string[];
    separator?: string;
    label?: string;
  }

  export const keyboardShortcutDemo: KeyboardShortcutProps = {
    keys: ["⌘", "K"],
    label: "Open search",
  };
</script>

<script lang="ts">
  let {
    keys,
    separator = "",
    label,
  }: KeyboardShortcutProps = $props();
</script>

<span class="inline-flex items-center gap-1.5">
  {#each keys as key, index (key + index)}
    {#if index > 0 && separator}
      <span class="text-xs text-muted-foreground">{separator}</span>
    {/if}
    <kbd
      class="inline-flex min-w-5 items-center justify-center rounded-sm border border-border bg-muted px-1 py-0.5 font-mono text-[10px] font-medium leading-none text-muted-foreground"
    >
      {key}
    </kbd>
  {/each}
  {#if label}
    <span class="text-xs text-muted-foreground">{label}</span>
  {/if}
</span>

