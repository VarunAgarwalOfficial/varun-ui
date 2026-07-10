<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
  import { Check, Minus } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  class={cn(
    "border-border data-checked:bg-primary data-checked:text-background data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-danger dark:aria-invalid:border-danger/50 focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 flex size-4 items-center justify-center rounded-sm border motion-colors group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div
      data-slot="checkbox-indicator"
      class="[&>svg]:size-3.5 grid place-content-center text-current transition-none"
    >
      {#if checked}
        <Check />
      {:else if indeterminate}
        <Minus />
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
