<script lang="ts" module>
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import type { Component } from "svelte";
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface HeroAction {
    label: string;
    href?: string;
    variant?: "primary" | "outline";
    icon?: Component;
  }

  interface HeroCharacter {
    src: string;
    alt: string;
    tone: StorySceneTone;
  }

  export interface FeatureHeroProps {
    kicker: string;
    heading: string;
    description: string;
    actions?: HeroAction[];
    character: HeroCharacter;
    level?: 1 | 2;
  }

  export const featureHeroDemo: FeatureHeroProps = {
    kicker: "Work, clearly",
    heading: "A calmer home for product decisions.",
    description:
      "Keep the brief, the work, and the reason behind each decision in one place the whole team can follow.",
    actions: [
      { label: "Start a workspace", href: "?", icon: ArrowRight },
      { label: "See how it works", href: "?", variant: "outline" },
    ],
    character: {
      src: peepStanding18Asset,
      alt: "A person presenting a clear plan",
      tone: "blue",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import MediaSplit from "$lib/components/varunui/layout/media-split.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    actions = [],
    character,
    level = 2,
  }: FeatureHeroProps = $props();
</script>

<section data-slot="feature-hero">
  <MediaSplit mediaSide="right" mobileMediaOrder="last">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      {level}
      markerTone={character.tone}
    >
      {#if actions.length > 0}
        <ActionRow align="left">
          {#each actions.slice(0, 2) as action, index (`${action.label}-${index}`)}
            <Button
              href={action.href}
              variant={action.variant ?? (index === 0 ? "primary" : "outline")}
              size="lg"
            >
              {action.label}
              {#if action.icon}
                {@const Icon = action.icon}
                <Icon class="size-4" aria-hidden="true" />
              {/if}
            </Button>
          {/each}
        </ActionRow>
      {/if}
    </SectionHeader>

    {#snippet media()}
      <StoryScene
        src={character.src}
        alt={character.alt}
        tone={character.tone}
      />
    {/snippet}
  </MediaSplit>
</section>
