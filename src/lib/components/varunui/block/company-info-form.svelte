<script lang="ts" module>
  interface TeamSize {
    id: string;
    label: string;
  }

  interface Industry {
    value: string;
    label: string;
  }

  export interface CompanyInfoFormProps {
    kicker?: string;
    heading?: string;
    description?: string;
    teamSizes?: TeamSize[];
    industries?: Industry[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      companyName?: string;
      companyNamePlaceholder?: string;
      teamSizeTitle?: string;
      industryTitle?: string;
      industryPlaceholder?: string;
      roleTitle?: string;
      rolePlaceholder?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const companyInfoFormDemo: CompanyInfoFormProps = {
    kicker: "Company",
    heading: "Set useful workspace defaults.",
    description:
      "We use this to set sensible workspace defaults for your team size and work.",
    teamSizes: [
      { id: "solo", label: "Just me" },
      { id: "small", label: "2–10" },
      { id: "medium", label: "11–50" },
      { id: "large", label: "51+" },
    ],
    industries: [
      { value: "saas", label: "SaaS / software" },
      { value: "ecommerce", label: "E-commerce" },
      { value: "fintech", label: "Fintech" },
      { value: "healthcare", label: "Healthcare" },
      { value: "education", label: "Education" },
      { value: "media", label: "Media and entertainment" },
      { value: "agency", label: "Agency / consulting" },
      { value: "nonprofit", label: "Nonprofit" },
      { value: "other", label: "Other" },
    ],
    primaryButton: { label: "Continue", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    labels: {
      companyName: "Company name",
      companyNamePlaceholder: "varunUI Studio",
      teamSizeTitle: "Team size",
      industryTitle: "Industry",
      industryPlaceholder: "Select your industry",
      roleTitle: "Your role",
      rolePlaceholder: "e.g. product manager",
    },
    currentStep: 2,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import OptionSelector from "$lib/components/varunui/component/option-selector.svelte";
  import SelectField from "$lib/components/varunui/component/select-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";

  let {
    kicker,
    heading,
    description,
    teamSizes = [],
    industries = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: CompanyInfoFormProps = $props();

  let selectedSize = $state("");
  let selectedIndustry = $state("");

  const teamSizeOptions = $derived(
    teamSizes.map((size) => ({
      value: size.id,
      label: size.label,
    })),
  );
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
  <Stack gap="md">
      <InputField
        id="company-name"
        label={labels?.companyName ?? "Team or company name"}
        placeholder={labels?.companyNamePlaceholder ?? "varunUI Studio"}
      />

      {#if teamSizes.length > 0}
        {@const teamSizeLabel = labels?.teamSizeTitle ?? "Team size"}
        <OptionSelector
          label={teamSizeLabel}
          options={teamSizeOptions}
          bind:value={selectedSize}
          labels={{ ariaLabel: teamSizeLabel }}
        />
      {/if}

      {#if industries.length > 0}
        <SelectField
          id="industry"
          label={labels?.industryTitle ?? "Industry"}
          placeholder={labels?.industryPlaceholder ?? "Select your industry"}
          options={industries}
          bind:value={selectedIndustry}
        />
      {/if}

      <InputField
        id="role"
        label={labels?.roleTitle ?? "Your role"}
        placeholder={labels?.rolePlaceholder ?? "e.g. CTO, Product Manager"}
      />
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
