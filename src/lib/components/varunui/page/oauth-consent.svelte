<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  interface Scope {
    title: string;
    description?: string;
  }

  export interface OauthConsentProps {
    icon?: "puzzle";
    heading?: string;
    description?: string;
    scopes?: Scope[];
    authorizeButton?: {
      label: string;
      href: string;
    };
    cancelButton?: {
      label: string;
      href: string;
    };
    labels?: {
      scopesHeading?: string;
      footer?: string;
    };
  }

  export const oauthConsentDemo: OauthConsentProps = {
    icon: "puzzle",
    heading: "Authorize this integration",
    description:
      "This integration wants to access your varunUI account.",
    scopes: [
      {
        title: "Read your profile",
        description: "Name, email, and profile picture.",
      },
      {
        title: "Access your projects",
        description: "View and update issues in your workspace.",
      },
      {
        title: "Send notifications",
        description: "Notify you about activity on your behalf.",
      },
    ],
    authorizeButton: {
      label: "Authorize",
      href: "?",
    },
    cancelButton: {
      label: "Cancel",
      href: "?",
    },
    labels: {
      scopesHeading: "This will allow the integration to:",
      footer: "You can revoke access at any time from your account settings.",
    },
  };
</script>

<script lang="ts">
  import { Check, Puzzle } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    scopes = [],
    authorizeButton,
    cancelButton,
    labels = {},
  }: OauthConsentProps = $props();

  const scopesHeading = $derived(labels.scopesHeading);
  const footerText = $derived(labels.footer);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding5Asset}
      alt="A person reviewing an app connection"
      tone="purple"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "puzzle"}
      <Puzzle class="mb-4 size-6 text-primary" aria-hidden="true" />
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  {#if scopesHeading}
    <p class="mb-4 text-sm font-medium text-foreground">
      {scopesHeading}
    </p>
  {/if}

  {#if scopes.length > 0}
    <ul class="space-y-4">
      {#each scopes as scope}
        <li class="flex gap-3">
          <span
            class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <Check class="size-3.5" aria-hidden="true" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-foreground">{scope.title}</p>
            {#if scope.description}
              <p class="mt-1 text-sm text-muted-foreground">
                {scope.description}
              </p>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}

  <div class="mt-6 flex flex-col gap-3">
    {#if authorizeButton}
      <Button href={authorizeButton.href} size="lg" class="w-full">
        {authorizeButton.label}
      </Button>
    {/if}

    {#if cancelButton}
      <Button href={cancelButton.href} variant="quiet" size="lg" class="w-full">
        {cancelButton.label}
      </Button>
    {/if}
  </div>

  {#snippet footer()}
    {#if footerText}
      <p class="text-center text-sm text-muted-foreground">
        {footerText}
      </p>
    {/if}
  {/snippet}
</AuthShell>
