<script lang="ts" module>
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  export interface SignedOutProps {
    icon?: "logOut";
    heading?: string;
    description?: string;
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryLink?: {
      label: string;
      href: string;
    };
  }

  export const signedOutDemo: SignedOutProps = {
    icon: "logOut",
    heading: "You've been signed out",
    description:
      "Your session has ended. Sign back in whenever you're ready to pick up where you left off.",
    primaryButton: {
      label: "Sign back in",
      href: "?",
    },
    secondaryLink: {
      label: "Return to homepage",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { LogOut } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    primaryButton,
    secondaryLink,
  }: SignedOutProps = $props();
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding18Asset}
      alt="A person finishing a secure session"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "logOut"}
      <LogOut class="mb-4 size-6 text-primary" aria-hidden="true" />
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="flex flex-col gap-3">
    {#if primaryButton}
      <Button href={primaryButton.href} size="lg" class="w-full">
        {primaryButton.label}
      </Button>
    {/if}

    {#if secondaryLink}
      <Button href={secondaryLink.href} variant="quiet" size="lg" class="w-full">
        {secondaryLink.label}
      </Button>
    {/if}
  </div>
</AuthShell>
