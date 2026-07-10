<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    LinkIcon,
    TextAlignLeftIcon,
    TextBIcon,
    TextItalicIcon,
    TextStrikethroughIcon,
    TextUnderlineIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  export type ToolbarOrientation = "horizontal" | "vertical";
  export type ToolbarItemTone =
    | "neutral"
    | "primary"
    | "danger"
    | "inverse";

  export interface ToolbarItem {
    id: string;
    label: string;
    icon?: Component;
    showLabel?: boolean;
    count?: number | string;
    selected?: boolean;
    disabled?: boolean;
    tone?: ToolbarItemTone;
  }

  export interface ToolbarGroup {
    id?: string;
    items: ToolbarItem[];
  }

  export interface ToolbarProps {
    items?: ToolbarItem[];
    groups?: ToolbarGroup[];
    selected?: string | string[];
    disabled?: string | string[];
    orientation?: ToolbarOrientation;
    ariaLabel?: string;
    onItemSelect?: (item: ToolbarItem, event: MouseEvent) => void;
  }

  export const toolbarDemo: ToolbarProps = {
    ariaLabel: "Formatting tools",
    selected: ["bold"],
    items: [
      { id: "bold", icon: TextBIcon, label: "Bold", tone: "primary" },
      { id: "italic", icon: TextItalicIcon, label: "Italic" },
      { id: "underline", icon: TextUnderlineIcon, label: "Underline" },
      {
        id: "strike",
        icon: TextStrikethroughIcon,
        label: "Strikethrough",
      },
      { id: "align", icon: TextAlignLeftIcon, label: "Align left" },
      { id: "link", icon: LinkIcon, label: "Link" },
    ],
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";

  const orientationClasses: Record<ToolbarOrientation, string> = {
    horizontal: "inline-flex items-center",
    vertical: "inline-flex flex-col items-center",
  };

  const groupClasses: Record<ToolbarOrientation, string> = {
    horizontal: "flex items-center",
    vertical: "flex flex-col items-center",
  };

  const selectedClasses: Record<ToolbarItemTone, string> = {
    neutral: "bg-muted text-foreground hover:bg-muted",
    primary: "bg-primary/10 text-primary hover:bg-primary/15",
    danger: "bg-danger/10 text-danger hover:bg-danger/15",
    inverse: "bg-foreground text-background hover:bg-foreground/90",
  };

  const idleClasses: Record<ToolbarItemTone, string> = {
    neutral: "text-muted-foreground hover:bg-muted hover:text-foreground",
    primary: "text-muted-foreground hover:bg-primary/10 hover:text-primary",
    danger: "text-danger hover:bg-danger/10",
    inverse: "text-muted-foreground hover:bg-muted hover:text-foreground",
  };

  let {
    items = [],
    groups,
    selected,
    disabled,
    orientation = "horizontal",
    ariaLabel,
    onItemSelect,
  }: ToolbarProps = $props();

  const displayGroups = $derived(groups ?? [{ items }]);

  function hasId(value: string | string[] | undefined, id: string) {
    if (Array.isArray(value)) return value.includes(id);
    return value === id;
  }

  function isSelected(item: ToolbarItem) {
    return item.selected ?? hasId(selected, item.id);
  }

  function isSelectable(item: ToolbarItem) {
    return item.selected !== undefined || selected !== undefined;
  }

  function isDisabled(item: ToolbarItem) {
    return item.disabled ?? hasId(disabled, item.id);
  }

  function showText(item: ToolbarItem) {
    return item.showLabel || !item.icon;
  }

  function classesFor(item: ToolbarItem) {
    const tone = item.tone ?? "neutral";
    const stateClass = isSelected(item)
      ? selectedClasses[tone]
      : idleClasses[tone];
    const labelClass = showText(item) ? "px-2.5" : "";

    return `rounded-md text-xs [&_svg]:size-4 ${stateClass} ${labelClass}`;
  }

  function select(item: ToolbarItem, event: MouseEvent) {
    if (isDisabled(item)) return;
    onItemSelect?.(item, event);
  }
</script>

<div
  data-slot="toolbar"
  role="toolbar"
  aria-label={ariaLabel}
  aria-orientation={orientation}
  class={`${orientationClasses[orientation]} gap-0.5 rounded-lg border border-border bg-surface p-1`}
>
  {#each displayGroups as group, groupIndex (group.id ?? groupIndex)}
    {#if groupIndex > 0}
      <span
        data-slot="toolbar-separator"
        class={`shrink-0 bg-border ${orientation === "vertical" ? "my-1 h-px w-5" : "mx-1 h-5 w-px"}`}
        aria-hidden="true"
      ></span>
    {/if}

    <div
      data-slot="toolbar-group"
      class={`${groupClasses[orientation]} gap-0.5`}
    >
      {#each group.items as item (item.id)}
        {@const Icon = item.icon}
        {@const itemSelected = isSelected(item)}
        {@const itemSelectable = isSelectable(item)}
        {@const itemDisabled = isDisabled(item)}
        <Button
          type="button"
          variant="quiet"
          size="sm"
          iconOnly={!showText(item)}
          aria-label={item.label}
          aria-pressed={itemSelectable ? itemSelected : undefined}
          disabled={itemDisabled}
          title={Icon && !item.showLabel ? item.label : undefined}
          class={classesFor(item)}
          onclick={(event) => select(item, event)}
        >
          {#if Icon}
            <Icon aria-hidden="true" />
          {/if}
          {#if showText(item)}
            <span>{item.label}</span>
          {/if}
          {#if item.count !== undefined}
            <span
              class={`font-mono tabular-nums ${itemSelected ? "opacity-70" : "text-muted-foreground/70"}`}
            >
              {item.count}
            </span>
          {/if}
        </Button>
      {/each}
    </div>
  {/each}
</div>
