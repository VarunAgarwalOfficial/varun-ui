<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  export interface UsernameSetupProps {
    icon?: "atSign";
    heading?: string;
    description?: string;
    takenUsernames?: string[];
    suggestions?: string[];
    labels?: {
      field?: string;
      urlPrefix?: string;
      usernamePlaceholder?: string;
      available?: string;
      taken?: string;
      suggestionsLabel?: string;
      submit?: string;
    };
    skipPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const usernameSetupDemo: UsernameSetupProps = {
    icon: "atSign",
    heading: "Claim your username",
    description: "This is how others will find you on varunUI.",
    takenUsernames: ["jane", "admin", "varunui", "team"],
    suggestions: ["jane_co", "janecooper", "jane.builds"],
    labels: {
      field: "Username",
      urlPrefix: "varunui.com/",
      usernamePlaceholder: "yourname",
      available: "{username} is available",
      taken: "{username} is already taken",
      suggestionsLabel: "Try one of these:",
      submit: "Claim username",
    },
    skipPrompt: {
      text: "Not sure yet?",
      linkLabel: "Skip for now",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { AtSign, Check, X } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import { cn } from "$lib/utils.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    takenUsernames = [],
    suggestions = [],
    labels = {},
    skipPrompt,
  }: UsernameSetupProps = $props();

  let username = $state("");
  const fieldId = "usernameSetup-field";

  const fieldLabel = $derived(labels.field);
  const urlPrefix = $derived(labels.urlPrefix);
  const usernamePlaceholder = $derived(labels.usernamePlaceholder);
  const availableLabel = $derived(labels.available);
  const takenLabel = $derived(labels.taken);
  const suggestionsLabel = $derived(labels.suggestionsLabel);
  const submitLabel = $derived(labels.submit);
  const normalized = $derived(username.trim().toLowerCase());
  const hasInput = $derived(normalized.length > 0);
  const isTaken = $derived(hasInput && takenUsernames.includes(normalized));
  const isAvailable = $derived(hasInput && !isTaken);
  const statusText = $derived(
    (isTaken ? takenLabel : availableLabel)?.replace(
      "{username}",
      username.trim(),
    ),
  );

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person helping choose a memorable username"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "atSign"}
      <div
        class="mb-6 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <AtSign class="size-6" aria-hidden="true" />
      </div>
    {/if}

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
            {#if fieldLabel}
              <FieldLabel for={`${fieldId}-username`}>
                {fieldLabel}
              </FieldLabel>
            {/if}
            <div
              class="border-border focus-within:border-primary focus-within:ring-primary/50 flex h-11 w-full items-center overflow-hidden rounded-lg border bg-transparent text-base motion-colors focus-within:ring-3 md:text-sm"
            >
              {#if urlPrefix}
                <span
                  class="flex h-full shrink-0 items-center bg-muted/50 px-3 text-sm text-muted-foreground"
                >
                  {urlPrefix}
                </span>
              {/if}
              <Input
                id={`${fieldId}-username`}
                bind:value={username}
                placeholder={usernamePlaceholder}
                class="h-full rounded-none border-0 px-3 focus-visible:ring-0"
              />
              {#if hasInput}
                <span class="flex h-full shrink-0 items-center px-3">
                  {#if isTaken}
                    <X class="size-4 text-danger" aria-hidden="true" />
                  {:else}
                    <Check
                      class="size-4 text-success"
                      aria-hidden="true"
                    />
                  {/if}
                </span>
              {/if}
            </div>
            {#if hasInput && statusText}
              <FieldDescription
                class={cn(
                  isTaken
                    ? "text-danger"
                    : "text-success",
                )}
              >
                {statusText}
              </FieldDescription>
            {/if}
          </Field>

          {#if isTaken && suggestions.length > 0}
            <div>
              {#if suggestionsLabel}
                <p class="mb-2 text-sm font-medium text-muted-foreground">
                  {suggestionsLabel}
                </p>
              {/if}
              <div class="flex flex-wrap gap-2">
                {#each suggestions as suggestion}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onclick={() => (username = suggestion)}
                  >
                    {suggestion}
                  </Button>
                {/each}
              </div>
            </div>
          {/if}

          {#if submitLabel}
            <Field>
              <Button type="submit" size="lg" disabled={!isAvailable}>
                {submitLabel}
              </Button>
            </Field>
          {/if}
        </FieldGroup>
      </form>

  {#if skipPrompt}
    {#snippet footer()}
      <FieldDescription class="text-center">
        {skipPrompt.text}
        <a href={skipPrompt.href} class="font-medium text-foreground">
          {skipPrompt.linkLabel}
        </a>
      </FieldDescription>
    {/snippet}
  {/if}
</AuthShell>
