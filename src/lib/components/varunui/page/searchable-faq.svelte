<script lang="ts" module>
  import type { FaqItem } from "$lib/components/varunui/component/faq-accordion.svelte";

  export interface SearchableFaqItem {
    question: string;
    answer: string;
    searchText?: string;
  }

  export interface SearchableFaqProps {
    eyebrow?: string;
    heading?: string;
    description?: string;
    searchPlaceholder?: string;
    noResultsText?: string;
    items?: SearchableFaqItem[];
  }

  export const searchableFaqDemo: SearchableFaqProps = {
    eyebrow: "Find an answer",
    heading: "How can we help?",
    description: "Search our knowledge base or browse common questions below.",
    searchPlaceholder: "Search questions...",
    noResultsText: "No questions found. Try a different search term.",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal, Apple Pay, Google Pay, and bank transfers for annual subscriptions. Enterprise customers can pay via invoice with NET 30 terms.",
      },
      {
        question: "Can I cancel my subscription at any time?",
        answer:
          "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. We don't charge any cancellation fees and you can reactivate anytime.",
      },
      {
        question: "Do you offer a free trial?",
        answer:
          "Yes, we offer a 14-day free trial for all new users. No credit card required to start your trial. You'll have full access to all Pro features during the trial period, and we'll send you a reminder before it ends.",
      },
      {
        question: "How do I upgrade my plan?",
        answer:
          "You can upgrade your plan at any time from Settings > Billing > Change Plan. The new pricing will be prorated for the remainder of your billing cycle. Upgrades take effect immediately and you'll get instant access to new features.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Absolutely. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your data is stored in SOC 2 Type II compliant data centers with daily backups and 99.99% uptime SLA. We also undergo regular third-party security audits.",
      },
      {
        question: "How do I get support?",
        answer:
          "You can reach our support team via email at support@example.com, live chat on our website, or through our comprehensive help center. Pro users get priority support with 4-hour response times. Enterprise users have access to dedicated support managers.",
      },
      {
        question: "Can I export my data?",
        answer:
          "Yes, you can export all your data at any time in various formats including CSV, JSON, PDF, and Excel. Go to Settings > Data Export to download your data. We believe your data belongs to you and you should always have full access to it.",
      },
      {
        question: "Do you offer team plans?",
        answer:
          "Yes, we offer team plans starting from 3 users. Team plans include real-time collaboration features, shared workspaces, admin controls, team analytics, and priority support. Volume discounts are available for larger teams.",
      },
      {
        question: "Is there a mobile app available?",
        answer:
          "Yes. The iOS and Android apps support notifications, offline work, and the core workspace views.",
      },
      {
        question: "Can I use my own domain?",
        answer:
          "Yes, Pro and Enterprise plans support custom domains. You can configure your own domain from Settings > Custom Domain. We provide SSL certificates automatically and handle all the technical setup for you.",
      },
      {
        question: "Do you offer API access?",
        answer:
          "Yes, all paid plans include full API access. Our RESTful API allows you to integrate with other tools and build custom workflows. We provide comprehensive API documentation, SDKs for popular languages, and webhook support.",
      },
      {
        question: "What integrations do you support?",
        answer:
          "We integrate with 100+ popular tools including Slack, Microsoft Teams, Google Workspace, Salesforce, HubSpot, Zapier, and many more. You can also build custom integrations using our API and webhook functionality.",
      },
    ],
  };
</script>

<script lang="ts">
  import FaqAccordion from "$lib/components/varunui/component/faq-accordion.svelte";
  import EmptyState from "$lib/components/varunui/piece/empty-state.svelte";
  import SearchField from "$lib/components/varunui/component/search-field.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let props: SearchableFaqProps = $props();
  let data = $derived({ ...searchableFaqDemo, ...props });
  let query = $state("");

  const items = $derived(data.items ?? []);
  const normalizedQuery = $derived(query.trim().toLowerCase());

  function matchesSearch(item: SearchableFaqItem) {
    if (normalizedQuery === "") return true;

    return [item.question, item.answer, item.searchText ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  }

  const filteredItems = $derived(items.filter(matchesSearch));
  const faqItems = $derived(
    filteredItems.map(
      (item): FaqItem => ({
        question: item.question,
        answer: item.answer,
      }),
    ),
  );
</script>

<Section container="sm">
  <Stack gap="2xl">
    <SectionHeader
      kicker={data.eyebrow}
      title={data.heading}
      description={data.description}
      size="lg"
      level={1}
    />
    <div class="w-full max-w-[var(--layout-prose)]">
      <SearchField
        label="Search questions"
        placeholder={data.searchPlaceholder}
        bind:value={query}
        size="md"
      />
    </div>

  <div class="mx-auto w-full max-w-[var(--layout-content-sm)]">
      {#if faqItems.length > 0}
        {#key normalizedQuery}
          <FaqAccordion items={faqItems} />
        {/key}
      {:else if data.noResultsText}
        <EmptyState title={data.noResultsText} size="compact" />
      {/if}
  </div>
  </Stack>
</Section>
