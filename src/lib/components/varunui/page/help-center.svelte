<script lang="ts" module>
  export interface HelpCenterAnswer {
    category: "start" | "billing" | "team" | "security";
    question: string;
    answer: string;
  }

  export interface HelpCenterProps {
    heading?: string;
    description?: string;
    answers?: HelpCenterAnswer[];
  }

  const defaultAnswers: HelpCenterAnswer[] = [
    {
      category: "start",
      question: "How do I create the first project?",
      answer:
        "Open Projects, choose New project, then pick a blank project or a starter. You can change the structure later without losing work.",
    },
    {
      category: "start",
      question: "Can I import work from another tool?",
      answer:
        "Yes. Import a CSV, Markdown folder, or supported workspace export from Settings → Import. varunUI previews every change before it writes anything.",
    },
    {
      category: "billing",
      question: "Where can I find invoices?",
      answer:
        "Workspace owners can download invoices from Settings → Billing. Each invoice includes the billing contact, tax details, and payment method.",
    },
    {
      category: "team",
      question: "How do I invite a collaborator?",
      answer:
        "Open People, choose Invite, and assign the smallest role that fits their work. Invitations expire after seven days and can be resent.",
    },
    {
      category: "security",
      question: "Does varunUI support single sign-on?",
      answer:
        "Studio workspaces can connect SAML single sign-on and require it for members. Keep one recovery owner outside the policy while testing the connection.",
    },
    {
      category: "security",
      question: "How do I review active sessions?",
      answer:
        "Open Account → Security → Active sessions. You can revoke one device or sign out everywhere except the device you are using.",
    },
  ];

  export const helpCenterDemo: HelpCenterProps = {
    heading: "Find the next useful step.",
    description:
      "Search the varunUI guide, narrow by topic, or ask a person when the answer depends on your workspace.",
    answers: defaultAnswers,
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import CategoryFilter from "$lib/components/varunui/component/category-filter.svelte";
  import FaqAccordion from "$lib/components/varunui/component/faq-accordion.svelte";
  import SearchField from "$lib/components/varunui/component/search-field.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import EmptyState from "$lib/components/varunui/piece/empty-state.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    heading = "Find the next useful step.",
    description = "Search the varunUI guide, narrow by topic, or ask a person when the answer depends on your workspace.",
    answers = defaultAnswers,
  }: HelpCenterProps = $props();

  let query = $state("");
  let category = $state("all");

  const visibleAnswers = $derived(
    answers.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const haystack = `${item.question} ${item.answer}`.toLowerCase();
      return matchesCategory && haystack.includes(query.trim().toLowerCase());
    }),
  );
</script>

<Section container="lg" size="md">
  <Stack gap="xl">
    <SectionHeader
      kicker="Help centre"
      markerTone="blue"
      title={heading}
      {description}
      align="left"
      size="lg"
      level={1}
    />

    <div class="max-w-[var(--layout-content-sm)]">
      <SearchField
        bind:value={query}
        label="Search the varunUI guide"
        placeholder="Search projects, billing, invitations…"
        size="lg"
        autofocus
      />
    </div>

    <Rail>
      {#snippet rail()}
        <div class="border-y border-border py-[var(--surface-padding-sm)]">
          <CategoryFilter
            bind:active={category}
            label="Help topics"
            orientation="responsive"
            categories={[
              { label: "All answers", value: "all" },
              { label: "Getting started", value: "start" },
              { label: "Plans and billing", value: "billing" },
              { label: "People and roles", value: "team" },
              { label: "Security", value: "security" },
            ]}
          />
        </div>
      {/snippet}

      <Stack gap="md">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight">Recommended answers</h2>
          <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
            {visibleAnswers.length} {visibleAnswers.length === 1 ? "answer" : "answers"}
            {query ? ` matching “${query}”` : " in this topic"}.
          </p>
        </div>

        {#if visibleAnswers.length > 0}
          <FaqAccordion items={visibleAnswers} />
        {:else}
          <EmptyState
            title="No guide matched that search"
            description="Try a shorter phrase, choose another topic, or send the support team your question."
            size="compact"
          />
        {/if}
      </Stack>
    </Rail>

    <div
      data-tone="yellow"
      class="surface-pastel border-y border-border p-[var(--surface-padding-lg)]"
    >
      <Stack gap="md" align="start">
        <SectionHeader
          kicker="Still stuck?"
          markerTone="yellow"
          title="Bring a person into the loop."
          description="Send the goal and the blocker. Support will reply with a concrete next step, not a list of unrelated articles."
          align="left"
          size="sm"
          level={2}
        />
        <ActionRow align="left">
          <Button href="?">Contact support</Button>
          <Button href="?" variant="outline">Check system status</Button>
        </ActionRow>
      </Stack>
    </div>
  </Stack>
</Section>
