<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  type ProviderIcon = "google" | "microsoft";

  interface SocialProvider {
    label: string;
    icon: ProviderIcon;
    href?: string;
  }

  export interface SsoSignInProps {
    icon?: "building";
    heading?: string;
    description?: string;
    labels?: {
      email?: string;
      emailPlaceholder?: string;
      submit?: string;
      divider?: string;
    };
    socialProviders?: SocialProvider[];
    footerPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const ssoSignInDemo: SsoSignInProps = {
    icon: "building",
    heading: "Sign in to your organization",
    description:
      "Enter your work email to continue with your company's single sign-on.",
    labels: {
      email: "Work email",
      emailPlaceholder: "you@company.com",
      submit: "Continue with SSO",
      divider: "or",
    },
    socialProviders: [
      { label: "Continue with Google", icon: "google", href: "/auth/google" },
      {
        label: "Continue with Microsoft",
        icon: "microsoft",
        href: "/auth/microsoft",
      },
    ],
    footerPrompt: {
      text: "Don't have a workspace?",
      linkLabel: "Talk to sales",
      href: "/contact-sales",
    },
  };
</script>

<script lang="ts">
  import GoogleIcon from "$lib/components/varunui/internal/icons/google-icon.svelte";
  import { Building2 } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    labels = {},
    socialProviders = [],
    footerPrompt,
  }: SsoSignInProps = $props();

  const fieldId = "ssoSignIn-field";

  const emailLabel = $derived(labels.email);
  const emailPlaceholder = $derived(labels.emailPlaceholder);
  const submitLabel = $derived(labels.submit);
  const dividerLabel = $derived(labels.divider);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

{#snippet MicrosoftIcon()}
  <svg viewBox="0 0 24 24" class="size-4" aria-hidden="true">
    <path fill="var(--color-red)" d="M2 2h9.5v9.5H2z" />
    <path fill="var(--color-green)" d="M12.5 2H22v9.5h-9.5z" />
    <path fill="var(--color-blue)" d="M2 12.5h9.5V22H2z" />
    <path fill="var(--color-yellow)" d="M12.5 12.5H22V22h-9.5z" />
  </svg>
{/snippet}

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A person entering a work account"
      tone="blue"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "building"}
      <Building2 class="mb-4 size-6 text-primary" />
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
      <Field>
        {#if emailLabel}
          <FieldLabel for={`${fieldId}-email`}>{emailLabel}</FieldLabel>
        {/if}
        <Input
          id={`${fieldId}-email`}
          type="email"
          placeholder={emailPlaceholder}
          class="h-[var(--control-height-md)]"
        />
      </Field>

      {#if submitLabel}
        <Field>
          <Button type="submit" size="lg">
            {submitLabel}
          </Button>
        </Field>
      {/if}

      {#if dividerLabel}
        <FieldSeparator class="*:data-[slot=field-separator-content]:bg-surface">
          {dividerLabel}
        </FieldSeparator>
      {/if}

      {#if socialProviders.length > 0}
        <Field>
          {#each socialProviders as provider}
            <Button href={provider.href} variant="outline" size="lg">
              {#if provider.icon === "google"}
                <GoogleIcon />
              {:else if provider.icon === "microsoft"}
                {@render MicrosoftIcon()}
              {/if}
              {provider.label}
            </Button>
          {/each}
        </Field>
      {/if}
    </FieldGroup>
  </form>

  {#snippet footer()}
    {#if footerPrompt}
      <FieldDescription class="text-center">
        {footerPrompt.text}
        <a href={footerPrompt.href} class="font-medium text-foreground">
          {footerPrompt.linkLabel}
        </a>
      </FieldDescription>
    {/if}
  {/snippet}
</AuthShell>
