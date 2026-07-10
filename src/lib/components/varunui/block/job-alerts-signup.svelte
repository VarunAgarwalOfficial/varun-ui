<script lang="ts" module>
  export interface JobAlertsSignupProps {
    kicker?: string;
    heading?: string;
    description?: string;
  }

  export const jobAlertsSignupDemo: JobAlertsSignupProps = {
    kicker: "Job alerts",
    heading: "Hear when the right role opens.",
    description:
      "A short email when we publish a role. No generic career newsletter and no invented urgency.",
  };
</script>

<script lang="ts">
  import EmailCaptureForm from "$lib/components/varunui/component/email-capture-form.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = jobAlertsSignupDemo.kicker,
    heading = jobAlertsSignupDemo.heading,
    description = jobAlertsSignupDemo.description,
  }: JobAlertsSignupProps = $props();
</script>

<Section container="sm">
  <PastelField tone="pink" className="p-[var(--surface-padding-lg)]">
    <Stack gap="lg">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        size="md"
        markerTone="pink"
      />
      <EmailCaptureForm
        id="job-alerts-email"
        label="Email for job alerts"
        placeholder="you@example.com"
        buttonLabel="Join job alerts"
        consent="Unsubscribe from any email."
      />
    </Stack>
  </PastelField>
</Section>
