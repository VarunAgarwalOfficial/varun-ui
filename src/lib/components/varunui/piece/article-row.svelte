<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import type { ArticleCardItem } from "$lib/components/varunui/piece/article-card.svelte";

  export type ArticleRowVariant = "default" | "compact" | "text";

  export interface ArticleRowProps {
    article: ArticleCardItem;
    variant?: ArticleRowVariant;
  }

  export const articleRowDemo: ArticleRowProps = {
    article: {
      image: {
        src: peep1Asset,
        alt: "API design article",
      },
      title: "Building Scalable APIs with Modern Architecture",
      summary:
        "Learn the best practices for designing APIs that can handle millions of requests while maintaining reliability.",
      date: "January 12, 2026",
      readTime: "12 min read",
      tags: [{ label: "Architecture", href: "?" }],
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { ArrowUpRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Card from "$lib/components/varunui/component/card.svelte";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";

  let { article, variant = "default" }: ArticleRowProps = $props();

  const summary = $derived(article?.summary);
  const tags = $derived((article?.tags ?? []).slice(0, 2));
  const category = $derived(article?.category ?? article?.tags?.[0]?.label);

  function classList(values: Array<string | false | undefined>) {
    return values.filter(Boolean).join(" ");
  }
</script>

{#if article}
  {#if variant === "compact"}
    {#snippet compactContent(linked: boolean)}
      {#if article.image}
        <span
          class="relative aspect-square w-14 shrink-0 overflow-hidden rounded-md bg-muted md:w-16"
        >
          <img
            class="absolute inset-0 size-full object-cover"
            src={article.image.src}
            alt={article.image.alt}
          />
        </span>
      {/if}

      <span class="flex min-w-0 flex-1 flex-col justify-center">
        <ArticleMeta
          category={category}
          date={article.date}
          readTime={article.readTime}
          size="xs"
          avatar={false}
        />

        <span
          class={classList([
            "mt-1 line-clamp-1 text-base font-medium text-foreground",
            linked
              ? "motion-colors group-hover/article-row:text-primary"
              : undefined,
          ])}
        >
          {article.title}
        </span>

        {#if article.author}
          <span class="mt-1">
            <ArticleMeta
              author={article.author}
              size="xs"
              avatar={false}
            />
          </span>
        {/if}
      </span>
    {/snippet}

    <article class="group/article-row">
      {#if article.href}
        <a
          href={article.href}
          class="flex gap-3 rounded-md p-3 motion-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
          aria-label={`Read ${article.title}`}
        >
          {@render compactContent(true)}
        </a>
      {:else}
        <div class="flex gap-3 rounded-md p-3">
          {@render compactContent(false)}
        </div>
      {/if}
    </article>
  {:else if variant === "text"}
    {#snippet textContent(linked: boolean)}
      <span class="min-w-0 flex-1">
        <ArticleMeta
          category={category}
          date={article.date}
          readTime={article.readTime}
          size="xs"
          avatar={false}
        />

        <span
          class={classList([
            "mt-2 block text-lg font-semibold text-foreground",
            linked
              ? "motion-colors group-hover/article-row:text-primary"
              : undefined,
          ])}
        >
          {article.title}
        </span>

        {#if article.author}
          <span class="mt-1 block">
            <ArticleMeta
              author={article.author}
              size="xs"
              avatar={false}
              prefixAuthor
            />
          </span>
        {/if}
      </span>
    {/snippet}

    <article class="group/article-row border-b py-6 first:border-t">
      {#if article.href}
        <a
          href={article.href}
          class="flex items-start justify-between gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
          aria-label={`Read ${article.title}`}
        >
          {@render textContent(true)}

          <ArrowUpRight
            class="mt-1 size-5 shrink-0 text-muted-foreground motion-transform group-hover/article-row:-translate-y-0.5 group-hover/article-row:translate-x-0.5 group-hover/article-row:text-primary"
            aria-hidden="true"
          />
        </a>
      {:else}
        <div class="flex items-start justify-between gap-4">
          {@render textContent(false)}
        </div>
      {/if}
    </article>
  {:else}
    <Card padding="none" className="group/article-row h-full overflow-hidden">
      <div class="flex h-full flex-col lg:flex-row">
        {#if article.image}
          {#if article.href}
            <a
              href={article.href}
              class="relative aspect-video w-full shrink-0 overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50 md:aspect-[4/3] md:w-56 lg:w-64"
              aria-label={`Read ${article.title}`}
            >
              <img
                class="absolute inset-0 size-full object-cover motion-media group-hover/article-row:scale-105"
                src={article.image.src}
                alt={article.image.alt}
              />
            </a>
          {:else}
            <div
              class="relative aspect-video w-full shrink-0 overflow-hidden bg-muted md:aspect-[4/3] md:w-56 lg:w-64"
            >
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
                class="text-lg font-semibold text-foreground motion-colors group-hover/article-row:text-primary"
              >
                {article.title}
              </h3>
            </a>
          {:else}
            <h3
              class="text-lg font-semibold text-foreground"
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
              layout="stacked"
              icons
            />
          </div>
        </div>
      </div>
    </Card>
  {/if}
{/if}
