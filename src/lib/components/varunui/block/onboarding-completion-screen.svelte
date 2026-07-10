<script lang="ts" module>
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  export interface OnboardingCompletionScreenProps {
    heading?: string;
    description?: string;
    completedItems?: string[];
    primaryAction?: { label: string; href: string };
    secondaryAction?: { label: string; href: string };
    className?: string;
  }

  export const onboardingCompletionScreenDemo: OnboardingCompletionScreenProps = {
    heading: "Your workspace is ready.",
    description:
      "The essentials are in place. Start with one real project; everything else can wait.",
    completedItems: [
      "Identity confirmed",
      "Workspace named",
      "First teammate invited",
    ],
    primaryAction: { label: "Create first project", href: "?" },
    secondaryAction: { label: "Go to workspace", href: "?" },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import RotatingTextSeal from "$lib/components/varunui/component/rotating-text-seal.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StatusLine from "$lib/components/varunui/piece/status-line.svelte";
  import { cn } from "$lib/utils.js";

  let {
    heading = "Your workspace is ready.",
    description = "Start with one real task; the rest can wait.",
    completedItems = [],
    primaryAction,
    secondaryAction,
    className,
  }: OnboardingCompletionScreenProps = $props();
</script>

<Section container="lg">
  <div class={cn("w-full", className)}>
    <Split mediaSide="right" gap="lg">
      {#snippet media()}
        <StoryScene
          src={peepStanding18Asset}
          alt="A person celebrating a finished setup"
          tone="green"
        >
          {#snippet overlay()}
            <RotatingTextSeal
              text="READY TO MAKE SOMETHING • "
              size="sm"
              animated
            />
          {/snippet}
        </StoryScene>
      {/snippet}

      <Stack gap="lg" align="start">
        <SectionHeader
          kicker="Setup complete"
          markerTone="green"
          title={heading}
          description={description}
          align="left"
          size="lg"
          level={1}
        />

        {#if completedItems.length > 0}
          <div class="w-full border-y border-border">
            {#each completedItems as item (item)}
              <StatusLine label={item} tone="success" />
            {/each}
          </div>
        {/if}

        {#if primaryAction || secondaryAction}
          <ActionRow align="left">
            {#if primaryAction}
              <Button href={primaryAction.href} size="lg">
                {primaryAction.label}
              </Button>
            {/if}
            {#if secondaryAction}
              <Link
                href={secondaryAction.href}
                label={secondaryAction.label}
              />
            {/if}
          </ActionRow>
        {/if}
      </Stack>
    </Split>
  </div>
</Section>
