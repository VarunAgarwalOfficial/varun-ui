<script lang="ts">
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
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
        src={peep1Asset}
        alt="A person looking closely for a result"
        tone="pink"
      />
      <StateMessage
        kicker="No results"
        tone="pink"
        title="Nothing matched that phrase."
        description="Try fewer words, check the spelling, or browse the full collection instead."
      >
        {#snippet actions()}
          <Button href="?">Clear search</Button>
          <Button href="?" variant="outline">Browse all</Button>
        {/snippet}
      </StateMessage>
    </Switcher>
  </div>
</Cover>
