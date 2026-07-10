<script lang="ts" module>
  import type { ActionListItem } from "$lib/components/varunui/component/action-list.svelte";
  import {
    FileTextIcon,
    FolderIcon,
    UserIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface SearchCopy {
    label: string;
    placeholder: string;
    shortcut?: string;
  }

  export interface CommandSearchSpotlightProps {
    kicker?: string;
    heading?: string;
    description?: string;
    search?: SearchCopy;
    results?: ActionListItem[];
  }

  export const commandSearchSpotlightDemo: CommandSearchSpotlightProps = {
    kicker: "Global search",
    heading: "Find the work. Keep your place.",
    description:
      "A single search entry point should return useful people, projects, and documents without making someone learn the product map first.",
    search: {
      label: "Search varunUI workspace",
      placeholder: "Search people, projects, and documents",
      shortcut: "⌘ K",
    },
    results: [
      {
        label: "Mira Chen",
        description: "Design systems lead",
        meta: "Person",
        icon: UserIcon,
        href: "?",
      },
      {
        label: "varunUI release",
        description: "Project · updated 12 minutes ago",
        meta: "Project",
        icon: FolderIcon,
        href: "?",
      },
      {
        label: "Release checklist",
        description: "Document · product operations",
        meta: "Document",
        icon: FileTextIcon,
        href: "?",
      },
    ],
  };
</script>

<script lang="ts">
  import ActionList from "$lib/components/varunui/component/action-list.svelte";
  import SearchField from "$lib/components/varunui/component/search-field.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    search,
    results = [],
  }: CommandSearchSpotlightProps = $props();
</script>

<Section container="lg" size="lg">
  <Split mediaSide="right" align="center" gap="lg">
    {#snippet media()}
      <div
        data-slot="search-spotlight-demo"
        data-tone="blue"
        class="surface-pastel border-y border-border px-[var(--surface-padding-lg)] py-[var(--layout-gap-lg)]"
      >
        <Stack gap="md">
          {#if search}
            <SearchField
              label={search.label}
              placeholder={search.placeholder}
              shortcut={search.shortcut}
              size="lg"
              clearable={false}
            />
          {/if}

          {#if results.length > 0}
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[var(--tracking-kicker)] text-muted-foreground"
              >
                Suggested results
              </p>
              <div class="mt-1 border-t border-border">
                <ActionList items={results} />
              </div>
            </div>
          {/if}
        </Stack>
      </div>
    {/snippet}

    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      markerTone="blue"
    />
  </Split>
</Section>
