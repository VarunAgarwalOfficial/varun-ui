<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  import type { Component } from "svelte";
  import { Lock } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface PasswordRequirement {
    label: string;
    regex: string;
  }

  export interface ResetPasswordProps {
    icon?: Component;
    heading?: string;
    description?: string;
    requirements?: PasswordRequirement[];
    labels?: {
      newPassword?: string;
      newPasswordPlaceholder?: string;
      confirmPassword?: string;
      confirmPasswordPlaceholder?: string;
      submit?: string;
      passwordToggle?: string;
    };
  }

  export const resetPasswordDemo: ResetPasswordProps = {
    icon: Lock,
    heading: "Set a new password",
    description:
      "Your new password must be different from previously used passwords.",
    requirements: [
      { label: "At least 8 characters", regex: ".{8,}" },
      { label: "One uppercase letter", regex: "[A-Z]" },
      { label: "One number", regex: "[0-9]" },
      { label: "One special character", regex: "[^A-Za-z0-9]" },
    ],
    labels: {
      newPassword: "New password",
      newPasswordPlaceholder: "Enter a new password",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder: "Re-enter your password",
      submit: "Reset password",
      passwordToggle: "Toggle password visibility",
    },
  };
</script>

<script lang="ts">
  import { Check } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import { Field, FieldGroup } from "$lib/components/varunui/internal/ui/field/index.js";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    requirements = [],
    labels = {},
  }: ResetPasswordProps = $props();

  const fieldId = "resetPassword-field";
  let password = $state("");
  let confirmPassword = $state("");

  const newPasswordLabel = $derived(labels.newPassword);
  const newPasswordPlaceholder = $derived(labels.newPasswordPlaceholder);
  const confirmPasswordLabel = $derived(labels.confirmPassword);
  const confirmPasswordPlaceholder = $derived(
    labels.confirmPasswordPlaceholder,
  );
  const submitLabel = $derived(labels.submit);
  const passwordToggleLabel = $derived(labels.passwordToggle);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  function requirementMet(regex: string) {
    return password.length > 0 && new RegExp(regex).test(password);
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A person securing an account"
      tone="green"
    />
  {/snippet}

  {#snippet header()}
    {#if icon}
      {@const Icon = icon}
      <Icon class="mb-4 size-6 text-primary" aria-hidden="true" />
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
      <PasswordField
        id={`${fieldId}-new`}
        name="new-password"
        label={newPasswordLabel}
        placeholder={newPasswordPlaceholder}
        autocomplete="new-password"
        bind:value={password}
        toggleLabel={passwordToggleLabel}
      />

      <PasswordField
        id={`${fieldId}-confirm`}
        name="confirm-password"
        label={confirmPasswordLabel}
        placeholder={confirmPasswordPlaceholder}
        autocomplete="new-password"
        bind:value={confirmPassword}
        toggleLabel={passwordToggleLabel}
      />

      {#if requirements.length > 0}
        <ul class="flex flex-col gap-2.5">
          {#each requirements as requirement}
            {@const met = requirementMet(requirement.regex)}
            <li class="flex items-center gap-2.5 text-sm">
              <span
                class={[
                  "flex size-5 shrink-0 items-center justify-center rounded-full motion-colors",
                  met
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                <Check class="size-3.5" />
              </span>
              <span class={met ? "text-foreground" : "text-muted-foreground"}>
                {requirement.label}
              </span>
            </li>
          {/each}
        </ul>
      {/if}

      {#if submitLabel}
        <Field>
          <Button type="submit" size="lg">
            {submitLabel}
          </Button>
        </Field>
      {/if}
    </FieldGroup>
  </form>
</AuthShell>
