<script lang="ts" module>
  interface ReceiptItem {
    name: string;
    quantity: number;
    price: number;
  }

  export interface OrderReceiptEmailProps {
    recipientName?: string;
    orderNumber?: string;
    orderDate?: string;
    items?: ReceiptItem[];
    shipping?: number;
    currency?: string;
    action?: { label: string; href: string };
  }

  export const orderReceiptDemo: OrderReceiptEmailProps = {
    recipientName: "Mina",
    orderNumber: "VUI-2048",
    orderDate: "10 July 2026",
    currency: "$",
    items: [
      { name: "Bike Journey A3 print", quantity: 1, price: 28 },
      { name: "Hands on Hips A4 print", quantity: 2, price: 28 },
    ],
    shipping: 0,
    action: { label: "View order", href: "?" },
  };
</script>

<script lang="ts">
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import EmailAction from "$lib/components/varunui/email/internal/email-action.svelte";
  import EmailBrand from "$lib/components/varunui/email/internal/email-brand.svelte";
  import EmailDocument from "$lib/components/varunui/email/internal/email-document.svelte";
  import EmailFact from "$lib/components/varunui/email/internal/email-fact.svelte";
  import EmailFooter from "$lib/components/varunui/email/internal/email-footer.svelte";
  import EmailKicker from "$lib/components/varunui/email/internal/email-kicker.svelte";

  let {
    recipientName = orderReceiptDemo.recipientName,
    orderNumber = orderReceiptDemo.orderNumber ?? "VUI-2048",
    orderDate = orderReceiptDemo.orderDate ?? "10 July 2026",
    items = orderReceiptDemo.items ?? [],
    shipping = orderReceiptDemo.shipping ?? 0,
    currency = orderReceiptDemo.currency ?? "$",
    action = orderReceiptDemo.action,
  }: OrderReceiptEmailProps = $props();

  function subtotalValue() {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function totalValue() {
    return subtotalValue() + shipping;
  }
</script>

<EmailDocument preheader={`Receipt for order ${orderNumber}.`}>
  {#snippet header()}
    <EmailBrand label="Receipt" />
  {/snippet}

  <Stack gap="lg" align="start">
    <EmailKicker label="Order confirmed" tone="yellow" />
    <div>
      <h1 class="text-3xl font-semibold leading-tight tracking-tight">Thanks, {recipientName}. The prints are queued.</h1>
      <p class="mt-3 text-base leading-7 text-[var(--email-muted-ink)]">
        We will send one more email when the package leaves the studio.
      </p>
    </div>

    <div
      data-tone="yellow"
      class="surface-pastel w-full border-y border-[var(--email-border)] p-[var(--surface-padding-md)]"
    >
      <Grid columns={2} gap="md">
        <EmailFact label="Order" value={orderNumber} />
        <EmailFact label="Placed" value={orderDate} />
      </Grid>
    </div>

    <table class="w-full border-collapse text-sm">
      <caption class="sr-only">Order items</caption>
      <tbody class="divide-y divide-[var(--email-border)] border-y border-[var(--email-border)]">
        {#each items as item (item.name)}
          <tr>
            <td class="py-3 pr-4">
              <span class="font-semibold">{item.name}</span>
              <span class="mt-1 block text-xs text-[var(--email-muted-ink)]">Quantity {item.quantity}</span>
            </td>
            <td class="py-3 text-right font-mono tabular-nums">{currency}{(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th class="pt-4 text-left font-normal text-[var(--email-muted-ink)]">Shipping</th>
          <td class="pt-4 text-right font-mono">{shipping === 0 ? "Free" : `${currency}${shipping.toFixed(2)}`}</td>
        </tr>
        <tr>
          <th class="pt-2 text-left text-base">Total</th>
          <td class="pt-2 text-right font-mono text-base font-semibold">{currency}{totalValue().toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    {#if action}
      <EmailAction label={action.label} href={action.href} />
    {/if}
  </Stack>

  {#snippet footer()}
    <EmailFooter reason={`You received this receipt for order ${orderNumber}.`} />
  {/snippet}
</EmailDocument>
