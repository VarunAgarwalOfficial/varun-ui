<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { ArticleMetaAuthor } from "$lib/components/varunui/piece/article-meta.svelte";

  export type ArticleCardAuthor = ArticleMetaAuthor;

  export interface ArticleCardImage {
    src: string;
    alt: string;
  }

  export interface ArticleCardTag {
    label: string;
    href?: string;
  }

  export interface ArticleCardItem {
    image?: ArticleCardImage;
    title: string;
    summary?: string;
    date?: string;
    readTime?: string;
    author?: ArticleCardAuthor;
    tags?: ArticleCardTag[];
    category?: string;
    href?: string;
  }

  export interface ArticleCardProps {
    article: ArticleCardItem;
  }

  export const articleCardDemo: ArticleCardProps = {
    article: {
      image: {
        src: peepStanding23Asset,
        alt: "Design systems article",
      },
      title: "The Future of Design Systems in Modern Web Development",
      summary:
        "Exploring how design systems are evolving to meet the demands of increasingly complex web applications.",
      date: "January 15, 2026",
      readTime: "8 min read",
      author: {
        name: "Lisa Park",
        title: "Senior Developer",
        avatar: {
          src: peepSitting1Asset,
          alt: "Lisa Park portrait",
        },
      },
      tags: [{ label: "Design systems", href: "?" }],
      href: "?",
    },
  };
</script>

<script lang="ts">
  import Card from "$lib/components/varunui/component/card.svelte";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";

  let { article }: ArticleCardProps = $props();

  const summary = $derived(article?.summary);
  const tags = $derived((article?.tags ?? []).slice(0, 2));
</script>

{#if article}
  <Card padding="none" className="group/article-card flex h-full flex-col overflow-hidden">
    {#if article.image}
      {#if article.href}
        <a
          href={article.href}
          class="relative block aspect-video overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
          aria-label={`Read ${article.title}`}
        >
          <img
            class="absolute inset-0 size-full object-cover motion-media group-hover/article-card:scale-105"
            src={article.image.src}
            alt={article.image.alt}
          />
        </a>
      {:else}
        <div class="relative aspect-video overflow-hidden bg-muted">
          <img
            class="absolute inset-0 size-full object-cover"
            src={article.image.src}
            alt={article.image.alt}
          />
        </div>
      {/if}
    {/if}

    <div class="flex min-w-0 flex-1 flex-col p-5">
      {#if tags.length > 0}
        <div class="mb-3 flex flex-wrap gap-2">
          {#each tags as tag, index (`${tag.label}-${index}`)}
            <Badge href={tag.href} variant="outline" class="text-xs">
              {tag.label}
            </Badge>
          {/each}
        </div>
      {/if}

      {#if article.href}
        <a
          href={article.href}
          class="rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
        >
          <h3
            class="line-clamp-2 text-lg font-semibold text-foreground motion-colors group-hover/article-card:text-primary"
          >
            {article.title}
          </h3>
        </a>
      {:else}
        <h3
          class="line-clamp-2 text-lg font-semibold text-foreground"
        >
          {article.title}
        </h3>
      {/if}

      {#if summary}
        <p class="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
          {summary}
        </p>
      {/if}

      <div class="mt-4">
        <ArticleMeta
          author={article.author}
          date={article.date}
          readTime={article.readTime}
          size="sm"
        />
      </div>
    </div>
  </Card>
{/if}
