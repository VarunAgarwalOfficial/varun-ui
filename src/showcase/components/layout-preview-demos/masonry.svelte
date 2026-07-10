<script lang="ts">
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import Masonry from "$lib/components/varunui/layout/masonry.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";

  const notes = [
    {
      eyebrow: "01",
      title: "Short proof",
      body: "Small tiles stay compact instead of forcing the whole row to match.",
      media: false,
      tone: "yellow",
    },
    {
      eyebrow: "02",
      title: "Longer story",
      body: "Variable-height cards are useful for testimonials, notes, editorial links, gallery captions, and mixed product proof. Masonry keeps the rhythm tight without pretending every item has the same weight.",
      media: false,
      tone: "blue",
    },
    {
      eyebrow: "03",
      title: "Media tile",
      body: "A taller card can carry an image, chart, quote, or featured detail while nearby cards keep flowing.",
      media: true,
      tone: "green",
    },
    {
      eyebrow: "04",
      title: "Compact note",
      body: "A short update can sit beside richer cards without stretching the row.",
      media: false,
      tone: "pink",
    },
    {
      eyebrow: "05",
      title: "Dense collection",
      body: "Use this for collections where scanning the next available item matters more than strict row alignment.",
      media: false,
      tone: "purple",
    },
  ] as const;
</script>

<Section size="sm" container="max">
  <Masonry columns={3}>
    {#each notes as note (note.eyebrow)}
      <article class="rounded-none border border-border">
        <PastelField tone={note.tone} className="h-full">
          <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {note.eyebrow}
          </p>

          {#if note.media}
            <div class="my-5 grid aspect-[4/3] place-items-center overflow-hidden">
              <img
                src={peepSitting13Asset}
                alt="A seated character demonstrating visual gallery content"
                class="h-full w-auto object-contain"
              />
            </div>
          {/if}

          <h3 class="mt-3 text-lg font-semibold text-foreground">{note.title}</h3>
          <p class="mt-3 text-sm leading-6 text-muted-foreground">{note.body}</p>
        </PastelField>
      </article>
    {/each}
  </Masonry>
</Section>
