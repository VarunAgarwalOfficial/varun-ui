<script lang="ts">
  import type { Snippet } from "svelte";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Card from "$lib/components/varunui/component/card.svelte";

  let {
    href,
    heading,
    description,
    meta,
    previewMode = "page",
    preview,
  }: {
    href: string;
    heading: string;
    description: string;
    meta: string | number;
    previewMode?: "page" | "actual";
    preview?: Snippet;
  } = $props();

  const previewClass = $derived(
    previewMode === "page"
      ? "pointer-events-none h-[333.333%] w-[333.333%] origin-top-left scale-[0.3] motion-transform group-hover:scale-[0.31]"
      : "pointer-events-none h-full w-full",
  );
</script>

<Card
  interactive
  padding="none"
  className="group relative block overflow-hidden"
>
  <article>
    <a
      {href}
      aria-label={heading}
      class="absolute inset-0 z-10 rounded-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
    ></a>

    <div
      inert
      aria-hidden="true"
      class="relative h-56 overflow-hidden border-b border-border bg-background"
    >
      <div class={previewClass}>
        {@render preview?.()}
      </div>
    </div>

    <div class="relative grid gap-2 p-4">
      <div class="flex min-w-0 items-start justify-between gap-3">
        <h3 class="min-w-0 text-base font-medium">{heading}</h3>
        <Badge variant="outline" class="max-w-[45%] shrink-0 truncate">
          {meta}
        </Badge>
      </div>
      <p class="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  </article>
</Card>
