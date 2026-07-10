<script lang="ts">
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import Article from "$lib/components/varunui/layout/article.svelte";

  const takeaways = [
    {
      label: "Lead",
      value: "Name the change in the first screen.",
    },
    {
      label: "Evidence",
      value: "Keep metrics close to the section they explain.",
    },
    {
      label: "Next",
      value: "End with the decision the reader can make.",
    },
  ] as const;
</script>

<div class="py-[var(--layout-gap-lg)]">
<Article>
  {#snippet header()}
    <div class="space-y-5">
      <Marker text="Article" emphasis />
      <div class="max-w-[var(--layout-content-sm)] space-y-4">
        <h1 class="text-balance text-3xl font-semibold tracking-normal md:text-5xl">
          Designing release notes people can actually scan
        </h1>
        <p class="max-w-[var(--layout-prose)] text-lg leading-8 text-muted-foreground">
          A practical editorial draft with clear metadata, measured prose, and
          supporting context close to the decisions readers need.
        </p>
      </div>
      <ArticleMeta
        author={{ name: "Nora Patel", title: "Product editor" }}
        category="Product writing"
        date="March 12, 2026"
        readTime="7 min read"
        avatar={false}
      />
    </div>
  {/snippet}

  <div class="article-prose">
    <p>
      Most readers arrive looking for one answer: what changed, and whether it
      affects their work. Put that answer first, then keep supporting detail in
      a narrow, readable column.
    </p>

    <div
      class="grid gap-3 bg-muted/30 p-4 text-sm leading-6 text-foreground sm:grid-cols-3"
    >
      {#each takeaways as item (item.label)}
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {item.label}
          </p>
          <p class="mt-2 font-medium">{item.value}</p>
        </div>
      {/each}
    </div>

    <h2>Make the structure do the quiet work</h2>
    <p>
      Strong product writing should not need decorative furniture. Title,
      description, metadata, prose, and a small evidence panel are enough to
      make the update feel ready to publish.
    </p>

    <blockquote>
      A useful release note makes the next reader decision obvious.
    </blockquote>

    <h3>Where the pattern helps</h3>
    <ul>
      <li>Editorial announcements that need a readable body width.</li>
      <li>Product updates with a short lead and structured context.</li>
      <li>Founder letters, essays, and updates that need simple metadata.</li>
    </ul>
  </div>
</Article>
</div>
