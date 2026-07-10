<script lang="ts" module>
  interface ImportSource {
    id: string;
    title: string;
    description: string;
  }

  export interface DataImportSelectorProps {
    kicker?: string;
    heading?: string;
    description?: string;
    sources?: ImportSource[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      uploadTitle?: string;
      uploadDescription?: string;
      manualTitle?: string;
      manualDescription?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const dataImportSelectorDemo: DataImportSelectorProps = {
    kicker: "Import",
    heading: "Bring your data",
    description:
      "Bring useful context from another tool or start with a clean workspace.",
    sources: [
      {
        id: "trello",
        title: "Trello",
        description: "Import boards, lists, and cards",
      },
      {
        id: "asana",
        title: "Asana",
        description: "Import projects and tasks",
      },
      {
        id: "jira",
        title: "Jira",
        description: "Import issues and sprints",
      },
      {
        id: "notion",
        title: "Notion",
        description: "Import pages and databases",
      },
    ],
    primaryButton: { label: "Continue", href: "?" },
    secondaryButton: { label: "Start from scratch", href: "?" },
    labels: {
      uploadTitle: "Upload a file",
      uploadDescription: "CSV, JSON, or Excel files up to 50MB",
      manualTitle: "Enter manually",
      manualDescription: "Start with a blank workspace",
    },
    currentStep: 3,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import RadioGroupField from "$lib/components/varunui/component/radio-group-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";

  let {
    kicker,
    heading,
    description,
    sources = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: DataImportSelectorProps = $props();

  let selected = $state("");

  const importOptions = $derived([
    ...sources.map((source) => ({
      value: source.id,
      label: source.title,
      description: source.description,
    })),
    {
      value: "upload",
      label: labels?.uploadTitle ?? "Upload a file",
      description:
        labels?.uploadDescription ?? "CSV, JSON, or Excel files up to 50MB",
    },
    {
      value: "manual",
      label: labels?.manualTitle ?? "Enter manually",
      description:
        labels?.manualDescription ?? "Start with a blank workspace",
    },
  ]);
</script>

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="blue"
  {className}
>
      <RadioGroupField
        label="Import source"
        description="Choose one source or start from a file or blank workspace."
        options={importOptions}
        orientation="grid"
        bind:value={selected}
      />

  {#snippet actions()}
      {#if primaryButton}
        <Button
          size="lg"
          disabled={!selected}
          href={selected ? primaryButton.href : undefined}
        >
          {primaryButton.label}
          <ArrowRight class="size-4" />
        </Button>
      {/if}
      {#if secondaryButton}
        <Link href={secondaryButton.href} label={secondaryButton.label} />
      {/if}
  {/snippet}
</OnboardingStep>
