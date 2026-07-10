<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface HumanVerificationProps {
    heading?: string;
    description?: string;
    labels?: {
      checkbox?: string;
      verifying?: string;
      verified?: string;
      brand?: string;
    };
    submitButton?: {
      label: string;
      href: string;
    };
  }

  export const humanVerificationDemo: HumanVerificationProps = {
    heading: "Verify you're human",
    description: "Complete the quick check below to continue.",
    labels: {
      checkbox: "I'm not a robot",
      verifying: "Verifying…",
      verified: "Verified",
      brand: "varunUI",
    },
    submitButton: {
      label: "Continue",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    Check,
    Loader2,
    ShieldCheck,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  type VerifyStatus = "idle" | "verifying" | "verified";

  let {
    heading,
    description,
    labels = {},
    submitButton,
  }: HumanVerificationProps = $props();

  let status = $state<VerifyStatus>("idle");
  let verifyTimeout: ReturnType<typeof setTimeout> | undefined;

  const checkboxLabel = $derived(labels.checkbox);
  const verifyingLabel = $derived(labels.verifying);
  const verifiedLabel = $derived(labels.verified);
  const brandLabel = $derived(labels.brand);
  const label = $derived(
    status === "verified"
      ? verifiedLabel
      : status === "verifying"
        ? verifyingLabel
        : checkboxLabel,
  );

  function start() {
    if (status !== "idle") return;

    status = "verifying";
    verifyTimeout = setTimeout(() => {
      status = "verified";
    }, 1200);
  }

  onDestroy(() => {
    if (verifyTimeout) clearTimeout(verifyTimeout);
  });
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A calm person standing by during a security check"
      tone="green"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
        {heading}
      </h1>
    {/if}

    {#if description}
      <p class="mx-auto mt-2 max-w-xs text-base text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="text-center">
    <Button
      variant="outline"
      size="lg"
      onclick={start}
      disabled={status !== "idle"}
      aria-busy={status === "verifying"}
      class="mt-8 w-full justify-between disabled:opacity-100"
    >
      <span class="flex min-w-0 items-center gap-3">
        <span class={`flex size-7 shrink-0 items-center justify-center rounded-sm border motion-colors ${status === "verified" ? "border-primary bg-primary text-background" : "border-border bg-background text-primary"}`}>
          {#if status === "verifying"}
            <Loader2 class="size-4 motion-spinner" aria-hidden="true" />
          {:else if status === "verified"}
            <Check class="size-4" aria-hidden="true" />
          {:else}
            <span class="size-3 bg-transparent"></span>
          {/if}
        </span>
        <span class="truncate font-medium" aria-live="polite">{label}</span>
      </span>

      {#if brandLabel}
        <span
          class="ml-4 inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground"
        >
          <ShieldCheck class="size-4" aria-hidden="true" />
          {brandLabel}
        </span>
      {/if}
    </Button>

    {#if submitButton}
      <Button
        size="lg"
        href={status === "verified" ? submitButton.href : undefined}
        disabled={status !== "verified"}
        class="mt-6 w-full"
      >
        {submitButton.label}
      </Button>
    {/if}
  </div>
</AuthShell>
