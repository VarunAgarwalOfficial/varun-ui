<script lang="ts" module>
  import type { FaqItem } from "$lib/components/varunui/component/faq-accordion.svelte";

  export interface StandardFaqProps {
    eyebrow?: string;
    heading?: string;
    subline?: string;
    faqs?: FaqItem[];
  }

  export const standardFaqDemo: StandardFaqProps = {
    eyebrow: "Questions",
    heading: "Everything you might be wondering",
    subline:
      "Clear answers about using varunUI. Contact support when the answer depends on your workspace.",
    faqs: [
      {
        question: "What kind of product is varunUI?",
        answer:
          "We are an independent brand and product studio. We design identities, interfaces, and the connective tissue between them, then stay close while the work ships so nothing loses its edge on the way out the door.",
      },
      {
        question: "How do you usually start a project?",
        answer:
          "With a short, plainspoken discovery call. We learn what you are building, who it is for, and what success looks like. From there we shape a focused engagement with a clear timeline and a single flat price.",
      },
      {
        question: "Do you take on both brand and product work?",
        answer:
          "Yes, and we think it is the whole point. The same small team that defines your voice also designs the experience people touch, so the story holds together from the first glance to the final handoff.",
      },
      {
        question: "What does a typical engagement cost?",
        answer:
          "Every project is scoped to its goals, so we quote a flat price after discovery rather than billing loose hours. You always see the full shape of the work, and the price, before we begin.",
      },
      {
        question: "Who do you do your best work with?",
        answer:
          "Ambitious teams who care about craft and momentum in equal measure. Funded startups finding their footing, or established brands opening a new chapter, both bring out the sharpest version of what we do.",
      },
      {
        question: "How soon can we get going?",
        answer:
          "Usually within a week or two of aligning on scope. We book your kickoff, hand you one point of contact, and start delivering real work right away so you feel the momentum from the first sprint.",
      },
      {
        question: "What happens after the work ships?",
        answer:
          "We do not disappear. We leave you with clean files, clear documentation, and an open line, so your team can carry the work forward with confidence long after the engagement closes.",
      },
    ],
  };
</script>

<script lang="ts">
  import FaqAccordion from "$lib/components/varunui/component/faq-accordion.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let props: StandardFaqProps = $props();
  let data = $derived({ ...standardFaqDemo, ...props });
  const faqs = $derived(data.faqs ?? []);
</script>

<Section container="sm">
  <Stack gap="2xl">
    <SectionHeader
      kicker={data.eyebrow}
      title={data.heading}
      description={data.subline}
      size="lg"
      level={1}
    />
    <div class="mx-auto w-full max-w-[var(--layout-prose)]">
      <FaqAccordion items={faqs} />
    </div>
  </Stack>
</Section>
