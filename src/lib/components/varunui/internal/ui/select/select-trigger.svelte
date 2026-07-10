<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";
  import { ChevronDown as CaretDownIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    size = "md",
    ...restProps
  }: WithoutChild<SelectPrimitive.TriggerProps> & {
    size?: "sm" | "md" | "lg";
  } = $props();
</script>

<SelectPrimitive.Trigger
  bind:ref
  data-slot="select-trigger"
  data-size={size}
  class={cn(
    "border-border data-placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger dark:aria-invalid:border-danger/50 gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm motion-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=sm]:h-[var(--control-height-sm)] data-[size=md]:h-[var(--control-height-md)] data-[size=lg]:h-[var(--control-height-lg)] *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:overflow-hidden [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&>*]:pointer-events-none",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <CaretDownIcon class="text-muted-foreground size-4 pointer-events-none" />
</SelectPrimitive.Trigger>
