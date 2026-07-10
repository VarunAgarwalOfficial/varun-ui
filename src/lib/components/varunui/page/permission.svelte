<script lang="ts">
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
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
        src={peepStanding10Asset}
        alt="A person guarding a private workspace"
        tone="purple"
      />
      <StateMessage
        kicker="Access required"
        code="403"
        tone="purple"
        title="This space is not yours yet."
        description="Ask the workspace owner for access, or switch to an account that already belongs here."
      >
        {#snippet actions()}
          <Button href="?">Request access</Button>
          <Button href="?" variant="outline">Switch account</Button>
        {/snippet}
      </StateMessage>
    </Switcher>
  </div>
</Cover>
