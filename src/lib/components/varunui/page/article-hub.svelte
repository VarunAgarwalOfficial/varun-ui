<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import type { ArticleCardItem } from "$lib/components/varunui/piece/article-card.svelte";

  export interface ArticleHubFeaturedSection {
    eyebrow?: string;
    article?: ArticleCardItem;
    readMoreLabel?: string;
  }

  export interface ArticleHubArticleSection {
    eyebrow?: string;
    heading?: string;
    description?: string;
    articles?: ArticleCardItem[];
  }

  export interface ArticleHubFeatureListSection extends ArticleHubArticleSection {
    readMoreLabel?: string;
    alternating?: boolean;
  }

  export interface ArticleHubProps {
    kicker?: string;
    heading?: string;
    description?: string;
    featured?: ArticleHubFeaturedSection;
    featureList?: ArticleHubFeatureListSection;
    grid?: ArticleHubArticleSection;
    compact?: ArticleHubArticleSection;
    archive?: ArticleHubArticleSection;
  }

  const authors = {
    lisa: {
      name: "Lisa Park",
      title: "Design systems lead",
      avatar: {
        src: peepStanding10Asset,
        alt: "Lisa Park portrait",
      },
    },
    david: {
      name: "David Chen",
      title: "Platform architect",
      avatar: {
        src: peepSitting13Asset,
        alt: "David Chen portrait",
      },
    },
    maria: {
      name: "Maria Santos",
      title: "Editorial engineer",
      avatar: {
        src: peepStanding18Asset,
        alt: "Maria Santos portrait",
      },
    },
    alex: {
      name: "Alex Turner",
      title: "Frontend lead",
      avatar: {
        src: peepSitting8Asset,
        alt: "Alex Turner portrait",
      },
    },
  } satisfies Record<string, NonNullable<ArticleCardItem["author"]>>;

  const articles = {
    systems: {
      image: {
        src: peepStanding5Asset,
        alt: "A design system board with component notes",
      },
      title: "How design systems become product architecture",
      summary:
        "A field guide to moving reusable components from visual inventory to durable product contracts.",
      date: "January 15, 2026",
      readTime: "8 min read",
      author: authors.lisa,
      tags: [
        { label: "Featured", href: "?" },
        { label: "Design systems", href: "?" },
      ],
      href: "?",
    },
    apis: {
      image: {
        src: peep1Asset,
        alt: "Architecture diagrams on a display",
      },
      title: "Publishing APIs that survive real product teams",
      summary:
        "Naming, metadata, and state boundaries that keep editorial surfaces coherent as recipes grow.",
      date: "January 12, 2026",
      readTime: "12 min read",
      author: authors.david,
      tags: [{ label: "Architecture", href: "?" }],
      href: "?",
    },
    performance: {
      image: {
        src: peepStanding23Asset,
        alt: "Frontend performance dashboards",
      },
      title: "Performance budgets for article-heavy pages",
      summary:
        "How image density, metadata, and card grids shape the perceived speed of a publication homepage.",
      date: "January 10, 2026",
      readTime: "10 min read",
      author: authors.alex,
      tags: [{ label: "Frontend", href: "?" }],
      href: "?",
    },
    typescript: {
      image: {
        src: peepSitting1Asset,
        alt: "Typed article data on a laptop",
      },
      title: "Typed article data without layout-specific models",
      summary:
        "A practical pattern for letting feature cards, grids, rails, and archives share one article contract.",
      date: "January 8, 2026",
      readTime: "15 min read",
      author: authors.maria,
      tags: [{ label: "TypeScript", href: "?" }],
      href: "?",
    },
    operations: {
      image: {
        src: peepStanding12Asset,
        alt: "An editorial operations desk",
      },
      title: "The quiet work behind a calmer content index",
      summary:
        "Small governance choices that make dense article pages easier to scan, update, and extend.",
      date: "January 5, 2026",
      readTime: "7 min read",
      author: authors.lisa,
      tags: [{ label: "Operations", href: "?" }],
      href: "?",
    },
    testing: {
      image: {
        src: peepStanding1Asset,
        alt: "Interface test results on a screen",
      },
      title: "Testing reusable article recipes from the outside",
      summary:
        "Assertions that protect public contracts without freezing every internal markup choice.",
      date: "January 3, 2026",
      readTime: "11 min read",
      author: authors.david,
      tags: [{ label: "Testing", href: "?" }],
      href: "?",
    },
    security: {
      image: {
        src: peepStanding10Asset,
        alt: "Security review notes beside a laptop",
      },
      title: "Reviewing third-party media in editorial blocks",
      summary:
        "A short checklist for images, attribution, and links in installable publication examples.",
      date: "January 1, 2026",
      readTime: "9 min read",
      author: authors.maria,
      tags: [{ label: "Security", href: "?" }],
      href: "?",
    },
  } satisfies Record<string, ArticleCardItem>;

  export const articleHubDemo: ArticleHubProps = {
    kicker: "Publication",
    heading: "Article hub built from public contracts",
    description:
      "One recipe composing the same article model as a featured story, card grid, compact rail, and text archive.",
    featured: {
      eyebrow: "Featured analysis",
      article: articles.systems,
      readMoreLabel: "Read feature",
    },
    featureList: {
      eyebrow: "Deep dives",
      heading: "Alternating feature reads",
      description:
        "Long-form summaries can become an editorial stack without changing the article data model.",
      readMoreLabel: "Read article",
      alternating: true,
      articles: [articles.apis, articles.performance, articles.typescript],
    },
    grid: {
      eyebrow: "Latest",
      heading: "Research notes",
      description:
        "Card previews are useful when images and summaries carry the browsing experience.",
      articles: [articles.operations, articles.testing, articles.security],
    },
    compact: {
      eyebrow: "Briefings",
      heading: "Quick reads",
      description:
        "Compact rows keep a secondary rail dense without inventing another article shape.",
      articles: [
        articles.operations,
        articles.testing,
        articles.security,
        articles.apis,
      ],
    },
    archive: {
      eyebrow: "Index",
      heading: "Text archive",
      description:
        "The same articles can collapse into a lightweight chronological list for archive pages.",
      articles: [
        articles.systems,
        articles.apis,
        articles.performance,
        articles.typescript,
        articles.operations,
      ],
    },
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import ArticleCard from "$lib/components/varunui/piece/article-card.svelte";
  import ArticleRow from "$lib/components/varunui/piece/article-row.svelte";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";

  let {
    kicker,
    heading,
    description,
    featured,
    featureList,
    grid,
    compact,
    archive,
  }: ArticleHubProps = $props();

  const hasIntro = $derived(Boolean(kicker || heading || description));
  const hasFeatured = $derived(Boolean(featured?.article));
  const hasFeatureList = $derived(Boolean(featureList?.articles?.length));
  const hasGrid = $derived(Boolean(grid?.articles?.length));
  const hasCompact = $derived(Boolean(compact?.articles?.length));
  const hasArchive = $derived(Boolean(archive?.articles?.length));
  const hasContent = $derived(
    hasIntro ||
      hasFeatured ||
      hasFeatureList ||
      hasGrid ||
      hasCompact ||
      hasArchive,
  );
</script>

{#snippet featureArticle(
  article: ArticleCardItem,
  readMoreLabel = "",
  mediaSide: "start" | "end" = "start"
)}
  {@const summary = article.summary}
  {@const tags = (article.tags ?? []).slice(0, 2)}

  <article
    class="group/articleHub-feature overflow-hidden rounded-none border border-border bg-surface"
  >
    <div class="grid md:grid-cols-2">
      {#if article.image}
        {#if article.href}
          <a
            href={article.href}
            class={[
              "relative aspect-video overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50 md:aspect-auto",
              mediaSide === "end" ? "md:order-2" : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={`Read ${article.title}`}
          >
            <img
              class="absolute inset-0 size-full object-cover motion-media group-hover/articleHub-feature:scale-105"
              src={article.image.src}
              alt={article.image.alt}
            />
          </a>
        {:else}
          <div
            class={[
              "relative aspect-video overflow-hidden bg-muted md:aspect-auto",
              mediaSide === "end" ? "md:order-2" : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <img
              class="absolute inset-0 size-full object-cover"
              src={article.image.src}
              alt={article.image.alt}
            />
          </div>
        {/if}
      {/if}

      <div class="flex min-w-0 flex-col justify-center p-6 md:p-8 lg:p-10">
        {#if tags.length > 0}
          <div class="mb-4 flex flex-wrap gap-2">
            {#each tags as tag, index (`${tag.label}-${index}`)}
              <Badge href={tag.href} variant="outline">
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
              class="text-xl font-semibold text-foreground motion-colors group-hover/articleHub-feature:text-primary md:text-2xl"
            >
              {article.title}
            </h3>
          </a>
        {:else}
          <h3 class="text-xl font-semibold text-foreground md:text-2xl">
            {article.title}
          </h3>
        {/if}

        {#if summary}
          <p class="mt-3 text-base leading-relaxed text-muted-foreground">
            {summary}
          </p>
        {/if}

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ArticleMeta
            author={article.author}
            date={article.date}
            readTime={article.readTime}
            size="md"
            layout="stacked"
          />

          {#if readMoreLabel && article.href}
            <Button variant="quiet" size="sm" href={article.href}>
              {readMoreLabel}
              <ArrowRight class="size-4" aria-hidden="true" />
            </Button>
          {/if}
        </div>
      </div>
    </div>
  </article>
{/snippet}

{#if hasContent}
  <Section container="lg">
      {#if hasIntro}
        <div
          class="grid gap-[var(--layout-gap-md)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-end"
        >
          <div>
            {#if kicker}
              <p class="text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">
                <Marker text={kicker} tone="yellow" emphasis />
              </p>
            {/if}

            {#if heading}
              <h1
                class="mt-5 max-w-[var(--layout-content-sm)] text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
              >
                {heading}
              </h1>
            {/if}
          </div>

          {#if description}
            <p
              class="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end"
            >
              {description}
            </p>
          {/if}
        </div>
      {/if}

      {#if featured?.article}
        <div class:mt-12={hasIntro}>
          {#if featured.eyebrow}
            <p
              class="mb-4 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              {featured.eyebrow}
            </p>
          {/if}

          {@render featureArticle(featured.article, featured.readMoreLabel ?? "")}
        </div>
      {/if}

      {#if featureList?.articles?.length}
        <section
          aria-labelledby={featureList.heading
            ? "articleHub-feature-list-heading"
            : undefined}
          class:mt-12={hasIntro || hasFeatured}
        >
          <div class="mx-auto mb-8 max-w-[var(--layout-prose)] text-center">
            {#if featureList.eyebrow}
              <p
                class="text-sm font-semibold uppercase tracking-wider text-primary"
              >
                {featureList.eyebrow}
              </p>
            {/if}
            {#if featureList.heading}
              <h3
                id="articleHub-feature-list-heading"
                class="mt-2 text-2xl font-semibold text-foreground md:text-3xl"
              >
                {featureList.heading}
              </h3>
            {/if}
            {#if featureList.description}
              <p class="mt-3 text-sm leading-6 text-muted-foreground">
                {featureList.description}
              </p>
            {/if}
          </div>

          <div class="space-y-12 md:space-y-16">
            {#each featureList.articles as article, index (`${article.title}-${index}`)}
              {@render featureArticle(
                article,
                featureList.readMoreLabel ?? "Read article",
                featureList.alternating && index % 2 === 1 ? "end" : "start"
              )}
            {/each}
          </div>
        </section>
      {/if}

      {#if hasGrid || hasCompact || hasArchive}
        <div
          class="grid gap-[var(--layout-gap-xl)] lg:grid-cols-[minmax(0,1fr)_var(--layout-rail-lg)]"
          class:mt-12={hasIntro || hasFeatured || hasFeatureList}
        >
          {#if grid?.articles?.length}
            <section
              aria-labelledby={grid.heading ? "articleHub-grid-heading" : undefined}
            >
              <div class="mb-6 max-w-[var(--layout-prose)]">
                {#if grid.eyebrow}
                  <p
                    class="text-sm font-semibold uppercase tracking-wider text-primary"
                  >
                    {grid.eyebrow}
                  </p>
                {/if}
                {#if grid.heading}
                  <h3
                    id="articleHub-grid-heading"
                    class="mt-2 text-2xl font-semibold text-foreground"
                  >
                    {grid.heading}
                  </h3>
                {/if}
                {#if grid.description}
                  <p class="mt-2 text-sm leading-6 text-muted-foreground">
                    {grid.description}
                  </p>
                {/if}
              </div>

              <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {#each grid.articles as article, index (`${article.title}-${index}`)}
                  <ArticleCard {article} />
                {/each}
              </div>
            </section>
          {/if}

          <div class="space-y-10">
            {#if compact?.articles?.length}
              <section
                aria-labelledby={compact.heading
                  ? "articleHub-compact-heading"
                  : undefined}
              >
                <div class="mb-4">
                  {#if compact.eyebrow}
                    <p
                      class="text-xs font-semibold uppercase tracking-wider text-primary"
                    >
                      {compact.eyebrow}
                    </p>
                  {/if}
                  {#if compact.heading}
                    <h3
                      id="articleHub-compact-heading"
                      class="mt-2 text-xl font-semibold text-foreground"
                    >
                      {compact.heading}
                    </h3>
                  {/if}
                  {#if compact.description}
                    <p class="mt-2 text-sm leading-6 text-muted-foreground">
                      {compact.description}
                    </p>
                  {/if}
                </div>

                <div class="grid gap-4">
                  {#each compact.articles as article, index (`${article.title}-${index}`)}
                    <ArticleRow {article} variant="compact" />
                  {/each}
                </div>
              </section>
            {/if}

            {#if archive?.articles?.length}
              <section
                aria-labelledby={archive.heading
                  ? "articleHub-archive-heading"
                  : undefined}
              >
                <div class="mb-2">
                  {#if archive.eyebrow}
                    <p
                      class="text-xs font-semibold uppercase tracking-wider text-primary"
                    >
                      {archive.eyebrow}
                    </p>
                  {/if}
                  {#if archive.heading}
                    <h3
                      id="articleHub-archive-heading"
                      class="mt-2 text-xl font-semibold text-foreground"
                    >
                      {archive.heading}
                    </h3>
                  {/if}
                  {#if archive.description}
                    <p class="mt-2 text-sm leading-6 text-muted-foreground">
                      {archive.description}
                    </p>
                  {/if}
                </div>

                <div>
                  {#each archive.articles as article, index (`${article.title}-${index}`)}
                    <ArticleRow {article} variant="text" />
                  {/each}
                </div>
              </section>
            {/if}
          </div>
        </div>
      {/if}
  </Section>
{/if}
