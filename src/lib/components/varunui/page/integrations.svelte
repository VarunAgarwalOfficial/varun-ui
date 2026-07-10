<script lang="ts">
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import ClosingCta from "$lib/components/varunui/block/closing-cta.svelte";
  import FeatureHero from "$lib/components/varunui/block/feature-hero.svelte";
  import IntegrationGallery from "$lib/components/varunui/block/integration-gallery.svelte";
  import SiteFooter from "$lib/components/varunui/block/site-footer.svelte";
  import SiteHeader from "$lib/components/varunui/block/site-header.svelte";
</script>

<SiteHeader active="product" />
<FeatureHero
  kicker="Connected work"
  heading="Keep the tools. Fix the handoffs."
  description="varunUI connects the brief, the implementation, and the decision without asking the team to rebuild its workflow."
  actions={[
    { label: "Browse integrations", href: "?", icon: ArrowRight },
    { label: "Read the API guide", href: "?", variant: "outline" },
  ]}
  character={{
    src: peepStanding18Asset,
    alt: "A person connecting the tools used by their team",
    tone: "blue",
  }}
  level={1}
/>
<IntegrationGallery />
<ClosingCta
  kicker="One source of reason"
  heading="Connect the handoff that keeps losing context."
  description="Start with the tools you already use and bring the decision into view."
  actions={[
    { label: "Start a workspace", href: "?" },
    { label: "Request an integration", href: "?", variant: "outline" },
  ]}
/>
<SiteFooter />
