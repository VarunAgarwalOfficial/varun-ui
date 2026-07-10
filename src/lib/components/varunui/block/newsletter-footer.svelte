<script lang="ts" module>
  import type { LinkColumn } from "$lib/components/varunui/piece/link-columns.svelte";
  import type { SocialLink } from "$lib/components/varunui/piece/social-links.svelte";

  interface NewsletterContent {
    heading: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    note: string;
  }

  export interface NewsletterFooterProps {
    newsletter?: NewsletterContent;
    columns?: LinkColumn[];
    brand?: string;
    socials?: SocialLink[];
    copyright?: string;
  }

  export const newsletterFooterDemo: NewsletterFooterProps = {
    newsletter: {
      heading: "One useful note from the desk.",
      description:
        "A monthly note about the components, layouts, and product decisions that earned their place in varunUI.",
      placeholder: "you@example.com",
      buttonLabel: "Subscribe",
      note: "One email a month. Unsubscribe at any time.",
    },
    columns: [
      {
        title: "Build",
        links: [
          { label: "Pages", href: "/pages" },
          { label: "Blocks", href: "/blocks" },
          { label: "Components", href: "/components" },
          { label: "Layouts", href: "/layouts" },
        ],
      },
      {
        title: "Learn",
        links: [
          { label: "Canvases", href: "/canvases" },
          { label: "Pieces", href: "/pieces" },
          { label: "Emails", href: "/emails" },
          { label: "Characters", href: "/characters" },
        ],
      },
      {
        title: "varunUI",
        links: [
          { label: "About", href: "/pages/about" },
          { label: "Pricing", href: "/pages/pricing" },
          { label: "Careers", href: "/pages/careers" },
          { label: "Contact", href: "/pages/contact" },
        ],
      },
    ],
    brand: "varunUI",
    socials: [
      { icon: "instagram", href: "?", label: "Instagram" },
      {
        icon: "linkedin",
        href: "?",
        label: "LinkedIn",
      },
      {
        icon: "github",
        href: "?",
        label: "GitHub",
      },
    ],
    copyright: "© 2026 varunUI. All rights reserved.",
  };
</script>

<script lang="ts">
  import EmailCaptureForm from "$lib/components/varunui/component/email-capture-form.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import Footer from "$lib/components/varunui/piece/footer.svelte";
  import LinkColumns from "$lib/components/varunui/piece/link-columns.svelte";
  import SocialLinks from "$lib/components/varunui/piece/social-links.svelte";

  let {
    newsletter,
    columns = [],
    brand,
    socials = [],
    copyright,
  }: NewsletterFooterProps = $props();
</script>

<Footer>
  {#snippet lead()}
    {#if newsletter}
      <div class="max-w-md">
        <p class="text-sm font-semibold"><Marker text="From varunUI" tone="yellow" emphasis /></p>

        <h2 class="mt-5 text-2xl font-bold tracking-tight text-foreground">
          {newsletter.heading}
        </h2>
        <p class="mt-3 text-lg text-muted-foreground">
          {newsletter.description}
        </p>

        <div class="mt-6">
          <EmailCaptureForm
            id="newsletter-footer-email"
            label="Email address"
            placeholder={newsletter.placeholder}
            buttonLabel={newsletter.buttonLabel}
            consent={newsletter.note}
          />
        </div>
      </div>
    {:else if brand}
      <span class="text-base font-semibold tracking-tight text-foreground">{brand}</span>
    {/if}
  {/snippet}

  {#snippet navigation()}
    {#if columns.length > 0}
      <LinkColumns {columns} />
    {/if}
  {/snippet}

  {#snippet metaStart()}
    {#if brand}
      <span class="text-lg font-semibold tracking-tight text-foreground">{brand}</span>
    {/if}
  {/snippet}

  {#snippet metaEnd()}
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
      {#if socials.length > 0}
        <SocialLinks links={socials} />
      {/if}
      {#if copyright}
        <p class="text-sm text-muted-foreground">{copyright}</p>
      {/if}
    </div>
  {/snippet}
</Footer>
