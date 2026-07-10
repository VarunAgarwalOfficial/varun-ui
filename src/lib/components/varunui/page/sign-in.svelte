<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { Component } from "svelte";
  import GoogleIcon from "$lib/components/varunui/internal/icons/google-icon.svelte";
  import { Apple } from "$lib/components/varunui/internal/icons/phosphor.js";

  export interface SignInSocialProvider {
    label: string;
    icon: Component;
    href?: string;
  }

  export interface SignInProps {
    heading?: string;
    description?: string;
    character?: { src: string; alt: string };
    socialProviders?: SignInSocialProvider[];
    forgotPasswordHref?: string;
    signUpHref?: string;
    termsHref?: string;
    privacyHref?: string;
    onSubmit?: (event: SubmitEvent) => void;
  }

  export const signInDemo: SignInProps = {
    heading: "Welcome back",
    description: "Sign in to continue to your workspace.",
    character: {
      src: peepStanding23Asset,
      alt: "A person welcoming someone back",
    },
    socialProviders: [
      { label: "Continue with Google", icon: GoogleIcon, href: "?" },
      { label: "Continue with Apple", icon: Apple, href: "?" },
    ],
    forgotPasswordHref: "?",
    signUpHref: "?",
    termsHref: "?",
    privacyHref: "?",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading = signInDemo.heading,
    description = signInDemo.description,
    character = signInDemo.character,
    socialProviders = signInDemo.socialProviders ?? [],
    forgotPasswordHref = signInDemo.forgotPasswordHref,
    signUpHref = signInDemo.signUpHref,
    termsHref = signInDemo.termsHref,
    privacyHref = signInDemo.privacyHref,
    onSubmit,
  }: SignInProps = $props();

  function submitCredentials(event: SubmitEvent) {
    event.preventDefault();
    onSubmit?.(event);
  }
</script>

<AuthShell>
  {#snippet context()}
    {#if character}
      <StoryScene src={character.src} alt={character.alt} tone="yellow" frame="portrait" />
    {/if}
  {/snippet}

  {#snippet header()}
    <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
  {/snippet}

  <form onsubmit={submitCredentials}>
    <Stack gap="md">
      {#if socialProviders.length > 0}
        <Stack gap="sm">
          {#each socialProviders as provider (provider.label)}
            {@const Icon = provider.icon}
            <Button href={provider.href} variant="outline" size="lg" class="w-full">
              <Icon class="size-4" aria-hidden="true" />
              {provider.label}
            </Button>
          {/each}
        </Stack>
        <div class="flex items-center gap-[var(--layout-gap-sm)] text-xs text-muted-foreground">
          <span class="h-px flex-1 bg-border"></span>
          <span>or use email</span>
          <span class="h-px flex-1 bg-border"></span>
        </div>
      {/if}

      <InputField id="signIn-email" name="email" type="email" label="Email" placeholder="you@example.com" autocomplete="email" required />
      <PasswordField id="signIn-password" name="password" label="Password" placeholder="Enter your password" autocomplete="current-password" required />

      <div class="flex flex-wrap items-center justify-between gap-[var(--layout-gap-sm)]">
        <CheckboxField label="Remember me" name="remember" />
        {#if forgotPasswordHref}
          <a class="text-sm font-semibold text-foreground underline underline-offset-4" href={forgotPasswordHref}>Forgot password?</a>
        {/if}
      </div>
      <Button type="submit" size="lg" class="w-full">Sign in</Button>
    </Stack>
  </form>

  {#snippet footer()}
    {#if signUpHref}
      <p class="text-center text-sm text-muted-foreground">
        Need an account?
        <a class="font-semibold text-foreground underline underline-offset-4" href={signUpHref}>Sign up</a>
      </p>
    {/if}
    {#if termsHref && privacyHref}
      <p class="mt-4 px-6 text-center text-xs leading-5 text-muted-foreground">
        By signing in, you agree to our
        <a class="font-medium text-foreground underline underline-offset-4" href={termsHref}>Terms</a>
        and
        <a class="font-medium text-foreground underline underline-offset-4" href={privacyHref}>Privacy Policy</a>.
      </p>
    {/if}
  {/snippet}
</AuthShell>
