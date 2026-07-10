<script lang="ts" module>
  export type QuantityStepperSize = "sm" | "md";

  export interface QuantityStepperProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    size?: QuantityStepperSize;
    disabled?: boolean;
    increaseAriaLabel?: string;
    decreaseAriaLabel?: string;
    onValueChange?: (value: number) => void;
  }

  export const quantityStepperDemo: QuantityStepperProps = {
    label: "Quantity",
    value: 2,
    min: 1,
    max: 12,
    step: 1,
  };
</script>

<script lang="ts">
  import { Minus, Plus } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    label,
    value = $bindable(),
    min,
    max,
    step,
    size = "md",
    disabled = false,
    increaseAriaLabel,
    decreaseAriaLabel,
    onValueChange,
  }: QuantityStepperProps = $props();

  const displayValue = $derived(formatNumber(value));
  const decreaseDisabled = $derived(disabled || value <= min);
  const increaseDisabled = $derived(disabled || value >= max);
  const rootClass = $derived(
    size === "sm"
      ? "inline-flex h-[var(--control-height-xs)] w-fit items-center rounded-md border border-border bg-background"
      : "inline-flex h-[var(--control-height-md)] w-fit items-center rounded-lg border border-border bg-background",
  );
  const buttonClass = $derived(
    size === "sm"
      ? "motion-interactive inline-flex size-[var(--control-height-xs)] cursor-pointer items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
      : "motion-interactive inline-flex size-[var(--control-height-md)] cursor-pointer items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
  );
  const valueClass = $derived(
    size === "sm"
      ? "min-w-[var(--control-height-xs)] px-1 text-center text-sm font-semibold tabular-nums text-foreground"
      : "min-w-[var(--control-height-md)] px-1 text-center text-sm font-semibold tabular-nums text-foreground",
  );

  function precisionFor(nextStep: number) {
    const text = String(nextStep);
    if (text.includes("e-")) return Number(text.split("e-")[1] ?? 0);
    return text.includes(".") ? (text.split(".")[1]?.length ?? 0) : 0;
  }

  function formatNumber(nextValue: number) {
    return Number.isInteger(nextValue)
      ? String(nextValue)
      : String(Number(nextValue.toFixed(precisionFor(step))));
  }

  function normalizeValue(nextValue: number) {
    const stepped =
      Math.round((nextValue - min) / step) * step + min;
    const rounded = Number(stepped.toFixed(precisionFor(step)));
    return Math.min(max, Math.max(min, rounded));
  }

  function updateValue(nextValue: number) {
    if (disabled) return;

    const normalized = normalizeValue(nextValue);
    if (normalized === value) return;

    value = normalized;
    onValueChange?.(normalized);
  }

  function adjustValue(direction: -1 | 1) {
    updateValue(value + step * direction);
  }
</script>

<div
  data-slot="quantity-stepper"
  role="group"
  aria-label={label}
  class={rootClass}
>
  <button
    type="button"
    aria-label={decreaseAriaLabel ?? `Decrease ${label}`}
    disabled={decreaseDisabled || undefined}
    onclick={() => adjustValue(-1)}
    class={buttonClass}
  >
    <Minus class="size-4" aria-hidden="true" />
  </button>
  <output
    aria-live="polite"
    aria-atomic="true"
    aria-label={`${label}: ${displayValue}`}
    class={valueClass}
  >
    {displayValue}
  </output>
  <button
    type="button"
    aria-label={increaseAriaLabel ?? `Increase ${label}`}
    disabled={increaseDisabled || undefined}
    onclick={() => adjustValue(1)}
    class={buttonClass}
  >
    <Plus class="size-4" aria-hidden="true" />
  </button>
</div>
