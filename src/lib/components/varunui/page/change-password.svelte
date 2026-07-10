<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  export interface ChangePasswordProps {
    heading?: string;
    description?: string;
    labels?: {
      currentPassword?: string;
      currentPasswordPlaceholder?: string;
      newPassword?: string;
      newPasswordPlaceholder?: string;
      confirmPassword?: string;
      confirmPasswordPlaceholder?: string;
      submit?: string;
      passwordToggle?: string;
    };
    forgotPasswordLink?: {
      label: string;
      href: string;
    };
    cancelPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const changePasswordDemo: ChangePasswordProps = {
    heading: "Change password",
    description: "Update the password you use to sign in.",
    labels: {
      currentPassword: "Current password",
      currentPasswordPlaceholder: "Enter current password",
      newPassword: "New password",
      newPasswordPlaceholder: "Enter a new password",
      confirmPassword: "Confirm new password",
      confirmPasswordPlaceholder: "Re-enter new password",
      submit: "Update password",
      passwordToggle: "Toggle password visibility",
    },
    forgotPasswordLink: {
      label: "Forgot password?",
      href: "?",
    },
    cancelPrompt: {
      text: "Changed your mind?",
      linkLabel: "Cancel",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import { Field, FieldGroup } from "$lib/components/varunui/internal/ui/field/index.js";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    labels = {},
    forgotPasswordLink,
    cancelPrompt,
  }: ChangePasswordProps = $props();

  const fieldId = "changePassword-field";

  let currentPasswordLabel = $derived(labels.currentPassword);
  let currentPasswordPlaceholder = $derived(labels.currentPasswordPlaceholder);
  let newPasswordLabel = $derived(labels.newPassword);
  let newPasswordPlaceholder = $derived(labels.newPasswordPlaceholder);
  let confirmPasswordLabel = $derived(labels.confirmPassword);
  let confirmPasswordPlaceholder = $derived(labels.confirmPasswordPlaceholder);
  let submitLabel = $derived(labels.submit);
  let passwordToggleLabel = $derived(labels.passwordToggle);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

{#snippet PasswordRecovery()}
  {#if forgotPasswordLink}
    <Link href={forgotPasswordLink.href} label={forgotPasswordLink.label} />
  {/if}
{/snippet}

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding5Asset}
      alt="A person updating account security"
      tone="green"
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
      {#if currentPasswordLabel}
        <PasswordField
          id={`${fieldId}-current`}
          name="current-password"
          label={currentPasswordLabel}
          placeholder={currentPasswordPlaceholder}
          toggleLabel={passwordToggleLabel}
          labelEnd={forgotPasswordLink ? PasswordRecovery : undefined}
        />
      {/if}

      {#if newPasswordLabel}
        <PasswordField
          id={`${fieldId}-new`}
          name="new-password"
          label={newPasswordLabel}
          placeholder={newPasswordPlaceholder}
          autocomplete="new-password"
          toggleLabel={passwordToggleLabel}
        />
      {/if}

      {#if confirmPasswordLabel}
        <PasswordField
          id={`${fieldId}-confirm`}
          name="confirm-password"
          label={confirmPasswordLabel}
          placeholder={confirmPasswordPlaceholder}
          autocomplete="new-password"
          toggleLabel={passwordToggleLabel}
        />
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

  {#snippet footer()}
    {#if cancelPrompt}
      <p class="text-center text-sm text-muted-foreground">
        {cancelPrompt.text}
        <a
          href={cancelPrompt.href}
          class="font-medium text-foreground hover:underline"
        >
          {cancelPrompt.linkLabel}
        </a>
      </p>
    {/if}
  {/snippet}
</AuthShell>
