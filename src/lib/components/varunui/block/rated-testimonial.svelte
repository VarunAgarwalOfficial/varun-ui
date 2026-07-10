<script lang="ts" module>
  interface Author {
    name: string;
    role: string;
    avatar?: {
      src: string;
      alt?: string;
    };
  }

  interface RatingMedia {
    value?: number;
    max?: number;
    caption?: string;
  }

  export interface RatedTestimonialProps {
    kicker?: string;
    quote?: string;
    author?: Author;
    media?: RatingMedia;
    className?: string;
  }

  export const ratedTestimonialDemo: RatedTestimonialProps = {
    kicker: "Verified review",
    quote:
      "It is the first workspace the whole team actually agrees on. Product, design, and operations finally plan from the same page.",
    author: {
      name: "Daniel Osei",
      role: "Product lead using varunUI",
    },
    media: {
      value: 4.9,
      max: 5,
      caption: "from 240 verified teams",
    },
  };
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import PersonMeta from "$lib/components/varunui/piece/person-meta.svelte";
  import RatingStars from "$lib/components/varunui/component/rating-stars.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";

  let {
    kicker,
    quote,
    author,
    media: rating,
    className,
  }: RatedTestimonialProps = $props();
</script>

<Section container="max" className={className}>
  <Stack gap="lg">
    {#if kicker}
      <Marker text={kicker} tone="purple" emphasis />
    {/if}

    <Split mediaSide="right" align="center" gap="lg">
      {#snippet media()}
        {#if rating}
          <div
            data-tone="purple"
            class="surface-pastel grid min-h-[var(--layout-media-sm)] place-items-center border-y border-border p-[var(--surface-padding-lg)]"
          >
            <div class="text-center">
              {#if typeof rating.value === "number"}
                <p class="text-5xl font-semibold tracking-tight text-foreground">
                  {rating.value.toFixed(1)}
                </p>
                <div class="mt-3 flex justify-center">
                  <RatingStars
                    rating={rating.value}
                    max={rating.max ?? 5}
                    size="sm"
                    tone="yellow"
                  />
                </div>
              {/if}
              {#if rating.caption}
                <p class="mt-3 text-sm text-muted-foreground">
                  {rating.caption}
                </p>
              {/if}
            </div>
          </div>
        {/if}
      {/snippet}

      <Stack gap="lg" align="start">
        {#if quote}
          <blockquote class="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
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
      </Stack>
    </Split>
  </Stack>
</Section>
