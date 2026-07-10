<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
  import { Circle as CircleIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
  bind:ref
  data-slot="radio-group-item"
  class={cn(
    "border-border data-checked:bg-primary data-checked:text-background data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-danger focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 dark:aria-invalid:border-danger/50 flex size-4 rounded-full focus-visible:ring-3 aria-invalid:ring-3 group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <div
      data-slot="radio-group-indicator"
      class="flex size-4 items-center justify-center"
    >
      {#if checked}
        <CircleIcon
          class="bg-background absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      {/if}
    </div>
  {/snippet}
</RadioGroupPrimitive.Item>
