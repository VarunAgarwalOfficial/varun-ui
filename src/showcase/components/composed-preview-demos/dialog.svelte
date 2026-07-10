<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Dialog from "$lib/components/varunui/component/dialog.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
</script>

<Dialog
  triggerLabel="Open dialog"
  title="Name this review"
  description="Use a short name the whole team will recognise."
  open={true}
>
  <InputField
    label="Review name"
    value="Navigation handoff"
    description="You can change this later."
  />

  {#snippet footer(close)}
    <Button variant="outline" onclick={close}>Cancel</Button>
    <Button variant="primary" onclick={close}>Save review</Button>
  {/snippet}
</Dialog>
