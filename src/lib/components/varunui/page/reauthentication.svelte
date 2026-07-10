<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  export interface ReauthenticationProps {
    user?: {
      name: string;
      email: string;
      avatar?: {
        src: string;
        alt: string;
      };
    };
    heading?: string;
    forgotPasswordLink?: {
      label: string;
      href: string;
    };
    switchAccountPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
    labels?: {
      password?: string;
      passwordPlaceholder?: string;
      submit?: string;
      passwordToggle?: string;
    };
  }

  export const reauthenticationDemo: ReauthenticationProps = {
    user: {
      name: "Jane Cooper",
      email: "jane@example.com",
      avatar: {
        src: peepStanding10Asset,
        alt: "Jane Cooper",
      },
    },
    heading: "Welcome back",
    forgotPasswordLink: {
      label: "Forgot password?",
      href: "?",
    },
    switchAccountPrompt: {
      text: "Not you?",
      linkLabel: "Use a different account",
      href: "?",
    },
    labels: {
      password: "Password",
      passwordPlaceholder: "Enter your password",
      submit: "Continue",
      passwordToggle: "Toggle password visibility",
    },
  };
</script>

<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/varunui/internal/ui/avatar/index.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    user,
    heading,
    forgotPasswordLink,
    switchAccountPrompt,
    labels = {},
  }: ReauthenticationProps = $props();

  const fieldId = "reauthentication-field";

  const passwordLabel = $derived(labels.password);
  const passwordPlaceholder = $derived(labels.passwordPlaceholder);
  const submitLabel = $derived(labels.submit);
  const passwordToggleLabel = $derived(labels.passwordToggle);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
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
      src={peepStanding12Asset}
      alt="A person confirming a secure return"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if user?.avatar}
      <Avatar class="mb-6 size-16">
        <AvatarImage
          src={user.avatar.src}
          alt={user.avatar.alt}
          class="object-cover"
        />
        <AvatarFallback>{initials(user.name)}</AvatarFallback>
      </Avatar>
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if user}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">
        {user.name} &middot; {user.email}
      </p>
    {/if}
  {/snippet}

  <form onsubmit={handleSubmit}>
    <FieldGroup>
      <PasswordField
        id={`${fieldId}-password`}
        label={passwordLabel}
        placeholder={passwordPlaceholder}
        toggleLabel={passwordToggleLabel}
        labelEnd={forgotPasswordLink ? PasswordRecovery : undefined}
      />

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
    {#if switchAccountPrompt}
      <FieldDescription class="text-center">
        {switchAccountPrompt.text}
        <a href={switchAccountPrompt.href} class="font-medium text-foreground">
          {switchAccountPrompt.linkLabel}
        </a>
      </FieldDescription>
    {/if}
  {/snippet}
</AuthShell>
