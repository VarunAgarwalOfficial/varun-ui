<script lang="ts" module>
  interface JobSummary {
    title: string;
    department?: string;
    location?: string;
    type?: string;
    href?: string;
  }

  export interface JobApplicationFormProps {
    kicker?: string;
    heading?: string;
    description?: string;
    job?: JobSummary;
    submitLabel?: string;
  }

  export const jobApplicationFormDemo: JobApplicationFormProps = {
    kicker: "Apply now",
    heading: "Join our engineering team",
    description:
      "Show us the work that prepared you for this role. We reply within five business days.",
    job: {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      href: "?",
    },
    submitLabel: "Submit application",
  };
</script>

<script lang="ts">
  import {
    Briefcase,
    Clock,
    MapPin,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import TextareaField from "$lib/components/varunui/component/textarea-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import UploadDropzone from "$lib/components/varunui/component/upload-dropzone.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import FactList from "$lib/components/varunui/piece/fact-list.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = jobApplicationFormDemo.kicker,
    heading = jobApplicationFormDemo.heading,
    description = jobApplicationFormDemo.description,
    job = jobApplicationFormDemo.job,
    submitLabel = jobApplicationFormDemo.submitLabel ?? "Submit application",
  }: JobApplicationFormProps = $props();

  let resumeFiles = $state<File[]>([]);
</script>

<Section container="lg">
  <Rail side="right">
    {#snippet rail()}
      {#if job}
        <div class="border-y py-[var(--surface-padding-md)]">
          <Stack gap="md">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">
                Role
              </p>
              <h2 class="mt-2 text-xl font-semibold">{job.title}</h2>
            </div>

            <FactList
              items={[
                { label: job.department, icon: Briefcase },
                { label: job.location, icon: MapPin },
                { label: job.type, icon: Clock },
              ]}
            />

            {#if job.href}
              <Link href={job.href} label="View role details" />
            {/if}
          </Stack>
        </div>
      {/if}
    {/snippet}

    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        size="lg"
        level={1}
      />

      <form
        class="grid max-w-[var(--layout-form)] gap-[var(--layout-gap-md)]"
        onsubmit={(event) => event.preventDefault()}
      >
        <InputField
          id="application-name"
          name="name"
          label="Full name"
          placeholder="Maya Chen"
          autocomplete="name"
          required
        />
        <InputField
          id="application-email"
          name="email"
          type="email"
          label="Email address"
          placeholder="maya@example.com"
          autocomplete="email"
          required
        />
        <InputField
          id="application-phone"
          name="phone"
          type="tel"
          label="Phone number"
          description="Optional"
          placeholder="+1 555 000 0000"
          autocomplete="tel"
        />
        <InputField
          id="application-portfolio"
          name="portfolio"
          type="url"
          label="Portfolio or profile"
          placeholder="https://your-work.example"
          autocomplete="url"
        />
        <TextareaField
          id="application-cover-letter"
          name="cover-letter"
          label="Why this role?"
          description="Focus on one or two relevant projects."
          placeholder="Tell us what you built and what you learned."
          rows={6}
          required
        />

        <UploadDropzone
          id="application-resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          bind:files={resumeFiles}
        >
          <p class="text-sm font-semibold">Resume</p>
          <p class="mt-1 text-xs text-muted-foreground">
            One PDF or Word document, up to 10 MB.
          </p>
        </UploadDropzone>

        <Button type="submit" size="lg">{submitLabel}</Button>
      </form>
    </Stack>
  </Rail>
</Section>
