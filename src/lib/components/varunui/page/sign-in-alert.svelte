<script lang="ts" module>
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  type SignInDetailIcon = "monitor" | "mapPin" | "clock";

  interface SignInDetail {
    icon: SignInDetailIcon;
    label: string;
    value: string;
  }

  export interface SignInAlertProps {
    icon?: "shieldAlert";
    heading?: string;
    description?: string;
    details?: SignInDetail[];
    confirmButton?: {
      label: string;
      href: string;
    };
    secureButton?: {
      label: string;
      href: string;
    };
    labels?: {
      footer?: string;
    };
  }

  export const signInAlertDemo: SignInAlertProps = {
    icon: "shieldAlert",
    heading: "New sign-in detected",
    description:
      "We noticed a new sign-in to your account. If this was you, no action is needed.",
    details: [
      {
        icon: "monitor",
        label: "Device",
        value: "Chrome on macOS",
      },
      {
        icon: "mapPin",
        label: "Location",
        value: "Berlin, Germany",
      },
      {
        icon: "clock",
        label: "Time",
        value: "Today at 14:32",
      },
    ],
    confirmButton: {
      label: "Yes, this was me",
      href: "?",
    },
    secureButton: {
      label: "Secure my account",
      href: "?",
    },
    labels: {
      footer: "For your safety, this link expires in 24 hours.",
    },
  };
</script>

<script lang="ts">
  import {
    Clock,
    MapPin,
    Monitor,
    ShieldAlert,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    details = [],
    confirmButton,
    secureButton,
    labels = {},
  }: SignInAlertProps = $props();

  const footerText = $derived(labels.footer);
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding12Asset}
      alt="A person reviewing an account security alert"
      tone="red"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "shieldAlert"}
      <ShieldAlert class="mb-4 size-6 text-warning" aria-hidden="true" />
    {/if}

    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}

    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

  {#if details.length > 0}
    <ul class="space-y-4">
      {#each details as detail}
        <li class="flex gap-3">
          <span
            class="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            {#if detail.icon === "monitor"}
              <Monitor class="size-4" aria-hidden="true" />
            {:else if detail.icon === "mapPin"}
              <MapPin class="size-4" aria-hidden="true" />
            {:else if detail.icon === "clock"}
              <Clock class="size-4" aria-hidden="true" />
            {/if}
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm text-muted-foreground">{detail.label}</p>
            <p class="font-medium text-foreground">{detail.value}</p>
          </div>
        </li>
      {/each}
    </ul>
  {/if}

  <div class="mt-6 flex flex-col gap-3">
    {#if confirmButton}
      <Button href={confirmButton.href} size="lg" class="w-full">
        {confirmButton.label}
      </Button>
    {/if}

    {#if secureButton}
      <Button href={secureButton.href} variant="outline" size="lg" class="w-full">
        {secureButton.label}
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
