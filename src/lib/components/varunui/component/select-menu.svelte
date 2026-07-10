<script lang="ts" module>
  import type { Component } from "svelte";

  export type SelectMenuSize = "sm" | "md" | "lg";
  export type SelectMenuWidth = "compact" | "fit" | "full" | "wide";
  export type SelectMenuContentHeight = "default" | "short" | "tall";
  export type SelectMenuValueLayout = "inline" | "stacked";

  export interface SelectMenuOption {
    label: string;
    value: string;
    description?: string;
    swatches?: readonly string[];
    fontFamily?: string;
    disabled?: boolean;
  }

  export interface SelectMenuGroup {
    label?: string;
    options: readonly SelectMenuOption[];
  }

  export interface SelectMenuBaseProps {
    value?: string;
    label: string;
    placeholder?: string;
    size?: SelectMenuSize;
    width?: SelectMenuWidth;
    contentHeight?: SelectMenuContentHeight;
    valueLayout?: SelectMenuValueLayout;
    showLabel?: boolean;
    icon?: Component;
    disabled?: boolean;
    open?: boolean;
    onValueChange?: (value: string) => void;
    onOpenChange?: (open: boolean) => void;
  }

  export type SelectMenuProps = SelectMenuBaseProps &
    (
      | {
          options: readonly SelectMenuOption[];
          groups?: never;
        }
      | {
          groups: readonly SelectMenuGroup[];
          options?: never;
        }
    );

  export const selectMenuDemo: SelectMenuProps = {
    label: "Category",
    value: "components",
    open: true,
    options: [
      { label: "Blocks", value: "blocks" },
      { label: "Components", value: "components" },
      { label: "Layouts", value: "layouts" },
    ],
  };
</script>

<script lang="ts">
  import { FieldLabel } from "$lib/components/varunui/internal/ui/field/index.js";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectGroupHeading,
    SelectItem,
    SelectTrigger,
  } from "$lib/components/varunui/internal/ui/select/index.js";

  let {
    value = $bindable(""),
    label,
    options,
    groups,
    placeholder,
    size = "md",
    width = "compact",
    contentHeight = "default",
    valueLayout = "inline",
    showLabel = false,
    icon: Icon,
    disabled = false,
    open = $bindable(false),
    onValueChange,
    onOpenChange,
  }: SelectMenuProps = $props();

  const optionGroups = $derived(
    groups ?? [{ options: options as readonly SelectMenuOption[] }],
  );
  const allOptions = $derived(optionGroups.flatMap((group) => group.options));
  const selectedOption = $derived(
    allOptions.find((option) => option.value === value),
  );
  const selectedLabel = $derived(selectedOption?.label ?? placeholder ?? "");
  const triggerSizeClass = $derived(
    valueLayout === "stacked"
      ? size === "sm"
        ? "min-h-[var(--control-height-md)] py-2"
        : size === "lg"
          ? "min-h-14 py-2.5"
          : "min-h-[var(--control-height-lg)] py-2"
      : size === "sm"
        ? "h-[var(--control-height-sm)]"
        : size === "lg"
          ? "h-[var(--control-height-lg)]"
          : "h-[var(--control-height-md)]",
  );
  const triggerWidthClass = $derived(
    width === "full"
      ? "w-full"
      : width === "wide"
        ? "w-full sm:w-80"
        : width === "fit"
          ? valueLayout === "stacked"
            ? "min-w-52 max-w-80"
            : "min-w-36 max-w-64"
          : size === "sm"
            ? "w-full sm:w-48"
            : "w-full sm:w-56",
  );
  const triggerLayoutClass = $derived(
    valueLayout === "stacked"
      ? "*:data-[slot=select-value]:whitespace-normal"
      : "",
  );
  const contentHeightClass = $derived(
    contentHeight === "tall"
      ? "max-h-80"
      : contentHeight === "short"
        ? "max-h-72"
        : "",
  );

  function chooseValue(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function chooseOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
  }
</script>

<div data-slot="select-menu" class={showLabel ? "grid gap-1.5" : "contents"}>
  {#if showLabel}
    <FieldLabel class="text-xs font-medium uppercase text-muted-foreground">
      {label}
    </FieldLabel>
  {/if}

  <Select
    type="single"
    bind:value
    bind:open
    disabled={disabled || allOptions.length === 0 || undefined}
    onValueChange={chooseValue}
    onOpenChange={chooseOpen}
  >
    <SelectTrigger
      aria-label={label}
      {size}
      class={`${triggerSizeClass} ${triggerWidthClass} ${triggerLayoutClass} bg-background`}
      style={selectedOption?.fontFamily
        ? `font-family: ${selectedOption.fontFamily}`
        : undefined}
    >
      {#if valueLayout === "stacked"}
        <span
          data-slot="select-value"
          class="flex min-w-0 flex-1 flex-col items-start gap-0.5"
        >
          <span class="flex min-w-0 items-center gap-1.5 text-muted-foreground">
            {#if Icon}
              <Icon class="size-3.5 shrink-0" />
            {/if}
            {#if selectedOption?.swatches?.length}
              <span class="flex shrink-0 gap-0.5" aria-hidden="true">
                {#each selectedOption.swatches.slice(0, 3) as swatch}
                  <span
                    class="size-2.5 rounded-full border border-border"
                    style:background-color={swatch}
                  ></span>
                {/each}
              </span>
            {/if}
          </span>
          {#if selectedLabel}
            <span class="block max-w-full truncate font-medium text-foreground">
              {selectedLabel}
            </span>
          {/if}
        </span>
      {:else}
        <span
          data-slot="select-value"
          class="flex min-w-0 items-center gap-1.5"
        >
          {#if Icon}
            <Icon class="size-4 shrink-0 text-muted-foreground" />
          {/if}
          {#if selectedOption?.swatches?.length}
            <span class="flex shrink-0 gap-0.5" aria-hidden="true">
              {#each selectedOption.swatches.slice(0, 3) as swatch}
                <span
                  class="size-2.5 rounded-full border border-border"
                  style:background-color={swatch}
                ></span>
              {/each}
            </span>
          {/if}
          {#if selectedLabel}
            <span class="truncate">{selectedLabel}</span>
          {/if}
        </span>
      {/if}
    </SelectTrigger>
    <SelectContent class={contentHeightClass}>
      {#each optionGroups as group, groupIndex (group.label ?? groupIndex)}
        <SelectGroup>
          {#if group.label}
            <SelectGroupHeading>{group.label}</SelectGroupHeading>
          {/if}
          {#each group.options as option (option.value)}
            <SelectItem
              value={option.value}
              label={option.label}
              disabled={option.disabled || undefined}
            >
              <span
                class="flex min-w-0 items-center gap-2"
                style={option.fontFamily
                  ? `font-family: ${option.fontFamily}`
                  : undefined}
              >
                {#if option.swatches?.length}
                  <span class="flex gap-0.5" aria-hidden="true">
                    {#each option.swatches.slice(0, 3) as swatch}
                      <span
                        class="size-3 rounded-full border border-border"
                        style:background-color={swatch}
                      ></span>
                    {/each}
                  </span>
                {/if}
                <span class="min-w-0">
                  <span class="block truncate">{option.label}</span>
                  {#if option.description}
                    <span
                      class="mt-0.5 block truncate text-xs text-muted-foreground"
                    >
                      {option.description}
                    </span>
                  {/if}
                </span>
              </span>
            </SelectItem>
          {/each}
        </SelectGroup>
      {/each}
    </SelectContent>
  </Select>
</div>
