<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  interface CommentReply {
    author: {
      name: string;
      avatar?: { src: string; alt: string };
      isAuthor?: boolean;
    };
    content: string;
    date: string;
    likes: number;
  }

  interface Comment {
    author: {
      name: string;
      avatar?: { src: string; alt: string };
      isAuthor?: boolean;
    };
    content: string;
    date: string;
    likes: number;
    isFeatured?: boolean;
    replies?: CommentReply[];
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
    type: "paragraph" | "heading" | "subheading" | "list" | "quote" | "question";
    content?: string;
    items?: string[];
  }

  interface Labels {
    categoryBadge?: string;
    featuredCommentsTitle?: string;
    featuredBadge?: string;
    authorBadge?: string;
    commentsTitle?: string;
    sortMostLiked?: string;
    sortNewest?: string;
    sortOldest?: string;
    commentPlaceholder?: string;
    postCommentButton?: string;
    replyButton?: string;
    loadMoreButton?: string;
  }

  export interface ArticleWithCommentsProps {
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
    featuredComments?: Comment[];
    comments?: Comment[];
    totalComments?: number;
    labels?: Labels;
    className?: string;
  }

  export const articleWithCommentsDemo: ArticleWithCommentsProps = {
    title: "The Great Tabs vs Spaces Debate: Where Do You Stand?",
    summary:
      "A lighthearted look at one of programming's most enduring debates. Share your preference and defend your position!",
    date: "January 18, 2026",
    readTime: "4 min read",
    heroImage: {
      src: peepStanding18Asset,
      alt: "Code editor with indentation",
    },
    author: {
      name: "Alex Turner",
      title: "Community Manager",
      avatar: {
        src: peepSitting8Asset,
        alt: "Alex Turner",
      },
      href: "?",
    },
    category: "Discussion",
    labels: {
      categoryBadge: "Discussion",
      featuredCommentsTitle: "Featured Comments",
      featuredBadge: "Featured",
      authorBadge: "Author",
      commentsTitle: "Comments",
      sortMostLiked: "Most liked",
      sortNewest: "Newest",
      sortOldest: "Oldest",
      commentPlaceholder: "Share your thoughts...",
      postCommentButton: "Post Comment",
      replyButton: "Reply",
      loadMoreButton: "Load More Comments",
    },
    content: [
      {
        type: "paragraph",
        content:
          "Few debates in programming spark as much passion as tabs vs spaces. It's divided teams, ended friendships (okay, maybe not), and even had a cameo in Silicon Valley. But is there actually a right answer?",
      },
      {
        type: "heading",
        content: "The Case for Tabs",
      },
      {
        type: "paragraph",
        content:
          "Tab advocates argue that tabs separate concerns: the semantic unit of indentation (one tab) from the visual representation (configurable width). Each developer can set their preferred display width without changing the actual file. It's also more accessible for developers who need larger indentation.",
      },
      {
        type: "heading",
        content: "The Case for Spaces",
      },
      {
        type: "paragraph",
        content:
          "Space advocates point to consistency: code looks the same everywhere, from your editor to GitHub to a terminal. There's no surprises when someone has their tabs set to 8 spaces. And if you're aligning code (which some consider an anti-pattern), spaces are necessary anyway.",
      },
      {
        type: "question",
        content:
          "So we want to know: tabs or spaces? And more importantly, why? Share your reasoning in the comments below!",
      },
    ],
    featuredComments: [
      {
        author: {
          name: "David Chen",
          avatar: {
            src: peepStanding5Asset,
            alt: "David Chen",
          },
        },
        content:
          "Tabs for indentation, spaces for alignment. Best of both worlds. Fight me. But seriously, the accessibility argument for tabs is underrated. People who need larger text also benefit from configurable indent width.",
        date: "2 hours ago",
        likes: 247,
        isFeatured: true,
      },
      {
        author: {
          name: "Maria Santos",
          avatar: {
            src: peep1Asset,
            alt: "Maria Santos",
          },
        },
        content:
          "Hot take: the real answer is whatever your team agrees on and enforces with tooling. The debate is only contentious when there's inconsistency. Prettier and EditorConfig solved this years ago.",
        date: "1 hour ago",
        likes: 189,
        isFeatured: true,
      },
    ],
    comments: [
      {
        author: {
          name: "Lisa Park",
          avatar: {
            src: peepStanding23Asset,
            alt: "Lisa Park",
          },
        },
        content:
          "Spaces, 2 of them. I work in JavaScript/TypeScript and that's the standard. Going against ecosystem conventions just creates friction when collaborating.",
        date: "45 min ago",
        likes: 56,
        replies: [
          {
            author: {
              name: "Alex Turner",
              avatar: {
                src: peepSitting1Asset,
                alt: "Alex Turner",
              },
              isAuthor: true,
            },
            content:
              "Great point about following ecosystem conventions! The JS/TS community has definitely standardized on 2 spaces.",
            date: "30 min ago",
            likes: 12,
          },
        ],
      },
      {
        author: {
          name: "David Chen",
          avatar: {
            src: peepStanding12Asset,
            alt: "David Chen",
          },
        },
        content:
          "As someone with mild visual impairment, I deeply appreciate tabs. Being able to set my indent width to 4 while my coworkers use 2 is genuinely helpful. Accessibility matters!",
        date: "30 min ago",
        likes: 134,
      },
      {
        author: {
          name: "Maria Santos",
          avatar: {
            src: peepStanding1Asset,
            alt: "Maria Santos",
          },
        },
        content:
          "I used to be a tabs purist, but after years of spaces-only codebases, I've stopped caring. As long as it's consistent, I can work with anything. Life's too short for formatting debates.",
        date: "20 min ago",
        likes: 89,
      },
    ],
    totalComments: 342,
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import {
    Calendar,
    ChatCircleIcon,
    ChevronDown,
    Clock,
    Heart,
    MessageSquare,
    ArrowBendUpLeftIcon,
    ShieldAlert,
    Sparkles,
    ThumbsUp,
    User,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import SelectMenu from "$lib/components/varunui/component/select-menu.svelte";
  import TextareaField from "$lib/components/varunui/component/textarea-field.svelte";
  import { cn } from "$lib/utils.js";

  let props: ArticleWithCommentsProps = $props();
  let commentSort = $state("most-liked");

  const title = $derived(props.title ?? articleWithCommentsDemo.title);
  const summary = $derived(props.summary ?? articleWithCommentsDemo.summary);
  const date = $derived(props.date ?? articleWithCommentsDemo.date);
  const readTime = $derived(props.readTime ?? articleWithCommentsDemo.readTime);
  const heroImage = $derived(props.heroImage ?? articleWithCommentsDemo.heroImage);
  const author = $derived(props.author ?? articleWithCommentsDemo.author);
  const category = $derived(props.category ?? articleWithCommentsDemo.category);
  const content = $derived(props.content ?? articleWithCommentsDemo.content ?? []);
  const featuredComments = $derived(props.featuredComments ?? articleWithCommentsDemo.featuredComments ?? []);
  const comments = $derived(props.comments ?? articleWithCommentsDemo.comments ?? []);
  const totalComments = $derived(props.totalComments ?? articleWithCommentsDemo.totalComments);
  const labels = $derived({ ...articleWithCommentsDemo.labels, ...props.labels });
  const commentSortOptions = $derived([
    {
      label: labels.sortMostLiked ?? "Most liked",
      value: "most-liked",
    },
    { label: labels.sortNewest ?? "Newest", value: "newest" },
    { label: labels.sortOldest ?? "Oldest", value: "oldest" },
  ]);
</script>

{#snippet AvatarImage(person: { name: string; avatar?: { src: string; alt: string } }, size = "size-10")}
  {#if person.avatar}
    <img class={cn(size, "rounded-full object-cover")} src={person.avatar.src} alt={person.avatar.alt} />
  {:else}
    <span class={cn(size, "flex items-center justify-center rounded-full bg-muted")}>
      <User class="size-4" />
    </span>
  {/if}
{/snippet}

{#snippet AuthorMeta(author: Author)}
  <div class="flex items-center gap-2">
    {@render AvatarImage(author, "size-8")}
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
  {:else if block.type === "question"}
    <div class="rounded-md bg-primary/10 p-5">
      <p class="text-lg font-medium">{block.content}</p>
    </div>
  {/if}
{/snippet}

{#snippet CommentCard(comment: Comment | CommentReply, featured = false)}
  <div class={cn("rounded-md", featured ? "border border-warning/40 bg-warning/10 p-4" : "")}>
    <div class="flex items-start gap-3">
      {@render AvatarImage(comment.author)}
      <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-medium">{comment.author.name}</span>
          {#if featured}
            <Badge variant="outline">{labels.featuredBadge}</Badge>
          {/if}
          {#if comment.author.isAuthor}
            <Badge class="bg-primary/10 text-primary">{labels.authorBadge}</Badge>
          {/if}
        </div>
        <p class={cn("mt-2", featured ? "text-foreground" : "text-muted-foreground")}>{comment.content}</p>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{comment.date}</span>
          <Button variant="quiet" size="sm" class="gap-1">
            <ThumbsUp class="size-3" />
            {comment.likes}
          </Button>
          <Button variant="quiet" size="sm" class="gap-1">
            <ArrowBendUpLeftIcon class="size-3" />
            {labels.replyButton}
          </Button>
          {#if !featured}
            <Button variant="quiet" size="sm" aria-label="Report comment">
              <ShieldAlert class="size-3" />
            </Button>
          {/if}
        </div>
      </div>
    </div>
  </div>
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
          <MessageSquare class="size-3" />
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

    <div class="space-y-6">
      {#each content as block}
        {@render ContentBlockView(block)}
      {/each}
    </div>

    {#if featuredComments.length > 0}
      <section class="mt-12">
        <div class="mb-4 flex items-center gap-2">
          <Sparkles class="size-5 text-warning" />
          <h2 class="text-xl font-semibold">{labels.featuredCommentsTitle}</h2>
        </div>
        <div class="space-y-3">
          {#each featuredComments as comment}
            {@render CommentCard(comment, true)}
          {/each}
        </div>
      </section>
    {/if}

    <section class="mt-12 border-t pt-8">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 class="flex items-center gap-2 text-xl font-semibold">
          <ChatCircleIcon class="size-5" />
          {labels.commentsTitle} {totalComments ? `(${totalComments})` : ""}
        </h2>
        <SelectMenu
          bind:value={commentSort}
          label={labels.commentsTitle ?? "Comments"}
          options={commentSortOptions}
          size="sm"
          width="fit"
        />
      </div>

      <div class="mb-6 grid gap-3">
        <TextareaField
          id="article-comment"
          label="Add a comment"
          placeholder={labels.commentPlaceholder}
          rows={4}
          resize="none"
        />
        <div class="mt-2 flex justify-end">
          <Button size="sm" class="gap-2">
            <ChatCircleIcon class="size-4" />
            {labels.postCommentButton}
          </Button>
        </div>
      </div>

      <div class="space-y-6">
        {#each comments as comment}
          <div class="space-y-4">
            {@render CommentCard(comment)}
            {#if comment.replies && comment.replies.length > 0}
              <div class="ml-10 space-y-4 border-l pl-4">
                {#each comment.replies as reply}
                  {@render CommentCard(reply)}
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>

      {#if totalComments && totalComments > comments.length}
        <div class="mt-8 flex justify-center">
          <Button variant="outline" class="gap-2">
            <ChevronDown class="size-4" />
            {labels.loadMoreButton}
          </Button>
        </div>
      {/if}
    </section>
    </article>
  </Section>
</div>
