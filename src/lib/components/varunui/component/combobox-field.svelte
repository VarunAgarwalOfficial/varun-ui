<script lang="ts" module>
  export interface ComboboxFieldOption {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }

  export interface ComboboxFieldProps {
    id?: string;
    name?: string;
    value?: string;
    label: string;
    description?: string;
    placeholder?: string;
    emptyLabel?: string;
    options: readonly ComboboxFieldOption[];
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    message?: string;
    open?: boolean;
    onValueChange?: (value: string) => void;
    onOpenChange?: (open: boolean) => void;
  }

  export const comboboxFieldDemo: ComboboxFieldProps = {
    id: "combobox-field-demo",
    label: "Owner",
    description: "Search the people who can own this decision.",
    placeholder: "Search people",
    value: "inez-rodriguez",
    open: true,
    options: [
      { label: "Maya Chen", value: "maya-chen", description: "Product design" },
      { label: "Arjun Mehta", value: "arjun-mehta", description: "Interface engineering" },
      { label: "Inez Rodriguez", value: "inez-rodriguez", description: "Content systems" },
      { label: "Noah Kim", value: "noah-kim", description: "Design tooling" },
    ],
  };
</script>

<script lang="ts">
  import { Combobox } from "bits-ui";
  import { CaretDownIcon, Check } from "$lib/components/varunui/internal/icons/phosphor.js";
  import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-combobox`,
    name,
    value = $bindable(""),
    label,
    description,
    placeholder = "Search options",
    emptyLabel = "No options match.",
    options,
    required = false,
    disabled = false,
    invalid = false,
    message,
    open = $bindable(false),
    onValueChange,
    onOpenChange,
  }: ComboboxFieldProps = $props();

  let query = $state("");

  const descriptionId = $derived(description ? `${id}-description` : undefined);
  const messageId = $derived(message ? `${id}-message` : undefined);
  const describedBy = $derived(
    [descriptionId, messageId].filter(Boolean).join(" ") || undefined,
  );
  const selectedOption = $derived(
    options.find((option) => option.value === value),
  );
  const items = $derived(
    options.map(({ label: optionLabel, value: optionValue, disabled: optionDisabled }) => ({
      label: optionLabel,
      value: optionValue,
      disabled: optionDisabled,
    })),
  );
  const filteredOptions = $derived(
    options.filter((option) => {
      const search = query.trim().toLocaleLowerCase();
      if (!search) return true;
      return `${option.label} ${option.description ?? ""}`
        .toLocaleLowerCase()
        .includes(search);
    }),
  );
  const isDisabled = $derived(disabled || options.length === 0);

  function chooseValue(nextValue: string) {
    value = nextValue;
    query = options.find((option) => option.value === nextValue)?.label ?? "";
    onValueChange?.(nextValue);
  }

  function chooseOpen(nextOpen: boolean) {
    open = nextOpen;
    if (!nextOpen) query = selectedOption?.label ?? "";
    onOpenChange?.(nextOpen);
  }
</script>

<Field
  data-slot="combobox-field"
  data-disabled={isDisabled || undefined}
  data-invalid={invalid || undefined}
  class="min-w-0"
>
  <FieldLabel for={id}>{label}</FieldLabel>
  {#if description}
    <FieldDescription id={descriptionId}>{description}</FieldDescription>
  {/if}

  <Combobox.Root
    type="single"
    bind:value
    bind:open
    {items}
    {name}
    required={required || undefined}
    disabled={isDisabled || undefined}
    inputValue={selectedOption?.label}
    onValueChange={chooseValue}
    onOpenChange={chooseOpen}
  >
    <div class="relative">
      <Combobox.Input
        {id}
        defaultValue={selectedOption?.label}
        {placeholder}
        aria-describedby={describedBy}
        aria-invalid={invalid ? "true" : undefined}
        oninput={(event) => (query = event.currentTarget.value)}
        class={`motion-colors h-[var(--control-height-md)] w-full min-w-0 rounded-lg border bg-background px-3 pr-11 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:bg-muted/50 disabled:opacity-50 ${invalid ? "border-danger/55 focus-visible:border-danger focus-visible:ring-3 focus-visible:ring-danger/20" : "border-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50"}`}
      />
      <Combobox.Trigger
        aria-label={`Open ${label}`}
        class="group/combobox-trigger motion-interactive absolute top-1/2 right-1 inline-grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
      >
        <CaretDownIcon
          class="size-4 motion-transform group-data-[state=open]/combobox-trigger:rotate-180"
          aria-hidden="true"
        />
      </Combobox.Trigger>
    </div>

    <Combobox.Portal>
      <Combobox.Content
        sideOffset={6}
        class="z-50 max-h-72 w-[var(--bits-combobox-anchor-width)] min-w-64 overflow-y-auto rounded-lg border border-border bg-background p-1 text-foreground outline-none data-closed:motion-popover-out data-open:motion-popover"
      >
        {#each filteredOptions as option (option.value)}
          <Combobox.Item
            value={option.value}
            label={option.label}
            disabled={option.disabled || undefined}
            class="motion-colors grid cursor-default grid-cols-[1fr_auto] gap-x-3 rounded-md px-3 py-2 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-45 data-highlighted:bg-muted"
          >
            <span class="min-w-0">
              <span class="block truncate font-medium">{option.label}</span>
              {#if option.description}
                <span class="mt-0.5 block truncate text-xs text-muted-foreground">
                  {option.description}
                </span>
              {/if}
            </span>
            {#if option.value === value}
              <Check class="mt-0.5 size-4 text-primary" aria-hidden="true" />
            {/if}
          </Combobox.Item>
        {:else}
          <p class="px-3 py-6 text-center text-sm text-muted-foreground">
            {emptyLabel}
          </p>
        {/each}
      </Combobox.Content>
    </Combobox.Portal>
  </Combobox.Root>

  {#if message}
    <p
      id={messageId}
      class={`text-xs leading-normal ${invalid ? "text-danger" : "text-muted-foreground"}`}
    >
      {message}
    </p>
  {/if}
</Field>
