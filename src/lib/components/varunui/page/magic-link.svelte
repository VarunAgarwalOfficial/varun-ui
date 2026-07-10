<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { Component } from "svelte";
  import GoogleIcon from "$lib/components/varunui/internal/icons/google-icon.svelte";
  import { Apple, Sparkles } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface SocialProvider {
    label: string;
    icon: Component;
    href?: string;
  }

  export interface MagicLinkProps {
    icon?: Component;
    heading?: string;
    description?: string;
    socialProviders?: SocialProvider[];
    signupPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
    labels?: {
      email?: string;
      emailPlaceholder?: string;
      submit?: string;
      helper?: string;
      divider?: string;
    };
  }

  export const magicLinkDemo: MagicLinkProps = {
    icon: Sparkles,
    heading: "Sign in with email",
    description:
      "No password needed. We'll email you a secure link to sign in instantly.",
    socialProviders: [
      { label: "Continue with Google", icon: GoogleIcon, href: "?" },
      { label: "Continue with Apple", icon: Apple, href: "?" },
    ],
    signupPrompt: {
      text: "New here?",
      linkLabel: "Create an account",
      href: "?",
    },
    labels: {
      email: "Email",
      emailPlaceholder: "you@example.com",
      submit: "Send magic link",
      helper: "The link signs you in with one click and expires in 10 minutes.",
      divider: "or continue with",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldGroup,
    FieldSeparator,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    socialProviders = [],
    signupPrompt,
    labels = {},
  }: MagicLinkProps = $props();

  const fieldId = "magicLink";
  let emailLabel = $derived(labels.email);
  let emailPlaceholder = $derived(labels.emailPlaceholder);
  let submitLabel = $derived(labels.submit);
  let helperText = $derived(labels.helper);
  let dividerLabel = $derived(labels.divider);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person sending a secure sign-in link"
      tone="purple"
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
          description={helperText}
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

      {#if dividerLabel}
        <FieldSeparator
          class="*:data-[slot=field-separator-content]:bg-surface"
        >
          {dividerLabel}
        </FieldSeparator>
      {/if}

      {#if socialProviders.length > 0}
        <Field>
          {#each socialProviders as provider}
            {@const Icon = provider.icon}
            <Button href={provider.href} variant="outline" size="lg">
              <Icon />
              {provider.label}
            </Button>
          {/each}
        </Field>
      {/if}
    </FieldGroup>
  </form>

  {#snippet footer()}
    {#if signupPrompt}
      <p class="text-center text-sm text-muted-foreground">
        {signupPrompt.text}
        <a href={signupPrompt.href} class="font-medium text-foreground">
          {signupPrompt.linkLabel}
        </a>
      </p>
    {/if}
  {/snippet}
</AuthShell>
