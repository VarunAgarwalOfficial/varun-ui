<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface PasskeyProps {
    icon?: "fingerprint";
    heading?: string;
    description?: string;
    passkeyButton?: {
      label: string;
      href: string;
    };
    alternativeButton?: {
      label: string;
      href: string;
    };
    signupPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
    labels?: {
      divider?: string;
    };
  }

  export const passkeyDemo: PasskeyProps = {
    icon: "fingerprint",
    heading: "Sign in with a passkey",
    description:
      "Use your fingerprint, face, or device PIN. No password is required.",
    passkeyButton: {
      label: "Continue with passkey",
      href: "?",
    },
    alternativeButton: {
      label: "Sign in with password",
      href: "?",
    },
    signupPrompt: {
      text: "Don't have an account?",
      linkLabel: "Sign up",
      href: "?",
    },
    labels: {
      divider: "or",
    },
  };
</script>

<script lang="ts">
  import { Fingerprint } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    FieldDescription,
    FieldSeparator,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    passkeyButton,
    alternativeButton,
    signupPrompt,
    labels = {},
  }: PasskeyProps = $props();

  const dividerLabel = $derived(labels.divider);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A person using secure device access"
      tone="green"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "fingerprint"}
      <Fingerprint class="mb-4 size-6 text-primary" aria-hidden="true" />
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  <div class="flex flex-col gap-5">
    {#if passkeyButton}
      <Button href={passkeyButton.href} size="lg" class="w-full">
        <Fingerprint class="size-4" aria-hidden="true" />
        {passkeyButton.label}
      </Button>
    {/if}

    {#if dividerLabel}
      <FieldSeparator>{dividerLabel}</FieldSeparator>
    {/if}

    {#if alternativeButton}
      <Button href={alternativeButton.href} variant="outline" size="lg" class="w-full">
        {alternativeButton.label}
      </Button>
    {/if}
  </div>

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
