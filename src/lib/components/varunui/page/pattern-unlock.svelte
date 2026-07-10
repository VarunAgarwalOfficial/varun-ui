<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  export interface PatternUnlockProps {
    heading?: string;
    description?: string;
    minLength?: number;
    labels?: {
      clear?: string;
    };
    unlockButton?: {
      label: string;
      href: string;
    };
    forgotPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const patternUnlockDemo: PatternUnlockProps = {
    heading: "Draw your pattern",
    description: "Connect at least 4 dots to unlock your account.",
    minLength: 4,
    labels: {
      clear: "Clear",
    },
    unlockButton: {
      label: "Unlock",
      href: "?",
    },
    forgotPrompt: {
      text: "Forgot your pattern?",
      linkLabel: "Reset it",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import PatternInput from "$lib/components/varunui/component/pattern-input.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    minLength = 4,
    labels = {},
    unlockButton,
    forgotPrompt,
  }: PatternUnlockProps = $props();

  let selected = $state<number[]>([]);
  let clearLabel = $derived(labels.clear);
  let canUnlock = $derived(selected.length >= minLength);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding12Asset}
      alt="A calm person guarding a pattern-protected account"
      tone="green"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mx-auto mt-2 max-w-xs text-base text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="text-center">
    <div class="mt-10">
      <PatternInput
        {minLength}
        clearLabel={clearLabel ?? "Clear pattern"}
        bind:value={selected}
      />
    </div>

    <div class="mt-10 flex flex-col gap-3">
      {#if unlockButton}
        <Button
          href={canUnlock ? unlockButton.href : undefined}
          size="lg"
          class="w-full"
          disabled={!canUnlock}
        >
          {unlockButton.label}
        </Button>
      {/if}

    </div>

  </div>

  {#if forgotPrompt}
    {#snippet footer()}
      <div class="grid justify-items-center gap-1 text-center text-sm text-muted-foreground">
        <p>{forgotPrompt.text}</p>
        <Link href={forgotPrompt.href} label={forgotPrompt.linkLabel} />
      </div>
    {/snippet}
  {/if}
</AuthShell>
