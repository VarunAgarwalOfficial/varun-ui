<script lang="ts" module>
  export type CategoryFilterOrientation =
    | "horizontal"
    | "vertical"
    | "responsive";

  export interface CategoryFilterCategory {
    label: string;
    value: string;
    disabled?: boolean;
  }

  export interface CategoryFilterProps {
    categories: readonly CategoryFilterCategory[];
    active?: string;
    orientation?: CategoryFilterOrientation;
    label: string;
    disabled?: boolean;
    onActiveChange?: (active: string, category: CategoryFilterCategory) => void;
  }

  export const categoryFilterDemo: CategoryFilterProps = {
    label: "Categories",
    active: "general",
    categories: [
      { label: "General", value: "general" },
      { label: "Billing", value: "billing" },
      { label: "Security", value: "security" },
      { label: "Support", value: "support" },
    ],
  };
</script>

<script lang="ts">
  let {
    categories,
    active = $bindable(),
    orientation = "responsive",
    label,
    disabled = false,
    onActiveChange,
  }: CategoryFilterProps = $props();

  const listClass = $derived(
    orientation === "horizontal"
      ? "flex flex-row gap-2 overflow-x-auto"
      : orientation === "vertical"
        ? "flex flex-col gap-2"
        : "flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible",
  );

  const ariaOrientation = $derived(
    orientation === "vertical" ? "vertical" : "horizontal",
  );

  function itemClass(selected: boolean) {
    const base = "motion-interactive h-[var(--control-height-sm)] cursor-pointer whitespace-nowrap rounded-lg px-3 text-left text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";
    return selected
      ? `${base} bg-muted text-foreground`
      : `${base} text-muted-foreground hover:bg-muted/60 hover:text-foreground`;
  }

  function selectCategory(
    nextValue: string,
    category: CategoryFilterCategory,
  ) {
    if (disabled || category.disabled || nextValue === active) return;

    active = nextValue;
    onActiveChange?.(nextValue, category);
  }
</script>

{#if categories.length > 0}
  <div
    role="tablist"
    aria-label={label}
    aria-orientation={ariaOrientation}
    class={listClass}
  >
    {#each categories as category, categoryIndex (`${category.value}-${categoryIndex}`)}
      {@const selected = category.value === active}
      <button
        type="button"
        role="tab"
        aria-selected={selected}
        disabled={disabled || category.disabled || undefined}
        data-selected={selected ? "true" : undefined}
        onclick={() => selectCategory(category.value, category)}
        class={itemClass(selected)}
      >
        {category.label}
      </button>
    {/each}
  </div>
{/if}
