<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Navbar from "$lib/components/varunui/component/navbar.svelte";

  const links = [
    { label: "Blocks", href: "/blocks", active: true },
    { label: "Components", href: "/components" },
    { label: "Pieces", href: "/pieces" },
    { label: "Layouts", href: "/layouts" },
  ];
</script>

<div class="w-full">
  <Navbar {links}>
    {#snippet brand()}
      <a href="/" class="inline-flex items-center gap-2 font-semibold">
        <span class="flex size-7 items-center justify-center bg-yellow/25 text-sm">v</span>
        varunUI
      </a>
    {/snippet}

    {#snippet actions()}
      <Button href="/blocks" size="sm">Browse blocks</Button>
    {/snippet}
  </Navbar>
</div>
