<script lang="ts" module>
  export interface OptionSelectorOption {
    value: string;
    label: string;
    disabled?: boolean;
  }

  export interface OptionSelectorLabels {
    ariaLabel?: string;
    selected?: string;
    unavailable?: string;
  }

  export interface OptionSelectorProps {
    options?: readonly OptionSelectorOption[];
    value?: string;
    label?: string;
    actionLabel?: string;
    disabled?: boolean;
    labels?: OptionSelectorLabels;
    onValueChange?: (
      value: string,
      option: OptionSelectorOption,
    ) => void;
    onAction?: () => void;
  }

  export const optionSelectorDemo: OptionSelectorProps = {
    label: "Size",
    value: "m",
    actionLabel: "Size guide",
    options: [
      { label: "XS", value: "xs" },
      { label: "S", value: "s", disabled: true },
      { label: "M", value: "m" },
      { label: "L", value: "l" },
      { label: "XL", value: "xl" },
      { label: "XXL", value: "xxl", disabled: true },
    ],
  };
</script>

<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
  import { RadioGroup } from "$lib/components/varunui/internal/ui/radio-group/index.js";

  let {
    options = [],
    value = $bindable(""),
    label,
    actionLabel,
    disabled = false,
    labels,
    onValueChange,
    onAction,
  }: OptionSelectorProps = $props();

  function optionClass() {
    return [
      "relative flex h-[var(--control-height-xs)] min-w-[var(--control-height-sm)] items-center justify-center rounded-sm border px-2 text-xs font-medium outline-none motion-colors focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-80 disabled:hover:bg-surface data-checked:border-foreground data-checked:bg-foreground data-checked:text-background",
      "border-border bg-surface text-foreground hover:bg-muted",
    ].join(" ");
  }

  function optionAriaLabel(option: OptionSelectorOption, checked: boolean) {
    const parts = [option.label];
    if (checked && labels?.selected) parts.push(labels.selected);
    if (disabled || option.disabled) {
      if (labels?.unavailable) parts.push(labels.unavailable);
    }
    return parts.join(", ");
  }

  function chooseValue(nextValue: string) {
    const nextOption = options.find((option) => option.value === nextValue);
    if (!nextOption || disabled || nextOption.disabled) return;

    value = nextValue;
    onValueChange?.(nextValue, nextOption);
  }

</script>

<div class="grid gap-2">
  {#if label || actionLabel}
    <div class="flex items-baseline justify-between gap-3">
      {#if label}
        <span class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      {/if}
      {#if actionLabel}
        <button
          type="button"
          class="rounded-sm text-xs text-muted-foreground motion-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
          onclick={onAction}
        >
          <span class="link-underline motion-draw-left-trigger">
            {actionLabel}
          </span>
        </button>
      {/if}
    </div>
  {/if}

  {#if options.length > 0}
    <RadioGroup
      bind:value
      class="flex flex-wrap gap-1.5"
      disabled={disabled || undefined}
      aria-label={labels?.ariaLabel ?? label ?? undefined}
      onValueChange={chooseValue}
    >
      {#each options as option (option.value)}
        <RadioGroupPrimitive.Item
          value={option.value}
          disabled={disabled || option.disabled || undefined}
          aria-label={optionAriaLabel(option, value === option.value)}
          class={optionClass()}
        >
          {option.label}
          {#if option.disabled}
            <span
              class="absolute inset-x-1 top-1/2 h-px -rotate-12 bg-foreground/60"
              aria-hidden="true"
            ></span>
          {/if}
          {#if value === option.value && labels?.selected}
            <span class="sr-only">{labels.selected}</span>
          {/if}
        </RadioGroupPrimitive.Item>
      {/each}
    </RadioGroup>
  {/if}
</div>
