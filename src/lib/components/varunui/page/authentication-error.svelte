<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import type { Component } from "svelte";
  import { TriangleAlert } from "$lib/components/varunui/internal/icons/phosphor.js";

  export interface AuthenticationErrorProps {
    icon?: Component;
    heading?: string;
    description?: string;
    labels?: {
      errorDetail?: string;
    };
    tryAgainButton?: {
      label: string;
      href: string;
    };
    backButton?: {
      label: string;
      href: string;
    };
    supportPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const authenticationErrorDemo: AuthenticationErrorProps = {
    icon: TriangleAlert,
    heading: "We couldn't sign you in",
    description:
      "Something went wrong while signing you in. Please try again in a moment.",
    labels: {
      errorDetail: "Error code: AUTH_4012",
    },
    tryAgainButton: {
      label: "Try again",
      href: "?",
    },
    backButton: {
      label: "Back to sign in",
      href: "?",
    },
    supportPrompt: {
      text: "Still stuck?",
      linkLabel: "Contact support",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    labels = {},
    tryAgainButton,
    backButton,
    supportPrompt,
  }: AuthenticationErrorProps = $props();

  const errorDetail = $derived(labels.errorDetail);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding5Asset}
      alt="A person ready to help recover from a sign-in error"
      tone="red"
    />
  {/snippet}

  {#snippet header()}
    {#if icon}
      {@const Icon = icon}
      <div
        class="mb-6 flex size-14 items-center justify-center rounded-full bg-danger/10 text-danger"
      >
        <Icon class="size-7" aria-hidden="true" />
      </div>
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-3 text-base text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  <div class="text-center">
    {#if errorDetail}
      <p
        class="mx-auto mt-6 w-fit rounded-sm border bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground"
      >
        {errorDetail}
      </p>
    {/if}

    <div class="mt-8 flex flex-col gap-3">
      {#if tryAgainButton}
        <Button href={tryAgainButton.href} size="lg" class="w-full">
          {tryAgainButton.label}
        </Button>
      {/if}
      {#if backButton}
        <Button href={backButton.href} variant="quiet" size="lg" class="w-full">
          {backButton.label}
        </Button>
      {/if}
    </div>

  </div>

  {#if supportPrompt}
    {#snippet footer()}
      <p class="text-sm text-muted-foreground">
        {supportPrompt.text}
        <a
          href={supportPrompt.href}
          class="font-medium text-foreground hover:underline"
        >
          {supportPrompt.linkLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
