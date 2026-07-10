<script lang="ts">
  import Bento from "$lib/components/varunui/layout/bento.svelte";
  import FeatureCard from "$lib/components/varunui/piece/feature-card.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";

  const highlights = [
    { label: "Activation", value: "84%" },
    { label: "Open risks", value: "4" },
    { label: "Ship date", value: "Friday" },
  ] as const;
</script>

<section class="w-full bg-background px-[var(--layout-gutter)] py-[var(--layout-section-space-sm)] text-foreground">
  <div class="mx-auto max-w-[var(--layout-content-lg)]">
    <div class="mb-8 max-w-[var(--layout-prose)]">
      <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Bento grid
      </p>
      <h2 class="mt-3 text-3xl font-semibold tracking-tight">
        One feature cell with compact support cells.
      </h2>
    </div>

    <Bento>
      {#snippet featured()}
        <div
          class="flex h-full min-h-72 flex-col justify-between gap-5 rounded-none border border-border bg-surface p-6"
        >
          <div class="max-w-[var(--layout-prose)] space-y-3">
            <h3 class="max-w-lg text-2xl font-semibold tracking-tight">
              Launch plan for the workspace analytics release.
            </h3>
            <p class="max-w-xl text-sm leading-6 text-muted-foreground">
              The featured cell carries the decision, status, and supporting
              numbers so the side cells can stay compact.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            {#each highlights as highlight (highlight.label)}
              <div class="bg-muted/30 p-4">
                <InlineStat value={highlight.value} label={highlight.label} animate={false} />
              </div>
            {/each}
          </div>
        </div>
      {/snippet}

      <FeatureCard>
        {#snippet leading()}
          <span class="font-mono text-sm font-semibold">01</span>
        {/snippet}
        <h3 class="text-lg font-semibold">Review notes</h3>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Design, support, and content have signed off.
        </p>
      </FeatureCard>
      <FeatureCard>
        {#snippet leading()}
          <span class="font-mono text-sm font-semibold">02</span>
        {/snippet}
        <h3 class="text-lg font-semibold">Next action</h3>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          Schedule the release check.
        </p>
      </FeatureCard>
    </Bento>
  </div>
</section>
