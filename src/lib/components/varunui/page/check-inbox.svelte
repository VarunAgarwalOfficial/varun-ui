<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  export interface CheckInboxProps {
    heading?: string;
    description?: string;
    email?: string;
    primaryButton?: {
      label: string;
      href: string;
    };
    resendPrompt?: {
      text: string;
      linkLabel: string;
    };
    resendSeconds?: number;
    backLink?: {
      label: string;
      href: string;
    };
    labels?: {
      resendCountdown?: string;
    };
  }

  export const checkInboxDemo: CheckInboxProps = {
    heading: "Check your inbox",
    description: "We sent a secure sign-in link to your email address.",
    email: "jane@example.com",
    primaryButton: {
      label: "Open email app",
      href: "?",
    },
    resendPrompt: {
      text: "Didn't receive it?",
      linkLabel: "Resend link",
    },
    resendSeconds: 30,
    backLink: {
      label: "Use a different email",
      href: "?",
    },
    labels: {
      resendCountdown: "Resend available in {seconds}s",
    },
  };
</script>

<script lang="ts">
  import { MailOpen } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    email,
    primaryButton,
    resendPrompt,
    resendSeconds = 30,
    backLink,
    labels = {},
  }: CheckInboxProps = $props();

  let secondsLeft = $state(0);

  $effect(() => {
    secondsLeft = resendSeconds;
  });

  $effect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setTimeout(() => {
      secondsLeft -= 1;
    }, 1000);

    return () => window.clearTimeout(timer);
  });

  function handleResend() {
    secondsLeft = resendSeconds;
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepSitting1Asset}
      alt="A person waiting for an email"
      tone="blue"
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

  <div class="grid gap-[var(--layout-gap-md)] text-center">
    <div
      data-tone="blue"
      class="surface-pastel surface-pastel-art mx-auto grid size-14 place-items-center border border-border text-blue"
    >
      <MailOpen class="size-6" aria-hidden="true" />
    </div>

    {#if email}
      <p class="font-mono text-sm font-semibold text-foreground">{email}</p>
    {/if}

    {#if primaryButton}
      <Button href={primaryButton.href} size="lg" class="w-full">
        {primaryButton.label}
      </Button>
    {/if}

    {#if resendPrompt}
      <div class="grid justify-items-center gap-1 text-sm text-muted-foreground" aria-live="polite">
        {#if secondsLeft > 0}
          <p>
            {(labels.resendCountdown ?? "Resend available in {seconds}s").replace(
              "{seconds}",
              String(secondsLeft),
            )}
          </p>
        {:else}
          <p>{resendPrompt.text}</p>
          <Button variant="quiet" size="xs" onclick={handleResend}>
            {resendPrompt.linkLabel}
          </Button>
        {/if}
      </div>
    {/if}
  </div>

  {#if backLink}
    {#snippet footer()}
      <div class="flex justify-center text-muted-foreground">
        <Link href={backLink.href} label={backLink.label} direction="back" />
      </div>
    {/snippet}
  {/if}
</AuthShell>
