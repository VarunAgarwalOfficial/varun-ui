<script lang="ts" module>
  import type { Component } from "svelte";
  import { TriangleAlert } from "$lib/components/varunui/internal/icons/phosphor.js";

  type IconComponent = Component<Record<string, unknown>>;

  export interface DeleteAccountProps {
    icon?: IconComponent;
    heading?: string;
    description?: string;
    consequences?: string[];
    confirmWord?: string;
    labels?: {
      inputPlaceholder?: string;
      delete?: string;
    };
    cancelPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
    className?: string;
  }

  export const deleteAccountDemo: DeleteAccountProps = {
    icon: TriangleAlert,
    heading: "Delete your account",
    description: "This action is permanent and cannot be undone.",
    consequences: [
      "All your projects and data will be erased",
      "Your team members will lose access",
      "Active subscriptions will be cancelled",
    ],
    confirmWord: "DELETE",
    labels: {
      inputPlaceholder: "DELETE",
      delete: "Delete account",
    },
    cancelPrompt: {
      text: "Changed your mind?",
      linkLabel: "Keep my account",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Cover from "$lib/components/varunui/layout/cover.svelte";
  import {
    Field,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";

  let {
    icon,
    heading,
    description,
    consequences = [],
    confirmWord,
    labels = {},
    cancelPrompt,
    className,
  }: DeleteAccountProps = $props();

  const fieldId = "deleteAccount-field";
  let value = $state("");
  let inputPlaceholder = $derived(labels.inputPlaceholder);
  let deleteLabel = $derived(labels.delete);
  let canDelete = $derived(Boolean(confirmWord) && value === confirmWord);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<div class={className}>
  <Cover>
    <div class="w-full max-w-[var(--layout-form)]">
    <div class="mb-8 flex flex-col items-center text-center">
      {#if icon}
        {@const Icon = icon}
        <div
          class="mb-6 flex size-14 items-center justify-center rounded-full bg-danger/10 text-danger"
        >
          <Icon class="size-6" aria-hidden="true" />
        </div>
      {/if}

      {#if heading}
        <h1 class="text-2xl font-bold md:text-3xl">{heading}</h1>
      {/if}

      {#if description}
        <p class="mt-2 text-base text-muted-foreground">{description}</p>
      {/if}
    </div>

    <div class="border-y bg-surface py-6 md:py-8">
      {#if consequences.length > 0}
        <ul class="mb-6 flex flex-col gap-3 rounded-lg bg-muted/50 p-4">
          {#each consequences as consequence}
            <li class="flex gap-3 text-sm text-muted-foreground">
              <span
                class="mt-2 size-1.5 shrink-0 rounded-full bg-danger"
                aria-hidden="true"
              ></span>
              <span>{consequence}</span>
            </li>
          {/each}
        </ul>
      {/if}

      <form onsubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            {#if confirmWord}
              <FieldLabel
                for={`${fieldId}-confirm`}
                class="font-normal text-muted-foreground [&>strong]:font-semibold [&>strong]:text-foreground"
              >
                Type <strong>{confirmWord}</strong> to confirm.
              </FieldLabel>
            {/if}
            <Input
              id={`${fieldId}-confirm`}
              bind:value
              placeholder={inputPlaceholder}
              autocomplete="off"
              class="h-[var(--control-height-md)]"
            />
          </Field>

          {#if deleteLabel}
            <Field>
              <Button
                type="submit"
                variant="danger"
                size="lg"
                disabled={!canDelete}
              >
                {deleteLabel}
              </Button>
            </Field>
          {/if}
        </FieldGroup>
      </form>
    </div>

    {#if cancelPrompt}
      <p class="mt-6 text-center text-sm text-muted-foreground">
        {cancelPrompt.text}
        <a
          href={cancelPrompt.href}
          class="font-medium text-foreground hover:underline"
        >
          {cancelPrompt.linkLabel}
        </a>
      </p>
    {/if}
    </div>
  </Cover>
</div>
