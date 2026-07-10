<script lang="ts">
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import ClosingCta from "$lib/components/varunui/block/closing-cta.svelte";
  import CultureAndValues from "$lib/components/varunui/block/culture-and-values.svelte";
  import FeatureHero from "$lib/components/varunui/block/feature-hero.svelte";
  import OutcomeStats from "$lib/components/varunui/block/outcome-stats.svelte";
  import SiteFooter from "$lib/components/varunui/block/site-footer.svelte";
  import SiteHeader from "$lib/components/varunui/block/site-header.svelte";
  import TeamAndMission from "$lib/components/varunui/block/team-and-mission.svelte";
</script>

<SiteHeader active="about" />

<FeatureHero
  kicker="Why varunUI exists"
  heading="Product work deserves a system people can follow."
  description="We turn repeated interface decisions into clear components, useful layouts, complete Blocks, and pages with a point of view."
  actions={[
    { label: "Read the principles", href: "?", icon: ArrowRight },
    { label: "Meet the components", href: "?", variant: "outline" },
  ]}
  character={{
    src: peepStanding1Asset,
    alt: "A person explaining the varunUI system",
    tone: "blue",
  }}
  level={1}
/>

<TeamAndMission facts={[]} />
<CultureAndValues />
<OutcomeStats />
<ClosingCta
  kicker="Use the opinion"
  heading="Start from a complete page, not an empty frame."
  description="Keep the varunUI decisions that help. Change the ones your product can explain."
  actions={[
    { label: "Browse pages", href: "?" },
    { label: "Open the system", href: "?", variant: "outline" },
  ]}
/>
<SiteFooter />
