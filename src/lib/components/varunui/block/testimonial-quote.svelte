<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";

  interface Author {
    name: string;
    role: string;
    avatar?: {
      src: string;
      alt?: string;
    };
  }

  interface Result {
    value: string;
    label: string;
  }

  interface Character {
    src: string;
    alt: string;
    tone?: StorySceneTone;
  }

  export interface TestimonialQuoteProps {
    kicker?: string;
    quote?: string;
    author?: Author;
    result?: Result;
    character?: Character;
    className?: string;
  }

  export const testimonialQuoteDemo: TestimonialQuoteProps = {
    kicker: "Customer story",
    quote:
      "We retired three tools for varunUI. The team stopped chasing updates and started planning the work from one shared view.",
    author: {
      name: "Elena Rourke",
      role: "Operations lead using varunUI",
    },
    result: {
      value: "3 tools",
      label: "retired from the workflow",
    },
    character: {
      src: peepStanding12Asset,
      alt: "A person proudly presenting the result",
      tone: "green",
    },
  };
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";
  import PersonMeta from "$lib/components/varunui/piece/person-meta.svelte";

  let {
    kicker = testimonialQuoteDemo.kicker,
    quote = testimonialQuoteDemo.quote,
    author = testimonialQuoteDemo.author,
    result = testimonialQuoteDemo.result,
    character = testimonialQuoteDemo.character,
    className,
  }: TestimonialQuoteProps = $props();
</script>

<Section container="max" className={className}>
  <Split mediaSide="right" align="center" gap="lg">
    {#snippet media()}
      {#if character}
        <StoryScene
          src={character.src}
          alt={character.alt}
          tone={character.tone}
        />
      {/if}
    {/snippet}

    <Stack gap="lg" align="start">
      {#if kicker}
        <Marker text={kicker} tone="green" emphasis={true} />
      {/if}

      {#if quote}
        <blockquote class="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {quote}
        </blockquote>
      {/if}

      {#if author}
        <PersonMeta
          person={{
            name: author.name,
            role: author.role,
            avatar: author.avatar,
          }}
          size="md"
        />
      {/if}

      {#if result}
        <div class="w-full border-y border-border py-[var(--surface-padding-md)]">
          <InlineStat value={result.value} label={result.label} animate={false} />
        </div>
      {/if}

    </Stack>
  </Split>
</Section>
