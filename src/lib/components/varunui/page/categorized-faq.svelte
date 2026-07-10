<script lang="ts" module>
  import type { FaqItem } from "$lib/components/varunui/component/faq-accordion.svelte";

  interface Faq extends FaqItem {
  }

  interface FaqCategory {
    tabLabel: string;
    faqs: Faq[];
  }

  export interface CategorizedFaqProps {
    heading?: string;
    label?: string;
    categories?: FaqCategory[];
  }

  export const categorizedFaqDemo: CategorizedFaqProps = {
    heading: "Questions, sorted",
    label: "FAQ",
    categories: [
      {
        tabLabel: "Working together",
        faqs: [
          {
            question: "What is it like to use varunUI?",
            answer:
              "You get a tight-knit studio that behaves like an internal team. We share work early, talk in plain language, and keep you close to every decision so the direction always feels like yours.",
          },
          {
            question: "Do you work as an agency or an embedded studio?",
            answer:
              "We are an independent product and brand studio. We plug into your team, take real ownership of outcomes, and stay accountable to the results rather than just handing over deliverables.",
          },
          {
            question: "Which teams get the most out of varunUI?",
            answer:
              "Ambitious teams who care about craft and momentum in equal measure. Whether you are a funded startup chasing product-market fit or an established brand opening a new chapter, that is where we do our best work.",
          },
        ],
      },
      {
        tabLabel: "Process",
        faqs: [
          {
            question: "How does a typical engagement start?",
            answer:
              "With a short discovery call to understand your goals, followed by a focused proposal. Once we align, we book a kickoff, hand you a single point of contact, and start shipping real work right away.",
          },
          {
            question: "How do you keep us in the loop?",
            answer:
              "We move in weekly sprints and share progress as it happens, not just at the finish line. You always know what we are working on, what is next, and where the open questions live.",
          },
          {
            question: "Can you cover both brand and product?",
            answer:
              "Yes, and that is the point. The same people who shape your identity also design the product experience, so your story stays coherent from first impression all the way to a paying customer.",
          },
          {
            question: "How soon can we get started?",
            answer:
              "Usually within a week or two. Once scope is agreed we lock your kickoff date and begin delivering immediately, so you feel real momentum from the very first sprint.",
          },
        ],
      },
      {
        tabLabel: "Pricing",
        faqs: [
          {
            question: "How do you scope and price the work?",
            answer:
              "We propose a focused engagement with a clear timeline and a flat price. No padded hourly estimates and no surprise invoices. You see the full shape of the work before we begin.",
          },
          {
            question: "Do you offer ongoing retainers?",
            answer:
              "We do. After an initial project, many partners keep us on a monthly retainer to handle continuous design, brand, and product work as their needs grow.",
          },
          {
            question: "What happens if the scope changes mid-project?",
            answer:
              "We talk about it openly before anything shifts. If the goalposts move, we re-scope together with a transparent estimate so there are never hidden costs tucked into the final bill.",
          },
        ],
      },
      {
        tabLabel: "Support",
        faqs: [
          {
            question: "What happens after launch?",
            answer:
              "We do not disappear on launch day. We stay close through the first weeks, watch how real users respond, and tune the experience so the work keeps performing once it is live.",
          },
          {
            question: "Who do we contact when we need help?",
            answer:
              "You get a single, named point of contact for the entire engagement. No ticket queues and no passing you between teams. One person who knows your project end to end.",
          },
          {
            question: "Can you train our team to take over?",
            answer:
              "Absolutely. We document the system, walk your team through the components, and hand off cleanly so you can keep building confidently long after we step back.",
          },
        ],
      },
    ],
  };
</script>

<script lang="ts">
  import CategoryFilter from "$lib/components/varunui/component/category-filter.svelte";
  import FaqAccordion from "$lib/components/varunui/component/faq-accordion.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let props: CategorizedFaqProps = $props();
  let data = $derived({ ...categorizedFaqDemo, ...props });
  const categories = $derived(data.categories ?? []);
  let activeTab = $state(categorizedFaqDemo.categories?.[0]?.tabLabel ?? "");
  const filterCategories = $derived(
    categories.map((category) => ({
      label: category.tabLabel,
      value: category.tabLabel,
    })),
  );
  const activeItems = $derived(
    categories.find((category) => category.tabLabel === activeTab)?.faqs ?? [],
  );

  $effect(() => {
    const firstTab = categories[0]?.tabLabel ?? "";

    if (!categories.some((category) => category.tabLabel === activeTab)) {
      activeTab = firstTab;
    }
  });
</script>

<Section container="sm">
  <Stack gap="2xl">
    <SectionHeader kicker={data.label} title={data.heading} size="lg" level={1} />
    <CategoryFilter
      label="Question categories"
      categories={filterCategories}
      bind:active={activeTab}
      orientation="horizontal"
    />

    <div class="mx-auto w-full max-w-[var(--layout-prose)]">
      <FaqAccordion items={activeItems} />
    </div>
  </Stack>
</Section>
