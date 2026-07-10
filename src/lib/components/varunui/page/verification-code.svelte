<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  export interface VerificationCodeProps {
    heading?: string;
    description?: string;
    codeLength?: number;
    resendPrompt?: string;
    resendLabel?: string;
    resendSeconds?: number;
    backLink?: {
      label: string;
      href: string;
    };
    verifyLabel?: string;
  }

  export const verificationCodeDemo: VerificationCodeProps = {
    heading: "Check your email",
    description: "Enter the six-digit code sent to jane@example.com.",
    codeLength: 6,
    resendPrompt: "Did not receive it?",
    resendLabel: "Send another code",
    resendSeconds: 30,
    backLink: {
      label: "Back to sign in",
      href: "?",
    },
    verifyLabel: "Verify email",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import VerificationCodeField from "$lib/components/varunui/component/verification-code-field.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    codeLength = 6,
    resendPrompt = "Did not receive it?",
    resendLabel = "Send another code",
    resendSeconds = 30,
    backLink,
    verifyLabel = "Verify email",
  }: VerificationCodeProps = $props();

  let code = $state("");
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

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  function handleResend() {
    code = "";
    secondsLeft = resendSeconds;
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepSitting1Asset}
      alt="A person checking a verification message"
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
  <form onsubmit={handleSubmit}>
    <VerificationCodeField
      bind:value={code}
      length={codeLength}
      label="Verification code"
    />

    <Button
      type="submit"
      size="lg"
      class="mt-[var(--layout-gap-md)] w-full"
      disabled={code.length < codeLength}
    >
      {verifyLabel}
    </Button>

    <div class="mt-[var(--layout-gap-md)] text-center text-sm text-muted-foreground">
      {#if secondsLeft > 0}
        <span>Send another code in {secondsLeft}s</span>
      {:else}
        <span>{resendPrompt}</span>
        <Button type="button" variant="quiet" size="sm" onclick={handleResend}>
          {resendLabel}
        </Button>
      {/if}
    </div>
  </form>

  {#snippet footer()}
    {#if backLink}
      <div class="flex justify-center text-muted-foreground">
        <Link
          href={backLink.href}
          label={backLink.label}
          direction="back"
        />
      </div>
    {/if}
  {/snippet}
</AuthShell>
