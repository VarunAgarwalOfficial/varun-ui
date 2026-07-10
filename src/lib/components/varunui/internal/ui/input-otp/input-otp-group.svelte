<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="input-otp-group"
  class={cn(
    "has-aria-invalid:ring-danger/20 dark:has-aria-invalid:ring-danger/40 has-aria-invalid:border-danger rounded-lg has-aria-invalid:ring-3 flex items-center",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
