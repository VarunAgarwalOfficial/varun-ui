<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  export interface ProductCollectionProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    imageAlt?: string;
    badge?: string;
  }

  export interface ProductCollectionProps {
    kicker?: string;
    heading?: string;
    description?: string;
    products?: ProductCollectionProduct[];
    currency?: string;
    onAddToCart?: (productId: string) => void;
  }

  export const productCollectionDemo: ProductCollectionProps = {
    kicker: "Studio shop",
    heading: "Bring the current story set to paper.",
    description:
      "A small run of varunUI character prints while the wider places and props collection is being drawn.",
    currency: "$",
    products: [
      {
        id: "prod-1",
        name: "Bike Journey print",
        price: 28,
        image:
          peepSitting13Asset,
        imageAlt: "A person riding a bicycle",
        badge: "Last run",
      },
      {
        id: "prod-2",
        name: "Hands on Hips print",
        price: 28,
        image:
          peepStanding18Asset,
        imageAlt: "A confident person standing with hands on hips",
      },
      {
        id: "prod-3",
        name: "Thinking Ride print",
        price: 32,
        image:
          peepSitting8Asset,
        imageAlt: "A reflective person riding a bicycle",
        badge: "Large format",
      },
      {
        id: "prod-4",
        name: "Casual Welcome print",
        price: 28,
        image:
          peepStanding5Asset,
        imageAlt: "A calm person standing in welcome",
      },
    ],
  };
</script>

<script lang="ts">
  import { ShoppingCartIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    products = [],
    currency = "$",
    onAddToCart,
  }: ProductCollectionProps = $props();

  const columns = $derived(
    Math.min(4, Math.max(2, products.length)) as 2 | 3 | 4,
  );
  let addedProduct = $state<string>();

  function addToCart(productId: string, productName: string) {
    addedProduct = productName;
    onAddToCart?.(productId);
  }
</script>

{#if products.length > 0}
  <Section>
    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        markerTone="yellow"
      />
    <Grid {columns} gap="md">
      {#each products as product (product.id)}
        <article class="group overflow-hidden border border-border bg-surface">
          <div
            data-tone="yellow"
            class="surface-pastel surface-pastel-art relative aspect-square overflow-hidden border-b border-border"
          >
            <img
              src={product.image}
              alt={product.imageAlt ?? product.name}
              loading="lazy"
              class="size-full object-contain motion-media group-hover:scale-[1.03]"
            />
            {#if product.badge}
              <Badge class="absolute left-3 top-3" variant="muted">
                {product.badge}
              </Badge>
            {/if}
          </div>

          <div class="p-[var(--surface-padding-md)]">
            <h3 class="font-semibold">{product.name}</h3>

            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-lg font-semibold">{currency}{product.price}</span>
            </div>

            <Button
              class="mt-[var(--layout-gap-md)] w-full"
              onclick={() => addToCart(product.id, product.name)}
            >
              <ShoppingCartIcon aria-hidden="true" />
              Add to cart
            </Button>
          </div>
        </article>
      {/each}
    </Grid>
    </Stack>
    <p class="sr-only" aria-live="polite">
      {addedProduct ? `${addedProduct} added to cart.` : ""}
    </p>
  </Section>
{/if}
