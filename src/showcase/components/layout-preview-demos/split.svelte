<script lang="ts">
  import Split from "$lib/components/varunui/layout/split.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import { ArrowRightIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  const proof = [
    { label: "Teams onboarded", value: "42" },
    { label: "Median setup", value: "11 min" },
  ] as const;
</script>

<section class="w-full px-[var(--layout-gutter)] py-8">
  <Split mediaSide="right" align="center" gap="sm">
    {#snippet media()}
      <div class="rounded-none border border-border bg-surface p-4 md:p-5">
        <div class="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Onboarding
            </p>
            <h3 class="mt-1 text-base font-semibold md:text-lg">
              Launch workspace
            </h3>
          </div>
          <span class="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            Ready
          </span>
        </div>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          {#each proof as item (item.label)}
            <div class="bg-muted/30 p-4">
              <InlineStat value={item.value} label={item.label} animate={false} />
            </div>
          {/each}
        </div>
        <div class="mt-5 divide-y divide-border border-t border-border text-sm">
          <div class="flex items-center justify-between gap-3 py-3">
            <span class="font-medium">Invite editors</span>
            <span class="text-muted-foreground">Done</span>
          </div>
          <div class="flex items-center justify-between gap-3 py-3">
            <span class="font-medium">Publish release note</span>
            <span class="text-muted-foreground">Today</span>
          </div>
        </div>
      </div>
    {/snippet}

    <div class="space-y-5">
      <div class="space-y-3">
        <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Onboarding
        </p>
        <h2 class="max-w-xl text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
          Put the promise beside proof, not miles away from it.
        </h2>
        <p class="max-w-lg text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
          A focused intro sits next to workspace evidence, actions, and the
          remaining setup checklist.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <Button href="?">
          View checklist
          <ArrowRightIcon class="size-4" />
        </Button>
        <Button href="?" variant="outline">Compare plans</Button>
      </div>
    </div>
  </Split>
</section>
