<script lang="ts" module>
  export type ReleaseTableStatus = "feature" | "fix" | "improvement" | "breaking";

  export interface ReleaseTableRelease {
    version: string;
    date: string;
    heading: string;
    status?: ReleaseTableStatus;
    href?: string;
  }

  export interface ReleaseTableProps {
    releases: ReleaseTableRelease[];
    caption?: string;
    captionMeta?: string;
  }

  export const releaseTableDemo: ReleaseTableProps = {
    caption: "Published releases, ordered from newest to oldest.",
    captionMeta: "3 releases",
    releases: [
      {
        version: "v6.1.0",
        date: "Mar 5, 2026",
        status: "feature",
        heading: "Batch operations with transaction support",
        href: "?",
      },
      {
        version: "v6.0.2",
        date: "Feb 28, 2026",
        status: "fix",
        heading: "Rate limiter fix for preflight requests",
      },
      {
        version: "v6.0.0",
        date: "Feb 20, 2026",
        status: "breaking",
        heading: "A simpler authentication model",
        href: "?",
      },
    ],
  };
</script>

<script lang="ts">
  import DataCaption from "$lib/components/varunui/component/data-caption.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";

  const statusConfig: Record<ReleaseTableStatus, { label: string; dot: string }> = {
    feature: { label: "Feature", dot: "bg-success" },
    fix: { label: "Fix", dot: "bg-info" },
    improvement: { label: "Improvement", dot: "bg-warning" },
    breaking: { label: "Breaking", dot: "bg-danger" },
  };

  let {
    releases,
    caption = "Published releases, ordered from newest to oldest.",
    captionMeta,
  }: ReleaseTableProps = $props();
  let rows = $derived(releases ?? []);
</script>

{#if rows.length > 0}
  <div data-slot="release-table">
    <div class="hidden overflow-x-auto rounded-none border border-border md:block">
      <table class="w-full min-w-[40rem] text-sm">
        <DataCaption as="table" description={caption} meta={captionMeta} />
        <thead>
          <tr class="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
            <th scope="col" class="px-4 py-3 font-medium">Version</th>
            <th scope="col" class="px-4 py-3 font-medium">Date</th>
            <th scope="col" class="px-4 py-3 font-medium">Type</th>
            <th scope="col" class="px-4 py-3 font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as release (`${release.version}-${release.heading}`)}
            {@const status = release.status ? statusConfig[release.status] : undefined}
            <tr class="border-b border-border last:border-b-0">
              <th scope="row" class="px-4 py-4 text-left font-mono text-xs font-semibold">
                {release.version}
              </th>
              <td class="px-4 py-4 whitespace-nowrap text-muted-foreground">
                {release.date}
              </td>
              <td class="px-4 py-4">
                {#if status}
                  <span class="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <span class={`size-2 rounded-full ${status.dot}`} aria-hidden="true"></span>
                    {status.label}
                  </span>
                {:else}
                  <span class="text-muted-foreground">Not set</span>
                {/if}
              </td>
              <td class="px-4 py-4">
                {#if release.href}
                  <Link href={release.href} label={release.heading} />
                {:else}
                  <span class="font-medium text-foreground">{release.heading}</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <ul class="divide-y divide-border border-y border-border md:hidden" aria-label={caption}>
      {#each rows as release (`mobile-${release.version}-${release.heading}`)}
        {@const status = release.status ? statusConfig[release.status] : undefined}
        <li class="grid gap-2 py-4">
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span class="font-mono font-semibold text-foreground">{release.version}</span>
            <span>{release.date}</span>
          </div>
          {#if release.href}
            <Link href={release.href} label={release.heading} />
          {:else}
            <p class="text-sm font-medium text-foreground">{release.heading}</p>
          {/if}
          {#if status}
            <p class="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span class={`size-2 rounded-full ${status.dot}`} aria-hidden="true"></span>
              {status.label}
            </p>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{/if}
