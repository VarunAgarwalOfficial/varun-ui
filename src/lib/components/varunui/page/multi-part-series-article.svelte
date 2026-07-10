<script lang="ts" module>
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export const multiPartSeriesArticleDemo = {};
</script>

<script lang="ts">
  import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Check,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";
  import Article from "$lib/components/varunui/layout/article.svelte";
  import Frame from "$lib/components/varunui/layout/frame.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";

  interface SeriesPart {
    number: number;
    title: string;
    href: string;
    isComplete?: boolean;
    isCurrent?: boolean;
  }

  interface Series {
    title: string;
    description: string;
    totalParts: number;
    currentPart: number;
    parts: SeriesPart[];
  }

  const author = {
    name: "Lisa Park",
    avatar: {
      src: peepStanding1Asset,
      alt: "Lisa Park",
    },
    href: "?",
  };

  const heroImage = {
    src: peepStanding10Asset,
    alt: "Design system components",
  };

  const series = {
    title: "Design Systems Masterclass",
    description:
      "A comprehensive guide to building, implementing, and scaling design systems for modern product teams.",
    totalParts: 5,
    currentPart: 3,
    parts: [
      { number: 1, title: "Foundations & Design Tokens", href: "?", isComplete: true },
      { number: 2, title: "Component Architecture", href: "?", isComplete: true },
      { number: 3, title: "Documentation & Guidelines", href: "?", isCurrent: true },
      { number: 4, title: "Implementation & Tooling", href: "?" },
      { number: 5, title: "Governance & Scaling", href: "?" },
    ],
  } satisfies Series;

  const progressPercent = (series.currentPart / series.totalParts) * 100;
  const previousPart = series.parts.find((part) => part.number === series.currentPart - 1);
  const nextPart = series.parts.find((part) => part.number === series.currentPart + 1);

  function seriesRowClass(part: SeriesPart) {
    return part.isCurrent
      ? "flex items-center gap-3 rounded-sm bg-muted p-2 text-sm hover:bg-muted"
      : "flex items-center gap-3 rounded-sm p-2 text-sm hover:bg-muted";
  }

  function partNumberClass(part: SeriesPart) {
    if (part.isCurrent) return "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-background";
    if (part.isComplete) return "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary";
    return "flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground";
  }
</script>

{#snippet Header()}
  <div class="mb-8 border-y border-border bg-muted/30 py-4">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen class="size-4" aria-hidden="true" />
          <span>Part {series.currentPart} of {series.totalParts}</span>
        </div>
        <h2 class="mt-1 font-semibold text-foreground">{series.title}</h2>
        <p class="mt-1 text-sm text-muted-foreground">{series.description}</p>
      </div>
      <span class="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
        Series
      </span>
    </div>

    <div class="mt-4">
      <div class="mb-1 flex justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>
      <ProgressMeter
        value={progressPercent}
        max={100}
        size="md"
        ariaLabel="Series progress"
        ariaValueText={`${Math.round(progressPercent)}%`}
      />
    </div>
  </div>

  <h1 class="text-balance text-3xl font-bold tracking-normal text-foreground md:text-4xl">
    Building a Design System from Scratch
  </h1>

  <p class="mt-3 text-lg leading-8 text-muted-foreground">
    In this first part, we'll establish the foundations: design tokens, naming conventions, and
    documentation principles.
  </p>

  <div class="mt-6">
    <ArticleMeta {author} date="January 15, 2026" readTime="15 min read" size="md" icons />
  </div>
{/snippet}

{#snippet HeroMedia()}
  <div class="bg-muted">
    <Frame ratio="wide">
      <img class="absolute inset-0 size-full object-cover" src={heroImage.src} alt={heroImage.alt} />
    </Frame>
  </div>
{/snippet}

<Section bleed>
<Article media={HeroMedia} header={Header}>
  <div class="article-prose">
    <p>
      Every great design system starts with a strong foundation. Before creating a single
      component, you need to establish the building blocks: design tokens, naming conventions, and
      documentation principles that will guide every decision that follows.
    </p>

    <div class="rounded-md bg-primary/10 p-4 text-sm leading-6">
      <p>
        This is Part 1 of a 5-part series on building design systems. By the end of this series,
        you'll have the knowledge to create, implement, and scale a design system for your
        organization.
      </p>
    </div>

    <h2>What Are Design Tokens?</h2>
    <p>
      Design tokens are the atomic values of your design system: colors, spacing, typography,
      borders, motion, and more. They're the single source of truth that connects design to code,
      ensuring consistency across platforms and products.
    </p>
    <p>
      Think of tokens as variables that store design decisions. Instead of hardcoding a raw color,
      use <code>var(--color-primary)</code>. When the brand color changes, update it in one place.
    </p>

    <ul>
      <li>Color tokens: primary, red, pink, yellow, green, blue, purple, and status colors</li>
      <li>Spacing tokens: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px</li>
      <li>Typography tokens: font families, sizes, weights, line heights</li>
      <li>Border tokens: widths and structural separation</li>
      <li>Surface tokens: paper, muted fields, and named pastel fields</li>
      <li>Shape tokens: shared radii for controls and bounded content</li>
    </ul>

    <h2>Establishing Naming Conventions</h2>
    <p>
      Naming is one of the most important and most debated aspects of design systems. A good naming
      convention is consistent, intuitive, and scalable. It should make sense to both designers and
      developers.
    </p>

    <blockquote>
      There are only two hard things in Computer Science: cache invalidation and naming things.
      <span class="mt-2 block text-sm text-muted-foreground">Phil Karlton</span>
    </blockquote>

    <h3>Semantic vs. Primitive Naming</h3>
    <p>
      Primitive tokens describe what they are: <code>blue-500</code>, <code>gray-100</code>.
      Semantic tokens describe their purpose: <code>color-background</code>,
      <code>color-text-primary</code>. Best practice is to define primitives, then map them to
      semantic tokens.
    </p>

    <h2>Documentation Principles</h2>
    <p>
      A design system is only as good as its documentation. If people can't find what they need,
      they'll create their own solutions, and consistency goes out the window.
    </p>

    <ul>
      <li>Document the why as much as the what</li>
      <li>Include usage guidelines and examples</li>
      <li>Show both correct and incorrect usage</li>
      <li>Keep documentation close to the code</li>
      <li>Make it searchable and browsable</li>
    </ul>

    <h2>Next Steps</h2>
    <p>
      With foundations in place, we're ready to start building components. In Part 2, we'll dive
      into component architecture: how to structure, compose, and variant your components for
      maximum flexibility and reusability.
    </p>

    <div class="rounded-md bg-primary/10 p-4 text-sm leading-6">
      <p>
        Homework: Audit your current project's design tokens. How many different colors are being
        used? How many different spacing values? This will give you a baseline for Part 2.
      </p>
    </div>
  </div>

  <nav class="mt-12 border-t border-border pt-8">
    <div class="flex items-center justify-between gap-4">
      {#if previousPart}
        <a href={previousPart.href} class="group/nav flex items-center gap-2 text-sm">
          <ArrowLeft class="size-4 motion-transform group-hover/nav:-translate-x-1" aria-hidden="true" />
          <span>
            <span class="block text-muted-foreground">Previous</span>
            <span class="font-medium text-foreground">Part {previousPart.number}: {previousPart.title}</span>
          </span>
        </a>
      {:else}
        <span></span>
      {/if}

      {#if nextPart}
        <a href={nextPart.href} class="group/nav flex items-center gap-2 text-right text-sm">
          <span>
            <span class="block text-muted-foreground">Next</span>
            <span class="font-medium text-foreground">Part {nextPart.number}: {nextPart.title}</span>
          </span>
          <ArrowRight class="size-4 motion-transform group-hover/nav:translate-x-1" aria-hidden="true" />
        </a>
      {/if}
    </div>
  </nav>

  <div class="mt-8 border-y border-border py-4">
    <h3 class="mb-4 font-semibold text-foreground">All Parts in This Series</h3>
    <div class="space-y-2">
      {#each series.parts as part (part.number)}
        <a href={part.href} class={seriesRowClass(part)} aria-current={part.isCurrent ? "step" : undefined}>
          <span class={partNumberClass(part)}>
            {#if part.isComplete}
              <Check class="size-4" weight="bold" aria-hidden="true" />
            {:else}
              {part.number}
            {/if}
          </span>
          <span class={part.isCurrent ? "font-medium text-foreground" : "text-foreground"}>{part.title}</span>
          {#if part.isCurrent}
            <span class="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Current
            </span>
          {/if}
        </a>
      {/each}
    </div>
  </div>
</Article>
</Section>
