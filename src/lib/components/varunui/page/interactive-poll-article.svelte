<script lang="ts" module>
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  interface PollOption {
    label: string;
    votes: number;
  }

  interface Poll {
    question: string;
    options: PollOption[];
    totalVotes: number;
    endsAt?: string;
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

  interface ContentBlock {
    type: "paragraph" | "heading" | "subheading" | "list" | "quote";
    content?: string;
    items?: string[];
  }

  interface Labels {
    participants?: string;
    pollEnds?: string;
    votes?: string;
    castYourVote?: string;
    thanksForVoting?: string;
    comments?: string;
    sharePoll?: string;
    commentsHref?: string;
    sharePollHref?: string;
  }

  export interface InteractivePollArticleProps {
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
    poll?: Poll;
    content?: ContentBlock[];
    participantCount?: number;
    commentCount?: number;
    labels?: Labels;
    className?: string;
  }

  export const interactivePollArticleDemo: InteractivePollArticleProps = {
    title: "Which varunUI layout do you reach for first?",
    summary:
      "Cast your vote and compare how other designers begin a page composition.",
    date: "January 18, 2026",
    readTime: "3 min read",
    heroImage: {
      src: peepStanding1Asset,
      alt: "A designer arranging a page layout",
    },
    author: {
      name: "varunUI team",
      title: "Design research",
      avatar: {
        src: peepStanding10Asset,
        alt: "A member of the varunUI team",
      },
      href: "?",
    },
    category: "Survey",
    labels: {
      participants: "participants",
      pollEnds: "Poll ends:",
      votes: "votes",
      castYourVote: "Cast Your Vote",
      thanksForVoting: "Thanks for voting! Total votes:",
      comments: "Comments",
      sharePoll: "Share Poll",
      commentsHref: "?",
      sharePollHref: "?",
    },
    poll: {
      question: "Which layout starts most of your pages?",
      options: [
        { label: "Stack", votes: 428 },
        { label: "Grid", votes: 367 },
        { label: "Split", votes: 242 },
        { label: "Rail", votes: 189 },
        { label: "Bento", votes: 164 },
        { label: "Other", votes: 91 },
      ],
      totalVotes: 1481,
      endsAt: "January 31, 2026",
    },
    content: [
      {
        type: "paragraph",
        content:
          "This small community poll shows which varunUI layout primitives help people begin without locking a page into one visual style.",
      },
      {
        type: "heading",
        content: "What we are seeing so far",
      },
      {
        type: "paragraph",
        content:
          "Stack and Grid lead because they establish rhythm before decoration. Split and Rail appear when the page needs comparison or persistent context.",
      },
      {
        type: "heading",
        content: "Why the choice matters",
      },
      {
        type: "list",
        items: [
          "Shows which layout names are easiest to understand",
          "Reveals where the documentation needs better examples",
          "Keeps new layouts tied to real composition jobs",
          "Helps us resist cosmetic variants",
        ],
      },
      {
        type: "paragraph",
        content:
          "The final notes will be published with a few real page compositions, not another abstract chart.",
      },
    ],
    participantCount: 1481,
    commentCount: 38,
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import {
    BarChart3,
    Calendar,
    Clock,
    MessageSquare,
    Share2,
    User,
    Users,
    Vote,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import RadioGroupField from "$lib/components/varunui/component/radio-group-field.svelte";
  import SegmentedBar from "$lib/components/varunui/component/segmented-bar.svelte";
  import { cn } from "$lib/utils.js";

  let props: InteractivePollArticleProps = $props();

  const title = $derived(props.title ?? interactivePollArticleDemo.title);
  const summary = $derived(props.summary ?? interactivePollArticleDemo.summary);
  const date = $derived(props.date ?? interactivePollArticleDemo.date);
  const readTime = $derived(props.readTime ?? interactivePollArticleDemo.readTime);
  const heroImage = $derived(props.heroImage ?? interactivePollArticleDemo.heroImage);
  const author = $derived(props.author ?? interactivePollArticleDemo.author);
  const category = $derived(props.category ?? interactivePollArticleDemo.category);
  const poll = $derived(props.poll ?? interactivePollArticleDemo.poll);
  const content = $derived(props.content ?? interactivePollArticleDemo.content ?? []);
  const participantCount = $derived(props.participantCount ?? interactivePollArticleDemo.participantCount);
  const commentCount = $derived(props.commentCount ?? interactivePollArticleDemo.commentCount);
  const labels = $derived({ ...interactivePollArticleDemo.labels, ...props.labels });

  let selectedOption = $state("");
  let hasVoted = $state(false);

  function getPercentage(votes: number, total: number) {
    return Math.round((votes / total) * 100);
  }

  const pollOptions = $derived(
    poll?.options.map((option, index) => ({
      label: option.label,
      value: String(index),
      description: `${option.votes.toLocaleString()} current votes`,
    })) ?? [],
  );
  const pollSegments = $derived(
    poll?.options.map((option) => ({
      label: option.label,
      value: getPercentage(option.votes, poll.totalVotes),
      valueLabel: `${getPercentage(option.votes, poll.totalVotes)}%`,
    })) ?? [],
  );
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
    <h2 class="mt-10 text-2xl font-semibold">{block.content}</h2>
  {:else if block.type === "subheading"}
    <h3 class="mt-6 text-xl font-semibold">{block.content}</h3>
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
          <Vote class="size-3" />
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
        {#if participantCount}
          <span class="flex items-center gap-1.5">
            <Users class="size-4" />
            {participantCount.toLocaleString()} {labels.participants}
          </span>
        {/if}
      </div>
    </header>

    {#if poll}
      <div class="mb-10 bg-muted/30 p-6">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold">{poll.question}</h2>
            {#if poll.endsAt}
              <p class="mt-1 text-sm text-muted-foreground">{labels.pollEnds} {poll.endsAt}</p>
            {/if}
          </div>
          <BarChart3 class="size-8 text-primary" />
        </div>

        {#if hasVoted}
          <div class="border-y py-4">
            <SegmentedBar
              segments={pollSegments}
              ariaLabel="Poll results"
            />
          </div>
        {:else}
          <RadioGroupField
            label="Choose one answer"
            options={pollOptions}
            bind:value={selectedOption}
          />
        {/if}

        <div class="mt-6 text-center">
          {#if !hasVoted}
            <Button
              size="lg"
              disabled={!selectedOption}
              onclick={() => {
                if (selectedOption) hasVoted = true;
              }}
              class="gap-2"
            >
              <Vote class="size-4" />
              {labels.castYourVote}
            </Button>
          {:else}
            <p class="text-sm font-medium text-muted-foreground">
              {labels.thanksForVoting} {poll.totalVotes.toLocaleString()}
            </p>
          {/if}
        </div>
      </div>
    {/if}

    <div class="space-y-6">
      {#each content as block}
        {@render ContentBlockView(block)}
      {/each}
    </div>

    <div class="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
      <Button href="?" variant="quiet" size="sm" class="gap-2">
        <MessageSquare class="size-4" />
        {commentCount} {labels.comments}
      </Button>
      <Button href="?" variant="quiet" size="sm" class="gap-2">
        <Share2 class="size-4" />
        {labels.sharePoll}
      </Button>
    </div>
    </article>
  </Section>
</div>
