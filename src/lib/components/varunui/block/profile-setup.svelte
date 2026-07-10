<script lang="ts" module>
  interface TimezoneOption {
    value: string;
    label: string;
  }

  export interface ProfileSetupProps {
    kicker?: string;
    heading?: string;
    description?: string;
    timezones?: TimezoneOption[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      avatar?: string;
      avatarHint?: string;
      displayName?: string;
      displayNamePlaceholder?: string;
      bio?: string;
      bioPlaceholder?: string;
      timezone?: string;
      timezonePlaceholder?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const profileSetupDemo: ProfileSetupProps = {
    kicker: "Profile",
    heading: "Set up your profile",
    description:
      "Tell us a little about yourself. This helps your teammates recognize you.",
    timezones: [
      { value: "utc-8", label: "Pacific Time (UTC-8)" },
      { value: "utc-5", label: "Eastern Time (UTC-5)" },
      { value: "utc+0", label: "London (UTC+0)" },
      { value: "utc+1", label: "Central Europe (UTC+1)" },
      { value: "utc+3", label: "Istanbul (UTC+3)" },
      { value: "utc+5:30", label: "India (UTC+5:30)" },
      { value: "utc+8", label: "Singapore (UTC+8)" },
      { value: "utc+9", label: "Tokyo (UTC+9)" },
    ],
    primaryButton: { label: "Save and continue", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    labels: {
      avatar: "Profile photo",
      avatarHint: "Click to upload",
      displayName: "Display name",
      displayNamePlaceholder: "Maya Chen",
      bio: "Short bio",
      bioPlaceholder: "What do you do?",
      timezone: "Timezone",
      timezonePlaceholder: "Select your timezone",
    },
    currentStep: 2,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import SelectField from "$lib/components/varunui/component/select-field.svelte";
  import UploadDropzone from "$lib/components/varunui/component/upload-dropzone.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";

  let {
    kicker,
    heading,
    description,
    timezones = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: ProfileSetupProps = $props();

  let avatarFiles = $state<File[]>([]);
  let selectedTimezone = $state("");
</script>

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="pink"
  {className}
>
  <Stack gap="md">
        <UploadDropzone
          id="profile-photo"
          name="profile-photo"
          accept="image/png,image/jpeg,image/webp"
          bind:files={avatarFiles}
        >
          <p class="text-sm font-semibold">
            {labels?.avatar ?? "Profile photo"}
          </p>
          <p class="mt-1 text-xs text-muted-foreground">
            {labels?.avatarHint ?? "Choose a square PNG, JPEG, or WebP image."}
          </p>
        </UploadDropzone>

        <InputField
          id="display-name"
          label={labels?.displayName ?? "Display name"}
          placeholder={labels?.displayNamePlaceholder ?? "Maya Chen"}
        />

        <InputField
          id="bio"
          label={labels?.bio ?? "Short bio"}
          placeholder={labels?.bioPlaceholder ?? "What do you do?"}
        />

        {#if timezones.length > 0}
          <SelectField
            id="timezone"
            label={labels?.timezone ?? "Timezone"}
            placeholder={labels?.timezonePlaceholder ?? "Select your timezone"}
            options={timezones}
            bind:value={selectedTimezone}
          />
        {/if}
  </Stack>

  {#snippet actions()}
      {#if primaryButton}
        <Button size="lg" href={primaryButton.href}>
          {primaryButton.label}
          <ArrowRight class="size-4" />
        </Button>
      {/if}
      {#if secondaryButton}
        <Link href={secondaryButton.href} label={secondaryButton.label} />
      {/if}
  {/snippet}
</OnboardingStep>
