<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  type ScanStatus = "idle" | "scanning" | "success";

  export interface BiometricSignInProps {
    heading?: string;
    description?: string;
    labels?: {
      scanPrompt?: string;
      scanning?: string;
      success?: string;
      scanButton?: string;
    };
    continueButton?: {
      label: string;
      href: string;
    };
    fallbackLink?: {
      label: string;
      href: string;
    };
  }

  export const biometricSignInDemo: BiometricSignInProps = {
    heading: "Sign in with Face ID",
    description: "Look at your device to verify it's you.",
    labels: {
      scanPrompt: "Position your face in the frame",
      scanning: "Scanning…",
      success: "Face recognized",
      scanButton: "Scan my face",
    },
    continueButton: {
      label: "Continue",
      href: "?",
    },
    fallbackLink: {
      label: "Use password instead",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { CircleCheck, ScanFace } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import { cn } from "$lib/utils.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    labels = {},
    continueButton,
    fallbackLink,
  }: BiometricSignInProps = $props();

  let status = $state<ScanStatus>("idle");
  let scanTimer: number | undefined;

  const scanPromptLabel = $derived(labels.scanPrompt);
  const scanningLabel = $derived(labels.scanning);
  const successLabel = $derived(labels.success);
  const scanButtonLabel = $derived(labels.scanButton);

  const frameColor = $derived(
    status === "success"
      ? "border-success"
      : status === "scanning"
        ? "border-primary"
        : "border-border",
  );
  const statusLabel = $derived(
    status === "success"
      ? successLabel
      : status === "scanning"
        ? scanningLabel
        : scanPromptLabel,
  );

  function startScan() {
    if (status !== "idle") return;
    status = "scanning";
    scanTimer = window.setTimeout(() => {
      status = "success";
    }, 1800);
  }

  onDestroy(() => {
    if (scanTimer) clearTimeout(scanTimer);
  });
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding5Asset}
      alt="A calm person standing by for a biometric check"
      tone="blue"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
        {heading}
      </h1>
    {/if}
    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="text-center">
    <div
      class="relative mx-auto mt-10 flex size-48 items-center justify-center"
    >
      <span
        class={cn(
          "absolute inset-0 rounded-xl border-2 motion-colors",
          frameColor,
        )}
      ></span>

      {#if status === "success"}
        <CircleCheck class="size-16 text-success" />
      {:else}
        <ScanFace
          class={cn(
            "size-16 motion-colors",
            status === "scanning" ? "text-primary" : "text-muted-foreground",
          )}
        />
      {/if}
    </div>

    {#if statusLabel}
      <p
        aria-live="polite"
        class={cn(
          "mt-6 text-sm font-medium",
          status === "success" ? "text-success" : "text-muted-foreground",
        )}
      >
        {statusLabel}
      </p>
    {/if}

    <div class="mt-8">
      {#if status === "success"}
        {#if continueButton}
          <Button href={continueButton.href} size="lg" class="w-full">
            {continueButton.label}
          </Button>
        {/if}
      {:else if status === "scanning"}
        <Button size="lg" class="w-full" loading loadingLabel={scanningLabel}>
          {scanningLabel}
        </Button>
      {:else if scanButtonLabel}
        <Button size="lg" class="w-full" onclick={startScan}>
          {scanButtonLabel}
        </Button>
      {/if}
    </div>
  </div>

  {#if fallbackLink}
    {#snippet footer()}
      <p class="text-center text-sm">
        <a
          href={fallbackLink.href}
          class="font-medium text-primary hover:underline"
        >
          {fallbackLink.label}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
