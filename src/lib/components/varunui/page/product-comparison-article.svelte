<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  export const productComparisonArticleDemo = {};
</script>

<script lang="ts">
  import {
    Check,
    Minus,
    ScalesIcon,
    Share2,
    Trophy,
    X,
    Zap,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";
  import Article from "$lib/components/varunui/layout/article.svelte";
  import Frame from "$lib/components/varunui/layout/frame.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";

  type ComparisonSide = "A" | "B";
  type Winner = ComparisonSide | "tie";

  interface ComparisonItem {
    side: ComparisonSide;
    name: string;
    tagline: string;
    pros: string[];
    cons: string[];
  }

  interface ComparisonFeature {
    name: string;
    itemA: string | boolean;
    itemB: string | boolean;
    winner: Winner;
  }

  const author = {
    name: "Michael Park",
    title: "Frontend Architect",
    avatar: {
      src: peepSitting1Asset,
      alt: "Michael Park",
    },
    href: "?",
  };

  const heroImage = {
    src: peepStanding12Asset,
    alt: "React vs Vue comparison",
  };

  const comparisonItems = [
    {
      side: "A",
      name: "React",
      tagline: "The library for web and native user interfaces",
      pros: [
        "Massive ecosystem and community",
        "Strong job market demand",
        "Flexible architecture choices",
        "Great TypeScript support",
        "React Native for mobile",
      ],
      cons: [
        "Steeper learning curve for beginners",
        "Requires many additional libraries",
        "Frequent ecosystem changes",
        "JSX can be polarizing",
      ],
    },
    {
      side: "B",
      name: "Vue",
      tagline: "The progressive JavaScript framework",
      pros: [
        "Gentler learning curve",
        "Excellent documentation",
        "Built-in state management with Pinia",
        "Single-file components are intuitive",
        "Great performance out of the box",
      ],
      cons: [
        "Smaller ecosystem than React",
        "Fewer job opportunities",
        "Less flexibility in architecture",
        "Composition API adds complexity",
      ],
    },
  ] satisfies ComparisonItem[];

  const features = [
    { name: "Learning Curve", itemA: "Moderate", itemB: "Easy", winner: "B" },
    { name: "Performance", itemA: "Excellent", itemB: "Excellent", winner: "tie" },
    { name: "Bundle Size", itemA: "~40kb", itemB: "~33kb", winner: "B" },
    { name: "TypeScript Support", itemA: true, itemB: true, winner: "tie" },
    { name: "Server Components", itemA: true, itemB: false, winner: "A" },
    { name: "Built-in Router", itemA: false, itemB: true, winner: "B" },
    { name: "State Management", itemA: "External", itemB: "Official (Pinia)", winner: "B" },
    { name: "Mobile Development", itemA: "React Native", itemB: "Limited", winner: "A" },
    { name: "Job Market", itemA: "Very High", itemB: "Moderate", winner: "A" },
    { name: "Documentation", itemA: "Good", itemB: "Excellent", winner: "B" },
  ] satisfies ComparisonFeature[];

  function winnerName(winner: Winner) {
    if (winner === "tie") return undefined;
    return comparisonItems.find((item) => item.side === winner)?.name;
  }

  function rowClass(index: number) {
    return index % 2 === 0
      ? "grid grid-cols-4 gap-4 bg-muted/20 p-4 text-sm"
      : "grid grid-cols-4 gap-4 p-4 text-sm";
  }

  function valueClass(winner: Winner, side: ComparisonSide) {
    return winner === side
      ? "flex items-center justify-center font-semibold text-primary"
      : "flex items-center justify-center";
  }
</script>

{#snippet Header()}
  <Badge variant="muted" class="mb-4 gap-1.5">
    <ScalesIcon class="size-3" aria-hidden="true" />
    Framework Comparison
  </Badge>

  <h1 class="mx-auto text-balance text-3xl font-bold tracking-normal text-foreground md:text-4xl">
    React vs Vue in 2026: Which Should You Choose?
  </h1>

  <p class="mx-auto mt-3 max-w-[var(--layout-prose)] text-lg leading-8 text-muted-foreground">
    A comprehensive comparison of the two most popular frontend frameworks, updated for the latest
    versions and ecosystem changes.
  </p>

  <div class="mt-6 flex justify-center">
    <ArticleMeta
      {author}
      date="January 18, 2026"
      readTime="12 min read"
      size="md"
      icons
      layout="stacked"
    />
  </div>
{/snippet}

{#snippet FeatureCell(value: string | boolean)}
  {#if typeof value === "boolean"}
    {#if value}
      <Check class="size-5 text-success" aria-label="Yes" />
    {:else}
      <X class="size-5 text-danger" aria-label="No" />
    {/if}
  {:else}
    <span>{value}</span>
  {/if}
{/snippet}

{#snippet WinnerCell(winner: Winner)}
  {#if winner === "tie"}
    <Minus class="size-4 text-muted-foreground" aria-label="Tie" />
  {:else}
    <span class="flex items-center gap-1 text-foreground">
      <Trophy class="size-4" aria-hidden="true" />
      {winnerName(winner)}
    </span>
  {/if}
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
  <div class="mb-10 grid gap-4 md:grid-cols-2">
    {#each comparisonItems as item (item.name)}
      <section class="rounded-none border border-border p-6">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-2xl font-bold text-foreground">{item.name}</h2>
        </div>
        <p class="mt-1 text-sm text-muted-foreground">{item.tagline}</p>

        <div class="mt-4">
          <p class="text-sm font-medium text-success">Pros</p>
          <ul class="mt-2 space-y-1">
            {#each item.pros as pro (pro)}
              <li class="flex items-start gap-2 text-sm text-muted-foreground">
                <Check class="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                {pro}
              </li>
            {/each}
          </ul>
        </div>

        <div class="mt-4">
          <p class="text-sm font-medium text-danger">Cons</p>
          <ul class="mt-2 space-y-1">
            {#each item.cons as con (con)}
              <li class="flex items-start gap-2 text-sm text-muted-foreground">
                <X class="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                {con}
              </li>
            {/each}
          </ul>
        </div>
      </section>
    {/each}
  </div>

  <div class="mb-10 overflow-x-auto rounded-none border border-border">
    <div class="min-w-[42rem]">
      <div class="grid grid-cols-4 gap-4 border-b border-border bg-muted/50 p-4 text-sm font-medium">
        <div>Feature</div>
        <div class="text-center">React</div>
        <div class="text-center">Vue</div>
        <div class="text-center">Winner</div>
      </div>

      {#each features as row, index (row.name)}
        <div class={rowClass(index)}>
          <div class="font-medium text-foreground">{row.name}</div>
          <div class={valueClass(row.winner, "A")}>
            {@render FeatureCell(row.itemA)}
          </div>
          <div class={valueClass(row.winner, "B")}>
            {@render FeatureCell(row.itemB)}
          </div>
          <div class="flex items-center justify-center">
            {@render WinnerCell(row.winner)}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="article-prose">
    <p>
      Choosing between React and Vue remains one of the most common decisions frontend developers
      face in 2026. Both frameworks have matured significantly, and both can build virtually any web
      application. The right choice depends on your specific needs, team, and project requirements.
    </p>

    <h2>Developer Experience</h2>
    <p>
      Vue continues to excel in developer experience with its intuitive single-file components and
      comprehensive documentation. The Composition API, now fully mature, offers similar flexibility
      to React Hooks while maintaining Vue's approachable syntax.
    </p>
    <p>
      React's developer experience has improved with Server Components and compiler-driven
      optimization work. However, the ecosystem's breadth means developers often face decision
      fatigue when choosing between routing, state management, and styling solutions.
    </p>

    <h2>Ecosystem and Community</h2>
    <p>
      React's ecosystem remains unmatched. From headless UI primitives and styling systems to
      frameworks like Next.js and Remix, the options are endless. This breadth is both a strength and
      a potential source of analysis paralysis.
    </p>
    <p>
      Vue's ecosystem, while smaller, is more cohesive. Nuxt has proven to be an excellent full-stack
      framework, and Pinia provides an official state-management path that works with that framework. You will
      find everything you need, but with fewer choices.
    </p>

    <h2>Our Verdict</h2>
  </div>

  <aside class="my-8 border-l-4 border-primary bg-primary/5 p-6">
    <div class="mb-3 flex items-center gap-2">
      <Zap class="size-5 text-primary" aria-hidden="true" />
      <span class="font-semibold text-primary">Final Verdict</span>
      <Badge variant="outline" class="ml-auto">It's a Tie!</Badge>
    </div>
    <p class="text-muted-foreground">
      Both frameworks are excellent choices in 2026. Choose React if you need maximum ecosystem
      flexibility, are building for mobile with React Native, or want the most job opportunities.
      Choose Vue if you prioritize developer experience, want official solutions for common needs,
      or have a team that values simplicity.
    </p>
  </aside>

  <div class="mt-10 flex justify-center border-t border-border pt-6">
    <Button href="?" variant="quiet" size="sm" class="gap-2">
      <Share2 class="size-4" aria-hidden="true" />
      Share this comparison
    </Button>
  </div>
</Article>
</Section>
