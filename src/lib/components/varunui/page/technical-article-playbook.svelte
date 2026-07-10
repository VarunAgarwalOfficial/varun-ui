<script lang="ts" module>
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import type { ArticleMetaAuthor } from "$lib/components/varunui/piece/article-meta.svelte";

  interface MediaAsset {
    src: string;
    alt: string;
    caption?: string;
  }

  interface ContentBlock {
    type?: "paragraph" | "heading" | "subheading" | "list" | "quote" | "code";
    content?: string;
    items?: string[];
    language?: string;
    filename?: string;
  }

  interface TutorialStep {
    title: string;
    content?: string;
    code?: string;
    codeType?: "terminal" | "code";
    language?: string;
  }

  interface SectionLabels {
    intro?: string;
    prerequisites?: string;
    article?: string;
    steps?: string;
    completion?: string;
  }

  interface TechnicalArticlePlaybookTagItem {
    label: string;
    href?: string;
  }

  type TechnicalArticlePlaybookTag = TechnicalArticlePlaybookTagItem | string;

  export interface TechnicalArticlePlaybookProps {
    title?: string;
    summary?: string;
    category?: string;
    date?: string;
    readTime?: string;
    author?: ArticleMetaAuthor;
    featuredImage?: MediaAsset;
    tags?: TechnicalArticlePlaybookTag[];
    introLeft?: string;
    introRight?: string;
    sectionLabels?: SectionLabels;
    prerequisites?: string[];
    content?: ContentBlock[];
    steps?: TutorialStep[];
    completionText?: string;
  }

  export const technicalArticlePlaybookDemo: TechnicalArticlePlaybookProps = {
    title: "Auditing Design Tokens with TypeScript",
    summary:
      "A practical article and workflow for catching token drift before a design-system release.",
    category: "Design systems",
    date: "November 5, 2025",
    readTime: "8 min read",
    author: {
      name: "Lisa Park",
      title: "Senior Developer",
      avatar: {
        src: peepStanding18Asset,
        alt: "Lisa Park portrait",
      },
      href: "?",
    },
    featuredImage: {
      src: peepSitting8Asset,
      alt: "Design token audit workspace",
      caption: "A release audit pairs human review with typed checks.",
    },
    tags: [
      { label: "Design systems", href: "?" },
      { label: "TypeScript", href: "?" },
      { label: "Workflow", href: "?" },
    ],
    introLeft:
      "Token drift usually begins quietly: a one-off value lands in a feature branch, generated styles are refreshed out of order, or documentation keeps an older name alive.",
    introRight:
      "This recipe combines an explainer, copyable code, and a numbered release workflow so teams can turn a fragile audit into a repeatable editorial surface.",
    sectionLabels: {
      intro: "Field note",
      prerequisites: "Audit inputs",
      article: "Implementation notes",
      steps: "Release workflow",
      completion: "Ship note",
    },
    prerequisites: [
      "A token source file",
      "Generated CSS or theme artifacts",
      "A component family ready for release",
    ],
    content: [
      {
        type: "paragraph",
        content:
          "Start by treating the source tokens as the contract. The audit should compare every generated artifact against that source, then report any missing, renamed, or unreferenced values.",
      },
      { type: "heading", content: "Create a Typed Token Map" },
      {
        type: "paragraph",
        content:
          "A small typed map gives the audit something precise to validate. The useful part is not the object itself; it is the constraint that every public token must be declared intentionally.",
      },
      {
        type: "code",
        language: "typescript",
        filename: "tokens.ts",
        content:
          "export const tokens = {\n  color: {\n    background: 'var(--color-background)',\n    foreground: 'var(--color-foreground)',\n    primary: 'var(--color-primary)',\n  },\n  radius: {\n    card: 'var(--radius-card)',\n    control: 'var(--radius-control)',\n  },\n} as const;\n\nexport type TokenPath = keyof typeof tokens;",
      },
      { type: "heading", content: "Report Drift Where People Work" },
      {
        type: "quote",
        content:
          "A token audit is only useful when the report points to a surface someone can inspect.",
      },
      {
        type: "list",
        items: [
          "Group drift by component family, not by raw CSS file",
          "Show the source token and generated value side by side",
          "Link each finding to the preview that changed",
        ],
      },
    ],
    steps: [
      {
        title: "Run the token audit",
        content:
          "Generate the drift report before opening the release branch for visual review.",
        code: "varunui audit tokens",
        codeType: "terminal",
      },
      {
        title: "Preview the affected surface",
        content:
          "Build a focused preview for the component family touched by the token change.",
        code: "varunui preview article",
        codeType: "terminal",
      },
      {
        title: "Run project checks",
        content: "Confirm the examples and registry exports still compile.",
        code: "npm run check",
        codeType: "terminal",
      },
      {
        title: "Document the release note",
        content:
          "Close with a small structured note so downstream consumers know what moved.",
        code: "export const releaseNote = {\n  surface: 'article',\n  tokenChange: 'radius-control',\n  status: 'ready',\n};",
        codeType: "code",
        language: "typescript",
      },
    ],
    completionText:
      "The audit now has named inputs, an implementation trail, and a release workflow in one recipe block.",
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { CheckCircle2 } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import CopyButton from "$lib/components/varunui/component/copy-button.svelte";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";

  let {
    title,
    summary,
    category,
    date,
    readTime,
    author,
    featuredImage,
    tags,
    introLeft,
    introRight,
    sectionLabels,
    prerequisites,
    content,
    steps,
    completionText,
  }: TechnicalArticlePlaybookProps = $props();

  const tagItems = $derived(tags ?? []);
  const prerequisiteItems = $derived(prerequisites ?? []);
  const contentBlocks = $derived(content ?? []);
  const stepItems = $derived(steps ?? []);

  function classList(values: Array<string | false | undefined>) {
    return values.filter(Boolean).join(" ");
  }

  function tagLabel(tag: TechnicalArticlePlaybookTag) {
    return typeof tag === "string" ? tag : tag.label;
  }

  function tagHref(tag: TechnicalArticlePlaybookTag) {
    return typeof tag === "string" ? undefined : tag.href;
  }

  function codeShellClass(codeType?: "terminal" | "code") {
    return classList([
      "mt-4 overflow-hidden rounded-md border",
      codeType === "terminal"
        ? "border-foreground bg-foreground text-background"
        : "border-border bg-muted text-foreground",
    ]);
  }

</script>

{#snippet TagPill(tag: TechnicalArticlePlaybookTag)}
  {@const href = tagHref(tag)}
  {#if href}
    <Badge {href} variant="outline">{tagLabel(tag)}</Badge>
  {:else}
    <Badge variant="muted">{tagLabel(tag)}</Badge>
  {/if}
{/snippet}

{#snippet CodePanel(text: string | undefined, codeType?: "terminal" | "code", label?: string)}
  {#if text}
    <div class={codeShellClass(codeType)}>
      <div class="flex items-center justify-between gap-3 border-b border-current/10 px-4 py-3">
        <code class="min-w-0 overflow-x-auto whitespace-pre text-sm">
          {#if codeType === "terminal"}$ {/if}{text}
        </code>
        <CopyButton value={text} label={label ?? "Copy code"} />
      </div>
    </div>
  {/if}
{/snippet}

{#snippet ContentBlockView(block: ContentBlock, index: number)}
  {#if block.type === "heading"}
    <h3 class="pt-8 text-2xl font-semibold tracking-normal text-foreground">
      {block.content}
    </h3>
  {:else if block.type === "subheading"}
    <h4 class="pt-4 text-xl font-semibold tracking-normal text-foreground">
      {block.content}
    </h4>
  {:else if block.type === "list"}
    <ul class="ml-5 list-disc space-y-3 text-muted-foreground marker:text-primary">
      {#each block.items ?? [] as item}
        <li>{item}</li>
      {/each}
    </ul>
  {:else if block.type === "quote"}
    <blockquote class="border-l-4 border-primary pl-6 text-xl font-medium leading-8 text-foreground">
      {block.content}
    </blockquote>
  {:else if block.type === "code"}
    <div class="overflow-hidden rounded-md border border-border bg-muted">
      <div class="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
        <div class="flex min-w-0 items-center gap-2 text-xs font-medium text-muted-foreground">
          {#if block.filename}
            <span class="truncate text-foreground">{block.filename}</span>
          {:else if block.language}
            <span class="rounded-md bg-muted px-2 py-0.5 text-foreground">{block.language}</span>
          {/if}
        </div>
        <CopyButton value={block.content ?? ""} label="Copy code" />
      </div>
      <pre class="overflow-x-auto p-4 text-sm leading-6 text-foreground"><code>{block.content}</code></pre>
    </div>
  {:else}
    <p class="text-lg leading-8 text-muted-foreground">{block.content}</p>
  {/if}
{/snippet}

<Section container="md">
  <article class="text-foreground">
    <header class="space-y-6 text-center">
      {#if tagItems.length}
        <div class="flex flex-wrap justify-center gap-2">
          {#each tagItems as tag}
            {@render TagPill(tag)}
          {/each}
        </div>
      {/if}

      {#if title}
        <h1 class="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
          {title}
        </h1>
      {/if}

      {#if summary}
        <p class="mx-auto max-w-[var(--layout-prose)] text-lg leading-8 text-muted-foreground">{summary}</p>
      {/if}

      <div class="flex justify-center">
        <ArticleMeta {author} {category} {date} {readTime} size="md" icons />
      </div>
    </header>

    {#if featuredImage}
      <figure class="mt-12 overflow-hidden rounded-md border border-border bg-surface">
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

    {#if introLeft || introRight}
      <section class="mt-12 border-y border-border py-8" aria-labelledby="technicalArticlePlaybook-intro">
        {#if sectionLabels?.intro}
          <h2 id="technicalArticlePlaybook-intro" class="mb-5 text-sm font-semibold uppercase tracking-normal text-primary">
            {sectionLabels.intro}
          </h2>
        {/if}
        <div class="grid gap-8 md:grid-cols-2 md:gap-10">
          {#if introLeft}
            <p class="text-lg leading-8 text-foreground">{introLeft}</p>
          {/if}
          {#if introRight}
            <p class="text-lg leading-8 text-muted-foreground">{introRight}</p>
          {/if}
        </div>
      </section>
    {/if}

    {#if prerequisiteItems.length}
      <aside class="mx-auto mt-12 max-w-[var(--layout-content-sm)] border-y border-border py-6">
        {#if sectionLabels?.prerequisites}
          <h2 class="mb-4 text-lg font-semibold tracking-normal text-foreground">
            {sectionLabels.prerequisites}
          </h2>
        {/if}
        <ul class="space-y-3">
          {#each prerequisiteItems as prerequisite}
            <li class="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-success" />
              <span>{prerequisite}</span>
            </li>
          {/each}
        </ul>
      </aside>
    {/if}

    {#if contentBlocks.length}
      <section class="mx-auto mt-12 max-w-[var(--layout-content-sm)] space-y-6">
        {#if sectionLabels?.article}
          <h2 class="text-sm font-semibold uppercase tracking-normal text-primary">
            {sectionLabels.article}
          </h2>
        {/if}
        {#each contentBlocks as block, index}
          {@render ContentBlockView(block, index)}
        {/each}
      </section>
    {/if}

    {#if stepItems.length}
      <section class="mx-auto mt-14 max-w-[var(--layout-content-sm)]">
        {#if sectionLabels?.steps}
          <h2 class="mb-8 text-sm font-semibold uppercase tracking-normal text-primary">
            {sectionLabels.steps}
          </h2>
        {/if}
        {#each stepItems as step, index}
          <section class="relative grid gap-5 pb-10 pl-14">
            <div class="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-background">
              {index + 1}
            </div>
            {#if index < stepItems.length - 1}
              <div class="absolute left-4 top-11 h-[calc(100%-2.75rem)] border-l border-border"></div>
            {/if}

            <div>
              <h3 class="text-2xl font-semibold tracking-normal text-foreground">{step.title}</h3>
              {#if step.content}
                <p class="mt-3 text-base leading-7 text-muted-foreground">{step.content}</p>
              {/if}
              {@render CodePanel(step.code, step.codeType, "Copy command")}
            </div>
          </section>
        {/each}
      </section>
    {/if}

    {#if completionText}
      <aside class="mx-auto mt-2 max-w-[var(--layout-content-sm)] border-y border-border py-6">
        <div class="flex gap-4">
          <CheckCircle2 class="mt-1 size-5 shrink-0 text-success" />
          <div>
            {#if sectionLabels?.completion}
              <h2 class="mb-2 text-lg font-semibold tracking-normal text-foreground">
                {sectionLabels.completion}
              </h2>
            {/if}
            <p class="text-base leading-7 text-foreground">{completionText}</p>
          </div>
        </div>
      </aside>
    {/if}
  </article>
</Section>
