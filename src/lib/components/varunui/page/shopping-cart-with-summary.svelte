<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import {
    ShoppingBagIcon,
    Trash2,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
  }

  export interface ShoppingCartWithSummaryProps {
    heading?: string;
    items?: CartItem[];
    currency?: string;
    onUpdateQuantity?: (id: string, quantity: number) => void;
    onRemoveItem?: (id: string) => void;
    onCheckout?: () => void;
    checkoutUrl?: string;
    className?: string;
  }

  export const shoppingCartWithSummaryDemo: ShoppingCartWithSummaryProps = {
    heading: "Your print cart",
    currency: "$",
    items: [
      {
        id: "item-1",
        name: "Bike Journey A3 print",
        price: 28,
        quantity: 1,
        image:
          peepSitting13Asset,
        variant: "A3 · warm paper",
      },
      {
        id: "item-2",
        name: "Hands on Hips A4 print",
        price: 28,
        quantity: 2,
        image:
          peepStanding18Asset,
        variant: "A4 · warm paper",
      },
      {
        id: "item-3",
        name: "Casual Welcome A3 print",
        price: 34,
        quantity: 1,
        image:
          peepStanding5Asset,
        variant: "A3 · warm paper",
      },
    ],
    checkoutUrl: "?",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import QuantityStepper from "$lib/components/varunui/component/quantity-stepper.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmptyState from "$lib/components/varunui/piece/empty-state.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    heading,
    items: initialItems = [],
    currency = "$",
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    checkoutUrl,
    className,
  }: ShoppingCartWithSummaryProps = $props();

  let items = $state<CartItem[]>([]);
  let appliedInitialItems = $state<CartItem[] | null>(null);

  const subtotal = $derived(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  const shipping = $derived(subtotal > 100 ? 0 : 10);
  const total = $derived(subtotal + shipping);

  $effect(() => {
    if (initialItems !== appliedInitialItems) {
      if (items.length === 0 || items === appliedInitialItems) {
        items = initialItems;
      }
      appliedInitialItems = initialItems;
    }
  });

  function updateQuantity(id: string, newQuantity: number) {
    if (newQuantity < 1) return;
    items = items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    onUpdateQuantity?.(id, newQuantity);
  }

  function removeItem(id: string) {
    items = items.filter((item) => item.id !== id);
    onRemoveItem?.(id);
  }
</script>

{#if items.length === 0}
  <div class={className}>
    <Section container="sm">
      <EmptyState
        icon={ShoppingBagIcon}
        title="Your print cart is empty"
        description="Choose a character and a paper size when you are ready."
      >
        <Button class="mt-[var(--layout-gap-md)]" href="?">Browse the studio shop</Button>
      </EmptyState>
    </Section>
  </div>
{:else}
  <div class={className}>
    <Section container="lg">
      <Stack gap="xl">
        <SectionHeader
          kicker="Checkout"
          title={heading}
          description="Review the print, format, and quantity before moving into the payment flow."
          align="left"
          level={1}
          markerTone="yellow"
        />

        <Rail side="right" sticky={false}>
          <div class="divide-y divide-border border-y border-border">
          {#each items as item}
            <article class="group/shoppingCartWithSummary flex gap-4 py-[var(--layout-gap-md)]">
              <div
                data-tone="yellow"
                class="surface-pastel surface-pastel-art size-24 shrink-0 overflow-hidden border border-border"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  class="size-full object-contain"
                />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="font-medium">{item.name}</h3>
                    {#if item.variant}
                      <p class="mt-1 text-sm text-muted-foreground">
                        {item.variant}
                      </p>
                    {/if}
                  </div>
                  <Button
                    variant="quiet"
                    iconOnly
                    class="text-muted-foreground hover:text-danger"
                    onclick={() => removeItem(item.id)}
                  >
                    <Trash2 class="size-4" />
                  </Button>
                </div>

                <div class="mt-5 flex items-center justify-between gap-4">
                  <QuantityStepper
                    label={`${item.name} quantity`}
                    value={item.quantity}
                    min={1}
                    max={12}
                    step={1}
                    size="sm"
                    onValueChange={(quantity) => updateQuantity(item.id, quantity)}
                  />
                  <p class="font-semibold">
                    {currency}{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </article>
          {/each}
          </div>

          {#snippet rail()}
        <PastelField tone="yellow" className="border-y border-border">
          <h2 class="text-lg font-semibold">Order summary</h2>
          <div class="mt-[var(--layout-gap-md)] space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Shipping</span>
              <span
                >{shipping === 0
                  ? "Free"
                  : `${currency}${shipping.toFixed(2)}`}</span
              >
            </div>
            {#if shipping === 0}
              <p class="border-t border-border pt-3 text-xs font-medium text-success">
                Free shipping applied.
              </p>
            {/if}
            <div class="border-t pt-3">
              <div class="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Button
            class="mt-[var(--layout-gap-md)] w-full"
            size="lg"
            href={checkoutUrl}
            onclick={onCheckout}
          >
            Checkout
          </Button>
          <p class="mt-4 text-center text-xs text-muted-foreground">
            Encrypted checkout. Shipping is confirmed before payment.
          </p>
        </PastelField>
          {/snippet}
        </Rail>
      </Stack>
    </Section>
  </div>
{/if}
