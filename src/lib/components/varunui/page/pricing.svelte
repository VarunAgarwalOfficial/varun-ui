<script lang="ts">
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import ClosingCta from "$lib/components/varunui/block/closing-cta.svelte";
  import FaqWithSupport from "$lib/components/varunui/block/faq-with-support.svelte";
  import FeatureHero from "$lib/components/varunui/block/feature-hero.svelte";
  import PlanComparison from "$lib/components/varunui/block/plan-comparison.svelte";
  import PricingPlans from "$lib/components/varunui/block/pricing-plans.svelte";
  import SiteFooter from "$lib/components/varunui/block/site-footer.svelte";
  import SiteHeader from "$lib/components/varunui/block/site-header.svelte";
</script>

<SiteHeader active="pricing" />

<FeatureHero
  kicker="Choose with confidence"
  heading="A plan for the team you have now."
  description="Start small, compare the real differences, and move plans when the work changes."
  actions={[
    { label: "Start with Team", href: "?", icon: ArrowRight },
    { label: "Compare every feature", href: "?", variant: "outline" },
  ]}
  character={{
    src: peepSitting8Asset,
    alt: "A person reviewing the available plans",
    tone: "yellow",
  }}
  level={1}
/>

<PricingPlans />
<PlanComparison />
<FaqWithSupport />
<ClosingCta
  kicker="Start small"
  heading="Bring one active project into varunUI."
  description="Use the trial to test a real review, a real handoff, and the people who need to follow both."
  actions={[
    { label: "Start a trial", href: "?" },
    { label: "Talk to sales", href: "?", variant: "outline" },
  ]}
/>
<SiteFooter />
