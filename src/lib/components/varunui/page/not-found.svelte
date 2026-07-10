<script lang="ts">
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
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
        src={peepStanding5Asset}
        alt="A person looking for the right direction"
        tone="blue"
      />
      <StateMessage
        kicker="Page not found"
        code="404"
        tone="blue"
        title="This page wandered off."
        description="The link may be old, or the page may have moved. Nothing is broken on your side."
      >
        {#snippet actions()}
          <Button href="?">Go home</Button>
          <Button href="?" variant="outline">Browse pages</Button>
        {/snippet}
      </StateMessage>
    </Switcher>
  </div>
</Cover>
