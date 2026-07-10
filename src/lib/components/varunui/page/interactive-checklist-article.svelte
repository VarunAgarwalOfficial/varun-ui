<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  interface ContentBlock {
    type: "paragraph" | "heading" | "subheading" | "list" | "quote";
    content?: string;
    items?: string[];
  }

  interface ChecklistItem {
    label: string;
    description?: string;
    isRequired?: boolean;
  }

  interface ChecklistSection {
    title: string;
    description?: string;
    items: ChecklistItem[];
  }

  interface Author {
    name: string;
    title?: string;
    avatar?: {
      src: string;
      alt: string;
    };
    href?: string;
  }

  interface Labels {
    progressTitle?: string;
    itemsCompleted?: string;
    readyToLaunch?: string;
    requiredLegend?: string;
    allComplete?: string;
  }

  interface ActionButton {
    icon: "Download" | "Printer" | "Share2";
    label: string;
    href: string;
    variant?: "primary" | "outline" | "quiet" | "danger";
  }

  export interface InteractiveChecklistArticleProps {
    title?: string;
    summary?: string;
    date?: string;
    readTime?: string;
    heroImage?: {
      src: string;
      alt: string;
    };
    author?: Author;
    category?: string;
    content?: ContentBlock[];
    sections?: ChecklistSection[];
    conclusion?: string;
    buttons?: ActionButton[];
    labels?: Labels;
    className?: string;
  }

  export const interactiveChecklistArticleDemo: InteractiveChecklistArticleProps = {
    title: "The Ultimate Website Launch Checklist",
    summary:
      "Don't launch without checking these boxes. A comprehensive checklist covering everything from SEO to security.",
    date: "January 18, 2026",
    readTime: "10 min read",
    heroImage: {
      src: peepSitting13Asset,
      alt: "Website launch checklist",
    },
    author: {
      name: "Launch Team",
      title: "DevOps",
      avatar: {
        src: peepStanding18Asset,
        alt: "Launch Team",
      },
      href: "?",
    },
    category: "Checklist",
    content: [
      {
        type: "paragraph",
        content:
          "Launching a website is exciting, but it's easy to forget critical steps in the rush to go live. Use this interactive checklist to ensure nothing falls through the cracks.",
      },
    ],
    labels: {
      progressTitle: "Your Progress",
      itemsCompleted: "items completed",
      readyToLaunch: "Ready to launch!",
      requiredLegend: "Required items must be completed before launch",
      allComplete: "All Complete!",
    },
    buttons: [
      { icon: "Download", label: "Download PDF", href: "?", variant: "outline" },
      { icon: "Printer", label: "Print", href: "?", variant: "outline" },
      { icon: "Share2", label: "Share", href: "?", variant: "outline" },
    ],
    sections: [
      {
        title: "Content & Copy",
        description: "Ensure all content is polished and ready for visitors",
        items: [
          { label: "Proofread all pages for typos and grammar", isRequired: true },
          { label: "Check all images have alt text", isRequired: true },
          { label: "Verify all links work correctly", isRequired: true },
          { label: "Remove placeholder content and lorem ipsum" },
          { label: "Ensure consistent tone across all pages" },
          { label: "Add 404 error page with helpful navigation" },
        ],
      },
      {
        title: "SEO Essentials",
        description: "Optimize for search engines from day one",
        items: [
          { label: "Add unique title tags to all pages", isRequired: true },
          { label: "Write meta descriptions for each page", isRequired: true },
          { label: "Create and submit sitemap.xml" },
          { label: "Set up robots.txt properly" },
          { label: "Configure Open Graph tags for social sharing" },
          { label: "Set up Google Search Console" },
          { label: "Implement structured data where relevant" },
        ],
      },
      {
        title: "Performance",
        description: "Ensure your site loads fast for all users",
        items: [
          { label: "Optimize and compress all images", isRequired: true },
          { label: "Enable browser caching" },
          { label: "Minify CSS and JavaScript" },
          { label: "Test loading speed on PageSpeed Insights", isRequired: true },
          { label: "Enable gzip compression" },
          { label: "Set up a CDN for static assets" },
        ],
      },
      {
        title: "Security",
        description: "Protect your site and your users",
        items: [
          { label: "Install and configure SSL certificate", isRequired: true },
          { label: "Force HTTPS redirects", isRequired: true },
          { label: "Set up regular backups" },
          { label: "Remove unused plugins and dependencies" },
          { label: "Configure security headers" },
          { label: "Test forms for spam protection" },
        ],
      },
      {
        title: "Analytics & Tracking",
        description: "Set up measurement from the start",
        items: [
          { label: "Install Google Analytics or alternative", isRequired: true },
          { label: "Set up goal/conversion tracking" },
          { label: "Configure event tracking for key actions" },
          { label: "Test tracking is working correctly" },
          { label: "Set up error monitoring (e.g., Sentry)" },
        ],
      },
      {
        title: "Final Checks",
        description: "Last things before going live",
        items: [
          { label: "Test on multiple browsers", isRequired: true },
          { label: "Test on mobile devices", isRequired: true },
          { label: "Check all forms submit correctly" },
          { label: "Test email notifications" },
          { label: "Review privacy policy and terms" },
          { label: "Set up monitoring and uptime alerts" },
        ],
      },
    ],
    conclusion:
      "Completed everything? Congratulations, you're ready to launch! Remember, launching is just the beginning. Continue monitoring, iterating, and improving based on real user feedback.",
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import {
    Calendar,
    Check,
    CheckSquareIcon,
    Clock,
    Download,
    FileText,
    Share2,
    User,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";
  import { cn } from "$lib/utils.js";

  let props: InteractiveChecklistArticleProps = $props();

  const title = $derived(props.title ?? interactiveChecklistArticleDemo.title);
  const summary = $derived(props.summary ?? interactiveChecklistArticleDemo.summary);
  const date = $derived(props.date ?? interactiveChecklistArticleDemo.date);
  const readTime = $derived(props.readTime ?? interactiveChecklistArticleDemo.readTime);
  const heroImage = $derived(props.heroImage ?? interactiveChecklistArticleDemo.heroImage);
  const author = $derived(props.author ?? interactiveChecklistArticleDemo.author);
  const category = $derived(props.category ?? interactiveChecklistArticleDemo.category);
  const content = $derived(props.content ?? interactiveChecklistArticleDemo.content ?? []);
  const sections = $derived(props.sections ?? interactiveChecklistArticleDemo.sections ?? []);
  const conclusion = $derived(props.conclusion ?? interactiveChecklistArticleDemo.conclusion);
  const buttons = $derived(props.buttons ?? interactiveChecklistArticleDemo.buttons ?? []);
  const labels = $derived({ ...interactiveChecklistArticleDemo.labels, ...props.labels });

  let checkedItems = $state(new Set<string>());

  const totalItems = $derived(sections.reduce((acc, section) => acc + section.items.length, 0));
  const checkedCount = $derived(checkedItems.size);
  const progressPercent = $derived(totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0);
  const requiredItemKeys = $derived(
    sections.flatMap((section, sectionIndex) =>
      section.items
        .map((item, itemIndex) => ({
          key: `${sectionIndex}-${itemIndex}`,
          isRequired: item.isRequired,
        }))
        .filter((item) => item.isRequired)
        .map((item) => item.key),
    ),
  );
  const allRequiredComplete = $derived(requiredItemKeys.every((key) => checkedItems.has(key)));

  function setItem(key: string, checked: boolean) {
    const next = new Set(checkedItems);
    if (checked) next.add(key);
    else next.delete(key);
    checkedItems = next;
  }
</script>

{#snippet AuthorMeta(author: Author)}
  <div class="flex items-center gap-2">
    {#if author.avatar}
      <img class="size-8 rounded-full object-cover" src={author.avatar.src} alt={author.avatar.alt} />
    {:else}
      <span class="flex size-8 items-center justify-center rounded-full bg-muted">
        <User class="size-3" />
      </span>
    {/if}
    <a href="?" class="font-medium text-foreground hover:underline">{author.name}</a>
    {#if author.title}
      <span class="text-xs text-muted-foreground">· {author.title}</span>
    {/if}
  </div>
{/snippet}

{#snippet ContentBlockView(block: ContentBlock)}
  {#if block.type === "paragraph"}
    <p class="text-lg leading-relaxed text-muted-foreground">{block.content}</p>
  {:else if block.type === "heading"}
    <h2 class="text-2xl font-semibold">{block.content}</h2>
  {:else if block.type === "subheading"}
    <h3 class="text-xl font-semibold">{block.content}</h3>
  {:else if block.type === "list"}
    <ul class="list-disc space-y-2 pl-4">
      {#each block.items ?? [] as item}
        <li class="text-muted-foreground">{item}</li>
      {/each}
    </ul>
  {:else if block.type === "quote"}
    <blockquote class="border-l-4 border-primary pl-4 text-muted-foreground italic">{block.content}</blockquote>
  {/if}
{/snippet}

{#snippet ActionIcon(icon: ActionButton["icon"])}
  {#if icon === "Download"}
    <Download class="size-4" />
  {:else if icon === "Printer"}
    <FileText class="size-4" />
  {:else}
    <Share2 class="size-4" />
  {/if}
{/snippet}

<div class={cn("w-full bg-background text-foreground", props.className)}>
  <Section container="sm">
    <article>
    {#if heroImage}
      <div class="relative mb-8 aspect-video overflow-hidden rounded-md bg-muted">
        <img class="absolute inset-0 size-full object-cover" src={heroImage.src} alt={heroImage.alt} />
      </div>
    {/if}

    <header class="mb-8">
      {#if category}
        <Badge variant="muted" class="mb-4 gap-1.5">
          <CheckSquareIcon class="size-3" />
          {category}
        </Badge>
      {/if}
      {#if title}
        <h1 class="text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {/if}
      {#if summary}
        <p class="mt-3 text-lg text-muted-foreground">{summary}</p>
      {/if}
      <div class="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {#if author}
          {@render AuthorMeta(author)}
        {/if}
        {#if date}
          <span class="flex items-center gap-1.5"><Calendar class="size-4" />{date}</span>
        {/if}
        {#if readTime}
          <span class="flex items-center gap-1.5"><Clock class="size-4" />{readTime}</span>
        {/if}
      </div>
    </header>

    <div class="mb-8 border-y bg-muted/30 p-4">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="font-medium">{labels.progressTitle}</p>
          <p class="text-sm text-muted-foreground">{checkedCount} of {totalItems} {labels.itemsCompleted}</p>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold">{progressPercent}%</p>
          {#if allRequiredComplete}
            <Badge class="mt-1 bg-success/10 text-success">{labels.readyToLaunch}</Badge>
          {/if}
        </div>
      </div>
      <div class="mt-4">
        <ProgressMeter
          value={progressPercent}
          max={100}
          tone={progressPercent === 100 ? "success" : "primary"}
          size="md"
          ariaLabel="Checklist completion"
          ariaValueText={`${progressPercent}% complete`}
        />
      </div>
    </div>

    {#if content.length > 0}
      <div class="mb-8 space-y-4">
        {#each content as block}
          {@render ContentBlockView(block)}
        {/each}
      </div>
    {/if}

    <div class="space-y-6">
      {#each sections as section, sectionIndex}
        {@const sectionChecked = section.items.filter((_, itemIndex) => checkedItems.has(`${sectionIndex}-${itemIndex}`)).length}
        <section class="border-t last:border-b">
          <div class="border-b bg-muted/30 p-4">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-lg font-semibold">{section.title}</h2>
              <span class="text-sm font-medium text-muted-foreground">{sectionChecked}/{section.items.length}</span>
            </div>
            {#if section.description}
              <p class="mt-1 text-sm text-muted-foreground">{section.description}</p>
            {/if}
          </div>
          <div class="divide-y">
            {#each section.items as item, itemIndex}
              {@const itemKey = `${sectionIndex}-${itemIndex}`}
              <div class="p-4">
                <CheckboxField
                  id={`checklist-${itemKey}`}
                  label={item.label}
                  description={item.description}
                  checked={checkedItems.has(itemKey)}
                  required={item.isRequired}
                  message={item.isRequired ? "Required" : undefined}
                  onCheckedChange={(checked) => setItem(itemKey, checked)}
                />
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>

    <p class="mt-4 text-sm text-muted-foreground"><span class="text-danger">*</span> {labels.requiredLegend}</p>

    {#if conclusion}
      <div class={cn("mt-8 border-l-4 p-5", progressPercent === 100 ? "border-success bg-success/10" : "border-border bg-muted/40")}>
        {#if progressPercent === 100}
          <div class="mb-3 flex items-center gap-2 font-semibold text-success">
            <Check class="size-5" />
            {labels.allComplete}
          </div>
        {/if}
        <p class="text-muted-foreground">{conclusion}</p>
      </div>
    {/if}

    {#if buttons.length > 0}
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        {#each buttons as button}
          <Button href="?" variant={button.variant ?? "outline"} class="gap-2">
            {@render ActionIcon(button.icon)}
            {button.label}
          </Button>
        {/each}
      </div>
    {/if}
    </article>
  </Section>
</div>
