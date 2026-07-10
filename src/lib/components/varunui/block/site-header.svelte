<script lang="ts" module>
  export type SiteHeaderSection =
    | "product"
    | "pricing"
    | "careers"
    | "about"
    | "writing";

  export interface SiteHeaderProps {
    active?: SiteHeaderSection;
  }

  export const siteHeaderDemo: SiteHeaderProps = { active: "product" };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Navbar from "$lib/components/varunui/component/navbar.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Cluster from "$lib/components/varunui/layout/cluster.svelte";

  let { active }: SiteHeaderProps = $props();

  const homeHref = "/";
  const signInHref = "/pages/sign-in";
  const signUpHref = "/pages/sign-up";

  const links = $derived([
    { label: "Product", href: "/pages/product-home", active: active === "product" },
    { label: "Pricing", href: "/pages/pricing", active: active === "pricing" },
    { label: "Careers", href: "/pages/careers", active: active === "careers" },
    { label: "About", href: "/pages/about", active: active === "about" },
    { label: "Writing", href: "/pages/article-hub", active: active === "writing" },
  ]);
</script>

<Navbar {links} ariaLabel="varunUI site">
  {#snippet brand()}
    <Cluster gap="sm">
      <a href={homeHref} class="inline-flex items-center gap-2 font-semibold text-foreground">
        <span
          data-tone="yellow"
          class="surface-pastel surface-pastel-art grid size-7 place-items-center border border-border font-mono text-sm"
          aria-hidden="true"
        >
          v
        </span>
        <span>varunUI</span>
      </a>
    </Cluster>
  {/snippet}

  {#snippet actions()}
    <Cluster gap="sm">
      <Link href={signInHref} label="Sign in" />
      <Button href={signUpHref} size="sm">Start a workspace</Button>
    </Cluster>
  {/snippet}
</Navbar>
