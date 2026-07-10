<script lang="ts" module>
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  export interface EmailConfirmedProps {
    heading?: string;
    description?: string;
    primaryButton?: {
      label: string;
      href: string;
    };
    footerPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const emailConfirmedDemo: EmailConfirmedProps = {
    heading: "You're all set!",
    description:
      "Your email is verified and your account is ready. Welcome aboard.",
    primaryButton: {
      label: "Continue to dashboard",
      href: "?",
    },
    footerPrompt: {
      text: "Need a hand?",
      linkLabel: "Contact support",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { Check } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import RotatingTextSeal from "$lib/components/varunui/component/rotating-text-seal.svelte";

  let {
    heading,
    description,
    primaryButton,
    footerPrompt,
  }: EmailConfirmedProps = $props();
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding18Asset}
      alt="A person celebrating a completed sign up"
      tone="green"
    >
      {#snippet overlay()}
        <RotatingTextSeal text="YOU'RE IN • NICE WORK • " size="sm" />
      {/snippet}
    </StoryScene>
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
      data-tone="green"
      class="surface-pastel surface-pastel-art mx-auto grid size-16 place-items-center border border-border text-green"
    >
      <Check class="size-8" aria-hidden="true" />
    </div>

    <p class="text-sm leading-6 text-muted-foreground">
      Your workspace is ready. We saved your setup and signed you in securely.
    </p>

    {#if primaryButton}
      <Button href={primaryButton.href} size="lg" class="w-full">
        {primaryButton.label}
      </Button>
    {/if}
  </div>

  {#if footerPrompt}
    {#snippet footer()}
      <p class="text-center text-sm text-muted-foreground">
        {footerPrompt.text}
        <a href={footerPrompt.href} class="font-medium text-foreground hover:underline">
          {footerPrompt.linkLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
