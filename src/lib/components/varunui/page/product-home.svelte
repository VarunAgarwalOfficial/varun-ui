<script lang="ts">
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import ClosingCta from "$lib/components/varunui/block/closing-cta.svelte";
  import FaqWithSupport from "$lib/components/varunui/block/faq-with-support.svelte";
  import FeatureHero from "$lib/components/varunui/block/feature-hero.svelte";
  import OutcomeStats from "$lib/components/varunui/block/outcome-stats.svelte";
  import ProductPreview from "$lib/components/varunui/block/product-preview.svelte";
  import SiteFooter from "$lib/components/varunui/block/site-footer.svelte";
  import SiteHeader from "$lib/components/varunui/block/site-header.svelte";
  import TestimonialQuote from "$lib/components/varunui/block/testimonial-quote.svelte";
</script>

<SiteHeader active="product" />

<FeatureHero
  kicker="Work, clearly"
  heading="A calmer home for product decisions."
  description="Keep the brief, the work, and the reason behind each decision in one place the whole team can follow."
  actions={[
    { label: "Start a workspace", href: "?", icon: ArrowRight },
    { label: "See how it works", href: "?", variant: "outline" },
  ]}
  character={{
    src: peepStanding18Asset,
    alt: "A person presenting a clear plan",
    tone: "blue",
  }}
  level={1}
/>

<OutcomeStats />
<ProductPreview />
<TestimonialQuote />
<FaqWithSupport />
<ClosingCta />
<SiteFooter />
