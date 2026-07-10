<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type AppShellSide = "left" | "right";
  export type AppShellWidth = "sm" | "md" | "lg";
  export type AppShellCollapse = "none" | "icon";
  export type AppShellHeight = "screen" | "fill";

  export interface AppShellLabels {
    title: string;
    open: string;
    close: string;
    expand: string;
    collapse: string;
  }

  export interface AppShellProps {
    labels: AppShellLabels;
    open?: boolean;
    mobileOpen?: boolean;
    side?: AppShellSide;
    width?: AppShellWidth;
    collapse?: AppShellCollapse;
    height?: AppShellHeight;
    sidebar?: Snippet<[collapsed: boolean]>;
    header?: Snippet;
    footer?: Snippet<[collapsed: boolean]>;
    children?: Snippet;
  }

  export const appShellDemo: AppShellProps = {
    labels: {
      title: "Navigation",
      open: "Open navigation",
      close: "Close navigation",
      expand: "Expand navigation",
      collapse: "Collapse navigation",
    },
    open: true,
    mobileOpen: false,
    side: "left",
    width: "sm",
    collapse: "icon",
    height: "screen",
  };
</script>

<script lang="ts">
  import { CaretDoubleLeftIcon, ListIcon, XIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  let {
    labels,
    open = $bindable(true),
    mobileOpen = $bindable(false),
    side = "left",
    width = "sm",
    collapse = "icon",
    height = "screen",
    sidebar,
    header,
    footer,
    children,
  }: AppShellProps = $props();

  let mobilePanelElement = $state<HTMLDivElement>();
  let mobileCloseButton = $state<HTMLElement | null>(null);

  const widthClasses: Record<AppShellWidth, string> = {
    sm: "lg:w-[var(--layout-rail-sm)]",
    md: "lg:w-[var(--layout-rail-md)]",
    lg: "lg:w-[var(--layout-rail-lg)]",
  };

  const sideBorderClasses: Record<AppShellSide, string> = {
    left: "lg:border-r",
    right: "lg:border-l",
  };

  const rootHeightClasses: Record<AppShellHeight, string> = {
    screen: "min-h-[var(--layout-viewport-height)]",
    fill: "h-full min-h-0",
  };

  const sidebarHeightClasses: Record<AppShellHeight, string> = {
    screen: "min-h-[var(--layout-viewport-height)]",
    fill: "h-full min-h-0",
  };

  const mobileSideClasses: Record<AppShellSide, string> = {
    left: "left-0 data-[open=false]:-translate-x-full",
    right: "right-0 data-[open=false]:translate-x-full",
  };

  const sidebarWidthClass = $derived(
    collapse === "icon" && !open
      ? "lg:w-[var(--layout-rail-collapsed)]"
      : widthClasses[width],
  );
  const desktopSidebarClass = $derived(
    `motion-size hidden shrink-0 flex-col border-border bg-background text-foreground lg:flex ${sidebarHeightClasses[height]} ${sidebarWidthClass} ${sideBorderClasses[side]}`,
  );
  const mobilePanelClass = $derived(
    `motion-transform fixed top-0 bottom-0 z-50 flex w-[var(--layout-rail-md)] max-w-[calc(100vw_-_var(--layout-gap-lg))] flex-col border-border bg-background text-foreground ${side === "left" ? "border-r" : "border-l"} ${mobileSideClasses[side]}`,
  );
  const collapsed = $derived(collapse === "icon" && !open);
  const collapseIconRotation = $derived(
    side === "left"
      ? open ? "" : "rotate-180"
      : open ? "rotate-180" : "",
  );

  $effect(() => {
    if (!mobileOpen) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => mobileCloseButton?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  });

  function focusableMobileElements() {
    if (!mobilePanelElement) return [];

    return Array.from(
      mobilePanelElement.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ),
    ).filter((element) => element.offsetParent !== null);
  }

  function handleMobileKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMobileSidebar();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = focusableMobileElements();
    const first = focusable[0];
    const last = focusable.at(-1);

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function toggleDesktop() {
    if (collapse === "icon") open = !open;
  }

  function openMobileSidebar() {
    mobileOpen = true;
  }

  function closeMobileSidebar() {
    mobileOpen = false;
  }
</script>

{#snippet DesktopSidebar()}
  <aside data-slot="app-shell-sidebar" class={desktopSidebarClass}>
    <div class="flex min-h-0 flex-1 flex-col">
      {@render sidebar?.(collapsed)}
    </div>
    {#if footer || collapse === "icon"}
      <div class="flex flex-col border-t border-border p-2">
        {#if footer}
          {@render footer(collapsed)}
        {/if}
        {#if collapse === "icon"}
          <Button
            type="button"
            variant="quiet"
            size="xs"
            iconOnly
            aria-label={open ? labels.collapse : labels.expand}
            aria-expanded={open}
            onclick={toggleDesktop}
            class={collapsed
              ? "mx-auto mt-1 hidden lg:inline-flex"
              : "ml-auto mt-1 hidden lg:inline-flex"}
          >
            <CaretDoubleLeftIcon
              class={`size-4 motion-transform ${collapseIconRotation}`}
              aria-hidden="true"
            />
          </Button>
        {/if}
      </div>
    {/if}
  </aside>
{/snippet}

<div
  data-slot="app-shell"
  data-side={side}
  data-open={open}
  class={`${rootHeightClasses[height]} bg-background text-foreground lg:flex`}
>
  {#if side === "left"}
    {@render DesktopSidebar()}
  {/if}

  <div data-slot="app-shell-main" class="min-w-0 flex-1">
    <header
      data-slot="app-shell-header"
      class="sticky top-0 z-20 flex min-h-14 items-center gap-3 border-b border-border bg-background px-[var(--layout-gutter)]"
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        iconOnly
        aria-label={labels.open}
        aria-expanded={mobileOpen}
        onclick={openMobileSidebar}
        class="lg:hidden"
      >
        <ListIcon class="size-4" aria-hidden="true" />
      </Button>
      <div class="min-w-0 flex-1">
        {@render header?.()}
      </div>
    </header>

    <main data-slot="app-shell-content" class="min-w-0">
      {@render children?.()}
    </main>
  </div>

  {#if side === "right"}
    {@render DesktopSidebar()}
  {/if}

  <div
    data-slot="app-shell-mobile"
    data-open={mobileOpen}
    aria-hidden={!mobileOpen}
    inert={!mobileOpen}
    class={`lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
  >
      <button
        type="button"
        aria-label={labels.close}
        data-open={mobileOpen}
        onclick={closeMobileSidebar}
        class="motion-opacity fixed inset-0 z-40 bg-foreground/40 data-[open=false]:opacity-0"
      ></button>
      <div
        data-open={mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label={labels.title}
        tabindex="-1"
        bind:this={mobilePanelElement}
        class={mobilePanelClass}
        onkeydown={handleMobileKeydown}
      >
        <div class="flex items-center justify-between gap-3 border-b border-border p-3">
          <span class="text-sm font-semibold text-foreground">
            {labels.title}
          </span>
          <Button
            type="button"
            variant="quiet"
            size="sm"
            iconOnly
            aria-label={labels.close}
            bind:ref={mobileCloseButton}
            onclick={closeMobileSidebar}
          >
            <XIcon class="size-4" aria-hidden="true" />
          </Button>
        </div>
        <div class="min-h-0 flex-1 overflow-y-auto">
          {@render sidebar?.(false)}
        </div>
        {#if footer}
          <div class="border-t border-border p-2">
            {@render footer(false)}
          </div>
        {/if}
      </div>
  </div>
</div>
