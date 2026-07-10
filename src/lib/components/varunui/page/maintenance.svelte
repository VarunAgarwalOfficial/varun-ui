<script lang="ts">
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Cover from "$lib/components/varunui/layout/cover.svelte";
  import Switcher from "$lib/components/varunui/layout/switcher.svelte";
  import StateMessage from "$lib/components/varunui/piece/state-message.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
</script>

<Cover>
  <div class="w-full max-w-[var(--layout-content-md)]">
    <Switcher threshold="md" limit={2} gap="lg">
      <StoryScene
        src={peepStanding12Asset}
        alt="A person making careful adjustments"
        tone="green"
      />
      <StateMessage
        kicker="Planned maintenance"
        tone="green"
        title="We are tuning the details."
        description="The service is briefly unavailable while we make a planned improvement. Your data is safe."
      >
        {#snippet actions()}
          <Button href="?">Get updates</Button>
          <Button href="?" variant="outline">Back home</Button>
        {/snippet}
      </StateMessage>
    </Switcher>
  </div>
</Cover>
