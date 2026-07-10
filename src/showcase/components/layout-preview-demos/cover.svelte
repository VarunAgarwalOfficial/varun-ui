<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Cover from "$lib/components/varunui/layout/cover.svelte";
  import StateMessage from "$lib/components/varunui/piece/state-message.svelte";
</script>

<Cover height="section">
  <StateMessage
    kicker="Cover pattern"
    title="Put the important thing in the middle."
    description="Use the remaining vertical space deliberately while optional header and footer regions keep their natural size."
  >
    {#snippet actions()}
      <Button href="?">Primary action</Button>
    {/snippet}
  </StateMessage>
</Cover>
