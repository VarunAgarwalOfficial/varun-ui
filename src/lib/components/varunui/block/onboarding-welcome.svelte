<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import type { StorySceneTone } from "$lib/components/varunui/piece/story-scene.svelte";

  interface WelcomeAction {
    label: string;
    href?: string;
  }

  interface WelcomeCharacter {
    src: string;
    alt: string;
    tone?: StorySceneTone;
  }

  export interface OnboardingWelcomeProps {
    kicker?: string;
    heading?: string;
    description?: string;
    character?: WelcomeCharacter;
    currentStep?: number;
    totalSteps?: number;
    actions?: WelcomeAction[];
    className?: string;
  }

  export const onboardingWelcomeDemo: OnboardingWelcomeProps = {
    kicker: "Welcome in",
    heading: "Set up the workspace your team will actually use.",
    description:
      "Name the workspace, bring over useful context, and invite the people responsible for the work.",
    character: {
      src: peepStanding5Asset,
      alt: "A person welcoming a team into a new workspace",
      tone: "blue",
    },
    currentStep: 1,
    totalSteps: 4,
    actions: [
      { label: "Start setup", href: "?" },
      { label: "Do this later", href: "?" },
    ],
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import MediaSplit from "$lib/components/varunui/layout/media-split.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = onboardingWelcomeDemo.kicker,
    heading = onboardingWelcomeDemo.heading,
    description = onboardingWelcomeDemo.description,
    character = onboardingWelcomeDemo.character,
    currentStep = 1,
    totalSteps = 4,
    actions = onboardingWelcomeDemo.actions ?? [],
    className,
  }: OnboardingWelcomeProps = $props();

  const safeTotal = $derived(Math.max(1, totalSteps));
  const safeStep = $derived(Math.min(Math.max(1, currentStep), safeTotal));
</script>

<section data-slot="onboarding-welcome" class={className}>
  <MediaSplit mediaSide="right" mobileMediaOrder="last">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      markerTone={character?.tone ?? "blue"}
    >
      <div class="grid w-full max-w-sm gap-2">
        <p class="text-xs font-semibold uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">
          Step {safeStep} of {safeTotal}
        </p>
        <ProgressMeter
          value={safeStep}
          max={safeTotal}
          tone="foreground"
          size="xs"
          ariaLabel="Onboarding progress"
          ariaValueText={`Step ${safeStep} of ${safeTotal}`}
        />
      </div>

      {#if actions.length > 0}
        <ActionRow align="left">
          {#each actions.slice(0, 2) as action, index (`${action.label}-${index}`)}
            {#if index === 0}
              <Button size="lg" href={action.href} variant="primary">
                {action.label}
                <ArrowRight class="size-4" aria-hidden="true" />
              </Button>
            {:else}
              <Link href={action.href ?? "?"} label={action.label} />
            {/if}
          {/each}
        </ActionRow>
      {/if}
    </SectionHeader>

    {#snippet media()}
      {#if character}
        <StoryScene
          src={character.src}
          alt={character.alt}
          tone={character.tone ?? "blue"}
        />
      {/if}
    {/snippet}
  </MediaSplit>
</section>
