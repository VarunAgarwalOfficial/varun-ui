<script lang="ts" module>
  import type { Component } from "svelte";

  export interface SidebarNavItem {
    id?: string;
    label: string;
    href?: string;
    icon?: Component;
    badge?: string;
    active?: boolean;
    disabled?: boolean;
    children?: SidebarNavItem[];
  }

  export interface SidebarNavSection {
    label?: string;
    items: SidebarNavItem[];
  }

  export interface SidebarNavProps {
    label: string;
    sections?: SidebarNavSection[];
    collapsed?: boolean;
    expandedIds?: string[];
    onItemSelect?: (item: SidebarNavItem, event: MouseEvent) => void;
  }

  export const sidebarNavDemo: SidebarNavProps = {
    label: "Workspace navigation",
    sections: [
      {
        label: "Workspace",
        items: [
          { label: "Overview", href: "?", active: true },
          { label: "Projects", href: "?", badge: "12" },
          { label: "Reports", href: "?" },
        ],
      },
      {
        label: "Settings",
        items: [
          { label: "Team", href: "?" },
          { label: "Billing", href: "?" },
        ],
      },
    ],
  };
</script>

<script lang="ts">
  import { CaretRightIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    label,
    sections = [],
    collapsed = false,
    expandedIds = [],
    onItemSelect,
  }: SidebarNavProps = $props();

  let expanded = $state<Record<string, boolean>>({});

  const iconClasses =
    "flex size-6 shrink-0 items-center justify-center text-muted-foreground motion-colors group-hover/sidebar-nav-item:text-foreground";

  function itemKey(item: SidebarNavItem, index: number) {
    return item.id ?? `${item.label}-${index}`;
  }

  function itemInitial(item: SidebarNavItem) {
    return item.label.trim().slice(0, 1).toUpperCase();
  }

  function itemIsActive(item: SidebarNavItem): boolean {
    return Boolean(item.active || item.children?.some(itemIsActive));
  }

  function isExpanded(item: SidebarNavItem, index: number) {
    const key = itemKey(item, index);
    return expanded[key] ?? expandedIds.includes(key);
  }

  function rowClass(item: SidebarNavItem) {
    const base =
      "group/sidebar-nav-item motion-colors flex min-h-[var(--control-height-xs)] w-full min-w-0 items-center rounded-md px-2 text-left outline-none focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";
    const gap = collapsed ? "justify-center gap-0" : "gap-2";
    const tone = itemIsActive(item)
      ? "bg-primary/10 text-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground";
    const disabled = item.disabled ? "pointer-events-none opacity-50" : "";

    return `${base} ${gap} ${tone} ${disabled}`;
  }

  function toggleItem(item: SidebarNavItem, index: number, event: MouseEvent) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (collapsed) {
      onItemSelect?.(item, event);
      return;
    }

    const key = itemKey(item, index);
    expanded[key] = !isExpanded(item, index);
    onItemSelect?.(item, event);
  }

  function selectItem(item: SidebarNavItem, event: MouseEvent) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    onItemSelect?.(item, event);
  }
</script>

{#snippet itemContent(item: SidebarNavItem, hasChildren: boolean, open: boolean)}
  {@const Icon = item.icon}
  {#if Icon}
    <span data-slot="sidebar-nav-icon" class={iconClasses}>
      <Icon class="size-4" aria-hidden="true" />
    </span>
  {:else if collapsed}
    <span
      data-slot="sidebar-nav-initial"
      aria-hidden="true"
      class="flex size-6 shrink-0 items-center justify-center text-xs font-semibold text-muted-foreground motion-colors group-hover/sidebar-nav-item:text-foreground"
    >
      {itemInitial(item)}
    </span>
  {/if}

  {#if !collapsed}
    <span class="flex min-w-0 flex-1 items-center gap-2">
      <span class="truncate text-sm font-medium">{item.label}</span>
      {#if item.badge}
        <span
          data-slot="sidebar-nav-badge"
          class="ml-auto shrink-0 rounded-sm bg-primary/10 px-1.5 py-0.5 text-[0.6875rem] font-semibold tabular-nums text-foreground"
        >
          {item.badge}
        </span>
      {/if}
    </span>

    {#if hasChildren}
      <CaretRightIcon
        class={`size-3.5 shrink-0 text-muted-foreground motion-transform ${open ? "rotate-90" : ""}`}
        aria-hidden="true"
      />
    {/if}
  {/if}
{/snippet}

{#if sections.length > 0}
  <nav
    data-slot="sidebar-nav"
    data-collapsed={collapsed}
    aria-label={label}
    class="flex min-h-0 flex-1 flex-col gap-[var(--layout-gap-md)] overflow-y-auto px-2 py-3"
  >
    {#each sections as section, sectionIndex (section.label ?? sectionIndex)}
      <section data-slot="sidebar-nav-section" class="grid gap-1">
        {#if section.label && !collapsed}
          <h3
            data-slot="sidebar-nav-section-label"
            class="px-2 text-xs font-semibold uppercase tracking-[var(--tracking-kicker)] text-muted-foreground"
          >
            {section.label}
          </h3>
        {/if}

        <ul data-slot="sidebar-nav-items" class="grid gap-1">
          {#each section.items as item, index (itemKey(item, index))}
            {@const hasChildren = Boolean(item.children?.length)}
            {@const open = isExpanded(item, index)}
            <li data-slot="sidebar-nav-item-wrapper">
              {#if hasChildren}
                <button
                  type="button"
                  disabled={item.disabled}
                  aria-expanded={collapsed ? undefined : open}
                  aria-current={item.active ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  title={collapsed ? item.label : undefined}
                  data-slot="sidebar-nav-item"
                  class={rowClass(item)}
                  onclick={(event) => toggleItem(item, index, event)}
                >
                  {@render itemContent(item, hasChildren, open)}
                </button>
              {:else if item.href}
                <a
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  aria-disabled={item.disabled || undefined}
                  aria-label={collapsed ? item.label : undefined}
                  tabindex={item.disabled ? -1 : undefined}
                  title={collapsed ? item.label : undefined}
                  data-slot="sidebar-nav-item"
                  class={rowClass(item)}
                  onclick={(event) => selectItem(item, event)}
                >
                  {@render itemContent(item, false, false)}
                </a>
              {:else}
                <button
                  type="button"
                  disabled={item.disabled}
                  aria-current={item.active ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  title={collapsed ? item.label : undefined}
                  data-slot="sidebar-nav-item"
                  class={rowClass(item)}
                  onclick={(event) => selectItem(item, event)}
                >
                  {@render itemContent(item, false, false)}
                </button>
              {/if}

              {#if hasChildren && open && !collapsed}
                <ul
                  data-slot="sidebar-nav-subitems"
                  class="motion-pop-in ml-5 mt-1 grid gap-1 border-l border-border pl-3"
                >
                  {#each item.children ?? [] as child, childIndex (itemKey(child, childIndex))}
                    <li>
                      {#if child.href}
                        <a
                          href={child.href}
                          aria-current={child.active ? "page" : undefined}
                          aria-disabled={child.disabled || undefined}
                          tabindex={child.disabled ? -1 : undefined}
                          data-slot="sidebar-nav-subitem"
                          class={`motion-colors flex min-h-[var(--control-height-xs)] items-center rounded-md px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-primary/50 ${child.active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${child.disabled ? "pointer-events-none opacity-50" : ""}`}
                          onclick={(event) => selectItem(child, event)}
                        >
                          <span class="truncate">
                            {child.label}
                          </span>
                        </a>
                      {:else}
                        <button
                          type="button"
                          disabled={child.disabled}
                          aria-current={child.active ? "page" : undefined}
                          data-slot="sidebar-nav-subitem"
                          class={`motion-colors flex min-h-[var(--control-height-xs)] w-full items-center rounded-md px-2 text-left text-sm outline-none focus-visible:ring-3 focus-visible:ring-primary/50 ${child.active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                          onclick={(event) => selectItem(child, event)}
                        >
                          <span class="truncate">
                            {child.label}
                          </span>
                        </button>
                      {/if}
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </nav>
{/if}
