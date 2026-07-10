<script lang="ts">
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import CultureAndValues from "$lib/components/varunui/block/culture-and-values.svelte";
  import EmployeeBenefits from "$lib/components/varunui/block/employee-benefits.svelte";
  import FeatureHero from "$lib/components/varunui/block/feature-hero.svelte";
  import HiringProcess from "$lib/components/varunui/block/hiring-process.svelte";
  import JobAlertsSignup from "$lib/components/varunui/block/job-alerts-signup.svelte";
  import JobListingsList from "$lib/components/varunui/block/job-listings-list.svelte";
  import SiteFooter from "$lib/components/varunui/block/site-footer.svelte";
  import SiteHeader from "$lib/components/varunui/block/site-header.svelte";
</script>

<SiteHeader active="careers" />

<FeatureHero
  kicker="Make the system with us"
  heading="Build the tools you wish your team already had."
  description="Work on real interface problems with people who care about the reasoning as much as the result."
  actions={[
    { label: "Browse open roles", href: "?", icon: ArrowRight },
    { label: "How we hire", href: "?", variant: "outline" },
  ]}
  character={{
    src: peepStanding5Asset,
    alt: "A person inviting someone to join the team",
    tone: "pink",
  }}
  level={1}
/>

<CultureAndValues />
<EmployeeBenefits />
<JobListingsList />
<HiringProcess />
<JobAlertsSignup />
<SiteFooter />
