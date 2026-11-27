<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import { Navbar } from "$lib";
  import favicon from "$lib/assets/favicon.svg";
  import GlobalSearch from "$showcase/components/global-search.svelte";
  import {
    catalogKindDefinitions,
    catalogKindOrder,
    isCatalogKind,
  } from "$showcase/catalog-kinds.js";
  import VarunuiIcon from "$lib/components/varunui/internal/brand/varunui-icon.svelte";
  import VarunuiLogo from "$lib/components/varunui/internal/brand/varunui-logo.svelte";

  let { children } = $props();

  const navLinks = [
    ...catalogKindOrder.map((kind) => ({
      label: catalogKindDefinitions[kind].title,
      href: `/${kind}`,
    })),
    { label: "Characters", href: "/characters" },
  ];

  const navItems = $derived(
    navLinks.map((item) => ({
      ...item,
      active: page.url.pathname.startsWith(item.href),
    })),
  );
  const pathParts = $derived(page.url.pathname.split("/").filter(Boolean));
  const isPreviewRoute = $derived(
    pathParts[0] === "preview" ||
      (pathParts.length === 2 && isCatalogKind(pathParts[0] ?? "")),
  );
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <script>
    {
      const root = document.documentElement;
      const stored = localStorage.getItem("varunui-paper-theme");
      const scheme = stored === "dark" ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(scheme);
      root.style.colorScheme = scheme;
    }
  </script>
</svelte:head>

<div class="min-h-[var(--layout-viewport-height)] bg-background text-foreground">
  {#if !isPreviewRoute}
    <div class="sticky top-0 z-50">
      <Navbar
        links={navItems}
        ariaLabel="Primary"
      >
        {#snippet brand()}
          <a
            href="/"
            aria-label="varunUI home"
            class="flex items-center gap-2 rounded-sm text-primary outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
          >
            <VarunuiIcon class="size-6 shrink-0" />
            <VarunuiLogo class="text-foreground" />
          </a>
        {/snippet}

        {#snippet utilities()}
          <GlobalSearch />
        {/snippet}
      </Navbar>
    </div>
  {/if}

  {@render children()}
</div>
