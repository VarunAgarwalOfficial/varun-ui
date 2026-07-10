<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import type { ArticleCardItem } from "$lib/components/varunui/piece/article-card.svelte";

  export interface ArticleGridProps {
    kicker?: string;
    heading?: string;
    description?: string;
    items?: ArticleCardItem[];
    className?: string;
  }

  export const articleGridDemo: ArticleGridProps = {
    kicker: "Latest writing",
    heading: "Notes for making better product work.",
    description:
      "Short, practical writing on decisions, reviews, and the habits that keep a team moving without adding process theatre.",
    items: [
      {
        image: {
          src: peepStanding5Asset,
          alt: "A tidy project desk in soft light",
        },
        title: "Write the decision before the meeting",
        summary:
          "A tiny change to the brief makes review faster and keeps the meeting focused on the actual trade-off.",
        author: { name: "Elena Rourke" },
        date: "May 8",
        tags: [{ label: "Decisions", href: "?" }],
        href: "?",
      },
      {
        image: {
          src: peep1Asset,
          alt: "Notes and project paperwork on a desk",
        },
        title: "Stop chasing status on a Friday",
        summary:
          "A visible owner and one useful status line removes the weekly ritual of asking everyone where work stands.",
        author: { name: "Marcus Vale" },
        date: "Apr 24",
        tags: [{ label: "Workflow", href: "?" }],
        href: "?",
      },
      {
        image: {
          src: peepStanding23Asset,
          alt: "A small team talking around a laptop",
        },
        title: "One record, fewer dropped balls",
        summary:
          "When everyone reads from the same file, handoffs stop being the place work quietly goes to die.",
        author: { name: "Priya Anand" },
        date: "Apr 11",
        tags: [{ label: "Teams", href: "?" }],
        href: "?",
      },
    ],
  };
</script>

<script lang="ts">
  import ArticleCard from "$lib/components/varunui/piece/article-card.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    items = [],
    className,
  }: ArticleGridProps = $props();
</script>

<div class={className}>
  <Section container="max">
    <Stack gap="2xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        size="lg"
      />
      <div class="grid gap-[var(--layout-gap-md)] sm:grid-cols-2 lg:grid-cols-3">
        {#each items as article, index (`${article.title}-${index}`)}
          <ArticleCard {article} />
        {/each}
      </div>
    </Stack>
  </Section>
</div>
