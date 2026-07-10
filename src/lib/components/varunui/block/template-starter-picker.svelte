<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    FileTextIcon,
    KanbanIcon,
    Monitor,
    RowsIcon,
    ShapesIcon,
    SquaresFourIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface Template {
    id: string;
    icon?: Component;
    title: string;
    tag?: string;
  }

  export interface TemplateStarterPickerProps {
    kicker?: string;
    heading?: string;
    description?: string;
    templates?: Template[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const templateStarterPickerDemo: TemplateStarterPickerProps = {
    kicker: "Get started",
    heading: "Start from the closest useful shape.",
    description:
      "Choose one starting point. The structure is editable after the first project is created.",
    templates: [
      {
        id: "blank",
        icon: ShapesIcon,
        title: "Blank project",
      },
      {
        id: "marketing",
        icon: Monitor,
        title: "Marketing site",
        tag: "Recommended",
      },
      {
        id: "dashboard",
        icon: SquaresFourIcon,
        title: "Dashboard",
      },
      {
        id: "kanban",
        icon: KanbanIcon,
        title: "Kanban board",
      },
      {
        id: "spreadsheet",
        icon: RowsIcon,
        title: "Spreadsheet",
      },
      {
        id: "crm",
        icon: FileTextIcon,
        title: "CRM",
        tag: "New",
      },
    ],
    primaryButton: { label: "Create project", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    currentStep: 3,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
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
    templates = [],
    primaryButton,
    secondaryButton,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: TemplateStarterPickerProps = $props();

  let selected = $state("");
  const templateOptions = $derived(
    templates.map((template) => ({
      value: template.id,
      label: template.title,
      description: template.tag,
    })),
  );

  function findTemplate(option: RadioGroupFieldOption) {
    return templates.find((template) => template.id === option.value);
  }
</script>

{#snippet TemplateIcon(option: RadioGroupFieldOption, isSelected: boolean)}
  {@const template = findTemplate(option)}
  <span class="flex shrink-0 flex-col items-center gap-2" aria-hidden="true">
    <span
      class={cn(
        "flex size-11 items-center justify-center rounded-sm border motion-colors",
        isSelected
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground",
      )}
    >
      {#if template?.icon}
        {@const Icon = template.icon}
        <Icon class="size-6" />
      {/if}
    </span>
    {#if template?.tag}
      <Badge variant="muted">{template.tag}</Badge>
    {/if}
  </span>
{/snippet}

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="yellow"
  container="md"
  {className}
>
      {#if templateOptions.length > 0}
          <RadioGroupField
            label="Choose one starting point"
            options={templateOptions}
            orientation="grid"
            leading={TemplateIcon}
            bind:value={selected}
          />
      {/if}

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
