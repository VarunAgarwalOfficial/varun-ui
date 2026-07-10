<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface PinUnlockProps {
    heading?: string;
    description?: string;
    pinLength?: number;
    labels?: {
      biometric?: string;
      backspace?: string;
    };
    forgotPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const pinUnlockDemo: PinUnlockProps = {
    heading: "Enter your PIN",
    description: "Use your 4-digit PIN to unlock your account.",
    pinLength: 4,
    labels: {
      biometric: "Use biometrics",
      backspace: "Delete",
    },
    forgotPrompt: {
      text: "Forgot your PIN?",
      linkLabel: "Reset it",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import PinPad from "$lib/components/varunui/component/pin-pad.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    pinLength = 4,
    labels = {},
    forgotPrompt,
  }: PinUnlockProps = $props();

  let backspaceLabel = $derived(labels.backspace);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A calm person guarding a PIN-protected account"
      tone="purple"
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

  <PinPad length={pinLength} backspaceLabel={backspaceLabel ?? "Delete last digit"} />

  {#if forgotPrompt}
    {#snippet footer()}
      <div class="grid justify-items-center gap-1 text-center text-sm text-muted-foreground">
        <p>{forgotPrompt.text}</p>
        <Link href={forgotPrompt.href} label={forgotPrompt.linkLabel} />
      </div>
    {/snippet}
  {/if}
</AuthShell>
