<script lang="ts" module>
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  export interface WaitlistProps {
    heading?: string;
    description?: string;
    labels?: {
      email?: string;
      emailPlaceholder?: string;
      submit?: string;
      socialProof?: string;
    };
    signinPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const waitlistDemo: WaitlistProps = {
    heading: "Join the waitlist",
    description: "Be first to know when we open up. No spam, ever.",
    labels: {
      email: "Email",
      emailPlaceholder: "you@example.com",
      submit: "Join the waitlist",
      socialProof: "Join 4,200+ people already on the list.",
    },
    signinPrompt: {
      text: "Already have access?",
      linkLabel: "Sign in",
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
    heading,
    description,
    labels = {},
    signinPrompt,
  }: WaitlistProps = $props();

  const fieldId = "waitlist-field";
  let email = $state("");

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepSitting8Asset}
      alt="A person waiting for an upcoming launch"
      tone="pink"
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
        {#if labels.email}
          <FieldLabel for={`${fieldId}-email`}>{labels.email}</FieldLabel>
        {/if}
        <Input
          id={`${fieldId}-email`}
          type="email"
          bind:value={email}
          placeholder={labels.emailPlaceholder}
          autocomplete="email"
        />
      </Field>

      {#if labels.submit}
        <Field>
          <Button type="submit" size="lg">
            {labels.submit}
          </Button>
        </Field>
      {/if}

      {#if labels.socialProof}
        <FieldDescription class="text-center">
          {labels.socialProof}
        </FieldDescription>
      {/if}
    </FieldGroup>
  </form>

  {#if signinPrompt}
    {#snippet footer()}
      <p class="text-center text-sm text-muted-foreground">
        {signinPrompt.text}
        <a href={signinPrompt.href} class="font-medium text-foreground hover:underline">
          {signinPrompt.linkLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
