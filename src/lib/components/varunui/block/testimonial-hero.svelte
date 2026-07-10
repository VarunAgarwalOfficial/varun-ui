<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";

  interface HeroAction {
    label: string;
    href?: string;
    variant?: "primary" | "outline";
  }

  interface Testimonial {
    quote: string;
    name: string;
    role: string;
    result?: string;
  }

  interface HeroCharacter {
    src: string;
    alt: string;
    tone?: StorySceneTone;
  }

  export interface TestimonialHeroProps {
    kicker?: string;
    heading?: string;
    description?: string;
    actions?: HeroAction[];
    testimonial?: Testimonial;
    character?: HeroCharacter;
    className?: string;
  }

  export const testimonialHeroDemo: TestimonialHeroProps = {
    kicker: "Decisions, remembered",
    heading: "Keep the work and the reason behind it together.",
    description:
      "varunUI gives briefs, reviews, and release decisions one calm home the whole team can follow.",
    actions: [
      { label: "Start a workspace", href: "?" },
      { label: "See the workflow", href: "?", variant: "outline" },
    ],
    testimonial: {
      quote:
        "Reviews stopped becoming archaeology. The decision is beside the work, so the next person can keep moving.",
      name: "Maya Chen",
      role: "Product lead using varunUI",
      result: "Review time down by 2 days",
    },
    character: {
      src: peepSitting13Asset,
      alt: "A person sharing what changed for their team",
      tone: "green",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import MediaSplit from "$lib/components/varunui/layout/media-split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = testimonialHeroDemo.kicker,
    heading = testimonialHeroDemo.heading,
    description = testimonialHeroDemo.description,
    actions = testimonialHeroDemo.actions ?? [],
    testimonial = testimonialHeroDemo.testimonial,
    character = testimonialHeroDemo.character,
    className,
  }: TestimonialHeroProps = $props();
</script>

<section data-slot="testimonial-hero" class={className}>
  <MediaSplit mediaSide="right" mobileMediaOrder="last">
    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        size="lg"
        markerTone="green"
      />

      {#if testimonial}
        <figure class="border-l-4 border-green pl-[var(--layout-gap-md)]">
          <blockquote class="text-balance text-lg leading-relaxed">
            “{testimonial.quote}”
          </blockquote>
          <figcaption class="mt-[var(--layout-gap-sm)] flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
            <span class="font-semibold">{testimonial.name}</span>
            <span class="text-muted-foreground">{testimonial.role}</span>
            {#if testimonial.result}
              <span class="font-semibold"><Marker text={testimonial.result} tone="green" /></span>
            {/if}
          </figcaption>
        </figure>
      {/if}

      {#if actions.length > 0}
        <ActionRow align="left">
          {#each actions.slice(0, 2) as action, index (`${action.label}-${index}`)}
            <Button
              href={action.href}
              size="lg"
              variant={action.variant ?? (index === 0 ? "primary" : "outline")}
            >
              {action.label}
            </Button>
          {/each}
        </ActionRow>
      {/if}
    </Stack>

    {#snippet media()}
      {#if character}
        <StoryScene
          src={character.src}
          alt={character.alt}
          tone={character.tone ?? "green"}
        />
      {/if}
    {/snippet}
  </MediaSplit>
</section>
