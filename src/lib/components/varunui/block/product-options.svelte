<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import {
    Check,
    Heart,
    ShoppingCart,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface ProductVariant {
    id: string;
    label: string;
    available?: boolean;
  }

  export interface ProductOptionsProps {
    kicker?: string;
    heading?: string;
    description?: string;
    price?: number;
    currency?: string;
    image?: { src: string; alt: string };
    sizes?: ProductVariant[];
    colors?: ProductVariant[];
    features?: string[];
    onAddToCart?: (quantity: number, size?: string, color?: string) => void;
    onAddToWishlist?: () => void;
    className?: string;
  }

  export const productOptionsDemo: ProductOptionsProps = {
    kicker: "Studio print",
    heading: "Standing Welcome A3 print",
    description:
      "A black-ink varunUI character on warm, uncoated paper. Printed locally and shipped flat so the line work stays crisp.",
    price: 34,
    currency: "$",
    image: {
      src: peepStanding23Asset,
      alt: "A welcoming character standing with one arm open",
    },
    sizes: [
      { id: "a4", label: "A4", available: true },
      { id: "a3", label: "A3", available: true },
      { id: "a2", label: "A2", available: false },
    ],
    colors: [],
    features: [
      "High-resolution black line art",
      "Warm uncoated 250 gsm paper",
      "Ships flat in a recycled mailer",
      "Frame not included",
    ],
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import OptionSelector from "$lib/components/varunui/component/option-selector.svelte";
  import QuantityStepper from "$lib/components/varunui/component/quantity-stepper.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import { cn } from "$lib/utils.js";

  let {
    kicker,
    heading,
    description,
    price,
    currency = "$",
    image,
    sizes = [],
    colors = [],
    features = [],
    onAddToCart,
    onAddToWishlist,
    className,
  }: ProductOptionsProps = $props();

  let quantity = $state(1);
  let selectedSize = $state("");
  let selectedColor = $state("");
  let isWishlisted = $state(false);
  let added = $state(false);

  const colorOptions = $derived(
    colors.map((color) => ({
      value: color.id,
      label: color.label,
      disabled: !color.available,
    })),
  );
  const sizeOptions = $derived(
    sizes.map((size) => ({
      value: size.id,
      label: size.label,
      disabled: !size.available,
    })),
  );

  function addToCart() {
    added = true;
    onAddToCart?.(
      quantity,
      selectedSize || undefined,
      selectedColor || undefined,
    );
  }

  $effect(() => {
    const firstAvailable = sizes.find((size) => size.available)?.id ?? "";
    const selectionIsAvailable = sizes.some(
      (size) => size.id === selectedSize && size.available,
    );
    if (!selectionIsAvailable && selectedSize !== firstAvailable) {
      selectedSize = firstAvailable;
    }
  });

  $effect(() => {
    const firstAvailable = colors.find((color) => color.available)?.id ?? "";
    const selectionIsAvailable = colors.some(
      (color) => color.id === selectedColor && color.available,
    );
    if (!selectionIsAvailable && selectedColor !== firstAvailable) {
      selectedColor = firstAvailable;
    }
  });
</script>

<Section container="lg" className={className}>
  <Split mediaSide="left" align="center" gap="lg">
    {#snippet media()}
      {#if image}
        <StoryScene src={image.src} alt={image.alt} tone="yellow" frame="portrait" />
      {/if}
    {/snippet}

    <Stack gap="lg" align="start">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        size="lg"
        level={1}
        markerTone="yellow"
      />

      {#if price !== undefined}
        <p class="font-mono text-3xl font-semibold tabular-nums">{currency}{price}</p>
      {/if}

      {#if colors.length > 0}
        <OptionSelector
          label="Color"
          options={colorOptions}
          bind:value={selectedColor}
        />
      {/if}

      {#if sizes.length > 0}
        <OptionSelector
          label="Print size"
          options={sizeOptions}
          bind:value={selectedSize}
        />
      {/if}

      <div class="grid gap-2">
        <p class="text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-muted-foreground">Quantity</p>
        <QuantityStepper
          label="Quantity"
          bind:value={quantity}
          min={1}
          max={12}
          step={1}
          size="md"
        />
      </div>

      <ActionRow align="left">
          <Button
            size="lg"
            onclick={addToCart}
          >
            <ShoppingCart class="size-4" />
            {added ? "Added" : "Add to cart"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            iconOnly
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            class={cn(isWishlisted && "border-primary text-primary")}
            onclick={() => {
              isWishlisted = !isWishlisted;
              onAddToWishlist?.();
            }}
          >
            <Heart class={cn("size-4", isWishlisted && "fill-current")} />
          </Button>
      </ActionRow>
      <p class="sr-only" aria-live="polite">{added ? "Added to cart." : ""}</p>

      {#if features.length > 0}
        <ul class="w-full divide-y divide-border border-y border-border">
          {#each features as feature}
            <li class="flex items-center gap-2 py-3 text-sm text-muted-foreground">
              <Check class="size-4 text-success" />
              {feature}
            </li>
          {/each}
        </ul>
      {/if}
    </Stack>
  </Split>
</Section>
