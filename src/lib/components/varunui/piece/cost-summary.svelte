<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface CostSummaryLineItem {
    label: string;
    value: string | number;
    description?: string;
    currency?: string;
    period?: string;
  }

  export interface CostSummaryTotal {
    label: string;
    value: string | number;
    caption?: string;
    currency?: string;
    period?: string;
  }

  export interface CostSummaryProps {
    total: CostSummaryTotal;
    heading?: string;
    items?: CostSummaryLineItem[];
    currency?: string;
    period?: string;
    note?: string;
    footer?: Snippet;
  }

  export const costSummaryDemo: CostSummaryProps = {
    heading: "Total",
    currency: "$",
    period: "/month",
    items: [
      { label: "Starter", value: 29 },
      { label: "Priority support", value: 15 },
    ],
    total: {
      label: "Monthly total",
      value: 44,
      caption: "1 add-on selected",
    },
  };
</script>

<script lang="ts">
  import PriceDisplay from "$lib/components/varunui/piece/price-display.svelte";

  let {
    total,
    heading,
    items = [],
    currency,
    period,
    note,
    footer,
  }: CostSummaryProps = $props();

  function formatAmount(value: string | number, prefix?: string) {
    const amount = typeof value === "number" ? value.toLocaleString() : value;
    return `${prefix ?? ""}${amount}`;
  }
</script>

<aside
  class="border-y border-border bg-surface py-[var(--surface-padding-md)]"
  aria-label={heading ?? total.label}
>
  {#if heading}
    <h3 class="font-semibold text-foreground">{heading}</h3>
  {/if}

  {#if items.length > 0}
    <dl class={heading ? "mt-4 space-y-3" : "space-y-3"}>
      {#each items as item, index (`${item.label}-${index}`)}
        <div class="flex items-start justify-between gap-4 text-sm">
          <dt class="min-w-0">
            <span class="block truncate text-muted-foreground">
              {item.label}
            </span>
            {#if item.description}
              <span
                class="mt-1 block text-xs leading-relaxed text-muted-foreground"
              >
                {item.description}
              </span>
            {/if}
          </dt>
          <dd class="shrink-0 text-right font-medium text-foreground">
            {formatAmount(item.value, item.currency ?? currency)}
            {#if item.period ?? period}
              <span class="font-normal text-muted-foreground">
                {item.period ?? period}
              </span>
            {/if}
          </dd>
        </div>
      {/each}
    </dl>
  {/if}

  <div class={items.length > 0 ? "mt-5 border-t border-border pt-5" : "mt-2"}>
    <div class="flex items-end justify-between gap-4">
      <span class="font-medium text-foreground">{total.label}</span>
      <div class="text-right">
        <PriceDisplay
          value={total.value}
          currency={total.currency ?? currency}
          period={total.period ?? period}
          size="md"
        />
      </div>
    </div>

    {#if total.caption}
      <p class="mt-2 text-right text-xs text-muted-foreground">
        {total.caption}
      </p>
    {/if}
  </div>

  {#if note}
    <p class="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p>
  {/if}

  {#if footer}
    <div class="mt-6">
      {@render footer()}
    </div>
  {/if}
</aside>
