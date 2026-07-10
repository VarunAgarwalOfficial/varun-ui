<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface NavbarLink {
    label: string;
    href: string;
    active?: boolean;
  }

  export interface NavbarProps {
    links?: NavbarLink[];
    open?: boolean;
    ariaLabel?: string;
    brand: Snippet;
    utilities?: Snippet;
    actions?: Snippet;
  }
</script>

<script lang="ts">
  import { ListIcon, XIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  const generatedId = $props.id();

  let {
    links = [],
    open = $bindable(false),
    ariaLabel = "Main",
    brand,
    utilities,
    actions,
  }: NavbarProps = $props();

  const menuId = `${generatedId}-menu`;

  function closeMenu() {
    open = false;
  }
</script>

<header class="relative z-50 w-full border-b border-border bg-background">
  <nav
    class="mx-auto flex h-14 max-w-[var(--layout-content-max)] items-center justify-between gap-4 px-[var(--layout-gutter)] text-foreground"
    aria-label={ariaLabel}
  >
    <div class="min-w-0 shrink-0">
      {@render brand()}
    </div>

    {#if links.length > 0}
      <div class="hidden items-center gap-6 xl:flex">
        {#each links as link}
          <a
            href={link.href}
            aria-current={link.active ? "page" : undefined}
            class="rounded-sm py-2 text-sm font-medium text-muted-foreground outline-none motion-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
          >
            <span
              class="link-underline motion-draw-left-trigger"
              class:motion-draw-left-active={Boolean(link.active)}
            >{link.label}</span>
          </a>
        {/each}
      </div>
    {/if}

    <div class="flex min-w-0 items-center gap-2">
      {@render utilities?.()}

      {#if actions}
        <div class="hidden items-center gap-2 xl:flex">
          {@render actions()}
        </div>
      {/if}

      {#if links.length > 0 || actions}
        <Button
          type="button"
          variant="outline"
          iconOnly
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onclick={() => (open = !open)}
          class="xl:hidden"
        >
          {#if open}
            <XIcon class="size-5" aria-hidden="true" />
          {:else}
            <ListIcon class="size-5" aria-hidden="true" />
          {/if}
        </Button>
      {/if}
    </div>
  </nav>

  {#if open && (links.length > 0 || actions)}
    <div id={menuId} class="border-t border-border bg-background motion-popover xl:hidden">
      <div class="mx-auto grid max-w-[var(--layout-content-max)] gap-1 px-[var(--layout-gutter)] py-4">
        {#each links as link}
          <a
            href={link.href}
            aria-current={link.active ? "page" : undefined}
            class="rounded-md px-3 py-3 text-base font-medium text-muted-foreground outline-none motion-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
            onclick={closeMenu}
          >
            <span
              class="link-underline motion-draw-left-trigger"
              class:motion-draw-left-active={Boolean(link.active)}
            >{link.label}</span>
          </a>
        {/each}

        {#if actions}
          <div class="mt-3 grid gap-2 border-t border-border pt-4">
            {@render actions()}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</header>
