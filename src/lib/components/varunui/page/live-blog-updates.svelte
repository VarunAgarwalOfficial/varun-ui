<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  interface Update {
    time: string;
    content: string;
    isBreaking?: boolean;
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

  interface RelatedStory {
    title: string;
    href: string;
    time?: string;
  }

  interface Labels {
    liveUpdates?: string;
    updated?: string;
    follow?: string;
    followHref?: string;
    share?: string;
    shareHref?: string;
    keyPoints?: string;
    liveUpdatesTitle?: string;
    autoRefreshing?: string;
    breaking?: string;
    relatedCoverage?: string;
    joinDiscussion?: string;
    joinDiscussionDescription?: string;
    viewComments?: string;
    viewCommentsHref?: string;
  }

  export interface LiveBlogUpdatesProps {
    title?: string;
    summary?: string;
    publishedAt?: string;
    lastUpdated?: string;
    badge?: {
      icon?: "radio";
      label: string;
    };
    heroImage?: {
      src: string;
      alt: string;
      caption?: string;
    };
    authors?: Author[];
    updates?: Update[];
    keyPoints?: string[];
    relatedStories?: RelatedStory[];
    labels?: Labels;
  }

  export const liveBlogUpdatesDemo: LiveBlogUpdatesProps = {
    title: "varunUI 1.0 launch: live updates",
    summary:
      "Follow the package release, documentation rollout, and first fixes as varunUI 1.0 goes live.",
    publishedAt: "January 17, 2026 - 9:15 AM",
    lastUpdated: "2 minutes ago",
    badge: { icon: "radio", label: "Live Updates" },
    heroImage: {
      src: peepSitting8Asset,
      alt: "The varunUI team preparing a release",
      caption: "The varunUI team preparing the 1.0 release.",
    },
    authors: [
      {
        name: "Rachel Torres",
        title: "varunUI editor",
        avatar: {
          src: peepStanding5Asset,
          alt: "Rachel Torres",
        },
        href: "?",
      },
      {
        name: "David Kim",
        title: "varunUI engineer",
        avatar: {
          src: peep1Asset,
          alt: "David Kim",
        },
        href: "?",
      },
    ],
    updates: [
      {
        time: "11:45 AM",
        content: "The first documentation corrections are live.",
        isBreaking: true,
      },
      {
        time: "11:30 AM",
        content:
          "The page blueprint guide now covers marketing, auth, product, commerce, support, and system states.",
      },
      {
        time: "11:15 AM",
        content:
          "All component and layout previews are available in the catalog.",
      },
      {
        time: "10:45 AM",
        content:
          "The static registry is published with the current public surface.",
      },
      {
        time: "10:30 AM",
        content:
          "Light and dark paper themes are both available from the package stylesheet.",
      },
      {
        time: "10:00 AM",
        content: "The varunUI Svelte package is available for installation.",
      },
      {
        time: "9:15 AM",
        content: "varunUI 1.0 is live.",
        isBreaking: true,
      },
    ],
    keyPoints: [
      "One primary action color with a named pastel palette",
      "Exactly two paper themes",
      "Components, pieces, layouts, blocks, and canvases",
      "Character storytellers for useful product moments",
      "Page blueprints for complete application flows",
    ],
    relatedStories: [
      {
        title: "How varunUI separates components from pieces",
        href: "?",
        time: "30 min ago",
      },
      {
        title: "Choosing a layout by information flow",
        href: "?",
        time: "1 hour ago",
      },
      {
        title: "Designing with varunUI characters",
        href: "?",
        time: "2 hours ago",
      },
      { title: "The varunUI paper and color system", href: "?" },
    ],
    labels: {
      liveUpdates: "Live Updates",
      updated: "Updated",
      follow: "Follow",
      followHref: "?",
      share: "Share",
      shareHref: "?",
      keyPoints: "Key Points",
      liveUpdatesTitle: "Live Updates",
      autoRefreshing: "Auto-refreshing",
      breaking: "Breaking",
      relatedCoverage: "Related Coverage",
      joinDiscussion: "Join the Discussion",
      joinDiscussionDescription: "Share your thoughts on this developing story",
      viewComments: "View Comments",
      viewCommentsHref: "?",
    },
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import {
    BellIcon,
    Calendar,
    Clock,
    ExternalLink,
    MessageSquare,
    RadioIcon,
    RefreshCw,
    Share2,
    User,
    WarningCircleIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  let props: LiveBlogUpdatesProps = $props();

  const title = $derived(props.title ?? liveBlogUpdatesDemo.title);
  const summary = $derived(props.summary ?? liveBlogUpdatesDemo.summary);
  const publishedAt = $derived(
    props.publishedAt ?? liveBlogUpdatesDemo.publishedAt,
  );
  const lastUpdated = $derived(
    props.lastUpdated ?? liveBlogUpdatesDemo.lastUpdated,
  );
  const badge = $derived(props.badge ?? liveBlogUpdatesDemo.badge);
  const heroImage = $derived(props.heroImage ?? liveBlogUpdatesDemo.heroImage);
  const authors = $derived(props.authors ?? liveBlogUpdatesDemo.authors ?? []);
  const updates = $derived(props.updates ?? liveBlogUpdatesDemo.updates ?? []);
  const keyPoints = $derived(
    props.keyPoints ?? liveBlogUpdatesDemo.keyPoints ?? [],
  );
  const relatedStories = $derived(
    props.relatedStories ?? liveBlogUpdatesDemo.relatedStories ?? [],
  );
  const labels = $derived({
    ...(liveBlogUpdatesDemo.labels ?? {}),
    ...(props.labels ?? {}),
  });
  const isLive = $derived(!!badge);
</script>

<Section container="sm">
  <article class="text-foreground">
    {#if badge}
      <div class="mb-4 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-danger px-2.5 py-1 text-xs font-medium text-background"
        >
          <RadioIcon class="size-3" />
          {badge.label}
        </span>
        {#if lastUpdated}
          <span class="flex items-center gap-1.5 text-sm text-muted-foreground">
            <RefreshCw class="size-3" />
            {labels.updated}
            {lastUpdated}
          </span>
        {/if}
      </div>
    {/if}

    {#if title}<h1
        class="text-3xl font-bold tracking-tight text-balance md:text-4xl"
      >
        {title}
      </h1>{/if}
    {#if summary}<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
        {summary}
      </p>{/if}

    <div class="mt-6 flex flex-wrap items-center gap-4 border-b pb-6">
      {#if authors.length > 0}
        <div class="flex items-center gap-2">
          <div class="flex -space-x-2">
            {#each authors as author}
              <div
                class="size-8 overflow-hidden rounded-full border-2 border-background bg-muted"
              >
                {#if author.avatar}
                  <img
                    class="size-full object-cover"
                    src={author.avatar.src}
                    alt={author.avatar.alt}
                  />
                {:else}
                  <User class="m-2 size-4 text-muted-foreground" />
                {/if}
              </div>
            {/each}
          </div>
          <div class="text-sm">
            <span class="font-medium"
              >{authors.map((author) => author.name).join(", ")}</span
            >
          </div>
        </div>
      {/if}

      {#if publishedAt}
        <span class="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar class="size-4" />
          {publishedAt}
        </span>
      {/if}

      <div class="ml-auto flex items-center gap-3">
        <a
          href="?"
          class="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm hover:bg-muted"
        >
          <BellIcon class="size-4" />
          {labels.follow}
        </a>
        <a
          href="?"
          class="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm hover:bg-muted"
        >
          <Share2 class="size-4" />
          {labels.share}
        </a>
      </div>
    </div>

    {#if heroImage}
      <figure class="mt-6">
        <div class="aspect-video overflow-hidden rounded-md bg-muted">
          <img
            class="size-full object-cover"
            src={heroImage.src}
            alt={heroImage.alt}
          />
        </div>
        {#if heroImage.caption}
          <figcaption class="mt-2 text-sm text-muted-foreground">
            {heroImage.caption}
          </figcaption>
        {/if}
      </figure>
    {/if}

    {#if keyPoints.length > 0}
      <div class="mt-8 border-l-4 border-primary bg-primary/5 p-4">
        <div class="flex items-center gap-2 font-semibold">
          <WarningCircleIcon class="size-5 text-primary" />
          {labels.keyPoints}
        </div>
        <ul class="mt-3 space-y-2">
          {#each keyPoints as point}
            <li class="flex items-start gap-2 text-sm text-muted-foreground">
              <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
              ></span>
              {point}
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if updates.length > 0}
      <div class="mt-10">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="flex items-center gap-2 text-xl font-semibold">
            <Clock class="size-5" />
            {labels.liveUpdatesTitle}
          </h2>
          {#if isLive}
            <span
              class="flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <span class="size-2 rounded-full bg-danger motion-pulse"></span>
              {labels.autoRefreshing}
            </span>
          {/if}
        </div>

        <div class="space-y-4">
          {#each updates as update}
            <div
              class={`relative border-l-2 pl-4 ${update.isBreaking ? "border-danger" : "border-border"}`}
            >
              <span
                class={`absolute -left-[5px] top-1.5 size-2 rounded-full ${
                  update.isBreaking ? "bg-danger" : "bg-muted-foreground"
                }`}
              ></span>
              <div class="flex items-start gap-3">
                <span
                  class={`text-sm font-medium ${update.isBreaking ? "text-danger" : "text-muted-foreground"}`}
                >
                  {update.time}
                </span>
                <div>
                  {#if update.isBreaking}
                    <span
                      class="mb-1 inline-flex rounded-full bg-danger px-2 py-0.5 text-xs font-medium text-background"
                    >
                      {labels.breaking}
                    </span>
                  {/if}
                  <p class="text-muted-foreground">{update.content}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if relatedStories.length > 0}
      <div class="mt-10 border-y py-4">
        <h2 class="mb-4 font-semibold">{labels.relatedCoverage}</h2>
        <div class="space-y-3">
          {#each relatedStories as story}
            <a
              href="?"
              class="group/story flex items-start justify-between gap-4"
            >
              <span
                class="text-sm group-hover/story:text-primary group-hover/story:underline"
              >
                {story.title}
              </span>
              <span
                class="flex shrink-0 items-center gap-2 text-xs text-muted-foreground"
              >
                {#if story.time}<span>{story.time}</span>{/if}
                <ExternalLink class="size-3" />
              </span>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <div class="mt-8 flex items-center justify-center border-y py-6">
      <div class="text-center">
        <MessageSquare class="mx-auto size-8 text-muted-foreground" />
        <p class="mt-2 font-medium">{labels.joinDiscussion}</p>
        <p class="mt-1 text-sm text-muted-foreground">
          {labels.joinDiscussionDescription}
        </p>
        <a
          href="?"
          class="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-background hover:bg-primary/90"
        >
          {labels.viewComments}
        </a>
      </div>
    </div>
  </article>
</Section>
