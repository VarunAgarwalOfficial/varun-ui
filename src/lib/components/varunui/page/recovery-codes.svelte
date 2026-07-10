<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  export interface RecoveryCodesProps {
    icon?: "keyRound";
    heading?: string;
    description?: string;
    codes?: string[];
    downloadFileName?: string;
    continueButton?: {
      label: string;
      href: string;
    };
    labels?: {
      copy?: string;
      copied?: string;
      download?: string;
      warning?: string;
      confirm?: string;
    };
  }

  export const recoveryCodesDemo: RecoveryCodesProps = {
    icon: "keyRound",
    heading: "Save your recovery codes",
    description:
      "Keep these codes somewhere safe. Each one can be used once to sign in if you lose access to your authenticator.",
    codes: [
      "4f9k-2x7p",
      "8m3q-1v6z",
      "7c2w-9b4n",
      "5h8d-3t1r",
      "6j4l-7y2k",
      "9p1s-4f8m",
      "2w6x-5q3v",
      "3n7b-8c2h",
    ],
    downloadFileName: "recovery-codes.txt",
    continueButton: {
      label: "Continue",
      href: "?",
    },
    labels: {
      copy: "Copy codes",
      copied: "Copied",
      download: "Download",
      warning: "You won't be able to view these codes again.",
      confirm: "I have saved my recovery codes",
    },
  };
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    Check,
    Copy,
    Download,
    KeyRound,
    TriangleAlert,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import { Checkbox } from "$lib/components/varunui/internal/ui/checkbox/index.js";
  import { Field, FieldLabel } from "$lib/components/varunui/internal/ui/field/index.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    codes = [],
    downloadFileName = "recovery-codes.txt",
    continueButton,
    labels = {},
  }: RecoveryCodesProps = $props();

  let copied = $state(false);
  let confirmed = $state(false);
  let copiedTimer: ReturnType<typeof setTimeout> | undefined;
  const fieldId = "recoveryCodes-field";

  const copyLabel = $derived(labels.copy);
  const copiedLabel = $derived(labels.copied);
  const downloadLabel = $derived(labels.download);
  const warningText = $derived(labels.warning);
  const confirmLabel = $derived(labels.confirm);
  const canContinue = $derived(!confirmLabel || confirmed);

  onDestroy(() => {
    if (copiedTimer) clearTimeout(copiedTimer);
  });

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codes.join("\n"));
      copied = true;
      if (copiedTimer) clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch {
      copied = false;
    }
  }

  function handleDownload() {
    const blob = new Blob([codes.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = downloadFileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding12Asset}
      alt="A person safely storing account recovery details"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "keyRound"}
      <KeyRound class="mb-4 size-6 text-primary" aria-hidden="true" />
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  {#if codes.length > 0}
    <ul class="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {#each codes as code}
        <li class="rounded-sm border bg-muted/40 px-3 py-2 text-center font-mono text-sm font-medium tabular-nums">
          {code}
        </li>
      {/each}
    </ul>
  {/if}

      <div class="mt-[var(--layout-gap-md)] grid grid-cols-1 gap-3 sm:grid-cols-2">
        {#if copyLabel}
          <Button
            type="button"
            variant="outline"
            class="w-full"
            onclick={handleCopy}
          >
            {#if copied}
              <Check class="size-4" aria-hidden="true" />
            {:else}
              <Copy class="size-4" aria-hidden="true" />
            {/if}
            {copied ? (copiedLabel ?? "Copied") : copyLabel}
          </Button>
        {/if}

        {#if downloadLabel}
          <Button
            type="button"
            variant="outline"
            class="w-full"
            onclick={handleDownload}
          >
            <Download class="size-4" aria-hidden="true" />
            {downloadLabel}
          </Button>
        {/if}
      </div>

      {#if warningText}
        <div
          class="mt-5 flex gap-3 border-l-4 border-warning bg-warning/10 p-3 text-warning"
        >
          <TriangleAlert class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p class="text-sm">{warningText}</p>
        </div>
      {/if}

      {#if confirmLabel}
        <Field orientation="horizontal" class="mt-5">
          <Checkbox id={`${fieldId}-confirm`} bind:checked={confirmed} />
          <FieldLabel
            for={`${fieldId}-confirm`}
            class="font-normal text-muted-foreground"
          >
            {confirmLabel}
          </FieldLabel>
        </Field>
      {/if}

      {#if continueButton}
        <Button
          href={canContinue ? continueButton.href : undefined}
          size="lg"
          class="mt-6 w-full"
          disabled={!canContinue}
        >
          {continueButton.label}
        </Button>
      {/if}
</AuthShell>
