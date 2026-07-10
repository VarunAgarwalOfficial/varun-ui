<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  export interface AccountLockedProps {
    icon?: "shieldX";
    heading?: string;
    description?: string;
    lockSeconds?: number;
    retryButton?: {
      label: string;
      href: string;
    };
    resetPasswordPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
    labels?: {
      countdown?: string;
      retry?: string;
    };
  }

  export const accountLockedDemo: AccountLockedProps = {
    icon: "shieldX",
    heading: "Account temporarily locked",
    description:
      "Too many failed sign-in attempts. For your security, please wait before trying again.",
    lockSeconds: 90,
    retryButton: {
      label: "Try again",
      href: "?",
    },
    resetPasswordPrompt: {
      text: "Forgot your password?",
      linkLabel: "Reset it",
      href: "?",
    },
    labels: {
      countdown: "Try again in",
    },
  };
</script>

<script lang="ts">
  import { ShieldX } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    lockSeconds = 90,
    retryButton,
    resetPasswordPrompt,
    labels = {},
  }: AccountLockedProps = $props();

  let secondsLeft = $state(0);
  const countdownLabel = $derived(labels.countdown);
  const minutes = $derived(Math.floor(secondsLeft / 60));
  const seconds = $derived(secondsLeft % 60);
  const formatted = $derived(`${minutes}:${String(seconds).padStart(2, "0")}`);
  const isLocked = $derived(secondsLeft > 0);

  $effect(() => {
    secondsLeft = lockSeconds;
  });

  $effect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setTimeout(() => {
      secondsLeft -= 1;
    }, 1000);

    return () => window.clearTimeout(timer);
  });
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding12Asset}
      alt="A calm person keeping watch while an account is locked"
      tone="red"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "shieldX"}
      <div
        class="mb-6 flex size-14 items-center justify-center rounded-full bg-danger/10 text-danger"
      >
        <ShieldX class="size-6" aria-hidden="true" />
      </div>
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-3 text-base text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="text-center">
    {#if isLocked}
      <div class="mx-auto w-fit border-y border-border px-6 py-4">
        {#if countdownLabel}
          <p class="text-sm text-muted-foreground">{countdownLabel}</p>
        {/if}
        <p class="mt-1 font-mono text-3xl font-semibold tabular-nums">
          {formatted}
        </p>
      </div>
    {/if}

    {#if retryButton}
      <Button
        href={!isLocked ? retryButton.href : undefined}
        size="lg"
        class="mt-8 w-full"
        disabled={isLocked}
      >
        {retryButton.label}
      </Button>
    {/if}
  </div>

  {#if resetPasswordPrompt}
    {#snippet footer()}
      <p class="text-sm text-muted-foreground">
        {resetPasswordPrompt.text}
        <a
          href={resetPasswordPrompt.href}
          class="font-medium text-primary hover:underline"
        >
          {resetPasswordPrompt.linkLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
