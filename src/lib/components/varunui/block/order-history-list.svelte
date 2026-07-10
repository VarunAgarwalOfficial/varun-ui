<script lang="ts" module>
  import { ChevronRight, PackageIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface OrderItem {
    orderNumber: string;
    date: string;
    status: "processing" | "shipped" | "delivered" | "cancelled";
    total: number;
    itemCount: number;
    href?: string;
  }

  export interface OrderHistoryListProps {
    heading?: string;
    orders?: OrderItem[];
    currency?: string;
    emptyState?: {
      heading: string;
      description: string;
      button: { label: string; href: string };
    };
    labels?: {
      view?: string;
      item?: string;
      items?: string;
    };
    className?: string;
  }

  const statusStyles = {
    processing: "bg-warning/10 text-warning",
    shipped: "bg-info/10 text-info",
    delivered: "bg-success/10 text-success",
    cancelled: "bg-danger/10 text-danger",
  };

  export const orderHistoryListDemo: OrderHistoryListProps = {
    heading: "Order History",
    currency: "$",
    orders: [
      {
        orderNumber: "ORD-2024-1234",
        date: "Dec 20, 2024",
        status: "delivered",
        total: 289.99,
        itemCount: 3,
        href: "?",
      },
      {
        orderNumber: "ORD-2024-1198",
        date: "Dec 15, 2024",
        status: "shipped",
        total: 149.0,
        itemCount: 2,
        href: "?",
      },
      {
        orderNumber: "ORD-2024-1156",
        date: "Dec 10, 2024",
        status: "processing",
        total: 89.5,
        itemCount: 1,
        href: "?",
      },
    ],
    emptyState: {
      heading: "No orders yet",
      description:
        "Your order history will appear here once you make a purchase.",
      button: { label: "Start Shopping", href: "?" },
    },
    labels: {
      view: "View",
      item: "item",
      items: "items",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    heading,
    orders = [],
    currency = "$",
    emptyState,
    labels = {},
    className,
  }: OrderHistoryListProps = $props();
</script>

{#if orders.length === 0 && emptyState}
  <Section container="form" className={className}>
    <div class="flex flex-col items-center text-center">
      <PackageIcon class="mb-4 size-12 text-muted-foreground" />
      <h2 class="text-2xl font-semibold">{emptyState.heading}</h2>
      <p class="mt-2 text-muted-foreground">{emptyState.description}</p>
      <Button class="mt-6" href="?">{emptyState.button.label}</Button>
    </div>
  </Section>
{:else}
  <Section container="sm" className={className}>
      {#if heading}
        <h1 class="mb-8 text-3xl font-semibold tracking-tight">{heading}</h1>
      {/if}

      <div class="space-y-4">
        {#each orders as order}
          <div
            class="flex flex-col gap-4 rounded-none border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <p class="font-medium">{order.orderNumber}</p>
                <span
                  class={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    statusStyles[order.status],
                  )}
                >
                  {order.status}
                </span>
              </div>
              <p class="mt-1 text-sm text-muted-foreground">
                {order.date} - {order.itemCount}
                {order.itemCount === 1
                  ? (labels.item ?? "item")
                  : (labels.items ?? "items")}
              </p>
            </div>
            <div class="flex items-center justify-between gap-4 sm:justify-end">
              <p class="font-semibold">{currency}{order.total.toFixed(2)}</p>
              <Button variant="outline" size="sm" href="?">
                {labels.view ?? "View"}
                <ChevronRight class="size-4" />
              </Button>
            </div>
          </div>
        {/each}
      </div>
  </Section>
{/if}
