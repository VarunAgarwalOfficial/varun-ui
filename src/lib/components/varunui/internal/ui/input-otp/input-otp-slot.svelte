<script lang="ts">
  import { PinInput as InputOTPPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    cell,
    class: className,
    ...restProps
  }: InputOTPPrimitive.CellProps = $props();
</script>

<InputOTPPrimitive.Cell
  {cell}
  bind:ref
  data-slot="input-otp-slot"
  class={cn(
    "border-border motion-interactive data-[active=true]:border-primary data-[active=true]:ring-primary/50 data-[active=true]:aria-invalid:ring-danger/20 aria-invalid:border-danger data-[active=true]:aria-invalid:border-danger size-[var(--control-height-md)] border-y border-r text-sm outline-none first:rounded-l-lg first:border-l last:rounded-r-lg data-[active=true]:ring-3 relative flex items-center justify-center data-[active=true]:z-10",
    className,
  )}
  {...restProps}
>
  {cell.char}
  {#if cell.hasFakeCaret}
    <div
      class="cn-input-otp-caret pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div
        class="motion-caret-blink h-4 w-px bg-foreground"
      ></div>
    </div>
  {/if}
</InputOTPPrimitive.Cell>
