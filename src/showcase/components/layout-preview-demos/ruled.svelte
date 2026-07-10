<script lang="ts">
  import Ruled from "$lib/components/varunui/layout/ruled.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";

  const notes = [
    {
      title: "Signal first",
      body: "The release lead, owner, and current status stay visible at a glance.",
    },
    {
      title: "Context close by",
      body: "Supporting notes sit beside the headline so reviewers can act quickly.",
    },
    {
      title: "Next actions",
      body: "Each card turns the plan into a concrete task with a clear owner.",
    },
  ] as const;
</script>

<div class="space-y-[var(--layout-gap-md)] py-[var(--layout-gap-lg)]">
  <div class="flex flex-wrap items-center gap-[var(--layout-gap-sm)]">
    <Marker text="Ops" emphasis />
    <p class="font-mono text-sm uppercase tracking-widest text-muted-foreground">
      Release review
    </p>
  </div>

  <Ruled columns="three">
    {#snippet lead()}
    <h2 class="text-3xl font-light leading-[1.1] tracking-tight md:text-5xl">
      A crisp lead for decisions that need attention.
    </h2>
    {/snippet}

    {#snippet aside()}
      <div class="space-y-[var(--layout-gap-md)]">
        <p class="max-w-md text-base leading-relaxed text-muted-foreground">
          Use the ruled intro to separate the decision summary from the action cards below.
        </p>
        <Button href="?" variant="outline">Open queue</Button>
      </div>
    {/snippet}

    {#each notes as note (note.title)}
      <article class="border border-border bg-surface p-5">
        <h3 class="text-base font-semibold">{note.title}</h3>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">{note.body}</p>
      </article>
    {/each}
  </Ruled>
</div>
