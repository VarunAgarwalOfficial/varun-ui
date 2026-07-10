<script lang="ts" module>
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import type { PersonMetaPerson } from "$lib/components/varunui/piece/person-meta.svelte";

  export interface TestimonialQuoteCardProps {
    quote: string;
    person: PersonMetaPerson;
    tags?: string[];
  }

  export const testimonialQuoteCardDemo: TestimonialQuoteCardProps = {
    quote:
      "varunUI gave our team one clear place for decisions, feedback, and the work ready to share.",
    person: {
      name: "Priya Raman",
      role: "Co-founder using varunUI",
      avatar: {
        src: peepStanding1Asset,
        alt: "Priya Raman portrait",
      },
    },
    tags: ["Product team"],
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import PersonMeta from "$lib/components/varunui/piece/person-meta.svelte";

  let { quote, person, tags = [] }: TestimonialQuoteCardProps = $props();
</script>

<article
  data-slot="testimonial-quote-card"
  class="h-full rounded-none border border-border bg-surface p-[var(--surface-padding-md)] text-foreground"
>
  {#if tags.length > 0}
    <div class="mb-5 flex flex-wrap gap-2">
      {#each tags as tag, index (`${tag}-${index}`)}
        <Badge variant="muted">{tag}</Badge>
      {/each}
    </div>
  {/if}

  <blockquote class="text-lg leading-relaxed text-foreground">
    &ldquo;{quote}&rdquo;
  </blockquote>

  <footer class="mt-6">
    <PersonMeta {person} size="sm" />
  </footer>
</article>
