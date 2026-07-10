<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  export interface SsoRedirectProps {
    heading?: string;
    description?: string;
    fallbackPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const ssoRedirectDemo: SsoRedirectProps = {
    heading: "Opening Okta…",
    description:
      "We are taking you to your identity provider to finish signing in.",
    fallbackPrompt: {
      text: "Not redirected automatically?",
      linkLabel: "Continue manually",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import { Loader2 } from "$lib/components/varunui/internal/icons/phosphor.js";
  import { cn } from "$lib/utils.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let { heading, description, fallbackPrompt }: SsoRedirectProps = $props();

  let redirecting = $state(true);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepSitting1Asset}
      alt="A seated person waiting for a secure redirect"
      tone="blue"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    {/if}
  {/snippet}

  <div class="text-center" aria-busy={redirecting}>
    <div
      class="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-primary"
    >
      <Loader2
        class={cn("size-7", redirecting && "motion-spinner")}
        aria-hidden="true"
      />
    </div>

  </div>

  {#if fallbackPrompt}
    {#snippet footer()}
      <p class="text-center text-sm text-muted-foreground">
        {fallbackPrompt.text}
        <a
          href={fallbackPrompt.href}
          class="font-medium text-foreground hover:underline"
        >
          {fallbackPrompt.linkLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
