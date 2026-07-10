<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import type { Component } from "svelte";
  import { Smartphone } from "$lib/components/varunui/internal/icons/phosphor.js";

  type IconComponent = Component<Record<string, unknown>>;

  export interface NumberMatchProps {
    icon?: IconComponent;
    heading?: string;
    description?: string;
    matchNumber?: string;
    labels?: {
      waiting?: string;
      footer?: string;
    };
    cancelPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const numberMatchDemo: NumberMatchProps = {
    icon: Smartphone,
    heading: "Approve your sign-in",
    description:
      "Open the varunUI app on your phone and tap the number you see below to continue.",
    matchNumber: "42",
    labels: {
      waiting: "Waiting for approval\u2026",
      footer: "This request expires in 60 seconds.",
    },
    cancelPrompt: {
      text: "Didn't start this?",
      linkLabel: "Cancel sign-in",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    matchNumber,
    labels = {},
    cancelPrompt,
  }: NumberMatchProps = $props();

  let displayNumber = $derived(matchNumber);
  let waitingText = $derived(labels.waiting);
  let footerText = $derived(labels.footer);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepSitting1Asset}
      alt="A seated person waiting for a phone approval"
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
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="text-center">
    {#if displayNumber}
      <div
        class="mx-auto w-full max-w-[15rem] border-y border-border p-8"
      >
        <span class="font-mono text-6xl font-bold tracking-tight tabular-nums">
          {displayNumber}
        </span>
      </div>
    {/if}

    {#if waitingText}
      <div
        class="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
      >
        <span class="relative flex size-3" aria-hidden="true">
          <span
            class="absolute inline-flex size-full motion-ping rounded-full bg-primary/40"
          ></span>
          <span class="relative inline-flex size-3 rounded-full bg-primary"
          ></span>
        </span>
        {waitingText}
      </div>
    {/if}

  </div>

  {#if cancelPrompt || footerText}
    {#snippet footer()}
      {#if cancelPrompt}
      <p class="text-sm text-muted-foreground">
        {cancelPrompt.text}
        <a
          href={cancelPrompt.href}
          class="font-medium text-foreground hover:underline"
        >
          {cancelPrompt.linkLabel}
        </a>
      </p>
      {/if}

      {#if footerText}
        <p class="mt-4 text-xs text-muted-foreground">{footerText}</p>
      {/if}
    {/snippet}
  {/if}
</AuthShell>
