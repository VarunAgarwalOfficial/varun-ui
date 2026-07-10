<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    BarChart3,
    Briefcase,
    Code2,
    Palette,
    Settings,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface Role {
    id: string;
    icon?: Component;
    title: string;
    description: string;
  }

  export interface RolePersonaSelectorProps {
    kicker?: string;
    heading?: string;
    description?: string;
    roles?: Role[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    selectedHint?: string;
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const rolePersonaSelectorDemo: RolePersonaSelectorProps = {
    kicker: "Personalize",
    heading: "Which work should lead your setup?",
    description:
      "Choose the closest role. This changes the first shortcuts, not what you can access.",
    roles: [
      {
        id: "developer",
        icon: Code2,
        title: "Engineering",
        description: "Build, release, and maintain the product",
      },
      {
        id: "designer",
        icon: Palette,
        title: "Design",
        description: "Shape interfaces, systems, and reviews",
      },
      {
        id: "product",
        icon: BarChart3,
        title: "Product",
        description: "Set priorities and move decisions forward",
      },
      {
        id: "ops",
        icon: Settings,
        title: "Operations",
        description: "Keep ownership, process, and delivery clear",
      },
      {
        id: "founder",
        icon: Briefcase,
        title: "Leadership",
        description: "Review direction, risk, and progress",
      },
    ],
    primaryButton: { label: "Continue", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    selectedHint: "You can change this later in settings.",
    currentStep: 2,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import RadioGroupField, {
    type RadioGroupFieldOption,
  } from "$lib/components/varunui/component/radio-group-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import { cn } from "$lib/utils.js";

  let {
    kicker,
    heading,
    description,
    roles = [],
    primaryButton,
    secondaryButton,
    selectedHint,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: RolePersonaSelectorProps = $props();

  let selected = $state("");
  const roleOptions = $derived(
    roles.map((role) => ({
      value: role.id,
      label: role.title,
      description: role.description,
    })),
  );

  function findRole(option: RadioGroupFieldOption) {
    return roles.find((role) => role.id === option.value);
  }
</script>

{#snippet RoleIcon(option: RadioGroupFieldOption, isSelected: boolean)}
  {@const role = findRole(option)}
  <span
    class={cn(
      "flex size-10 shrink-0 items-center justify-center rounded-sm border motion-colors",
      isSelected
        ? "border-primary/40 bg-primary/10 text-primary"
        : "border-border bg-background text-muted-foreground",
    )}
    aria-hidden="true"
  >
    {#if role?.icon}
      {@const Icon = role.icon}
      <Icon class="size-6" />
    {/if}
  </span>
{/snippet}

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="pink"
  container="md"
  {className}
>
      {#if roleOptions.length > 0}
          <RadioGroupField
            label="Choose one role"
            options={roleOptions}
            orientation="grid"
            leading={RoleIcon}
            bind:value={selected}
          />
      {/if}

  {#snippet status()}
      {#if selected && selectedHint}
        <p class="text-sm text-muted-foreground" aria-live="polite">
          {selectedHint}
        </p>
      {/if}
  {/snippet}

  {#snippet actions()}
        {#if primaryButton}
          <Button size="lg" disabled={!selected} href={selected ? primaryButton.href : undefined}>
            {primaryButton.label}
            <ArrowRight class="size-4" />
          </Button>
        {/if}
        {#if secondaryButton}
          <Link href={secondaryButton.href} label={secondaryButton.label} />
        {/if}
  {/snippet}
</OnboardingStep>
