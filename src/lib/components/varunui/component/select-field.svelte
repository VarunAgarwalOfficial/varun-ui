<script lang="ts" module>
  import type { HTMLInputAttributes } from "svelte/elements";

  export type SelectFieldAutocomplete = HTMLInputAttributes["autocomplete"];

  export interface SelectFieldOption {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }

  export interface SelectFieldProps {
    id?: string;
    name?: string;
    value?: string;
    label: string;
    description?: string;
    placeholder?: string;
    options: readonly SelectFieldOption[];
    autocomplete?: SelectFieldAutocomplete;
    required?: boolean;
    disabled?: boolean;
    open?: boolean;
    onValueChange?: (value: string) => void;
    onOpenChange?: (open: boolean) => void;
  }

  export const selectFieldDemo: SelectFieldProps = {
    id: "select-field1-demo",
    label: "Status",
    description: "Choose the state this item should use.",
    value: "active",
    open: true,
    options: [
      { label: "Draft", value: "draft" },
      { label: "Active", value: "active" },
      { label: "Archived", value: "archived" },
    ],
  };
</script>

<script lang="ts">
  import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "$lib/components/varunui/internal/ui/select/index.js";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-trigger`,
    name,
    value = $bindable(""),
    label,
    description,
    placeholder,
    options,
    autocomplete = "off",
    required = false,
    disabled = false,
    open = $bindable(false),
    onValueChange,
    onOpenChange,
  }: SelectFieldProps = $props();

  const descriptionId = $derived(description ? `${id}-description` : undefined);
  const selectedOption = $derived(
    options.find((option) => option.value === value),
  );
  const selectItems = $derived(
    options.map((option) => ({
      label: option.label,
      value: option.value,
      disabled: option.disabled,
    })),
  );
  const isDisabled = $derived(disabled || options.length === 0);

  function chooseValue(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function chooseOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
  }
</script>

<Field
  data-slot="select-field"
  data-disabled={isDisabled || undefined}
  class="min-w-0"
>
  <FieldLabel for={id}>{label}</FieldLabel>
  {#if description}
    <FieldDescription id={descriptionId}>{description}</FieldDescription>
  {/if}

  <Select
    type="single"
    bind:value
    bind:open
    items={selectItems}
    {name}
    {autocomplete}
    required={required || undefined}
    disabled={isDisabled || undefined}
    onValueChange={chooseValue}
    onOpenChange={chooseOpen}
  >
    <SelectTrigger
      {id}
      aria-label={label}
      aria-describedby={descriptionId}
      class="w-full bg-background"
    >
      <span data-slot="select-value" class="min-w-0">
        <span
          class={[
            "block truncate",
            selectedOption ? "" : "text-muted-foreground",
          ].join(" ")}
        >
          {selectedOption?.label ?? placeholder}
        </span>
      </span>
    </SelectTrigger>
    <SelectContent>
      {#each options as option (option.value)}
        <SelectItem
          value={option.value}
          label={option.label}
          disabled={option.disabled || undefined}
        >
          <span class="min-w-0">
            <span class="block truncate">{option.label}</span>
            {#if option.description}
              <span class="mt-0.5 block truncate text-xs text-muted-foreground">
                {option.description}
              </span>
            {/if}
          </span>
        </SelectItem>
      {/each}
    </SelectContent>
  </Select>
</Field>
