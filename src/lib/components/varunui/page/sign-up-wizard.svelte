<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  interface WizardField {
    label: string;
    placeholder: string;
    type?: string;
  }

  interface WizardStep {
    label: string;
    title?: string;
    fields: WizardField[];
  }

  export interface SignUpWizardProps {
    heading?: string;
    steps?: WizardStep[];
    labels?: {
      back?: string;
      next?: string;
      submit?: string;
    };
  }

  export const signUpWizardDemo: SignUpWizardProps = {
    heading: "Create your account",
    steps: [
      {
        label: "Account",
        title: "Your login details",
        fields: [
          { label: "Email", placeholder: "you@example.com", type: "email" },
          {
            label: "Password",
            placeholder: "Create a password",
            type: "password",
          },
        ],
      },
      {
        label: "Profile",
        title: "Tell us about you",
        fields: [
          { label: "Full name", placeholder: "Maya Chen", type: "text" },
          {
            label: "Company",
            placeholder: "Design team",
            type: "text",
          },
        ],
      },
      {
        label: "Workspace",
        title: "Name your workspace",
        fields: [
          {
            label: "Workspace name",
            placeholder: "design-team",
            type: "text",
          },
        ],
      },
    ],
    labels: {
      back: "Back",
      next: "Continue",
      submit: "Create account",
    },
  };
</script>

<script lang="ts">
  import { ArrowLeft, Check } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import { cn } from "$lib/utils.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let { heading, steps = [], labels = {} }: SignUpWizardProps = $props();

  const fieldId = "signUpWizard-field";
  let current = $state(0);

  const backLabel = $derived(labels.back);
  const nextLabel = $derived(labels.next);
  const submitLabel = $derived(labels.submit);
  const lastIndex = $derived(steps.length - 1);
  const activeStep = $derived(steps[current]);
  const isLast = $derived(current >= lastIndex);
  const actionLabel = $derived(isLast ? submitLabel : nextLabel);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  function handleNext() {
    if (!isLast) current += 1;
  }

  function handleBack() {
    current = Math.max(0, current - 1);
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person welcoming someone through account setup"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}
  {/snippet}

    {#if steps.length > 0}
      <ol class="flex overflow-x-auto pb-1">
        {#each steps as step, index}
          {@const isComplete = index < current}
          {@const isActive = index === current}
          <li class="relative flex min-w-32 flex-1 items-center gap-3">
            <span
              class={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold motion-colors",
                isComplete || isActive
                  ? "border-primary bg-primary text-background"
                  : "border-border bg-surface text-muted-foreground",
              )}
            >
              {#if isComplete}
                <Check class="size-4" aria-hidden="true" />
              {:else}
                {index + 1}
              {/if}
            </span>
            <span
              class={cn(
                "truncate text-sm font-medium",
                isComplete || isActive
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
            {#if index < lastIndex}
              <span
                class={cn(
                  "absolute left-8 right-3 top-4 h-px",
                  isComplete ? "bg-primary" : "bg-border",
                )}
                aria-hidden="true"
              ></span>
            {/if}
          </li>
        {/each}
      </ol>
    {/if}

    {#if activeStep}
      <div class="mt-8 border-t border-border pt-[var(--layout-gap-md)]">
        {#if activeStep.title}
          <h2 class="mb-5 text-xl font-semibold">{activeStep.title}</h2>
        {/if}
        <form onsubmit={handleSubmit}>
          <FieldGroup>
            {#each activeStep.fields as field, index}
              {@const inputId = `${fieldId}-${current}-${index}`}
              <Field>
                <FieldLabel for={inputId}>{field.label}</FieldLabel>
                <Input
                  id={inputId}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  class="h-[var(--control-height-sm)]"
                />
              </Field>
            {/each}

            <div class="flex gap-3">
              {#if current > 0 && backLabel}
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onclick={handleBack}
                >
                  <ArrowLeft class="size-4" aria-hidden="true" />
                  {backLabel}
                </Button>
              {/if}
              {#if actionLabel}
                <Button
                  type="button"
                  size="lg"
                  class="h-[var(--control-height-sm)] flex-1"
                  onclick={handleNext}
                >
                  {actionLabel}
                </Button>
              {/if}
            </div>
          </FieldGroup>
        </form>
      </div>
    {/if}
</AuthShell>
