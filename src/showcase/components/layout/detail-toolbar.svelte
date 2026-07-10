<script lang="ts">
  import BreadcrumbNav from "$lib/components/varunui/component/breadcrumb-nav.svelte";
  import Navbar from "$lib/components/varunui/component/navbar.svelte";

  let {
    parentHref,
    parentLabel,
    label,
  }: {
    parentHref: string;
    parentLabel: string;
    label: string;
  } = $props();
</script>

<div class="sticky top-0 z-40">
  <Navbar ariaLabel="Catalog breadcrumb">
    {#snippet brand()}
      <BreadcrumbNav
        items={[
          { label: parentLabel, href: parentHref },
          { label, current: true },
        ]}
      />
    {/snippet}
  </Navbar>
</div>
