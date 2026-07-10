<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import type { Component } from "svelte";
  import { ShieldCheck } from "$lib/components/varunui/internal/icons/phosphor.js";

  export interface ConfirmIdentityProps {
    icon?: Component;
    heading?: string;
    description?: string;
    user?: {
      signedInLabel: string;
      email: string;
    };
    labels?: {
      password?: string;
      passwordPlaceholder?: string;
      submit?: string;
      passwordToggle?: string;
    };
    forgotPasswordLink?: {
      label: string;
      href: string;
    };
    cancelPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const confirmIdentityDemo: ConfirmIdentityProps = {
    icon: ShieldCheck,
    heading: "Confirm it's you",
    description:
      "For your security, please re-enter your password to change your billing details.",
    user: {
      signedInLabel: "Signed in as",
      email: "jane@example.com",
    },
    labels: {
      password: "Password",
      passwordPlaceholder: "Enter your password",
      submit: "Confirm",
      passwordToggle: "Toggle password visibility",
    },
    forgotPasswordLink: {
      label: "Forgot password?",
      href: "/reset-password",
    },
    cancelPrompt: {
      text: "Didn't mean to?",
      linkLabel: "Cancel",
      href: "/billing",
    },
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    user,
    labels = {},
    forgotPasswordLink,
    cancelPrompt,
  }: ConfirmIdentityProps = $props();

  const fieldId = "confirmIdentity-field";
  let password = $state("");

  const passwordLabel = $derived(labels.password);
  const passwordPlaceholder = $derived(labels.passwordPlaceholder);
  const submitLabel = $derived(labels.submit);
  const passwordToggleLabel = $derived(labels.passwordToggle);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  onMount(() => {
    document.getElementById(`${fieldId}-password`)?.focus();
  });
</script>

{#snippet PasswordRecovery()}
  {#if forgotPasswordLink}
    <Link href={forgotPasswordLink.href} label={forgotPasswordLink.label} />
  {/if}
{/snippet}

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding12Asset}
      alt="A calm person protecting an identity check"
      tone="purple"
    />
  {/snippet}

  {#snippet header()}
    {#if icon}
      {@const Icon = icon}
      <div
        class="mb-6 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
      >
        <Icon class="size-6" aria-hidden="true" />
      </div>
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  {#if user}
    <p class="mb-5 text-center text-sm text-muted-foreground">
      {user.signedInLabel}
      <span class="font-medium text-foreground">{user.email}</span>
    </p>
  {/if}

  <form onsubmit={handleSubmit}>
    <FieldGroup>
      <PasswordField
        id={`${fieldId}-password`}
        label={passwordLabel}
        placeholder={passwordPlaceholder}
        toggleLabel={passwordToggleLabel}
        labelEnd={forgotPasswordLink ? PasswordRecovery : undefined}
        bind:value={password}
      />

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
    {#if cancelPrompt}
      <FieldDescription class="text-center">
        {cancelPrompt.text}
        <a href={cancelPrompt.href} class="font-medium text-foreground">
          {cancelPrompt.linkLabel}
        </a>
      </FieldDescription>
    {/if}
  {/snippet}
</AuthShell>
