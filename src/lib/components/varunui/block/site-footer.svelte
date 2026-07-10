<script lang="ts" module>
  export interface SiteFooterLink {
    label: string;
    href: string;
  }

  export interface SiteFooterProps {
    kicker?: string;
    heading?: string;
    action?: SiteFooterLink;
    email?: string;
    links?: SiteFooterLink[];
    socials?: SiteFooterLink[];
    copyright?: string;
  }

  export const siteFooterDemo: SiteFooterProps = {
    kicker: "Build from here",
    heading: "Start with a page. Change only what the product earns.",
    action: { label: "Browse pages", href: "/pages" },
    email: "hello@varunui.example",
    links: [
      { label: "Components", href: "/components" },
      { label: "Pieces", href: "/pieces" },
      { label: "Layouts", href: "/layouts" },
      { label: "Blocks", href: "/blocks" },
      { label: "Pages", href: "/pages" },
      { label: "Emails", href: "/emails" },
      { label: "Characters", href: "/characters" },
      { label: "Canvases", href: "/canvases" },
    ],
    socials: [
      { label: "GitHub", href: "?" },
      { label: "Instagram", href: "?" },
      { label: "LinkedIn", href: "?" },
    ],
    copyright: "© 2026 varunUI. All rights reserved.",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Footer from "$lib/components/varunui/piece/footer.svelte";

  let {
    kicker = siteFooterDemo.kicker,
    heading = siteFooterDemo.heading,
    action = siteFooterDemo.action,
    email = siteFooterDemo.email,
    links = siteFooterDemo.links ?? [],
    socials = siteFooterDemo.socials ?? [],
    copyright = siteFooterDemo.copyright,
  }: SiteFooterProps = $props();
</script>

<Footer>
  {#snippet lead()}
    <div class="grid max-w-xl gap-6">
      {#if kicker}
        <Marker text={kicker} tone="yellow" emphasis={true} />
      {/if}
      {#if heading}
        <h2 class="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          {heading}
        </h2>
      {/if}
      <div class="flex flex-wrap items-center gap-4">
        {#if action}
          <Button href={action.href} size="lg">{action.label}</Button>
        {/if}
        {#if email}
          <Link href={`mailto:${email}`} label={email} />
        {/if}
      </div>
    </div>
  {/snippet}

  {#snippet navigation()}
    {#if links.length > 0}
      <nav aria-label="Footer" class="grid gap-3 sm:grid-cols-2 lg:justify-items-end">
        {#each links as link (link.label)}
          <Link href={link.href} label={link.label} />
        {/each}
      </nav>
    {/if}
  {/snippet}

  {#snippet metaStart()}
    {#if copyright}
      <p class="text-sm text-muted-foreground">{copyright}</p>
    {/if}
  {/snippet}

  {#snippet metaEnd()}
    {#if socials.length > 0}
      <nav aria-label="Social" class="flex flex-wrap gap-x-5 gap-y-2">
        {#each socials as social (social.label)}
          <Link href={social.href} label={social.label} />
        {/each}
      </nav>
    {/if}
  {/snippet}
</Footer>
