<script lang="ts" module>
  import {
    CheckCircle2,
    Mail,
    PackageIcon,
    Truck,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface OrderItem {
    name: string;
    quantity: number;
    price: number;
  }

  export interface OrderConfirmationProps {
    heading?: string;
    subheading?: string;
    orderNumber?: string;
    email?: string;
    items?: OrderItem[];
    subtotal?: number;
    shipping?: number;
    tax?: number;
    total?: number;
    currency?: string;
    estimatedDelivery?: string;
    onTrackOrder?: () => void;
    onContinueShopping?: () => void;
    className?: string;
  }

  export const orderConfirmationDemo: OrderConfirmationProps = {
    heading: "Order Confirmed!",
    subheading: "Thank you for your purchase",
    orderNumber: "ORD-2024-1234",
    email: "customer@example.com",
    estimatedDelivery: "Dec 28 - Dec 30, 2024",
    currency: "$",
    subtotal: 289,
    shipping: 0,
    tax: 23.12,
    total: 312.12,
    items: [
      { name: "Minimal Desk Lamp", quantity: 1, price: 89 },
      { name: "Ceramic Vase Set", quantity: 2, price: 130 },
      { name: "Wooden Photo Frame", quantity: 1, price: 70 },
    ],
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";

  let {
    heading,
    subheading,
    orderNumber,
    email,
    items = [],
    subtotal = 0,
    shipping = 0,
    tax = 0,
    total = 0,
    currency = "$",
    estimatedDelivery,
    onTrackOrder,
    onContinueShopping,
    className,
  }: OrderConfirmationProps = $props();
</script>

<div class={className}>
  <Section container="sm">
    <div class="text-center">
      <div
        class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-success/10"
      >
        <CheckCircle2 class="size-8 text-success" />
      </div>
      {#if heading}
        <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
          {heading}
        </h1>
      {/if}
      {#if subheading}
        <p class="mt-2 text-muted-foreground">{subheading}</p>
      {/if}
      {#if orderNumber}
        <p class="mt-4 text-sm text-muted-foreground">
          Order number: <span class="font-medium text-foreground"
            >{orderNumber}</span
          >
        </p>
      {/if}
    </div>

    <div class="mt-8 space-y-4 bg-muted/30 p-5">
      <div class="flex gap-3">
        <Mail class="mt-0.5 size-5 text-muted-foreground" />
        <div class="min-w-0 flex-1">
          <p class="font-medium">Confirmation sent</p>
          <p class="break-all text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      {#if estimatedDelivery}
        <div class="flex gap-3">
          <Truck class="mt-0.5 size-5 text-muted-foreground" />
          <div class="min-w-0 flex-1">
            <p class="font-medium">Estimated delivery</p>
            <p class="text-sm text-muted-foreground">{estimatedDelivery}</p>
          </div>
        </div>
      {/if}

      <div class="border-t pt-5">
        <div class="mb-4 flex items-center gap-2">
          <PackageIcon class="size-5 text-muted-foreground" />
          <h3 class="font-medium">Order summary</h3>
        </div>

        <div class="space-y-2 text-sm">
          {#each items as item}
            <div class="flex justify-between gap-4">
              <span class="text-muted-foreground"
                >{item.name} x {item.quantity}</span
              >
              <span>{currency}{item.price.toFixed(2)}</span>
            </div>
          {/each}
        </div>

        <div class="mt-4 space-y-2 border-t pt-4 text-sm">
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
          <div class="flex justify-between">
            <span class="text-muted-foreground">Tax</span>
            <span>{currency}{tax.toFixed(2)}</span>
          </div>
          <div
            class="flex justify-between border-t pt-3 text-base font-semibold"
          >
            <span>Total</span>
            <span>{currency}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Button onclick={onTrackOrder}>Track Order</Button>
      <Button variant="outline" href="?" onclick={onContinueShopping}
        >Continue Shopping</Button
      >
    </div>
  </Section>
</div>
