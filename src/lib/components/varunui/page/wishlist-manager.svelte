<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  import {
    Heart,
    ShoppingCart,
    Trash2,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface WishlistItem {
    title: string;
    price: number;
    image: { src: string; alt: string };
    inStock?: boolean;
  }

  export interface WishlistManagerProps {
    heading?: string;
    items?: WishlistItem[];
    currency?: string;
    emptyState?: {
      heading: string;
      description: string;
      button: { label: string; href: string };
    };
    labels?: {
      inStock?: string;
      outOfStock?: string;
      addToCart?: string;
      remove?: string;
    };
    onAddToCart?: (index: number) => void;
    onRemove?: (index: number) => void;
    className?: string;
  }

  export const wishlistManagerDemo: WishlistManagerProps = {
    heading: "Saved prints",
    currency: "$",
    items: [
      {
        title: "Standing Welcome A3 print",
        price: 34,
        image: {
          src: peepStanding1Asset,
          alt: "A welcoming character standing with one arm open",
        },
        inStock: true,
      },
      {
        title: "Hands on Hips A4 print",
        price: 28,
        image: {
          src: peepStanding10Asset,
          alt: "A confident character standing with hands on hips",
        },
        inStock: true,
      },
      {
        title: "Bike Journey A2 print",
        price: 42,
        image: {
          src: peepSitting13Asset,
          alt: "A character riding a bicycle",
        },
        inStock: false,
      },
    ],
    emptyState: {
      heading: "No saved prints",
      description: "Save a print when you want to compare it or return later.",
      button: { label: "Browse the studio shop", href: "?" },
    },
    labels: {
      inStock: "In stock",
      outOfStock: "Out of stock",
      addToCart: "Add to cart",
      remove: "Remove",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmptyState from "$lib/components/varunui/piece/empty-state.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import { cn } from "$lib/utils.js";

  let {
    heading,
    items: initialItems = [],
    currency = "$",
    emptyState,
    labels = {},
    onAddToCart,
    onRemove,
    className,
  }: WishlistManagerProps = $props();

  let items = $state<WishlistItem[]>([]);
  let appliedInitialItems = $state<WishlistItem[] | null>(null);

  $effect(() => {
    if (initialItems !== appliedInitialItems) {
      if (items.length === 0 || items === appliedInitialItems) {
        items = initialItems;
      }
      appliedInitialItems = initialItems;
    }
  });

  function handleRemove(index: number) {
    items = items.filter((_, itemIndex) => itemIndex !== index);
    onRemove?.(index);
  }
</script>

{#if items.length === 0 && emptyState}
  <div class={className}>
    <Section container="sm">
      <EmptyState icon={Heart} title={emptyState.heading} description={emptyState.description}>
        <Button class="mt-[var(--layout-gap-md)]" href={emptyState.button.href}>
          {emptyState.button.label}
        </Button>
      </EmptyState>
    </Section>
  </div>
{:else}
  <div class={className}>
    <Section container="md">
      <Stack gap="xl">
        <SectionHeader
          kicker="Saved for later"
          title={heading ? `${heading} (${items.length})` : undefined}
          description="A short, comparable list. Move a print to the cart when the format and timing are right."
          align="left"
          level={1}
          markerTone="yellow"
        />

        <div class="divide-y divide-border border-y border-border">
        {#each items as item, index}
          <article class="grid gap-[var(--layout-gap-md)] py-[var(--layout-gap-md)] sm:grid-cols-[6rem_1fr_auto] sm:items-center">
            <div
              data-tone="yellow"
              class="surface-pastel surface-pastel-art size-24 overflow-hidden border border-border"
            >
              <img
                src={item.image.src}
                alt={item.image.alt}
                class="size-full object-contain"
              />
            </div>
            <div>
              <h3 class="font-medium">{item.title}</h3>
              <p class="mt-1 font-semibold">{currency}{item.price}</p>
              <p
                class={cn(
                  "mt-1 text-sm",
                  item.inStock
                    ? "text-success"
                    : "text-muted-foreground",
                )}
              >
                {item.inStock
                  ? (labels.inStock ?? "In stock")
                  : (labels.outOfStock ?? "Out of stock")}
              </p>
            </div>
            <div class="flex flex-wrap gap-2 sm:justify-end">
              <Button
                size="sm"
                disabled={!item.inStock}
                onclick={() => onAddToCart?.(index)}
              >
                <ShoppingCart class="size-4" />
                {labels.addToCart ?? "Add to cart"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onclick={() => handleRemove(index)}
              >
                <Trash2 class="size-4" />
                {labels.remove ?? "Remove"}
              </Button>
            </div>
          </article>
        {/each}
        </div>
      </Stack>
    </Section>
  </div>
{/if}
