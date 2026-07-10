<script lang="ts" module>
  import type { ReleaseNoteItem } from "$lib/components/varunui/piece/release-note.svelte";

  interface CodeSample {
    title?: string;
    code: string;
  }

  interface ReleaseEntry {
    version: string;
    date: string;
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading: string;
    description?: string;
    codeBlock?: CodeSample;
    changes?: string[];
  }

  export interface DeveloperChangelogProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    entries?: ReleaseEntry[];
  }

  export const developerChangelogDemo: DeveloperChangelogProps = {
    badge: { label: "API Changelog", variant: "muted" },
    heading: "Developer Changelog",
    description: "Breaking changes, new endpoints, and migration guides.",
    entries: [
      {
        version: "v3.0.0",
        date: "March 2025",
        badge: { label: "Breaking", variant: "primary" },
        heading: "New Authentication Model",
        description:
          "We have replaced API key authentication with short-lived tokens and refresh flows. All existing API keys will continue to work until June 2025, but we strongly recommend migrating to the new model for improved security and granular scoping.",
        codeBlock: {
          title: "Migration example",
          code: `// Before (v2.x)
const client = createClient({
  apiKey: "sk_live_..."
});

// After (v3.0)
const client = createClient({
  token: await getToken({
    clientId: "cl_...",
    clientSecret: "cs_...",
    scopes: ["read", "write"]
  })
});`,
        },
        changes: [
          "API keys deprecated in favor of OAuth2 tokens",
          "New /auth/token endpoint for token exchange",
          "Scoped permissions per token",
          "Refresh token rotation with 7-day expiry",
        ],
      },
      {
        version: "v2.12.0",
        date: "February 2025",
        badge: { label: "Feature", variant: "muted" },
        heading: "Batch Operations Endpoint",
        description:
          "Process up to 1,000 operations in a single request with transaction-safe batch endpoints. Supports creates, updates, and deletes with atomic rollback on failure.",
        codeBlock: {
          title: "Usage",
          code: `const result = await client.batch({
  operations: [
    { method: "POST", path: "/users", body: { name: "Alice" } },
    { method: "PATCH", path: "/users/42", body: { role: "admin" } },
    { method: "DELETE", path: "/users/17" }
  ],
  atomic: true
});

// result.results: [{ status: 201 }, { status: 200 }, { status: 204 }]`,
        },
        changes: [
          "New POST /batch endpoint",
          "Atomic mode with full rollback on error",
          "Up to 1,000 operations per request",
          "Mixed HTTP methods in a single batch",
        ],
      },
      {
        version: "v2.11.0",
        date: "January 2025",
        badge: { label: "Feature", variant: "muted" },
        heading: "Server-Sent Events for Resources",
        description:
          "Subscribe to real-time changes on any resource collection with Server-Sent Events. Updates arrive without polling.",
        codeBlock: {
          title: "Example",
          code: `const stream = client.subscribe("/users", {
  events: ["created", "updated", "deleted"]
});

stream.on("created", (user) => {
  console.log("New user:", user.name);
});

stream.on("error", (err) => {
  console.error("Stream error:", err.message);
});`,
        },
        changes: [
          "SSE support on all resource endpoints",
          "Event filtering by type",
          "Automatic reconnection with last-event-id",
          "Backpressure handling for high-throughput streams",
        ],
      },
    ],
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import CodeBlock from "$lib/components/varunui/piece/code-block.svelte";
  import ReleaseNote from "$lib/components/varunui/piece/release-note.svelte";

  let {
    badge,
    heading,
    description,
    entries = [],
  }: DeveloperChangelogProps = $props();

  function toReleaseNote(entry: ReleaseEntry): ReleaseNoteItem {
    return {
      version: entry.version,
      date: entry.date,
      badge: entry.badge,
      heading: entry.heading,
      description: entry.description,
      changes: entry.changes,
    };
  }
</script>

<Section container="sm">
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

    <div class="space-y-12">
      {#each entries as entry, index (index)}
        <div class={index > 0 ? "border-t border-border pt-12" : ""}>
          <ReleaseNote release={toReleaseNote(entry)}>
            {#snippet detail()}
              {#if entry.codeBlock}
                <div class="mt-5">
                  <CodeBlock
                    title={entry.codeBlock.title}
                    lines={entry.codeBlock.code.split("\n")}
                  />
                </div>
              {/if}
            {/snippet}
          </ReleaseNote>
        </div>
      {/each}
    </div>
</Section>
