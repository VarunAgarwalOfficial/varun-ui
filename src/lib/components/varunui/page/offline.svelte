<script lang="ts">
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
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
        src={peepSitting1Asset}
        alt="A person waiting for a connection"
        tone="yellow"
      />
      <StateMessage
        kicker="You are offline"
        tone="yellow"
        title="The connection took a break."
        description="We kept your place. Reconnect to continue, or use anything already available offline."
      >
        {#snippet actions()}
          <Button href="?">Try again</Button>
          <Button href="?" variant="outline">Work offline</Button>
        {/snippet}
      </StateMessage>
    </Switcher>
  </div>
</Cover>
