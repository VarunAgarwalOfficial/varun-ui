<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface InvitationProps {
    invite?: {
      teamName: string;
      inviterName: string;
      email: string;
    };
    heading?: string;
    description?: string;
    labels?: {
      emailField?: string;
      name?: string;
      namePlaceholder?: string;
      password?: string;
      passwordPlaceholder?: string;
      submit?: string;
      passwordToggle?: string;
    };
    declinePrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const invitationDemo: InvitationProps = {
    invite: {
      teamName: "varunUI",
      inviterName: "Maria Santos",
      email: "newhire@varunui.example",
    },
    heading: "Join the team",
    description:
      "Maria invited you to collaborate in varunUI. Set up your account to accept.",
    labels: {
      emailField: "Email",
      name: "Full name",
      namePlaceholder: "Jane Cooper",
      password: "Password",
      passwordPlaceholder: "Create a password",
      submit: "Accept invitation",
      passwordToggle: "Toggle password visibility",
    },
    declinePrompt: {
      text: "Not interested?",
      linkLabel: "Decline invitation",
      href: "/invitations/decline",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import RotatingTextSeal from "$lib/components/varunui/component/rotating-text-seal.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    invite,
    heading,
    description,
    labels = {},
    declinePrompt,
  }: InvitationProps = $props();

  const fieldId = "invitation-field";

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A person welcoming a new teammate"
      tone="purple"
    >
      {#snippet overlay()}
        <RotatingTextSeal text="WELCOME ABOARD • LET'S MAKE THINGS • " size="sm" />
      {/snippet}
    </StoryScene>
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
      {#if invite?.email && labels.emailField}
        <Field>
          <FieldLabel for={`${fieldId}-email`}>
            {labels.emailField}
          </FieldLabel>
          <Input
            id={`${fieldId}-email`}
            type="email"
            value={invite.email}
            disabled
          />
        </Field>
      {/if}

      <Field>
        {#if labels.name}
          <FieldLabel for={`${fieldId}-name`}>{labels.name}</FieldLabel>
        {/if}
        <Input
          id={`${fieldId}-name`}
          type="text"
          placeholder={labels.namePlaceholder}
          autocomplete="name"
        />
      </Field>

      <PasswordField
        id={`${fieldId}-password`}
        label={labels.password}
        placeholder={labels.passwordPlaceholder}
        autocomplete="new-password"
        toggleLabel={labels.passwordToggle}
      />

      {#if labels.submit}
        <Field>
          <Button type="submit" size="lg">
            {labels.submit}
          </Button>
        </Field>
      {/if}
    </FieldGroup>
  </form>

  {#if declinePrompt}
    {#snippet footer()}
      <p class="text-center text-sm text-muted-foreground">
        {declinePrompt.text}
        <a href={declinePrompt.href} class="font-medium text-foreground hover:underline">
          {declinePrompt.linkLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
