<script lang="ts" module>
  import type { HTMLInputAttributes } from "svelte/elements";

  export type SearchFieldSize = "sm" | "md" | "lg";
  export type SearchFieldAutocomplete = HTMLInputAttributes["autocomplete"];

  export interface SearchFieldProps {
    id?: string;
    name?: string;
    value?: string;
    label: string;
    showLabel?: boolean;
    description?: string;
    placeholder?: string;
    size?: SearchFieldSize;
    shortcut?: string;
    clearable?: boolean;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    autofocus?: boolean;
    autocomplete?: SearchFieldAutocomplete;
    onValueChange?: (value: string) => void;
    onClear?: () => void;
  }

  export const searchFieldDemo: SearchFieldProps = {
    id: "search-input1-demo",
    label: "Search components",
    showLabel: true,
    description: "Filter by component name, category, or tag.",
    placeholder: "Search components",
    shortcut: "Cmd K",
    value: "",
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { Search, X } from "$lib/components/varunui/internal/icons/phosphor.js";
  import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-input`,
    name,
    value = $bindable(""),
    label,
    showLabel = false,
    description,
    placeholder,
    size = "md",
    shortcut,
    clearable = true,
    required = false,
    disabled = false,
    readonly = false,
    autofocus = false,
    autocomplete = "off",
    onValueChange,
    onClear,
  }: SearchFieldProps = $props();

  let inputElement: HTMLInputElement | null = $state(null);

  const labelIsVisible = $derived(showLabel || Boolean(description));
  const descriptionId = $derived(description ? `${id}-description` : undefined);
  const showClear = $derived(
    clearable && value.length > 0 && !disabled && !readonly,
  );
  const sizeClasses = $derived(
    size === "sm"
      ? "h-[var(--control-height-sm)] text-sm"
      : size === "lg"
        ? "h-[var(--control-height-lg)] text-base md:text-sm"
        : "h-[var(--control-height-md)] text-base md:text-sm",
  );
  const endPaddingClass = $derived(shortcut || showClear ? "pr-20" : "pr-3");

  onMount(() => {
    if (autofocus) inputElement?.focus();
  });

  function updateValue(nextValue: string) {
    if (readonly) return;

    value = nextValue;
    onValueChange?.(nextValue);
  }

  function clearValue() {
    updateValue("");
    onClear?.();
  }
</script>

<Field
  data-slot="search-input"
  data-disabled={disabled || undefined}
  class="min-w-0"
>
  <FieldLabel for={id} class={labelIsVisible ? undefined : "sr-only"}>
    {label}
  </FieldLabel>
  {#if description}
    <FieldDescription id={descriptionId}>{description}</FieldDescription>
  {/if}

  <div class="relative min-w-0">
    <Search
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
    />
    <input
      bind:this={inputElement}
      {id}
      {name}
      type="search"
      {value}
      {placeholder}
      {autocomplete}
      {required}
      {disabled}
      readonly={readonly || undefined}
      aria-describedby={descriptionId}
      oninput={(event) =>
        updateValue((event.currentTarget as HTMLInputElement).value)}
      class={`motion-colors w-full min-w-0 rounded-lg border border-border bg-background pl-9 outline-none placeholder:text-muted-foreground read-only:cursor-default disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 ${sizeClasses} ${endPaddingClass}`}
    />
    {#if shortcut && !showClear}
      <span
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 right-2 inline-flex h-5 -translate-y-1/2 items-center rounded-md bg-muted px-1.5 text-[10px] font-medium text-muted-foreground"
      >
        {shortcut}
      </span>
    {/if}
    {#if showClear}
      <button
        type="button"
        aria-label={`Clear ${label}`}
        onclick={clearValue}
        class="motion-interactive absolute top-1/2 right-2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <X aria-hidden="true" class="size-3.5" />
      </button>
    {/if}
  </div>
</Field>
