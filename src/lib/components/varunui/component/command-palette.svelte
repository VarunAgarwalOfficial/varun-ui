<script lang="ts" module>
  export interface CommandPaletteItem {
    id: string;
    label: string;
    description?: string;
    meta?: string;
    href?: string;
    group?: string;
    keywords?: readonly string[];
    disabled?: boolean;
  }

  export interface CommandPaletteProps {
    items: readonly CommandPaletteItem[];
    triggerLabel: string;
    label: string;
    placeholder: string;
    emptyTitle: string;
    emptyDescription: string;
    shortcut?: string;
    maxResults?: number;
    open?: boolean;
    query?: string;
    selectedItem?: CommandPaletteItem | null;
    onOpenChange?: (open: boolean) => void;
    onQueryChange?: (query: string) => void;
    onSelect?: (item: CommandPaletteItem) => void;
  }

  export const commandPaletteDemo: CommandPaletteProps = {
    triggerLabel: "Search",
    label: "Search workspace",
    placeholder: "Search projects, documents, or actions...",
    emptyTitle: "No matches",
    emptyDescription: "Try another project, document, or action.",
    shortcut: "Cmd K",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Review workspace activity and recent changes.",
        meta: "Page",
        group: "Navigation",
      },
      {
        id: "settings",
        label: "Settings",
        description: "Update account preferences and team defaults.",
        meta: "Action",
        group: "Navigation",
      },
    ],
  };
</script>

<script lang="ts">
  import {
    Search as SearchIcon,
    X as XIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import SearchField from "$lib/components/varunui/component/search-field.svelte";
  import KeyboardShortcut from "$lib/components/varunui/component/keyboard-shortcut.svelte";

  interface CommandPaletteGroup {
    label?: string;
    items: CommandPaletteItem[];
  }

  let {
    items,
    triggerLabel,
    label,
    placeholder,
    shortcut,
    emptyTitle,
    emptyDescription,
    maxResults = 18,
    open = $bindable(false),
    query = $bindable(""),
    selectedItem = $bindable<CommandPaletteItem | null>(null),
    onOpenChange,
    onQueryChange,
    onSelect,
  }: CommandPaletteProps = $props();

  let activeIndex = $state(0);

  const shortcutKeys = $derived(
    shortcut ? shortcut.split(/[\s+]+/).filter((key) => key.length > 0) : [],
  );
  const normalizedQuery = $derived(query.trim().toLowerCase());
  const results = $derived(filterItems(items, normalizedQuery, maxResults));
  const resultGroups = $derived(groupItems(results));
  const activeItem = $derived(results[activeIndex]);

  function searchableText(item: CommandPaletteItem) {
    return [
      item.label,
      item.description,
      item.meta,
      item.group,
      ...(item.keywords ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function filterItems(
    nextItems: readonly CommandPaletteItem[],
    search: string,
    limit: number,
  ) {
    const visibleItems = search
      ? nextItems.filter((item) => searchableText(item).includes(search))
      : [...nextItems];

    return visibleItems.slice(0, Math.max(1, limit));
  }

  function groupItems(nextItems: readonly CommandPaletteItem[]) {
    if (!nextItems.some((item) => item.group)) {
      return [{ items: [...nextItems] }];
    }

    const groups: CommandPaletteGroup[] = [];

    for (const item of nextItems) {
      const label = item.group;
      let group = groups.find((entry) => entry.label === label);

      if (!group) {
        group = { label, items: [] };
        groups.push(group);
      }

      group.items.push(item);
    }

    return groups;
  }

  function openPalette() {
    updateOpen(true);
  }

  function closePalette() {
    updateOpen(false);
    updateQuery("");
    activeIndex = 0;
  }

  function updateOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
  }

  function updateQuery(nextQuery: string) {
    query = nextQuery;
    activeIndex = 0;
    onQueryChange?.(nextQuery);
  }

  function chooseItem(item: CommandPaletteItem) {
    if (item.disabled) return;

    selectedItem = item;
    onSelect?.(item);
    closePalette();
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette();
      return;
    }

    if (event.key === "Escape" && open) closePalette();
  }

  function handleDialogKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, Math.max(results.length - 1, 0));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      return;
    }

    if (event.key === "Enter" && activeItem && !activeItem.disabled) {
      const item = activeItem;

      event.preventDefault();
      chooseItem(item);
    }
  }

  function handleItemClick(event: MouseEvent, item: CommandPaletteItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    chooseItem(item);
  }

  function resultClasses(item: CommandPaletteItem, index: number) {
    const selected = index === activeIndex;
    const disabled = item.disabled;

    return `motion-colors grid w-full gap-1 rounded-lg px-3 py-2.5 text-left outline-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 ${selected ? "bg-muted" : ""} ${disabled ? "pointer-events-none opacity-50" : ""}`;
  }

  $effect(() => {
    query;
    results.length;
    activeIndex =
      results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1);
  });
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<Button
  type="button"
  variant="outline"
  size="lg"
  class="hidden w-56 justify-start text-muted-foreground md:flex lg:w-64"
  aria-label={triggerLabel}
  onclick={openPalette}
>
  <SearchIcon class="size-4 shrink-0" />
  <span class="flex-1">{triggerLabel}</span>
  {#if shortcutKeys.length}
    <KeyboardShortcut keys={shortcutKeys} />
  {/if}
</Button>

<Button
  type="button"
  variant="quiet"
  size="lg"
  iconOnly
  class="text-muted-foreground md:hidden"
  aria-label={triggerLabel}
  onclick={openPalette}
>
  <SearchIcon class="size-4" />
</Button>

{#if open}
  <div
    class="fixed inset-0 z-[100] bg-background px-4 py-16"
    role="presentation"
    onclick={closePalette}
  >
    <div
      class="mx-auto max-w-[var(--layout-prose)] overflow-hidden rounded-md border border-border bg-surface text-foreground"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabindex="-1"
      onclick={(event) => event.stopPropagation()}
      onkeydown={handleDialogKeydown}
    >
      <div class="flex items-center gap-3 border-b border-border px-4 py-3">
        <SearchField
          bind:value={query}
          {label}
          {placeholder}
          size="sm"
          clearable={false}
          autofocus
          onValueChange={updateQuery}
        />
        <Button
          type="button"
          variant="quiet"
          iconOnly
          class="text-muted-foreground"
          aria-label="Close"
          onclick={closePalette}
        >
          <XIcon class="size-4" />
        </Button>
      </div>

      <div class="max-h-[60vh] overflow-y-auto p-2">
        {#if results.length}
          {#each resultGroups as group, groupIndex (group.label ?? groupIndex)}
            {#if group.label}
              <div
                class="px-3 pt-2 pb-1 text-[11px] font-medium uppercase text-muted-foreground"
              >
                {group.label}
              </div>
            {/if}
            {#each group.items as item (item.id)}
              {@const itemIndex = results.indexOf(item)}
              {#if item.href}
                <a
                  href={item.href}
                  aria-disabled={item.disabled || undefined}
                  class={resultClasses(item, itemIndex)}
                  onmouseenter={() => (activeIndex = itemIndex)}
                  onfocus={() => (activeIndex = itemIndex)}
                  onclick={(event) => handleItemClick(event, item)}
                >
                  <span class="flex min-w-0 items-center justify-between gap-3">
                    <span class="truncate text-sm font-medium">
                      {item.label}
                    </span>
                    {#if item.meta}
                      <span class="shrink-0 font-mono text-xs text-muted-foreground">
                        {item.meta}
                      </span>
                    {/if}
                  </span>
                  {#if item.description}
                    <span class="line-clamp-1 text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  {/if}
                </a>
              {:else}
                <button
                  type="button"
                  disabled={item.disabled || undefined}
                  class={resultClasses(item, itemIndex)}
                  onmouseenter={() => (activeIndex = itemIndex)}
                  onfocus={() => (activeIndex = itemIndex)}
                  onclick={() => chooseItem(item)}
                >
                  <span class="flex min-w-0 items-center justify-between gap-3">
                    <span class="truncate text-sm font-medium">
                      {item.label}
                    </span>
                    {#if item.meta}
                      <span class="shrink-0 font-mono text-xs text-muted-foreground">
                        {item.meta}
                      </span>
                    {/if}
                  </span>
                  {#if item.description}
                    <span class="line-clamp-1 text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  {/if}
                </button>
              {/if}
            {/each}
          {/each}
        {:else}
          <div
            role="status"
            data-tone="yellow"
            class="surface-pastel border-y border-border px-[var(--surface-padding-md)] py-[var(--surface-padding-lg)] text-center"
          >
            <p class="text-sm font-semibold text-foreground">{emptyTitle}</p>
            <p class="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
