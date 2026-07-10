<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface RecoveryPhraseProps {
    heading?: string;
    description?: string;
    wordCount?: number;
    labels?: {
      helper?: string;
      submit?: string;
    };
    backLink?: {
      label: string;
      href: string;
    };
  }

  export const recoveryPhraseDemo: RecoveryPhraseProps = {
    heading: "Enter your recovery phrase",
    description:
      "Type or paste your 12-word recovery phrase to restore access to your account.",
    wordCount: 12,
    labels: {
      helper: "Tip: paste the full phrase into the first box to fill them all.",
      submit: "Restore account",
    },
    backLink: {
      label: "Back to sign in",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { ArrowLeft } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    wordCount = 12,
    labels = {},
    backLink,
  }: RecoveryPhraseProps = $props();

  let words = $state<string[]>([]);

  const helperText = $derived(labels.helper);
  const submitLabel = $derived(labels.submit);
  const phraseWords = $derived(makeWords(wordCount, words));
  const allFilled = $derived(
    phraseWords.every((word) => word.trim().length > 0),
  );

  function makeWords(count: number, existing: string[] = []) {
    return Array.from(
      { length: Math.max(0, count) },
      (_, index) => existing[index] ?? "",
    );
  }

  function updateWord(index: number, value: string) {
    words = phraseWords.map((word, wordIndex) =>
      wordIndex === index ? value : word,
    );
  }

  function handlePaste(event: ClipboardEvent) {
    const parts =
      event.clipboardData?.getData("text").trim().split(/\s+/) ?? [];

    if (parts.length > 1) {
      event.preventDefault();
      words = makeWords(wordCount, parts);
    }
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A calm person helping restore access securely"
      tone="yellow"
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
        <FieldGroup>
          <Field>
            <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {#each phraseWords as word, index}
                <div
                  class="flex h-11 overflow-hidden rounded-lg border bg-background motion-colors focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50"
                >
                  <span
                    class="flex w-11 shrink-0 items-center justify-center bg-muted text-sm tabular-nums text-muted-foreground"
                  >
                    {index + 1}
                  </span>
                  <Input
                    aria-label={`Word ${index + 1}`}
                    value={word}
                    oninput={(event) =>
                      updateWord(index, event.currentTarget.value)}
                    onpaste={handlePaste}
                    autocomplete="off"
                    autocapitalize="none"
                    spellcheck={false}
                    class="h-full rounded-none border-0 bg-transparent px-3 focus-visible:ring-0"
                  />
                </div>
              {/each}
            </div>

            {#if helperText}
              <FieldDescription>{helperText}</FieldDescription>
            {/if}
          </Field>

          {#if submitLabel}
            <Field>
              <Button
                type="submit"
                size="lg"
                class="h-[var(--control-height-sm)]"
                disabled={!allFilled}
              >
                {submitLabel}
              </Button>
            </Field>
          {/if}
        </FieldGroup>
      </form>

  {#if backLink}
    {#snippet footer()}
      <div class="text-center">
        <a
          href={backLink.href}
          class="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
        >
          <ArrowLeft class="size-4" aria-hidden="true" />
          {backLink.label}
        </a>
      </div>
    {/snippet}
  {/if}
</AuthShell>
