<script lang="ts" module>
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  interface RoadmapItem {
    status: "shipped" | "in-progress" | "planned";
    heading: string;
    description?: string;
    version?: string;
    date?: string;
    image?: {
      src: string;
      alt: string;
    };
    tags?: string[];
  }

  export interface ProductRoadmapProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    items?: RoadmapItem[];
    className?: string;
  }

  const statusConfig = {
    shipped: {
      label: "Shipped",
      dot: "bg-success",
      text: "text-success",
    },
    "in-progress": {
      label: "In Progress",
      dot: "bg-warning",
      text: "text-warning",
    },
    planned: {
      label: "Planned",
      dot: "bg-muted-foreground/30",
      text: "text-muted-foreground",
    },
  };

  export const productRoadmapDemo: ProductRoadmapProps = {
    badge: { label: "Roadmap", variant: "muted" },
    heading: "What We Are Building",
    description: "Shipped features, current work, and what is coming next.",
    items: [
      {
        status: "shipped",
        heading: "Visual Workflow Builder",
        description:
          "Drag-and-drop automation canvas with conditional branching, scheduled triggers, and webhook integrations.",
        version: "v5.2.0",
        date: "March 2025",
        image: {
          src: peepStanding18Asset,
          alt: "Workflow builder",
        },
        tags: ["Automations", "Enterprise"],
      },
      {
        status: "shipped",
        heading: "Advanced Analytics Dashboard",
        description:
          "Funnel analysis, retention curves, and customizable widget grids with PDF and CSV export.",
        version: "v5.1.0",
        date: "February 2025",
        tags: ["Analytics", "Reporting"],
      },
      {
        status: "shipped",
        heading: "Custom Roles & Permissions",
        description:
          "Granular permission editor with role templates and scope-based access control.",
        version: "v5.0.2",
        date: "January 2025",
        tags: ["Security", "Teams"],
      },
      {
        status: "in-progress",
        heading: "AI-Powered Search",
        description:
          "Semantic search across all content with natural language queries, vector indexing, and contextual suggestions.",
        date: "Expected April 2025",
        image: {
          src: peepSitting8Asset,
          alt: "AI search interface",
        },
        tags: ["AI", "Search"],
      },
      {
        status: "in-progress",
        heading: "Real-Time Collaboration",
        description:
          "Multi-user editing with cursor presence, inline comments, and conflict-free merging.",
        date: "Expected April 2025",
        tags: ["Collaboration"],
      },
      {
        status: "planned",
        heading: "Mobile SDK",
        description:
          "Native SDKs for iOS and Android with offline support, push notifications, and biometric auth.",
        date: "Q3 2025",
        tags: ["Mobile", "SDK"],
      },
      {
        status: "planned",
        heading: "Marketplace & Integrations",
        description:
          "Public marketplace for community-built plugins, themes, and workflow templates.",
        date: "Q3 2025",
        tags: ["Ecosystem", "Plugins"],
      },
    ],
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    badge,
    heading,
    description,
    items = [],
    className,
  }: ProductRoadmapProps = $props();
</script>

<Section container="lg" className={className}>
    {#if badge || heading || description}
      <div class="mb-12">
        {#if badge}
          <div class="mb-4">
            <Badge variant={badge.variant ?? "muted"}>{badge.label}</Badge>
          </div>
        {/if}
        {#if heading}
          <h2 class="text-2xl font-semibold tracking-tight md:text-4xl">
            {heading}
          </h2>
        {/if}
        {#if description}
          <p class="mt-4 max-w-[var(--layout-prose)] text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        {/if}
      </div>
    {/if}

    <div class="overflow-hidden rounded-none border bg-surface">
      {#each items as item, index (index)}
        {@const config = statusConfig[item.status]}
        <div
          class={cn(
            "grid gap-5 p-5 lg:grid-cols-[1fr_1.4fr]",
            index > 0 && "border-t",
          )}
        >
          <div>
            <div class="mb-3 flex items-center gap-2">
              <span class={cn("size-2 rounded-full", config.dot)}></span>
              <span class={cn("text-xs font-medium", config.text)}>
                {config.label}
              </span>
            </div>
            <h3 class="text-lg font-semibold tracking-tight">{item.heading}</h3>
            <div
              class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"
            >
              {#if item.version}
                <span class="font-mono">{item.version}</span>
              {/if}
              {#if item.date}
                <span>{item.date}</span>
              {/if}
            </div>
            {#if item.tags && item.tags.length > 0}
              <div class="mt-4 flex flex-wrap gap-1.5">
                {#each item.tags as tag, tagIndex (tagIndex)}
                  <span
                    class="rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
          </div>
          <div>
            {#if item.description}
              <p class="text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            {/if}
            {#if item.image}
              <div class="mt-4 overflow-hidden rounded-md border bg-muted">
                <img
                  class="aspect-video size-full object-cover"
                  src={item.image.src}
                  alt={item.image.alt}
                />
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
</Section>
