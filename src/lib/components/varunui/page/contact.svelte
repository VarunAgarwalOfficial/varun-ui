<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  export interface ContactProps {
    heading?: string;
    description?: string;
    submitLabel?: string;
    onSubmit?: () => void;
  }

  export const contactDemo: ContactProps = {
    heading: "Tell us what you are trying to make.",
    description:
      "Share the goal, the rough timeline, and where you are stuck. A varunUI specialist will reply with a useful next step.",
    submitLabel: "Send your note",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import SelectField from "$lib/components/varunui/component/select-field.svelte";
  import TextareaField from "$lib/components/varunui/component/textarea-field.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import MediaSplit from "$lib/components/varunui/layout/media-split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import LabelValue from "$lib/components/varunui/piece/label-value.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StatusLine from "$lib/components/varunui/piece/status-line.svelte";

  let {
    heading = "Tell us what you are trying to make.",
    description = "Share the goal, the rough timeline, and where you are stuck. A varunUI specialist will reply with a useful next step.",
    submitLabel = "Send your note",
    onSubmit,
  }: ContactProps = $props();

  let sent = $state(false);

  function submitMessage(event: SubmitEvent) {
    event.preventDefault();
    sent = true;
    onSubmit?.();
  }
</script>

<MediaSplit
  mediaSide="right"
  mobileMediaOrder="last"
>
  <Stack gap="lg">
    <SectionHeader
      kicker="Contact"
      markerTone="pink"
      title={heading}
      {description}
      align="left"
      size="lg"
      level={1}
    />

    <Grid columns={2} gap="md">
      <LabelValue
        label="Typical reply"
        value="Within one workday"
        description="Monday to Friday, Sydney time"
      />
      <LabelValue
        label="Direct email"
        value="hello@varunui.example"
        description="For an existing conversation"
      />
    </Grid>

    <form onsubmit={submitMessage}>
      <Stack gap="md">
        <Grid columns={2} gap="md">
          <InputField
            label="Your name"
            placeholder="Maya Chen"
            autocomplete="name"
            required
          />
          <InputField
            label="Work email"
            placeholder="maya@studio.example"
            type="email"
            autocomplete="email"
            required
          />
        </Grid>

        <SelectField
          label="What can we help with?"
          placeholder="Choose a topic"
          options={[
            { label: "Choosing a plan", value: "plans" },
            { label: "Setting up a workspace", value: "setup" },
            { label: "Security and procurement", value: "security" },
            { label: "Something is not working", value: "support" },
          ]}
          required
        />

        <TextareaField
          id="contact-message"
          label="Your note"
          description="A short description is enough. Include a deadline only if it is real."
          placeholder="We are moving a 10-person team into varunUI and need help with permissions…"
          rows={6}
          required
        />

        {#if sent}
          <StatusLine
            label="Your note is with the team"
            description="We will reply to the email above within one workday."
            meta="Sent"
            tone="success"
          />
        {:else}
          <Button type="submit" size="lg">{submitLabel}</Button>
        {/if}
      </Stack>
    </form>
  </Stack>

  {#snippet media()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A varunUI support specialist ready to help"
      tone="pink"
    />
  {/snippet}
</MediaSplit>
