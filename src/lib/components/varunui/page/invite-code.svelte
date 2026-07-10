<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { Component } from "svelte";
  import { Ticket } from "$lib/components/varunui/internal/icons/phosphor.js";

  type IconComponent = Component<Record<string, unknown>>;

  export interface InviteCodeProps {
    icon?: IconComponent;
    heading?: string;
    description?: string;
    labels?: {
      code?: string;
      codePlaceholder?: string;
      submit?: string;
    };
    requestPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const inviteCodeDemo: InviteCodeProps = {
    icon: Ticket,
    heading: "Enter your invite code",
    description:
      "varunUI is currently invite-only. Enter your code to get started.",
    labels: {
      code: "Invite code",
      codePlaceholder: "VARUNUI-XXXX-XXXX",
      submit: "Continue",
    },
    requestPrompt: {
      text: "Don't have a code?",
      linkLabel: "Request an invite",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    labels = {},
    requestPrompt,
  }: InviteCodeProps = $props();

  const fieldId = "inviteCode-field";
  let code = $state("");
  let codeLabel = $derived(labels.code);
  let codePlaceholder = $derived(labels.codePlaceholder);
  let submitLabel = $derived(labels.submit);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person welcoming someone with an invitation"
      tone="pink"
    />
  {/snippet}

  {#snippet header()}
    {#if icon}
      {@const Icon = icon}
      <div
        class="mb-6 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
      >
        <Icon class="size-6" aria-hidden="true" />
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
            {#if codeLabel}
              <FieldLabel for={`${fieldId}-code`}>{codeLabel}</FieldLabel>
            {/if}
            <Input
              id={`${fieldId}-code`}
              bind:value={code}
              placeholder={codePlaceholder}
              autocomplete="off"
              class="h-[var(--control-height-md)] font-mono tracking-wider uppercase"
            />
          </Field>

          {#if submitLabel}
            <Field>
              <Button type="submit" size="lg">
                {submitLabel}
              </Button>
            </Field>
          {/if}
        </FieldGroup>
      </form>

  {#if requestPrompt}
    {#snippet footer()}
      <FieldDescription class="text-center">
        {requestPrompt.text}
        <a href={requestPrompt.href} class="font-medium text-foreground">
          {requestPrompt.linkLabel}
        </a>
      </FieldDescription>
    {/snippet}
  {/if}
</AuthShell>
