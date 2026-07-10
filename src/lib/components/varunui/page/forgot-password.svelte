<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import type { Component } from "svelte";
  import { KeyRound } from "$lib/components/varunui/internal/icons/phosphor.js";

  export interface ForgotPasswordProps {
    icon?: Component;
    heading?: string;
    description?: string;
    backLink?: {
      label: string;
      href: string;
    };
    labels?: {
      email?: string;
      emailPlaceholder?: string;
      submit?: string;
    };
  }

  export const forgotPasswordDemo: ForgotPasswordProps = {
    icon: KeyRound,
    heading: "Forgot your password?",
    description:
      "Enter the email linked to your account and we'll send you a link to reset your password.",
    backLink: {
      label: "Back to sign in",
      href: "?",
    },
    labels: {
      email: "Email",
      emailPlaceholder: "you@example.com",
      submit: "Send reset link",
    },
  };
</script>

<script lang="ts">
  import { ArrowLeft } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import { Field, FieldGroup } from "$lib/components/varunui/internal/ui/field/index.js";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    backLink,
    labels = {},
  }: ForgotPasswordProps = $props();

  const fieldId = "forgotPassword";
  let emailLabel = $derived(labels.email);
  let emailPlaceholder = $derived(labels.emailPlaceholder);
  let submitLabel = $derived(labels.submit);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding12Asset}
      alt="A person helping recover an account"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if icon}
      {@const Icon = icon}
      <Icon class="mb-4 size-6 text-primary" aria-hidden="true" />
    {/if}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}
    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  <form onsubmit={handleSubmit}>
    <FieldGroup>
      {#if emailLabel}
        <InputField
          id={`${fieldId}-email`}
          name="email"
          label={emailLabel}
          type="email"
          autocomplete="email"
          placeholder={emailPlaceholder}
          required
        />
      {/if}

      {#if submitLabel}
        <Field>
          <Button type="submit" size="lg">
            {submitLabel}
          </Button>
        </Field>
      {/if}
    </FieldGroup>
  </form>

  {#snippet footer()}
    {#if backLink}
      <div class="flex justify-center">
        <a
          href={backLink.href}
          class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft class="size-4" aria-hidden="true" />
          {backLink.label}
        </a>
      </div>
    {/if}
  {/snippet}
</AuthShell>
