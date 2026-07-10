<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import type { Component } from "svelte";
  import { Link2Off } from "$lib/components/varunui/internal/icons/phosphor.js";

  export interface ExpiredLinkProps {
    icon?: Component;
    heading?: string;
    description?: string;
    primaryButton?: {
      label: string;
      href: string;
    };
    backLink?: {
      label: string;
      href: string;
    };
  }

  export const expiredLinkDemo: ExpiredLinkProps = {
    icon: Link2Off,
    heading: "This link has expired",
    description:
      "For your security, sign-in links expire after a short while. Request a new one to continue.",
    primaryButton: {
      label: "Request a new link",
      href: "?",
    },
    backLink: {
      label: "Back to sign in",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { ArrowLeft } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    primaryButton,
    backLink,
  }: ExpiredLinkProps = $props();
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding12Asset}
      alt="A person calmly guiding someone back after a link expires"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if icon}
      {@const Icon = icon}
      <div
        class="mb-6 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
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
    {#if primaryButton}
      <Button href={primaryButton.href} size="lg" class="w-full">
        {primaryButton.label}
      </Button>
    {/if}

  </div>

  {#if backLink}
    {#snippet footer()}
      <div class="flex justify-center">
        <a
          href={backLink.href}
          class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground motion-colors hover:text-foreground"
        >
          <ArrowLeft class="size-4" aria-hidden="true" />
          {backLink.label}
        </a>
      </div>
    {/snippet}
  {/if}
</AuthShell>
