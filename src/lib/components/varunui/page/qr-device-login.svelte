<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  export interface QrDeviceLoginProps {
    heading?: string;
    description?: string;
    qrValue?: string;
    manualCode?: string;
    labels?: {
      manualCodeLabel?: string;
      waiting?: string;
    };
    alternativeLink?: {
      label: string;
      href: string;
    };
  }

  export const qrDeviceLoginDemo: QrDeviceLoginProps = {
    heading: "Sign in with your phone",
    description: "Scan this code with the varunUI app to sign in instantly.",
    qrValue: "varunui://sign-in?code=WXYZ-4827",
    manualCode: "WXYZ-4827",
    labels: {
      manualCodeLabel: "Or enter this code in the app",
      waiting: "Waiting for confirmation…",
    },
    alternativeLink: {
      label: "Sign in another way",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import QrCode from "$lib/components/varunui/component/qr-code.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    qrValue,
    manualCode,
    labels = {},
    alternativeLink,
  }: QrDeviceLoginProps = $props();

  const manualCodeLabel = $derived(labels.manualCodeLabel);
  const waitingText = $derived(labels.waiting);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepSitting1Asset}
      alt="A seated person waiting for a phone sign-in confirmation"
      tone="blue"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}
    {#if description}
      <p class="mx-auto mt-3 max-w-xs text-base text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="text-center">
    {#if qrValue}
      <QrCode
        value={qrValue}
        label="Scan to sign in with the varunUI app"
        size="lg"
        errorCorrection="high"
      />
    {/if}

    {#if manualCode}
      <div class="mt-6">
        {#if manualCodeLabel}
          <p class="text-sm text-muted-foreground">{manualCodeLabel}</p>
        {/if}
        <p class="mt-2 font-mono text-2xl font-semibold tracking-normal">
          {manualCode}
        </p>
      </div>
    {/if}

    {#if waitingText}
      <div
        class="mt-8 inline-flex items-center gap-3 border-y bg-muted px-3 py-2 text-sm text-muted-foreground"
      >
        <span class="relative flex size-3" aria-hidden="true">
          <span
            class="absolute inline-flex size-full motion-ping rounded-full bg-primary/70"
          ></span>
          <span class="relative inline-flex size-3 rounded-full bg-primary"
          ></span>
        </span>
        {waitingText}
      </div>
    {/if}

  </div>

  {#if alternativeLink}
    {#snippet footer()}
      <div class="text-center">
        <Link href={alternativeLink.href} label={alternativeLink.label} />
      </div>
    {/snippet}
  {/if}
</AuthShell>
