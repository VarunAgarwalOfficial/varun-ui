<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface CaseStudyMetric {
    value: string;
    label: string;
    context?: string;
  }

  export interface CaseStudySection {
    title: string;
    paragraphs: string[];
    highlights?: string[];
  }

  export interface CaseStudyWithMetricsProps {
    title?: string;
    thesis?: string;
    client?: string;
    industry?: string;
    date?: string;
    image?: { src: string; alt: string };
    overview?: string;
    metrics?: CaseStudyMetric[];
    sections?: CaseStudySection[];
    quote?: string;
    quoteBy?: { name: string; role?: string };
    className?: string;
  }

  export const caseStudyWithMetricsDemo: CaseStudyWithMetricsProps = {
    title: "How varunUI helped new teams reach useful work sooner",
    thesis:
      "A focused onboarding redesign replaced feature exposure with one clear path to a finished first project.",
    client: "varunUI",
    industry: "Productivity software",
    date: "November 2025",
    image: {
      src: peepStanding10Asset,
      alt: "A product team reviewing a workflow together",
    },
    overview:
      "Strong sign-ups were not becoming active teams. Research showed that the product explained too much before helping anyone finish useful work.",
    metrics: [
      { label: "Early churn", value: "−40%", context: "after 90 days" },
      { label: "Time to value", value: "3 days", context: "down from 14" },
      { label: "Support load", value: "−60%", context: "onboarding tickets" },
    ],
    sections: [
      {
        title: "What was wrong",
        paragraphs: [
          "The old flow asked every team to complete twelve setup steps and introduced dozens of capabilities before the first project existed.",
          "Interviews and session reviews pointed to one common failure: people understood the product, but not what they should do next.",
        ],
        highlights: [
          "Long setup before useful work",
          "The same path for every team",
          "No visible first-success milestone",
        ],
      },
      {
        title: "What changed",
        paragraphs: [
          "The redesign asked one outcome question, applied useful defaults, and moved the team directly into creating a real project.",
          "Optional configuration moved into context, after the product had already proved its value.",
        ],
        highlights: [
          "One outcome choice",
          "A real task inside onboarding",
          "Progress measured by useful milestones",
        ],
      },
      {
        title: "What we learned",
        paragraphs: [
          "The clearest improvement did not come from another tutorial. It came from removing decisions until the next useful action was unmistakable.",
        ],
      },
    ],
    quote:
      "We stopped explaining every feature and started guiding people to their first useful result.",
    quoteBy: { name: "Rachel Torres", role: "VP of Product, varunUI" },
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";
  import PersonMeta from "$lib/components/varunui/piece/person-meta.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import { cn } from "$lib/utils.js";

  let {
    title,
    thesis,
    client,
    industry,
    date,
    image,
    overview,
    metrics = [],
    sections = [],
    quote,
    quoteBy,
    className,
  }: CaseStudyWithMetricsProps = $props();
</script>

<Section container="lg">
  <article class={cn("w-full", className)}>
    <Stack gap="xl">
      <SectionHeader
        kicker="Case study"
        markerTone="yellow"
        title={title}
        description={thesis}
        align="left"
        size="lg"
        level={1}
      >
        {#if client || industry || date}
          <p class="font-mono text-xs text-muted-foreground">
            {[client, industry, date].filter(Boolean).join(" · ")}
          </p>
        {/if}
      </SectionHeader>

      {#if image}
        <figure class="overflow-hidden rounded-md border border-border bg-muted">
          <img
            class="aspect-[16/9] w-full object-cover"
            src={image.src}
            alt={image.alt}
          />
        </figure>
      {/if}

      {#if overview}
        <p class="max-w-[var(--layout-prose)] border-y border-border py-6 text-lg leading-8 text-foreground">
          {overview}
        </p>
      {/if}

      {#if metrics.length > 0}
        <Grid columns={3} gap="md">
          {#each metrics as metric, index (`${metric.label}-${index}`)}
            <div class="border-y border-border py-4">
              <InlineStat
                value={metric.value}
                label={metric.label}
                delay={index * 90}
              />
              {#if metric.context}
                <p class="mt-2 text-xs text-muted-foreground">
                  {metric.context}
                </p>
              {/if}
            </div>
          {/each}
        </Grid>
      {/if}

      <Stack gap="xl">
        {#each sections as section (section.title)}
          <Rail sticky={false}>
            {#snippet rail()}
              <h2 class="text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
            {/snippet}

            <Stack gap="md">
              {#each section.paragraphs as paragraph (paragraph)}
                <p class="max-w-[var(--layout-prose)] text-base leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              {/each}
              {#if section.highlights?.length}
                <ul class="flex flex-wrap gap-2" aria-label={`${section.title} highlights`}>
                  {#each section.highlights as highlight (highlight)}
                    <li><Badge variant="muted">{highlight}</Badge></li>
                  {/each}
                </ul>
              {/if}
            </Stack>
          </Rail>
        {/each}
      </Stack>

      {#if quote}
        <blockquote class="max-w-[var(--layout-content-sm)] border-l-4 border-primary py-2 pl-6">
          <p class="text-xl leading-8 text-foreground">“{quote}”</p>
          {#if quoteBy}
            <footer class="mt-5">
              <PersonMeta person={quoteBy} />
            </footer>
          {/if}
        </blockquote>
      {/if}
    </Stack>
  </article>
</Section>
