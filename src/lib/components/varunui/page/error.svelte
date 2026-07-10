<script lang="ts">
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
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
        src={peepSitting8Asset}
        alt="A person pausing while a problem is fixed"
        tone="red"
      />
      <StateMessage
        kicker="Something broke"
        code="500"
        tone="red"
        title="We dropped the thread."
        description="Your work is safe. Try once more, or check the status page if the problem keeps showing up."
      >
        {#snippet actions()}
          <Button href="?">Try again</Button>
          <Button href="?" variant="outline">View status</Button>
        {/snippet}
      </StateMessage>
    </Switcher>
  </div>
</Cover>
