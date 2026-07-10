<script lang="ts" module>
  import type { ReleaseNoteItem } from "$lib/components/varunui/piece/release-note.svelte";
  import type { ReleaseTableRelease } from "$lib/components/varunui/piece/release-table.svelte";

  export interface ReleaseHighlightProps {
    kicker?: string;
    heading?: string;
    description?: string;
    featured?: ReleaseNoteItem;
    releases?: ReleaseTableRelease[];
    className?: string;
  }

  export const releaseHighlightDemo: ReleaseHighlightProps = {
    kicker: "Changelog",
    heading: "Motion now arrives with the moment.",
    description:
      "The latest varunUI release makes reveals contextual, trims duplicate Blocks, and adds the product pages the flow was missing.",
    featured: {
      version: "v0.6.0",
      date: "July 2026",
      badge: { label: "Latest", variant: "primary" },
      heading: "A smaller system with better timing",
      description:
        "Marker strokes and chart marks now reveal once when they enter view. Dialogs restore focus, data captions explain the point, and the page catalog owns complete flows.",
      changes: [
        "In-view reveals for Marker and every chart job",
        "One composable Dialog with focus restoration",
        "Searchable Combobox and anchored Date Picker fields",
        "Complete product, pricing, careers, about, and analytics pages",
        "Six duplicate Blocks removed from the public catalog",
      ],
      action: { label: "Read the release note", href: "?" },
    },
    releases: [
      {
        version: "v0.5.2",
        date: "Jun 28, 2026",
        heading: "Paper themes and named pastel roles",
        status: "improvement",
      },
      {
        version: "v0.5.0",
        date: "Jun 14, 2026",
        heading: "D3 charts with keyboard inspection",
        status: "feature",
        href: "?",
      },
      {
        version: "v0.4.3",
        date: "May 30, 2026",
        heading: "Rail and application navigation spacing",
        status: "fix",
      },
      {
        version: "v0.4.0",
        date: "May 12, 2026",
        heading: "Characters become page storytellers",
        status: "feature",
      },
    ],
  };
</script>

<script lang="ts">
  import ReleaseNote from "$lib/components/varunui/piece/release-note.svelte";
  import ReleaseTable from "$lib/components/varunui/piece/release-table.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = releaseHighlightDemo.kicker,
    heading = releaseHighlightDemo.heading,
    description = releaseHighlightDemo.description,
    featured = releaseHighlightDemo.featured,
    releases = releaseHighlightDemo.releases ?? [],
    className,
  }: ReleaseHighlightProps = $props();
</script>

<section data-slot="release-highlight" class={className}>
  <Section container="md">
    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        size="lg"
        level={1}
        markerTone="yellow"
      />

      {#if featured}
        <div
          data-tone="yellow"
          class="surface-pastel border-y border-border p-[var(--surface-padding-md)] md:p-[var(--surface-padding-lg)]"
        >
          <ReleaseNote release={featured} level={2} />
        </div>
      {/if}

      {#if releases.length > 0}
        <ReleaseTable
          releases={releases}
          caption="Published varunUI releases, newest first."
          captionMeta={`${releases.length} previous releases`}
        />
      {/if}
    </Stack>
  </Section>
</section>
