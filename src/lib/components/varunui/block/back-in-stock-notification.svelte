<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import {
    BellIcon,
    Check,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface Product {
    title: string;
    image: { src: string; alt: string };
    price: number;
    sku?: string;
    estimatedRestock?: string;
  }

  export interface BackInStockNotificationProps {
    kicker?: string;
    heading?: string;
    description?: string;
    product?: Product;
    notificationOptions?: {
      email?: boolean;
      sms?: boolean;
    };
    labels?: {
      outOfStock?: string;
      emailPlaceholder?: string;
      phonePlaceholder?: string;
      notifyByEmail?: string;
      notifyBySms?: string;
      submit?: string;
      successHeading?: string;
      successDescription?: string;
      estimatedRestock?: string;
      price?: string;
      sku?: string;
    };
    onSubmit?: (data: {
      email?: string;
      phone?: string;
      methods: string[];
    }) => void;
    className?: string;
  }

  export const backInStockNotificationDemo: BackInStockNotificationProps = {
    kicker: "Back in stock",
    heading: "Get a note when the print returns.",
    description: "Choose email, SMS, or both. We will send one useful message when this exact size is available again.",
    product: {
      title: "Bike Journey A2 print",
      image: {
        src: peepSitting13Asset,
        alt: "A character riding a bicycle",
      },
      price: 42,
      sku: "VUI-PRINT-BIKE-A2",
      estimatedRestock: "25 July 2026",
    },
    notificationOptions: {
      email: true,
      sms: true,
    },
    labels: {
      outOfStock: "Out of stock",
      emailPlaceholder: "Enter your email",
      phonePlaceholder: "Enter your phone number",
      notifyByEmail: "Email",
      notifyBySms: "SMS",
      submit: "Send me one update",
      successHeading: "Update requested",
      successDescription:
        "We will contact you once when this print size is available.",
      estimatedRestock: "Expected",
      price: "Price",
      sku: "SKU",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import LabelValue from "$lib/components/varunui/piece/label-value.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    kicker,
    heading,
    description,
    product,
    notificationOptions = { email: true, sms: false },
    labels = {},
    onSubmit,
    className,
  }: BackInStockNotificationProps = $props();

  let email = $state("");
  let phone = $state("");
  let notifyEmail = $state(true);
  let notifySms = $state(false);
  let isSubmitted = $state(false);

  const canSubmit = $derived((notifyEmail && email) || (notifySms && phone));

  function handleSubmit() {
    const methods: string[] = [];
    if (notifyEmail && email) methods.push("email");
    if (notifySms && phone) methods.push("sms");

    if (methods.length === 0) return;

    onSubmit?.({
      email: notifyEmail ? email : undefined,
      phone: notifySms ? phone : undefined,
      methods,
    });
    isSubmitted = true;
  }
</script>

<Section container="lg" className={className}>
    {#if product}
      <Split mediaSide="left" align="center" gap="lg">
        {#snippet media()}
          <StoryScene src={product.image.src} alt={product.image.alt} tone="purple" frame="landscape" />
        {/snippet}

        <Stack gap="lg" align="start">
          <SectionHeader
            {kicker}
            title={heading}
            {description}
            align="left"
            markerTone="purple"
          />

          <div class="w-full border-y border-border py-[var(--surface-padding-md)]">
            <h3 class="text-xl font-semibold">{product.title}</h3>
            <div class="mt-[var(--layout-gap-md)]">
              <Grid columns={3} gap="sm">
                <LabelValue label={labels.price ?? "Price"} value={`$${product.price}`} />
                {#if product.estimatedRestock}
                  <LabelValue label={labels.estimatedRestock ?? "Expected"} value={product.estimatedRestock} />
                {/if}
                {#if product.sku}
                  <LabelValue label={labels.sku ?? "SKU"} value={product.sku} />
                {/if}
              </Grid>
            </div>
          </div>

          {#if !isSubmitted}
            <Stack gap="md">
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-muted-foreground">
                  Notify by
                </legend>
                <div class="grid gap-3 sm:grid-cols-2">
                  {#if notificationOptions.email}
                    <CheckboxField
                      id="back-in-stock-email"
                      label={labels.notifyByEmail ?? "Email"}
                      checked={notifyEmail}
                      onCheckedChange={(checked) => (notifyEmail = checked)}
                    />
                  {/if}
                  {#if notificationOptions.sms}
                    <CheckboxField
                      id="back-in-stock-sms"
                      label={labels.notifyBySms ?? "SMS"}
                      checked={notifySms}
                      onCheckedChange={(checked) => (notifySms = checked)}
                    />
                  {/if}
                </div>
              </fieldset>

              <div class="grid gap-3">
                  {#if notifyEmail}
                    <InputField
                      label={labels.notifyByEmail ?? "Email"}
                      type="email"
                      bind:value={email}
                      placeholder={labels.emailPlaceholder ?? "Enter your email"}
                    />
                  {/if}
                  {#if notifySms}
                    <InputField
                      label={labels.notifyBySms ?? "Mobile number"}
                      type="tel"
                      bind:value={phone}
                      placeholder={labels.phonePlaceholder ?? "Enter your phone number"}
                    />
                  {/if}
              </div>

              <Button onclick={handleSubmit} disabled={!canSubmit} size="lg">
                <BellIcon class="size-4" />
                {labels.submit ?? "Send me one update"}
              </Button>
            </Stack>
          {:else}
            <PastelField tone="green" className="w-full border-y border-border">
              <div class="flex items-start gap-3">
                <span class="grid size-10 shrink-0 place-items-center border border-border bg-background text-success">
                  <Check class="size-5" />
                </span>
                <div>
                  <h4 class="font-semibold">{labels.successHeading ?? "Update requested"}</h4>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">
                    {labels.successDescription ?? "We will contact you once when this print size is available."}
                  </p>
                </div>
              </div>
            </PastelField>
          {/if}
        </Stack>
      </Split>
    {/if}
</Section>
