<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  export interface EmailFirstSignInProps {
    heading?: string;
    description?: string;
    labels?: {
      email?: string;
      emailPlaceholder?: string;
      password?: string;
      passwordPlaceholder?: string;
      continue?: string;
      submit?: string;
      change?: string;
      passwordToggle?: string;
    };
    forgotPasswordLink?: {
      label: string;
      href: string;
    };
    signupPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const emailFirstSignInDemo: EmailFirstSignInProps = {
    heading: "Sign in",
    description: "Enter your email to get started.",
    labels: {
      email: "Email",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      continue: "Continue",
      submit: "Sign in",
      change: "Change",
      passwordToggle: "Toggle password visibility",
    },
    forgotPasswordLink: {
      label: "Forgot password?",
      href: "/reset-password",
    },
    signupPrompt: {
      text: "Don't have an account?",
      linkLabel: "Sign up",
      href: "/signup",
    },
  };
</script>

<script lang="ts">
  import { tick } from "svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    labels = {},
    forgotPasswordLink,
    signupPrompt,
  }: EmailFirstSignInProps = $props();

  const fieldId = "emailFirstSignIn-field";
  let step = $state<"email" | "password">("email");
  let email = $state("");
  let password = $state("");

  const emailLabel = $derived(labels.email);
  const emailPlaceholder = $derived(labels.emailPlaceholder);
  const passwordLabel = $derived(labels.password);
  const passwordPlaceholder = $derived(labels.passwordPlaceholder);
  const continueLabel = $derived(labels.continue);
  const submitLabel = $derived(labels.submit);
  const changeLabel = $derived(labels.change);
  const passwordToggleLabel = $derived(labels.passwordToggle);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  async function advanceToPasswordStep() {
    step = "password";
    await tick();
    document.getElementById(`${fieldId}-password`)?.focus();
  }
</script>

{#snippet PasswordRecovery()}
  {#if forgotPasswordLink}
    <Link href={forgotPasswordLink.href} label={forgotPasswordLink.label} />
  {/if}
{/snippet}

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person welcoming someone back to sign in"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}
    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  <form onsubmit={handleSubmit}>
    <FieldGroup>
      {#if step === "email"}
        {#if emailLabel}
          <Field>
            <FieldLabel for={`${fieldId}-email`}>{emailLabel}</FieldLabel>
            <Input
              id={`${fieldId}-email`}
              type="email"
              placeholder={emailPlaceholder}
              bind:value={email}
              class="h-[var(--control-height-md)]"
            />
          </Field>
        {/if}
        {#if continueLabel}
          <Field>
            <Button type="button" size="lg" onclick={advanceToPasswordStep}>
              {continueLabel}
            </Button>
          </Field>
        {/if}
      {:else}
        <div
          class="flex items-center justify-between gap-3 rounded-none border border-border bg-muted/60 px-3 py-2"
        >
          <span class="min-w-0 truncate text-sm font-medium">
            {email || emailPlaceholder}
          </span>
          {#if changeLabel}
            <Button
              type="button"
              variant="quiet"
              size="sm"
              onclick={() => (step = "email")}
              class="h-auto px-0"
            >
              {changeLabel}
            </Button>
          {/if}
        </div>

        {#if passwordLabel}
          <PasswordField
            id={`${fieldId}-password`}
            label={passwordLabel}
            placeholder={passwordPlaceholder}
            toggleLabel={passwordToggleLabel}
            labelEnd={forgotPasswordLink ? PasswordRecovery : undefined}
            bind:value={password}
          />
        {/if}

        {#if submitLabel}
          <Field>
            <Button type="submit" size="lg">{submitLabel}</Button>
          </Field>
        {/if}
      {/if}
    </FieldGroup>
  </form>

  {#snippet footer()}
    {#if signupPrompt}
      <FieldDescription class="text-center">
        {signupPrompt.text}
        <a href={signupPrompt.href} class="font-medium text-foreground">
          {signupPrompt.linkLabel}
        </a>
      </FieldDescription>
    {/if}
  {/snippet}
</AuthShell>
