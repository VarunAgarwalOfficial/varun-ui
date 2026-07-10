<script lang="ts">
  import { onMount } from "svelte";
  import { MoonIcon, SunIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    applyPaperTheme,
    readPaperTheme,
    togglePaperTheme,
    type PaperTheme,
  } from "$lib/theme.js";

  let theme = $state<PaperTheme>("light");

  const nextThemeLabel = $derived(
    theme === "light" ? "Use night paper" : "Use warm paper",
  );

  function toggle() {
    theme = togglePaperTheme(theme);
  }

  function sync(event: Event) {
    const nextTheme = (event as CustomEvent<{ theme?: PaperTheme }>).detail
      ?.theme;
    theme = nextTheme ?? readPaperTheme();
  }

  onMount(() => {
    theme = applyPaperTheme(readPaperTheme());
    window.addEventListener("varunui-theme-change", sync);

    return () => window.removeEventListener("varunui-theme-change", sync);
  });
</script>

<Button
  variant="quiet"
  iconOnly
  aria-label={nextThemeLabel}
  aria-pressed={theme === "dark"}
  title={nextThemeLabel}
  onclick={toggle}
>
  {#if theme === "light"}
    <MoonIcon aria-hidden="true" />
  {:else}
    <SunIcon aria-hidden="true" />
  {/if}
</Button>
