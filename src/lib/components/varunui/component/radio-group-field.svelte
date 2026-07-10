<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type RadioGroupFieldOrientation = "vertical" | "grid";

  export interface RadioGroupFieldOption {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }

  export interface RadioGroupFieldProps {
    name?: string;
    value?: string;
    label: string;
    description?: string;
    options: readonly RadioGroupFieldOption[];
    orientation?: RadioGroupFieldOrientation;
    required?: boolean;
    disabled?: boolean;
    leading?: Snippet<[RadioGroupFieldOption, boolean]>;
    onValueChange?: (
      value: string,
      option: RadioGroupFieldOption,
    ) => void;
  }

  export const radioGroupFieldDemo: RadioGroupFieldProps = {
    label: "Notification cadence",
    description: "Choose how often this workspace should send updates.",
    value: "daily",
    options: [
      {
        label: "Immediate",
        value: "immediate",
        description: "Send each update as it happens.",
      },
      {
        label: "Daily digest",
        value: "daily",
        description: "Bundle activity into one concise summary.",
      },
      {
        label: "Weekly summary",
        value: "weekly",
        description: "Send a broader rollup every Friday.",
      },
    ],
  };
</script>

<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
  import {
    FieldDescription,
    FieldLegend,
    FieldSet,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import { RadioGroup } from "$lib/components/varunui/internal/ui/radio-group/index.js";

  let {
    name,
    value = $bindable(""),
    label,
    description,
    options,
    orientation = "vertical",
    required,
    disabled,
    leading,
    onValueChange,
  }: RadioGroupFieldProps = $props();

  const baseId = $props.id();
  const descriptionId = $derived(
    description ? `${baseId}-description` : undefined,
  );
  const isDisabled = $derived(Boolean(disabled || options.length === 0));
  const groupClass = $derived(
    orientation === "grid"
      ? "grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]"
      : "grid gap-2",
  );

  function optionClass(option: RadioGroupFieldOption) {
    const selected = value === option.value;
    return [
      "motion-interactive flex min-h-20 w-full min-w-0 items-start gap-3 rounded-none border p-4 text-left text-sm outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      selected
        ? "border-primary bg-primary/5 text-foreground"
        : "border-border bg-background text-foreground hover:bg-muted",
    ].join(" ");
  }

  function indicatorClass(option: RadioGroupFieldOption) {
    return [
      "motion-colors mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
      value === option.value
        ? "border-primary bg-primary"
        : "border-border bg-surface",
    ].join(" ");
  }

  function dotClass(option: RadioGroupFieldOption) {
    return [
      "motion-opacity size-1.5 rounded-full bg-background",
      value === option.value ? "opacity-100" : "opacity-0",
    ].join(" ");
  }

  function chooseValue(nextValue: string) {
    const option = options.find((item) => item.value === nextValue);
    if (!option || option.disabled || isDisabled) return;

    value = nextValue;
    onValueChange?.(nextValue, option);
  }
</script>

<FieldSet
  data-slot="radio-group-field"
  data-disabled={isDisabled || undefined}
  disabled={isDisabled || undefined}
  class="min-w-0 gap-3"
>
  <div class="grid gap-1.5">
    <FieldLegend variant="label">{label}</FieldLegend>
    {#if description}
      <FieldDescription id={descriptionId}>{description}</FieldDescription>
    {/if}
  </div>

  <RadioGroup
    bind:value
    {name}
    disabled={isDisabled || undefined}
    required={required || undefined}
    aria-describedby={descriptionId}
    class={groupClass}
    onValueChange={chooseValue}
  >
    {#each options as option, index (option.value)}
      {@const optionDescriptionId = option.description
        ? `${baseId}-option-${index}-description`
        : undefined}
      <RadioGroupPrimitive.Item
        value={option.value}
        disabled={disabled || option.disabled || undefined}
        aria-describedby={optionDescriptionId}
        class={optionClass(option)}
      >
        <span class={indicatorClass(option)} aria-hidden="true">
          <span class={dotClass(option)}></span>
        </span>
        {@render leading?.(option, value === option.value)}
        <span class="min-w-0 flex-1">
          <span class="block font-medium leading-none">{option.label}</span>
          {#if option.description}
            <span
              id={optionDescriptionId}
              class="mt-1 block text-xs leading-normal text-muted-foreground"
            >
              {option.description}
            </span>
          {/if}
        </span>
      </RadioGroupPrimitive.Item>
    {/each}
  </RadioGroup>
</FieldSet>
