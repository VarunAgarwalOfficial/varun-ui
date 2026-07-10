<script lang="ts" module>
  export type RangeFieldMessageTone = "neutral" | "success" | "error";

  export interface RangeFieldProps {
    id: string;
    name?: string;
    value: number;
    label: string;
    description?: string;
    showLabel?: boolean;
    min: number;
    max: number;
    step: number;
    minLabel?: string;
    maxLabel?: string;
    valueLabel?: string;
    showOutput?: boolean;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    message?: string;
    messageTone?: RangeFieldMessageTone;
    onValueChange?: (value: number) => void;
  }

  export const rangeFieldDemo: RangeFieldProps = {
    id: "range-field1-demo",
    label: "Team size",
    description: "Set the expected number of active users.",
    showLabel: true,
    value: 24,
    min: 1,
    max: 100,
    step: 1,
    minLabel: "1",
    maxLabel: "100",
    valueLabel: "users",
  };
</script>

<script lang="ts">
  import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";

  let {
    id,
    name,
    value = $bindable(),
    label,
    description,
    showLabel = true,
    min,
    max,
    step,
    minLabel,
    maxLabel,
    valueLabel,
    showOutput = true,
    required,
    disabled,
    invalid,
    message,
    messageTone = "neutral",
    onValueChange,
  }: RangeFieldProps = $props();

  const descriptionId = $derived(
    description ? `${id}-description` : undefined,
  );
  const messageId = $derived(message ? `${id}-message` : undefined);
  const describedBy = $derived(
    [descriptionId, messageId].filter(Boolean).join(" ") || undefined,
  );
  const isInvalid = $derived(Boolean(invalid || messageTone === "error"));
  const progress = $derived(
    max === min
      ? 0
      : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)),
  );
  const displayValue = $derived(
    valueLabel
      ? `${formatNumber(value)} ${valueLabel}`
      : formatNumber(value),
  );
  const messageClass = $derived(
    messageTone === "success"
      ? "text-success"
      : messageTone === "error"
        ? "text-danger"
        : "text-muted-foreground",
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
</script>

<Field
  data-slot="range-field"
  data-disabled={disabled || undefined}
  data-invalid={isInvalid || undefined}
  class="min-w-0 gap-3"
>
  <div class="flex min-w-0 items-start justify-between gap-4">
    <div class="grid min-w-0 gap-1.5">
      <FieldLabel for={id} class={showLabel ? "" : "sr-only"}>
        {label}
      </FieldLabel>
      {#if description}
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      {/if}
    </div>

    {#if showOutput}
      <output
        for={id}
        aria-live="polite"
        class="shrink-0 text-sm font-semibold tabular-nums text-foreground"
      >
        {displayValue}
      </output>
    {/if}
  </div>

  <div
    data-slot="range-input"
    data-disabled={disabled || undefined}
    data-invalid={isInvalid || undefined}
    class:opacity-50={disabled}
    class:cursor-not-allowed={disabled}
    class:cursor-pointer={!disabled}
    class="range-shell relative flex h-8 w-full items-center"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 h-1 overflow-hidden rounded-full bg-muted"
    >
      <div
        class="range-progress h-full rounded-full"
        style={`width: ${progress}%`}
      ></div>
    </div>

    <input
      {id}
      {name}
      type="range"
      {min}
      {max}
      {step}
      {value}
      {required}
      {disabled}
      aria-describedby={describedBy}
      aria-invalid={isInvalid ? "true" : undefined}
      aria-valuetext={displayValue}
      oninput={(event) => updateValue(event.currentTarget.valueAsNumber)}
      class="range-native absolute inset-0 size-full cursor-inherit"
    />
  </div>

  <div class="flex items-center justify-between text-xs text-muted-foreground">
    <span>{minLabel ?? formatNumber(min)}</span>
    <span>{maxLabel ?? formatNumber(max)}</span>
  </div>

  {#if message}
    <p id={messageId} class={`text-xs leading-normal ${messageClass}`}>
      {message}
    </p>
  {/if}
</Field>

<style>
  .range-shell {
    --range-color: var(--color-primary);
    --range-focus: color-mix(in oklch, var(--color-primary) 28%, transparent);
  }

  .range-shell[data-invalid] {
    --range-color: var(--color-danger);
    --range-focus: color-mix(in oklch, var(--color-danger) 28%, transparent);
  }

  .range-progress { background: var(--range-color); }

  .range-native {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: transparent;
    accent-color: transparent;
    appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .range-native::-webkit-slider-runnable-track {
    height: 0.25rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    box-shadow: none;
  }

  .range-native::-webkit-slider-thumb {
    width: 1.125rem;
    height: 1.125rem;
    margin-top: -0.4375rem;
    border: 0;
    border-radius: 999px;
    background: var(--range-color);
    box-shadow: none;
    appearance: none;
    -webkit-appearance: none;
  }

  .range-native::-moz-range-track,
  .range-native::-moz-range-progress {
    height: 0.25rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    box-shadow: none;
  }

  .range-native::-moz-range-thumb {
    width: 1.125rem;
    height: 1.125rem;
    border: 0;
    border-radius: 999px;
    background: var(--range-color);
    box-shadow: none;
  }

  .range-native:focus-visible::-webkit-slider-thumb,
  .range-native:focus-visible::-moz-range-thumb {
    outline: 3px solid var(--range-focus);
    outline-offset: 2px;
  }
</style>
