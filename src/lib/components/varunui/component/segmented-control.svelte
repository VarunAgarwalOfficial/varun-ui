<script lang="ts" module>
  export interface SegmentedControlItem {
    label: string;
    value: string;
    disabled?: boolean;
  }

  export interface SegmentedControlProps {
    value?: string;
    items?: readonly SegmentedControlItem[];
    label?: string;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
  }

  export const segmentedControlDemo: SegmentedControlProps = {
    label: "Preview mode",
    value: "view",
    items: [
      { label: "View", value: "view" },
      { label: "Code", value: "code" },
      { label: "Notes", value: "notes", disabled: true },
    ],
  };
</script>

<script lang="ts">
  let {
    value = $bindable(""),
    items = [],
    label = "Segmented control",
    disabled = false,
    onValueChange,
  }: SegmentedControlProps = $props();

  const listClass = "inline-flex h-[var(--control-height-md)] w-fit items-center justify-center rounded-lg bg-muted p-0.5 text-muted-foreground";
  const triggerClass = "motion-interactive inline-flex h-[var(--control-height-sm)] shrink-0 items-center justify-center whitespace-nowrap rounded-md border border-transparent px-3 text-sm font-medium text-foreground outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 data-[selected=true]:border-primary data-[selected=true]:bg-background";

  function chooseValue(nextValue: string) {
    if (disabled || nextValue === value) return;

    value = nextValue;
    onValueChange?.(nextValue);
  }
</script>

<div
  role="tablist"
  aria-label={label}
  class={listClass}
>
  {#each items as item (item.value)}
    {@const selected = item.value === value}
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled || item.disabled || undefined}
      data-selected={selected ? "true" : undefined}
      onclick={() => chooseValue(item.value)}
      class={triggerClass}
    >
      {item.label}
    </button>
  {/each}
</div>
