<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import StatValue from "$lib/components/varunui/component/stat-value.svelte";
  import Overlap from "$lib/components/varunui/layout/overlap.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
</script>

<Section container="max">
  <Stack gap="xl">
    <SectionHeader
      kicker="Overlap"
      title="Layer text and media without losing the section rhythm."
      description="A content panel and visual proof point share the same field, keeping the story connected."
      align="left"
    />
  <Overlap side="right" amount="md" stickyPrimary>
    {#snippet primary()}
      <div class="max-w-xl space-y-7 bg-background p-6 md:p-8">
        <div class="space-y-3">
          <p class="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Studio system
          </p>
          <h3 class="text-3xl font-semibold tracking-tight md:text-5xl">
            A grounded story next to a visual proof point.
          </h3>
          <p class="text-base leading-7 text-muted-foreground">
            The launch story stays readable while the image, proof, and action
            stay visually connected on wide screens.
          </p>
        </div>

        <div class="grid gap-4 border-y py-5 sm:grid-cols-3">
          <div class="space-y-2">
            <StatValue value="12" size="lg" ariaLabel="Twelve weeks" />
            <p class="text-sm text-muted-foreground">Weeks</p>
          </div>
          <div class="space-y-2">
            <StatValue value="40" suffix="+" size="lg" ariaLabel="Forty plus launches" />
            <p class="text-sm text-muted-foreground">Launches</p>
          </div>
          <div class="space-y-2">
            <StatValue value="3" size="lg" ariaLabel="Three teams" />
            <p class="text-sm text-muted-foreground">Teams</p>
          </div>
        </div>

        <Button href="?" size="lg">View launch plan</Button>
      </div>
    {/snippet}

    {#snippet secondary()}
      <div class="group/overlap-preview relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
        <img
          class="absolute inset-0 size-full object-cover motion-transform-slow motion-safe:group-hover/overlap-preview:scale-105"
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&h=1250&fit=crop"
          alt="Team reviewing printed work at a table"
        />
        <div class="absolute inset-x-5 bottom-5 rounded-md border bg-background p-4">
          <p class="text-sm font-semibold">Connected panels</p>
          <p class="mt-1 text-sm text-muted-foreground">
            Media, proof, and action can share one visual field.
          </p>
        </div>
      </div>
    {/snippet}
    </Overlap>
  </Stack>
</Section>
