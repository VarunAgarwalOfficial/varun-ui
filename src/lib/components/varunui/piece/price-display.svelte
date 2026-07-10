<script lang="ts" module>
  export type PriceDisplaySize = "md" | "lg";
  export type PriceDisplayTone = "default" | "inverse";

  export interface PriceDisplayProps {
    value: string | number;
    currency?: string;
    period?: string;
    size?: PriceDisplaySize;
    tone?: PriceDisplayTone;
  }

  export const priceDisplayDemo: PriceDisplayProps = {
    value: 29,
    currency: "$",
    period: "/month",
  };
</script>

<script lang="ts">
  const sizeClasses: Record<PriceDisplaySize, string> = {
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
  };

  const toneClasses: Record<
    PriceDisplayTone,
    { price: string; support: string }
  > = {
    default: {
      price: "text-foreground",
      support: "text-muted-foreground",
    },
    "inverse": {
      price: "text-background",
      support: "text-background/70",
    },
  };

  let {
    value,
    currency,
    period,
    size = "lg",
    tone = "default",
  }: PriceDisplayProps = $props();

  const formattedValue = $derived(
    typeof value === "number" ? value.toLocaleString() : value,
  );
  const styles = $derived(toneClasses[tone]);
</script>

<div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
  <span
    class={`font-bold leading-none tracking-normal ${sizeClasses[size]} ${styles.price}`}
  >
    {#if currency}
      <span class={`mr-0.5 text-[0.55em] ${styles.support}`}>
        {currency}
      </span>
    {/if}
    {formattedValue}
  </span>

  {#if period}
    <span class={`text-base leading-none ${styles.support}`}>
      {period}
    </span>
  {/if}
</div>
