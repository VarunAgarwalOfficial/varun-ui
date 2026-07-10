<script lang="ts">
  import Footer from "$lib/components/varunui/piece/footer.svelte";
  import LinkColumns from "$lib/components/varunui/piece/link-columns.svelte";
  import SocialLinks from "$lib/components/varunui/piece/social-links.svelte";

  const columns = [
    { title: "Product", links: [{ label: "Components", href: "?" }, { label: "Layouts", href: "?" }] },
    { title: "Company", links: [{ label: "About", href: "?" }, { label: "Careers", href: "?" }] },
    { title: "Help", links: [{ label: "Docs", href: "?" }, { label: "Contact", href: "?" }] },
  ];
  const social = [
    { icon: "github" as const, href: "?", label: "GitHub" },
    { icon: "linkedin" as const, href: "?", label: "LinkedIn" },
  ];
</script>

<Footer>
  {#snippet lead()}
    <p class="text-xl font-semibold">varunUI</p>
    <p class="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
      Warm paper components and familiar layouts for complete products.
    </p>
  {/snippet}

  {#snippet navigation()}<LinkColumns {columns} />{/snippet}

  {#snippet metaStart()}<p class="text-sm text-muted-foreground">© 2026 varunUI</p>{/snippet}
  {#snippet metaEnd()}<SocialLinks links={social} />{/snippet}
</Footer>
