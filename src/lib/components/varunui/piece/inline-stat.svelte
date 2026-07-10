<script lang="ts" module>
  export interface InlineStatProps {
    value: string | number;
    label: string;
    prefix?: string;
    suffix?: string;
    animate?: boolean;
    delay?: number;
    ariaLabel?: string;
  }

  export const inlineStatDemo: InlineStatProps = {
    value: "180+",
    label: "Brands shaped",
    ariaLabel: "180 plus brands shaped",
  };
</script>

<script lang="ts">
  import StatValue from "$lib/components/varunui/component/stat-value.svelte";

  let {
    value,
    label,
    prefix,
    suffix,
    animate = true,
    delay = 0,
    ariaLabel,
  }: InlineStatProps = $props();

</script>

<div
  data-slot="inline-stat"
  class="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-left"
>
  <StatValue
    {value}
    {prefix}
    {suffix}
    {animate}
    {delay}
    ariaLabel={ariaLabel ?? `${value} ${label}`}
    size="md"
  />
  <span
    data-slot="inline-stat-label"
    class="min-w-0 max-w-40 text-sm leading-tight text-muted-foreground"
  >
    {label}
  </span>
</div>
