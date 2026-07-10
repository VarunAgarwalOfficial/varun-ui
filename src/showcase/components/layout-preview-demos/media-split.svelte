<script lang="ts">
  import MediaSplit from "$lib/components/varunui/layout/media-split.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";
  import { ArrowRightIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  const activity = [
    { team: "Design", status: "Approved", owner: "Maya" },
    { team: "Content", status: "Final pass", owner: "Jon" },
    { team: "Support", status: "Ready", owner: "Ari" },
  ] as const;
</script>

<MediaSplit mediaSide="right">
  <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
    Media split
  </p>
  <h1 class="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
    Content and product context share one balanced frame.
  </h1>
  <p class="mt-4 max-w-md text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
    The media side can hold a real product summary, customer proof, or editorial
    visual without becoming decoration.
  </p>
  <div class="mt-6 flex flex-wrap gap-3">
    <Button href="?">
      Primary action
      <ArrowRightIcon class="size-4" />
    </Button>
    <Button href="?" variant="outline">
      Secondary
    </Button>
  </div>

  {#snippet media()}
    <div class="flex h-full min-h-[inherit] items-center p-4 md:p-6">
      <div class="w-full rounded-none border border-border bg-surface p-4 md:p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Launch monitor
            </p>
            <h3 class="mt-1 text-xl font-semibold tracking-tight">
              Analytics release
            </h3>
          </div>
          <span class="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            On track
          </span>
        </div>

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="bg-muted/30 p-4">
            <InlineStat value="84" suffix="%" label="Activation" animate={false} />
            <p class="mt-2 text-sm text-muted-foreground">Beta accounts completing setup.</p>
          </div>
          <div class="bg-muted/30 p-4">
            <InlineStat value="6" label="Tasks left" animate={false} />
            <p class="mt-2 text-sm text-muted-foreground">All owner-assigned.</p>
          </div>
        </div>

        <div class="mt-4 divide-y divide-border bg-muted/30">
          {#each activity as item (item.team)}
            <div class="grid gap-2 p-3 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <span class="font-medium text-foreground">{item.team}</span>
              <span class="text-muted-foreground">{item.status}</span>
              <span class="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {item.owner}
              </span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/snippet}
</MediaSplit>
