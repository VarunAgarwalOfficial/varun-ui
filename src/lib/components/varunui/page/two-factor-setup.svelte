<script lang="ts" module>
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  import type { Component } from "svelte";
  import {
    KeyRound,
    MessageSquare,
    ShieldCheck,
    Smartphone,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  type IconComponent = Component<Record<string, unknown>>;

  interface TwoFactorMethod {
    value: string;
    title: string;
    description: string;
    icon: IconComponent;
  }

  export interface TwoFactorSetupProps {
    icon?: IconComponent;
    heading?: string;
    description?: string;
    methods?: TwoFactorMethod[];
    labels?: {
      submit?: string;
    };
    skipPrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const twoFactorSetupDemo: TwoFactorSetupProps = {
    icon: ShieldCheck,
    heading: "Add two-factor authentication",
    description: "Choose a second step to keep your account secure.",
    methods: [
      {
        value: "app",
        title: "Authenticator app",
        description: "Use a TOTP app like 1Password or Authy.",
        icon: Smartphone,
      },
      {
        value: "sms",
        title: "Text message",
        description: "Get a code by SMS to your phone.",
        icon: MessageSquare,
      },
      {
        value: "key",
        title: "Security key",
        description: "Use a hardware key or passkey.",
        icon: KeyRound,
      },
    ],
    labels: {
      submit: "Continue",
    },
    skipPrompt: {
      text: "Prefer to do this later?",
      linkLabel: "Skip for now",
      href: "?",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import { Field, FieldGroup } from "$lib/components/varunui/internal/ui/field/index.js";
  import {
    RadioGroup,
    RadioGroupItem,
  } from "$lib/components/varunui/internal/ui/radio-group/index.js";
  import { cn } from "$lib/utils.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    methods = [],
    labels = {},
    skipPrompt,
  }: TwoFactorSetupProps = $props();

  const fieldId = "twoFactorSetup-method";
  let selected = $state("");
  let submitLabel = $derived(labels.submit);

  $effect(() => {
    if (
      methods.length > 0 &&
      !methods.some((method) => method.value === selected)
    ) {
      selected = methods[0].value;
    }
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding10Asset}
      alt="A calm person helping secure an account"
      tone="green"
    />
  {/snippet}

  {#snippet header()}
    {#if icon}
      {@const Icon = icon}
      <div
        class="mb-6 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
      >
        <Icon class="size-6" aria-hidden="true" />
      </div>
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
          <Field>
            <RadioGroup bind:value={selected} class="gap-3">
              {#each methods as method}
                {@const MethodIcon = method.icon}
                {@const methodId = `${fieldId}-${method.value}`}
                {@const isActive = selected === method.value}
                <label
                  for={methodId}
                  class={cn(
                    "flex cursor-pointer items-center gap-4 rounded-none border p-4 motion-colors hover:bg-muted",
                    isActive
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background",
                  )}
                >
                  <span
                    class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
                  >
                    <MethodIcon class="size-5" aria-hidden="true" />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block font-medium">{method.title}</span>
                    <span class="mt-1 block text-sm text-muted-foreground">
                      {method.description}
                    </span>
                  </span>
                  <RadioGroupItem
                    id={methodId}
                    value={method.value}
                    class="ml-auto"
                  />
                </label>
              {/each}
            </RadioGroup>
          </Field>

          {#if submitLabel}
            <Field>
              <Button type="submit" size="lg" class="h-[var(--control-height-sm)]">
                {submitLabel}
              </Button>
            </Field>
          {/if}
        </FieldGroup>
      </form>

  {#if skipPrompt}
    {#snippet footer()}
      <p class="text-center text-sm text-muted-foreground">
        {skipPrompt.text}
        <a
          href={skipPrompt.href}
          class="font-medium text-foreground hover:underline"
        >
          {skipPrompt.linkLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
