<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface ArticleMetaAuthor {
    name: string;
    title?: string;
    avatar?: {
      src: string;
      alt?: string;
    };
    href?: string;
  }

  export type ArticleMetaSize = "xs" | "sm" | "md";
  export type ArticleMetaLayout = "inline" | "stacked";

  export interface ArticleMetaProps {
    author?: ArticleMetaAuthor;
    category?: string;
    date?: string;
    readTime?: string;
    size?: ArticleMetaSize;
    layout?: ArticleMetaLayout;
    avatar?: boolean;
    icons?: boolean;
    prefixAuthor?: boolean;
  }

  export const articleMetaDemo: ArticleMetaProps = {
    author: {
      name: "Lisa Park",
      title: "Senior Developer",
      avatar: {
        src: peepStanding10Asset,
        alt: "Lisa Park portrait",
      },
    },
    category: "Design systems",
    date: "January 15, 2026",
    readTime: "8 min read",
  };

  interface ArticleMetaDetail {
    kind: "category" | "date" | "readTime";
    label: string;
  }
</script>

<script lang="ts">
  import { Calendar, Clock } from "$lib/components/varunui/internal/icons/phosphor.js";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/varunui/internal/ui/avatar/index.js";

  let {
    author,
    category,
    date,
    readTime,
    size = "sm",
    layout = "inline",
    avatar = true,
    icons = false,
    prefixAuthor = false,
  }: ArticleMetaProps = $props();

  const avatarClasses: Record<ArticleMetaSize, string> = {
    xs: "size-6",
    sm: "size-8",
    md: "size-10",
  };

  const nameClasses: Record<ArticleMetaSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
  };

  const detailClasses: Record<ArticleMetaSize, string> = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
  };

  const gapClasses: Record<ArticleMetaSize, string> = {
    xs: "gap-2",
    sm: "gap-2.5",
    md: "gap-3",
  };

  const details = $derived(
    [
      category ? { kind: "category", label: category } : undefined,
      date ? { kind: "date", label: date } : undefined,
      readTime ? { kind: "readTime", label: readTime } : undefined,
    ].filter((item): item is ArticleMetaDetail => Boolean(item)),
  );

  function initials(name = "") {
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("");
  }

  function classList(values: Array<string | false | undefined>) {
    return values.filter(Boolean).join(" ");
  }
</script>

{#if author || details.length > 0}
  <div
    data-article-meta
    class={classList([
      "flex min-w-0 text-muted-foreground",
      layout === "stacked" ? "items-start" : "flex-wrap items-center",
      gapClasses[size],
    ])}
  >
    {#if author}
      <span
        class={classList([
          "flex min-w-0 items-center",
          size === "md" ? "gap-3" : "gap-2",
        ])}
      >
        {#if avatar && author.avatar}
          <Avatar class={classList(["shrink-0", avatarClasses[size]])}>
            <AvatarImage
              src={author.avatar.src}
              alt={author.avatar.alt ?? author.name}
              class="object-cover"
            />
            <AvatarFallback>{initials(author.name)}</AvatarFallback>
          </Avatar>
        {/if}

        <span class="min-w-0">
          {#if author.href}
            <a
              href={author.href}
              class={classList([
                "block truncate font-medium text-foreground motion-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50",
                nameClasses[size],
              ])}
            >
              {prefixAuthor ? "by " : ""}{author.name}
            </a>
          {:else}
            <span
              class={classList([
                "block truncate font-medium text-foreground",
                nameClasses[size],
              ])}
            >
              {prefixAuthor ? "by " : ""}{author.name}
            </span>
          {/if}

          {#if layout === "stacked" && author.title}
            <span class="block truncate text-xs text-muted-foreground">
              {author.title}
            </span>
          {/if}
        </span>
      </span>
    {/if}

    {#if details.length > 0}
      <span
        class={classList([
          "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
          detailClasses[size],
        ])}
      >
        {#each details as detail, index (`${detail.kind}-${detail.label}`)}
          {#if index > 0}
            <span aria-hidden="true">&middot;</span>
          {/if}

          <span
            class={classList([
              "inline-flex min-w-0 items-center gap-1",
              detail.kind === "category" ? "font-medium text-primary" : undefined,
            ])}
          >
            {#if icons && detail.kind === "date"}
              <Calendar class="size-3.5 shrink-0" aria-hidden="true" />
            {:else if icons && detail.kind === "readTime"}
              <Clock class="size-3.5 shrink-0" aria-hidden="true" />
            {/if}

            <span class="truncate">{detail.label}</span>
          </span>
        {/each}
      </span>
    {/if}
  </div>
{/if}
