<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { BadgeVariant } from "$lib/components/varunui/component/badge.svelte";

  export interface ReleaseNoteBadge {
    label: string;
    variant?: BadgeVariant;
  }

  export interface ReleaseNoteAction {
    label: string;
    href: string;
  }

  export interface ReleaseNoteItem {
    version: string;
    date: string;
    heading: string;
    description?: string;
    badge?: ReleaseNoteBadge;
    changes?: string[];
    action?: ReleaseNoteAction;
  }

  export interface ReleaseNoteProps {
    release: ReleaseNoteItem;
    level?: 2 | 3 | 4;
    detail?: Snippet;
  }

  export const releaseNoteDemo: ReleaseNoteProps = {
    release: {
      version: "v6.0.0",
      date: "March 2026",
      badge: { label: "Major", variant: "primary" },
      heading: "varunUI v6 with edge-first delivery",
      description:
        "A release-note article for version history, migrations, and product updates.",
      changes: [
        "Clear version and date metadata",
        "A concise change list",
        "One linked path to the full release",
      ],
      action: { label: "Read release notes", href: "?" },
    },
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";

  let { release, level = 3, detail }: ReleaseNoteProps = $props();
  const headingTag = $derived(`h${level}` as "h2" | "h3" | "h4");
</script>

<article data-slot="release-note" class="text-foreground">
  <div class="mb-1 flex flex-wrap items-center gap-2">
    <span class="font-mono text-xs font-semibold text-muted-foreground">
      {release.version}
    </span>
    {#if release.badge}
      <Badge variant={release.badge.variant ?? "muted"}>
        {release.badge.label}
      </Badge>
    {/if}
  </div>

  <p class="mb-3 text-xs text-muted-foreground">{release.date}</p>

  <svelte:element this={headingTag} class="text-xl font-semibold tracking-tight">
    {release.heading}
  </svelte:element>

  {#if release.description}
    <p class="mt-3 text-sm leading-6 text-muted-foreground">
      {release.description}
    </p>
  {/if}

  {@render detail?.()}

  {#if release.changes && release.changes.length > 0}
    <ul class="mt-5 space-y-2">
      {#each release.changes as change, index (index)}
        <li class="flex gap-2 text-sm text-muted-foreground">
          <span class="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40"></span>
          <span>{change}</span>
        </li>
      {/each}
    </ul>
  {/if}

  {#if release.action}
    <div class="mt-6">
      <Button variant="outline" size="sm" href={release.action.href}>
        {release.action.label}
      </Button>
    </div>
  {/if}
</article>
