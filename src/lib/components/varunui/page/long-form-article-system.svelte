<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import type { ArticleMetaAuthor } from "$lib/components/varunui/piece/article-meta.svelte";

  interface MediaAsset {
    src: string;
    alt: string;
    caption?: string;
  }

  interface ArticleTag {
    label: string;
    href?: string;
  }

  type LongFormArticleSystemTag = ArticleTag | string;

  interface ArticleAction {
    label: string;
    href: string;
    tone?: "primary" | "muted";
  }

  interface RelatedArticle {
    title: string;
    summary?: string;
    href?: string;
    date?: string;
    readTime?: string;
    category?: string;
  }

  interface LongFormArticleSystemLabels {
    toc?: string;
    mobileToc?: string;
    actions?: string;
    author?: string;
    topics?: string;
    related?: string;
  }

  export interface LongFormArticleSystemProps {
    title?: string;
    summary?: string;
    category?: string;
    date?: string;
    readTime?: string;
    author?: ArticleMetaAuthor & {
      bio?: string;
      socialLinks?: { platform: string; href: string }[];
    };
    featuredImage?: MediaAsset;
    tags?: LongFormArticleSystemTag[];
    actions?: ArticleAction[];
    relatedPosts?: RelatedArticle[];
    labels?: LongFormArticleSystemLabels;
  }

  export const longFormArticleSystemDemo: LongFormArticleSystemProps = {
    title: "Complete Guide to State Management in React",
    summary:
      "A polished long-form article recipe with a hero image, anchored sections, author context, topic tags, related reading, and action links.",
    category: "React",
    date: "January 3, 2026",
    readTime: "15 min read",
    author: {
      name: "Lisa Park",
      title: "React Developer",
      href: "/authors/lisa-park",
      avatar: {
        src: peepSitting13Asset,
        alt: "Lisa Park",
      },
      bio: "Lisa writes about frontend architecture, interface state, and the habits that keep product code understandable as teams grow.",
      socialLinks: [
        { platform: "GitHub", href: "/authors/lisa-park/github" },
        { platform: "Newsletter", href: "/newsletter/react-systems" },
      ],
    },
    featuredImage: {
      src: peepStanding18Asset,
      alt: "React state management workspace",
      caption:
        "Use article furniture when the body is long enough to benefit from navigation, context, and follow-up paths.",
    },
    tags: [
      { label: "React", href: "/topics/react" },
      { label: "State management", href: "/topics/state-management" },
      "Architecture",
    ],
    labels: {
      toc: "In this guide",
      mobileToc: "Sections",
      actions: "Article actions",
      author: "Author",
      topics: "Topics",
      related: "Keep reading",
    },
    actions: [
      { label: "Download checklist", href: "/resources/react-state-checklist", tone: "primary" },
      { label: "Share with team", href: "/share/react-state-guide", tone: "muted" },
    ],
    relatedPosts: [
      {
        title: "React Query Cache Patterns",
        summary: "Cache boundaries, invalidation habits, and query keys that stay readable.",
        href: "/articles/react-query-cache-patterns",
        date: "December 12, 2025",
        readTime: "9 min read",
        category: "React",
      },
      {
        title: "Designing Reducers People Can Review",
        summary: "How to keep reducer state explicit without turning actions into ceremony.",
        href: "/articles/reducer-review-patterns",
        date: "November 28, 2025",
        readTime: "7 min read",
        category: "Architecture",
      },
      {
        title: "Context Without the Mystery",
        summary: "A practical model for provider placement, updates, and testing.",
        href: "/articles/context-without-mystery",
        date: "November 9, 2025",
        readTime: "6 min read",
        category: "Frontend",
      },
    ],
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";

  let {
    title,
    summary,
    category,
    date,
    readTime,
    author,
    featuredImage,
    tags = [],
    actions = [],
    relatedPosts = [],
    labels,
  }: LongFormArticleSystemProps = $props();

  const tableOfContents = [
    { title: "Introduction", id: "introduction" },
    { title: "Local state", id: "local-state" },
    { title: "Reducer state", id: "reducer-state" },
    { title: "Shared context", id: "shared-context" },
    { title: "External stores", id: "external-stores" },
  ];
  const stateActionCode = `type Action =
  | { type: "open" }
  | { type: "close" }
  | { type: "select"; id: string };`;

  function tagLabel(tag: LongFormArticleSystemTag) {
    return typeof tag === "string" ? tag : tag.label;
  }

  function tagHref(tag: LongFormArticleSystemTag) {
    return typeof tag === "string" ? undefined : tag.href;
  }

  function scrollToAnchor(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
</script>

{#snippet TagPill(tag: LongFormArticleSystemTag)}
  <Badge href={tagHref(tag)} variant="outline" class="text-xs">
    {tagLabel(tag)}
  </Badge>
{/snippet}

{#snippet TableOfContents(compact = false)}
  <nav
    class={compact ? "grid gap-2" : "space-y-2"}
    aria-label={labels?.toc ?? "Article sections"}
  >
    {#each tableOfContents as item}
      <Button
        variant="quiet"
        size="xs"
        class="w-full justify-start text-muted-foreground"
        onclick={() => scrollToAnchor(item.id)}
      >
        {item.title}
      </Button>
    {/each}
  </nav>
{/snippet}

{#snippet RelatedItem(article: RelatedArticle)}
  <article class="border-t border-border py-4 first:border-t-0 first:pt-0 last:pb-0">
    {#if article.category || article.date || article.readTime}
      <ArticleMeta
        category={article.category}
        date={article.date}
        readTime={article.readTime}
        size="xs"
        avatar={false}
      />
    {/if}

    {#if article.href}
      <a
        href={article.href}
        class="group mt-2 block rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
      >
        <h3 class="text-base font-semibold text-foreground motion-colors group-hover:text-primary">
          {article.title}
        </h3>
        {#if article.summary}
          <p class="mt-1 text-sm leading-6 text-muted-foreground">{article.summary}</p>
        {/if}
      </a>
    {:else}
      <div class="mt-2">
        <h3 class="text-base font-semibold text-foreground">{article.title}</h3>
        {#if article.summary}
          <p class="mt-1 text-sm leading-6 text-muted-foreground">{article.summary}</p>
        {/if}
      </div>
    {/if}
  </article>
{/snippet}

<Section container="max">
  <div class="text-foreground">
    <article class="grid gap-[var(--layout-gap-lg)] lg:grid-cols-[var(--layout-rail-sm)_minmax(0,1fr)_var(--layout-rail-md)] lg:gap-[var(--layout-gap-xl)]">
      <aside class="hidden lg:block">
        <div class="sticky top-8 space-y-8">
          {#if tableOfContents.length}
            <section class="space-y-3" aria-labelledby="longFormArticleSystem-toc">
              <h2 id="longFormArticleSystem-toc" class="text-sm font-semibold text-foreground">
                {labels?.toc ?? "In this article"}
              </h2>
              {@render TableOfContents()}
            </section>
          {/if}

          {#if actions.length}
            <section class="space-y-3" aria-labelledby="longFormArticleSystem-actions">
              <h2 id="longFormArticleSystem-actions" class="text-sm font-semibold text-foreground">
                {labels?.actions ?? "Article actions"}
              </h2>
              <div class="grid gap-2">
                {#each actions as action}
                  <Button
                    href={action.href}
                    variant={action.tone === "primary" ? "primary" : "outline"}
                    class="justify-start"
                  >
                    {action.label}
                    <ArrowRight class="size-4" aria-hidden="true" />
                  </Button>
                {/each}
              </div>
            </section>
          {/if}
        </div>
      </aside>

      <div class="min-w-0">
        <header class="space-y-6">
          {#if tags.length}
            <div class="flex flex-wrap gap-2">
              {#each tags as tag}
                {@render TagPill(tag)}
              {/each}
            </div>
          {/if}

          {#if title}
            <h1 class="max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              {title}
            </h1>
          {/if}

          {#if summary}
            <p class="max-w-[var(--layout-content-sm)] text-lg leading-8 text-muted-foreground">{summary}</p>
          {/if}

          <ArticleMeta {author} {category} {date} {readTime} size="md" icons />
        </header>

        {#if featuredImage}
          <figure class="mt-10 overflow-hidden rounded-md border border-border bg-surface">
            <img
              src={featuredImage.src}
              alt={featuredImage.alt}
              class="aspect-[16/9] w-full object-cover"
            />
            {#if featuredImage.caption}
              <figcaption class="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                {featuredImage.caption}
              </figcaption>
            {/if}
          </figure>
        {/if}

        {#if tableOfContents.length}
          <details class="mt-8 rounded-lg border border-border bg-surface p-4 lg:hidden">
            <summary class="cursor-pointer text-sm font-semibold text-foreground">
              {labels?.mobileToc ?? labels?.toc ?? "Sections"}
            </summary>
            <div class="mt-3">
              {@render TableOfContents(true)}
            </div>
          </details>
        {/if}

        <div class="mt-10">
          <div class="article-prose">
            <p id="introduction">
              State management is one of the most important concepts to master when building React
              applications. The best choice is usually the smallest tool that keeps intent visible.
            </p>

            <h2 id="local-state">Local State with useState</h2>
            <p>
              For component-local values such as form inputs, disclosure state, and optimistic UI
              toggles, useState keeps the relationship between event and result easy to trace.
            </p>

            <blockquote>
              Start with the simplest solution that works. You can always add structure when the
              product shape asks for it.
            </blockquote>

            <h2 id="reducer-state">Complex State with useReducer</h2>
            <p>
              When state transitions become conditional or multi-step, useReducer centralizes the
              rules and gives every transition a name.
            </p>
            <pre><code>{stateActionCode}</code></pre>

            <h2 id="shared-context">Shared Context</h2>
            <p>
              Context is best for values that many components read but only a few places update:
              theme, account, permissions, locale, and feature flags.
            </p>
            <ul>
              <li>Keep providers close to the feature that owns the state</li>
              <li>Split write-heavy state away from read-mostly configuration</li>
              <li>Memoize provider values only when renders show a real problem</li>
              <li>Name contexts after product concepts, not implementation details</li>
            </ul>

            <h2 id="external-stores">External Stores</h2>
            <p>
              External libraries pay for themselves when they solve cache invalidation,
              persistence, devtools, undo history, or cross-tab coordination better than local
              composition can.
            </p>
          </div>
        </div>
      </div>

      <aside class="space-y-8 lg:pt-2">
        {#if author}
          <section
            class="border-y border-border py-5"
            aria-labelledby="longFormArticleSystem-author"
          >
            <h2 id="longFormArticleSystem-author" class="text-sm font-semibold text-foreground">
              {labels?.author ?? "Author"}
            </h2>
            <div class="mt-4">
              <ArticleMeta {author} size="md" layout="stacked" />
            </div>
            {#if author.bio}
              <p class="mt-4 text-sm leading-6 text-muted-foreground">{author.bio}</p>
            {/if}
            {#if author.socialLinks?.length}
              <div class="mt-4 flex flex-wrap gap-2">
                {#each author.socialLinks as link}
                  <Button href={link.href} variant="outline" size="sm">{link.platform}</Button>
                {/each}
              </div>
            {/if}
          </section>
        {/if}

        {#if tags.length}
          <section
            class="border-y border-border py-5"
            aria-labelledby="longFormArticleSystem-topics"
          >
            <h2 id="longFormArticleSystem-topics" class="text-sm font-semibold text-foreground">
              {labels?.topics ?? "Topics"}
            </h2>
            <div class="mt-4 flex flex-wrap gap-2">
              {#each tags as tag}
                {@render TagPill(tag)}
              {/each}
            </div>
          </section>
        {/if}

        {#if relatedPosts.length}
          <section
            class="border-y border-border py-5"
            aria-labelledby="longFormArticleSystem-related"
          >
            <h2 id="longFormArticleSystem-related" class="text-sm font-semibold text-foreground">
              {labels?.related ?? "Keep reading"}
            </h2>
            <div class="mt-4">
              {#each relatedPosts as article}
                {@render RelatedItem(article)}
              {/each}
            </div>
          </section>
        {/if}
      </aside>
    </article>
  </div>
</Section>
