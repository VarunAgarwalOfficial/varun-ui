<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  interface Author {
    name: string;
    role?: string;
    avatar?: {
      src: string;
      alt: string;
    };
    href?: string;
  }

  interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category?: string;
    helpful?: {
      yes: number;
      no: number;
    };
    relatedQuestions?: string[];
  }

  interface FAQCategory {
    name: string;
    icon?: string;
    count: number;
  }

  export interface KnowledgeBaseArticleProps {
    title?: string;
    summary?: string;
    date?: string;
    author?: Author;
    featuredImage?: {
      src: string;
      alt: string;
    };
    introduction?: string;
    faqs?: FAQItem[];
    categories?: FAQCategory[];
    contactCta?: {
      title: string;
      description: string;
      buttonText: string;
      href: string;
    };
    labels?: {
      badgeText?: string;
      updated?: string;
      searchPlaceholder?: string;
      all?: string;
      relatedQuestions?: string;
      wasThisHelpful?: string;
      noResultsFound?: string;
    };
    className?: string;
  }

  export const knowledgeBaseArticleDemo: KnowledgeBaseArticleProps = {
    title: "Working in varunUI",
    summary:
      "Find answers to the most common questions about getting started, billing, features, and troubleshooting.",
    date: "January 18, 2026",
    author: {
      name: "Support Team",
      role: "Customer Success",
      avatar: {
        src: peepStanding23Asset,
        alt: "Support Team",
      },
      href: "?",
    },
    featuredImage: {
      src: peepSitting1Asset,
      alt: "Help and support",
    },
    introduction:
      "We've compiled answers to the questions we hear most often. Can't find what you're looking for? Our support team is always happy to help.",
    faqs: [
      {
        id: "faq1",
        question: "How do I create my first workspace?",
        answer:
          "Create an account, name the workspace, and choose the work your team needs to see first. The setup guide then helps you invite owners and bring over useful context.",
        category: "Getting Started",
        helpful: { yes: 234, no: 12 },
        relatedQuestions: [
          "What are the system requirements?",
          "Can I import data from other tools?",
        ],
      },
      {
        id: "faq2",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice with NET 30 terms. All payments are processed securely through Stripe.",
        category: "Billing",
        helpful: { yes: 187, no: 8 },
        relatedQuestions: [
          "Can I change my plan later?",
          "How do refunds work?",
        ],
      },
      {
        id: "faq3",
        question: "Can I cancel my subscription at any time?",
        answer:
          "Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll retain access until the end of your current billing period. We don't offer prorated refunds for partial months, but annual subscribers can request a prorated refund within the first 30 days.",
        category: "Billing",
        helpful: { yes: 156, no: 23 },
        relatedQuestions: ["What happens to my data if I cancel?"],
      },
      {
        id: "faq4",
        question: "Is my data secure?",
        answer:
          "Security is our top priority. We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on AWS with SOC 2 Type II certification. We also offer two-factor authentication, SSO integration, and regular security audits by third-party firms.",
        category: "Security",
        helpful: { yes: 312, no: 5 },
        relatedQuestions: ["Do you offer SSO?", "Where is my data stored?"],
      },
      {
        id: "faq5",
        question: "How many team members can I add?",
        answer:
          "The number of team members depends on your plan. The Starter plan includes up to 5 users, Professional includes up to 20 users, and Enterprise offers unlimited users. You can always upgrade your plan if you need to add more team members.",
        category: "Features",
        helpful: { yes: 145, no: 18 },
        relatedQuestions: ["What are the different user roles?"],
      },
      {
        id: "faq6",
        question: "Do you offer API access?",
        answer:
          "Yes! API access is available on Professional and Enterprise plans. Our REST API allows you to integrate with your existing tools, automate workflows, and build custom applications. We provide comprehensive documentation, SDKs for popular languages, and a sandbox environment for testing.",
        category: "Features",
        helpful: { yes: 203, no: 15 },
        relatedQuestions: [
          "What are the API rate limits?",
          "Do you have webhooks?",
        ],
      },
      {
        id: "faq7",
        question: "Can I export my data?",
        answer:
          "You can export your data at any time. We support exports in CSV, JSON, and PDF formats. You can export individual projects, reports, or your entire workspace. Enterprise customers also have access to automated scheduled exports and custom export formats.",
        category: "Features",
        helpful: { yes: 178, no: 9 },
      },
      {
        id: "faq8",
        question: "What integrations do you support?",
        answer:
          "We integrate with 50+ popular tools including Slack, Microsoft Teams, Google Workspace, Salesforce, HubSpot, Jira, GitHub, and Zapier. Our Zapier integration connects you to 3,000+ additional apps. Check our integrations page for the full list.",
        category: "Features",
        helpful: { yes: 267, no: 21 },
        relatedQuestions: ["How do I set up the Slack integration?"],
      },
    ],
    categories: [
      { name: "Getting Started", count: 12 },
      { name: "Billing", count: 8 },
      { name: "Features", count: 15 },
      { name: "Security", count: 6 },
      { name: "Integrations", count: 10 },
      { name: "Troubleshooting", count: 14 },
    ],
    contactCta: {
      title: "Still have questions?",
      description:
        "Our support team is available 24/7 to help you with any questions or issues.",
      buttonText: "Contact Support",
      href: "?",
    },
    labels: {
      badgeText: "FAQ",
      updated: "Updated",
      searchPlaceholder: "Search questions...",
      all: "All",
      relatedQuestions: "Related questions:",
      wasThisHelpful: "Was this helpful?",
      noResultsFound: "No questions found matching your search.",
    },
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import {
    Calendar,
    ChevronDown,
    MessageSquare,
    QuestionIcon,
    Search,
    Tag,
    ThumbsDownIcon,
    ThumbsUp,
    User,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Input from "$lib/components/varunui/component/input.svelte";
  import { cn } from "$lib/utils.js";

  let props: KnowledgeBaseArticleProps = $props();

  const title = $derived(props.title ?? knowledgeBaseArticleDemo.title);
  const summary = $derived(props.summary ?? knowledgeBaseArticleDemo.summary);
  const date = $derived(props.date ?? knowledgeBaseArticleDemo.date);
  const author = $derived(props.author ?? knowledgeBaseArticleDemo.author);
  const featuredImage = $derived(
    props.featuredImage ?? knowledgeBaseArticleDemo.featuredImage,
  );
  const introduction = $derived(props.introduction ?? knowledgeBaseArticleDemo.introduction);
  const faqs = $derived(props.faqs ?? knowledgeBaseArticleDemo.faqs ?? []);
  const categories = $derived(props.categories ?? knowledgeBaseArticleDemo.categories ?? []);
  const contactCta = $derived(props.contactCta ?? knowledgeBaseArticleDemo.contactCta);
  const labels = $derived({ ...knowledgeBaseArticleDemo.labels, ...props.labels });

  let searchQuery = $state("");

  const filteredFaqs = $derived.by(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category?.toLowerCase().includes(query),
    );
  });

  const faqCategories = $derived(
    Array.from(
      new Set(
        filteredFaqs
          .map((faq) => faq.category)
          .filter((category): category is string => Boolean(category)),
      ),
    ),
  );

  const groupedFaqs = $derived.by(() =>
    filteredFaqs.reduce<Record<string, FAQItem[]>>((groups, faq) => {
      const category = faq.category || "General";
      groups[category] ??= [];
      groups[category].push(faq);
      return groups;
    }, {}),
  );
</script>

{#snippet AuthorAvatar(author: Author)}
  {#if author.avatar}
    <img
      class="size-8 rounded-full object-cover"
      src={author.avatar.src}
      alt={author.avatar.alt}
    />
  {:else}
    <span class="flex size-8 items-center justify-center rounded-full bg-muted">
      <User class="size-3" />
    </span>
  {/if}
{/snippet}

<div class={cn("w-full bg-background text-foreground", props.className)}>
  <Section container="sm">
    <article>
    {#if featuredImage}
      <div
        class="relative mb-8 aspect-video overflow-hidden rounded-md bg-muted"
      >
        <img
          class="absolute inset-0 size-full object-cover"
          src={featuredImage.src}
          alt={featuredImage.alt}
        />
      </div>
    {/if}

    <header class="mb-8 text-center">
      <Badge variant="muted" class="mb-4 gap-1.5">
        <QuestionIcon class="size-3" />
        {labels.badgeText}
      </Badge>

      {#if title}
        <h1 class="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
      {/if}
      {#if summary}
        <p class="mx-auto mt-3 max-w-[var(--layout-prose)] text-lg text-muted-foreground">
          {summary}
        </p>
      {/if}

      <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
        {#if author}
          <div class="flex items-center gap-2">
            {@render AuthorAvatar(author)}
            {#if author.href}
              <a href="?" class="text-sm font-medium hover:underline"
                >{author.name}</a
              >
            {:else}
              <span class="text-sm font-medium">{author.name}</span>
            {/if}
          </div>
        {/if}
        {#if date}
          <span class="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar class="size-4" />
            {labels.updated}
            {date}
          </span>
        {/if}
      </div>
    </header>

    {#if introduction}
      <p class="mb-8 text-center text-lg leading-relaxed text-muted-foreground">
        {introduction}
      </p>
    {/if}

    <div class="relative mb-8">
      <Search
        class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="text"
        placeholder={labels.searchPlaceholder}
        bind:value={searchQuery}
        class="pl-10"
      />
    </div>

    {#if categories.length > 0 && !searchQuery}
      <div class="mb-8 flex flex-wrap justify-center gap-2">
        <Button variant="quiet" size="sm" class="gap-1.5">
          <Tag class="size-3" />
          {labels.all} ({faqs.length})
        </Button>
        {#each categories as category (category.name)}
          <Button variant="quiet" size="sm"
            >{category.name} ({category.count})</Button
          >
        {/each}
      </div>
    {/if}

    {#if filteredFaqs.length === 0}
      <div class="border-y bg-muted/30 py-8 text-center">
        <QuestionIcon class="mx-auto mb-4 size-10 text-muted-foreground" />
        <p class="text-muted-foreground">{labels.noResultsFound}</p>
      </div>
    {:else}
      <div class="space-y-10">
        {#each faqCategories as category (category)}
          <div>
            <h2 class="mb-4 flex items-center gap-2 text-xl font-semibold">
              <span
                class="flex size-8 items-center justify-center rounded-md bg-primary text-sm text-background"
              >
                {groupedFaqs[category]?.length}
              </span>
              {category}
            </h2>

            <div class="space-y-4">
              {#each groupedFaqs[category] ?? [] as faq (faq.id)}
                <div class="rounded-none border">
                  <div
                    class="flex cursor-pointer items-start justify-between gap-4 p-4"
                  >
                    <div class="flex items-start gap-3">
                      <QuestionIcon
                        class="mt-0.5 size-5 shrink-0 text-primary"
                      />
                      <span class="font-medium">{faq.question}</span>
                    </div>
                    <ChevronDown
                      class="size-5 shrink-0 text-muted-foreground"
                    />
                  </div>

                  <div class="border-t bg-muted/30 p-4">
                    <p class="leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>

                    {#if faq.relatedQuestions && faq.relatedQuestions.length > 0}
                      <div class="mt-4 border-t pt-4">
                        <span class="text-sm font-medium text-muted-foreground"
                          >{labels.relatedQuestions}</span
                        >
                        <div class="mt-2 flex flex-wrap gap-2">
                          {#each faq.relatedQuestions as related}
                            <Badge
                              variant="outline"
                              class="cursor-pointer hover:bg-muted"
                              >{related}</Badge
                            >
                          {/each}
                        </div>
                      </div>
                    {/if}

                    {#if faq.helpful}
                      <div
                        class="mt-4 flex items-center gap-4 border-t pt-4"
                      >
                        <span class="text-sm text-muted-foreground"
                          >{labels.wasThisHelpful}</span
                        >
                        <div class="flex items-center gap-2">
                          <Button variant="quiet" size="sm" class="gap-1.5">
                            <ThumbsUp class="size-4" />
                            {faq.helpful.yes}
                          </Button>
                          <Button variant="quiet" size="sm" class="gap-1.5">
                            <ThumbsDownIcon class="size-4" />
                            {faq.helpful.no}
                          </Button>
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if contactCta}
      <div class="mt-12 border-y bg-primary/5 py-8 text-center">
        <MessageSquare class="mx-auto mb-4 size-10 text-primary" />
        <h3 class="text-xl font-semibold">{contactCta.title}</h3>
        <p class="mt-2 text-muted-foreground">{contactCta.description}</p>
        <Button href="?" class="mt-6 gap-3">
          <MessageSquare class="size-4" />
          {contactCta.buttonText}
        </Button>
      </div>
    {/if}
    </article>
  </Section>
</div>
