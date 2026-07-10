<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import type { Component } from "svelte";
  import GithubIcon from "$lib/components/varunui/internal/icons/github-icon.svelte";
  import GoogleIcon from "$lib/components/varunui/internal/icons/google-icon.svelte";

  interface SocialProvider {
    label: string;
    icon: Component;
    href?: string;
  }

  export interface SignUpProps {
    heading?: string;
    description?: string;
    socialProviders?: SocialProvider[];
    character?: { src: string; alt: string };
    signInHref?: string;
    termsHref?: string;
    privacyHref?: string;
    contextSide?: "left" | "right";
    onSubmit?: (event: SubmitEvent) => void;
  }

  export const signUpDemo: SignUpProps = {
    heading: "Create your account",
    description: "Start a workspace and invite the people responsible for the work.",
    socialProviders: [
      { label: "Google", icon: GoogleIcon, href: "?" },
      { label: "GitHub", icon: GithubIcon, href: "?" },
    ],
    character: {
      src: peepStanding5Asset,
      alt: "A person opening a new workspace",
    },
    signInHref: "?",
    termsHref: "?",
    privacyHref: "?",
    contextSide: "right",
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
    heading = signUpDemo.heading,
    description = signUpDemo.description,
    socialProviders = signUpDemo.socialProviders ?? [],
    character = signUpDemo.character,
    signInHref = signUpDemo.signInHref,
    termsHref = signUpDemo.termsHref,
    privacyHref = signUpDemo.privacyHref,
    contextSide = "right",
    onSubmit,
  }: SignUpProps = $props();

  function submitAccount(event: SubmitEvent) {
    event.preventDefault();
    onSubmit?.(event);
  }
</script>

<AuthShell {contextSide}>
  {#snippet context()}
    {#if character}
      <StoryScene src={character.src} alt={character.alt} tone="pink" frame="portrait" />
    {/if}
  {/snippet}

  {#snippet header()}
    <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
  {/snippet}

  <form onsubmit={submitAccount}>
    <Stack gap="md">
      {#if socialProviders.length > 0}
        <div class="grid grid-cols-2 gap-[var(--layout-gap-sm)]">
          {#each socialProviders as provider (provider.label)}
            {@const Icon = provider.icon}
            <Button href={provider.href} variant="outline" size="lg" class="w-full">
              <Icon class="size-4" aria-hidden="true" />
              {provider.label}
            </Button>
          {/each}
        </div>
        <div class="flex items-center gap-[var(--layout-gap-sm)] text-xs text-muted-foreground">
          <span class="h-px flex-1 bg-border"></span>
          <span>or use email</span>
          <span class="h-px flex-1 bg-border"></span>
        </div>
      {/if}

      <InputField id="signUp-name" name="name" label="Full name" placeholder="Maya Chen" autocomplete="name" required />
      <InputField id="signUp-email" name="email" type="email" label="Email" placeholder="you@example.com" autocomplete="email" required />
      <PasswordField id="signUp-password" name="password" label="Password" placeholder="Create a password" autocomplete="new-password" required />

      {#if termsHref && privacyHref}
        <CheckboxField name="terms" required>
          {#snippet label()}
            I agree to the
            <a class="font-medium text-foreground underline underline-offset-4" href={termsHref}>Terms of Service</a>
            and
            <a class="font-medium text-foreground underline underline-offset-4" href={privacyHref}>Privacy Policy</a>.
          {/snippet}
        </CheckboxField>
      {/if}

      <Button type="submit" size="lg" class="w-full">Create account</Button>
    </Stack>
  </form>

  {#snippet footer()}
    {#if signInHref}
      <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <a class="font-semibold text-foreground underline underline-offset-4" href={signInHref}>Sign in</a>
      </p>
    {/if}
  {/snippet}
</AuthShell>
