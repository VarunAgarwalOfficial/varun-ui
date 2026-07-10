<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  interface CountryCode {
    value: string;
    label: string;
  }

  export interface PhoneSignInProps {
    icon?: "smartphone";
    heading?: string;
    description?: string;
    countryCodes?: CountryCode[];
    defaultCountryCode?: string;
    labels?: {
      phone?: string;
      phonePlaceholder?: string;
      submit?: string;
      helper?: string;
    };
    alternativePrompt?: {
      text: string;
      linkLabel: string;
      href: string;
    };
  }

  export const phoneSignInDemo: PhoneSignInProps = {
    icon: "smartphone",
    heading: "Sign in with your phone",
    description: "We'll text you a one-time code to verify your number.",
    countryCodes: [
      { value: "+1", label: "🇺🇸 +1" },
      { value: "+44", label: "🇬🇧 +44" },
      { value: "+49", label: "🇩🇪 +49" },
      { value: "+90", label: "🇹🇷 +90" },
    ],
    defaultCountryCode: "+1",
    labels: {
      phone: "Phone number",
      phonePlaceholder: "(555) 000-0000",
      submit: "Send code",
      helper: "Standard message and data rates may apply.",
    },
    alternativePrompt: {
      text: "Prefer email?",
      linkLabel: "Sign in with email",
      href: "/login",
    },
  };
</script>

<script lang="ts">
  import { Smartphone } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";
  import SelectMenu from "$lib/components/varunui/component/select-menu.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    icon,
    heading,
    description,
    countryCodes = [],
    defaultCountryCode,
    labels = {},
    alternativePrompt,
  }: PhoneSignInProps = $props();

  const fieldId = "phoneSignIn-field";
  let countryCode = $state("");

  const phoneLabel = $derived(labels.phone);
  const phonePlaceholder = $derived(labels.phonePlaceholder);
  const submitLabel = $derived(labels.submit);
  const helperText = $derived(labels.helper);

  $effect(() => {
    const selectedCountry = countryCodes.find(
      (country) => country.value === countryCode,
    );

    if (!selectedCountry) {
      countryCode = defaultCountryCode ?? countryCodes[0]?.value ?? "";
    }
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person receiving a sign-in code"
      tone="pink"
    />
  {/snippet}

  {#snippet header()}
    {#if icon === "smartphone"}
      <Smartphone class="mb-4 size-6 text-primary" />
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
        {#if phoneLabel}
          <FieldLabel for={`${fieldId}-phone`}>{phoneLabel}</FieldLabel>
        {/if}
        <div class="flex gap-2">
          <SelectMenu
            bind:value={countryCode}
            label="Country code"
            options={countryCodes}
            width="fit"
          />
          <Input
            id={`${fieldId}-phone`}
            type="tel"
            inputmode="tel"
            placeholder={phonePlaceholder}
            class="h-[var(--control-height-md)] flex-1"
          />
        </div>
        {#if helperText}
          <FieldDescription>{helperText}</FieldDescription>
        {/if}
      </Field>

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
    {#if alternativePrompt}
      <FieldDescription class="text-center">
        {alternativePrompt.text}
        <a href={alternativePrompt.href} class="font-medium text-foreground">
          {alternativePrompt.linkLabel}
        </a>
      </FieldDescription>
    {/if}
  {/snippet}
</AuthShell>
