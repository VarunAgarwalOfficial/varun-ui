<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { ArticleCardItem } from "$lib/components/varunui/piece/article-card.svelte";

  interface BlogArchivePost extends ArticleCardItem {
    date: string;
  }

  export interface YearAndMonthArchiveProps {
    kicker?: string;
    heading?: string;
    description?: string;
    posts?: BlogArchivePost[];
  }

  export const yearAndMonthArchiveDemo: YearAndMonthArchiveProps = {
    kicker: "Archive",
    heading: "Blog Archive",
    description: "Browse articles by date.",
    posts: [
      {
        title: "The Future of Web Development",
        date: "January 28, 2026",
        readTime: "8 min",
        category: "Frontend",
        image: {
          src: peepStanding23Asset,
          alt: "Design system workspace",
        },
        href: "?",
      },
      {
        title: "Understanding React Server Components",
        date: "January 25, 2026",
        readTime: "11 min",
        category: "React",
        image: {
          src: peepSitting1Asset,
          alt: "Application architecture sketches",
        },
        href: "?",
      },
      {
        title: "CSS Container Queries Deep Dive",
        date: "January 22, 2026",
        readTime: "7 min",
        category: "CSS",
        image: {
          src: peepStanding12Asset,
          alt: "Responsive interface study",
        },
        href: "?",
      },
      {
        title: "Building Accessible Forms",
        date: "January 18, 2026",
        readTime: "9 min",
        category: "Accessibility",
        href: "?",
      },
      {
        title: "TypeScript 5.4 Features",
        date: "January 15, 2026",
        readTime: "6 min",
        category: "TypeScript",
        href: "?",
      },
      {
        title: "Year in Review: Web Development",
        date: "December 28, 2025",
        readTime: "10 min",
        category: "Review",
        href: "?",
      },
      {
        title: "Performance Optimization Tips",
        date: "December 20, 2025",
        readTime: "8 min",
        category: "Performance",
        href: "?",
      },
      {
        title: "State Management in 2025",
        date: "December 15, 2025",
        readTime: "12 min",
        category: "Architecture",
        href: "?",
      },
      {
        title: "Next.js 15 Overview",
        date: "November 25, 2025",
        readTime: "9 min",
        category: "Next.js",
        href: "?",
      },
      {
        title: "Testing Strategies for React Apps",
        date: "November 18, 2025",
        readTime: "7 min",
        category: "Testing",
        href: "?",
      },
      {
        title: "GraphQL vs REST in 2025",
        date: "November 10, 2025",
        readTime: "8 min",
        category: "API",
        href: "?",
      },
      {
        title: "Building Design Systems",
        date: "November 5, 2025",
        readTime: "13 min",
        category: "Design systems",
        href: "?",
      },
      {
        title: "Introduction to Signals",
        date: "October 28, 2025",
        readTime: "6 min",
        category: "JavaScript",
        href: "?",
      },
      {
        title: "Web Components Revisited",
        date: "October 15, 2025",
        readTime: "8 min",
        category: "Components",
        href: "?",
      },
    ],
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { Calendar } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import ArticleRow from "$lib/components/varunui/piece/article-row.svelte";

  type Archive = Record<string, Record<string, BlogArchivePost[]>>;

  const monthOrder: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  let {
    kicker,
    heading,
    description,
    posts = [],
  }: YearAndMonthArchiveProps = $props();

  function groupArchive(source: BlogArchivePost[]): Archive {
    return source.reduce<Archive>((groups, post) => {
      if (!post.date) return groups;

      const date = new Date(post.date);
      const year = date.getFullYear().toString();
      const month = date.toLocaleDateString("en-US", { month: "long" });

      groups[year] ??= {};
      groups[year][month] ??= [];
      groups[year][month].push(post);

      return groups;
    }, {});
  }

  const archive = $derived(groupArchive(posts));
  const sortedYears = $derived(
    Object.keys(archive).sort((a, b) => Number(b) - Number(a)),
  );
</script>

<Section container="sm">
    {#if kicker || heading || description}
      <div class="mx-auto mb-12 max-w-[var(--layout-content-sm)] text-center">
        {#if kicker}
          <div class="mb-4 flex justify-center">
            <Marker text={kicker} tone="yellow" emphasis />
          </div>
        {/if}
        {#if heading}
          <h1 class="text-2xl font-semibold md:text-4xl">{heading}</h1>
        {/if}
        {#if description}
          <p class="mt-4 text-muted-foreground">{description}</p>
        {/if}
      </div>
    {/if}

    <div class="space-y-8">
      {#each sortedYears as year (year)}
        {@const yearData = archive[year]}
        {#if yearData}
          <div>
            <div class="mb-4 flex items-center gap-2">
              <Calendar class="size-5 text-primary" aria-hidden="true" />
              <h3 class="text-lg font-semibold">{year}</h3>
            </div>
            <div class="ml-2 space-y-6 border-l-2 border-muted pl-6">
              {#each Object.keys(yearData).sort((a, b) => monthOrder[b] - monthOrder[a]) as month (month)}
                <div>
                  <h4 class="mb-3 text-base font-semibold">{month}</h4>
                  <div class="space-y-1">
                    {#each yearData[month] ?? [] as article, articleIndex (`${article.title}-${articleIndex}`)}
                      <ArticleRow {article} variant="compact" />
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>
</Section>
