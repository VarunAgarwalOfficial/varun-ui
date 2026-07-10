<script lang="ts" module>
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  export interface NewsletterSignupProps {
    kicker?: string;
    heading?: string;
    description?: string;
    characterSrc?: string;
    characterAlt?: string;
    className?: string;
  }

  export const newsletterSignupDemo: NewsletterSignupProps = {
    kicker: "Product notes",
    heading: "One useful field note each month.",
    description:
      "A short look at a varunUI decision, the tradeoff behind it, and what changed after the work met a real page.",
    characterSrc: peepStanding1Asset,
    characterAlt: "A person sharing a monthly product note",
  };
</script>

<script lang="ts">
  import EmailCaptureForm from "$lib/components/varunui/component/email-capture-form.svelte";
  import MediaSplit from "$lib/components/varunui/layout/media-split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    kicker = newsletterSignupDemo.kicker,
    heading = newsletterSignupDemo.heading,
    description = newsletterSignupDemo.description,
    characterSrc = newsletterSignupDemo.characterSrc,
    characterAlt = newsletterSignupDemo.characterAlt,
    className,
  }: NewsletterSignupProps = $props();
</script>

<section data-slot="newsletter-signup" class={className}>
  <MediaSplit mediaSide="right" mobileMediaOrder="last">
    <Stack gap="lg">
      <SectionHeader {kicker} title={heading} {description} align="left" markerTone="pink" />
      <EmailCaptureForm
        id="newsletter-email"
        label="Email for product notes"
        placeholder="you@example.com"
        buttonLabel="Send me the notes"
        consent="No weekly noise. Unsubscribe whenever the notes stop helping."
      />
    </Stack>

    {#snippet media()}
      {#if characterSrc && characterAlt}
        <StoryScene src={characterSrc} alt={characterAlt} tone="pink" frame="portrait" />
      {/if}
    {/snippet}
  </MediaSplit>
</section>
