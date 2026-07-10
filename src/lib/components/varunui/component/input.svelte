<script lang="ts">
  import type {
    HTMLInputAttributes,
    HTMLInputTypeAttribute,
  } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  type InputType = Exclude<HTMLInputTypeAttribute, "file">;

  export type InputSize = "sm" | "md" | "lg";

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, "type" | "size"> &
      (
        | { type: "file"; files?: FileList }
        | { type?: InputType; files?: undefined }
      ) & { size?: InputSize }
  >;

  let {
    ref = $bindable(null),
    value = $bindable(),
    type,
    files = $bindable(),
    size = "md",
    class: className,
    "data-slot": dataSlot = "input",
    ...restProps
  }: Props = $props();
</script>

{#if type === "file"}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    data-size={size}
    class={cn(
      "border-border focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-danger/20 aria-invalid:border-danger disabled:bg-muted/50 data-[size=sm]:h-[var(--control-height-sm)] data-[size=md]:h-[var(--control-height-md)] data-[size=lg]:h-[var(--control-height-lg)] rounded-lg border bg-transparent px-3 py-1 text-base motion-colors file:h-[var(--control-height-xs)] file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    type="file"
    bind:files
    bind:value
    {...restProps}
  />
{:else}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    data-size={size}
    class={cn(
      "border-border focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-danger/20 aria-invalid:border-danger disabled:bg-muted/50 data-[size=sm]:h-[var(--control-height-sm)] data-[size=md]:h-[var(--control-height-md)] data-[size=lg]:h-[var(--control-height-lg)] rounded-lg border bg-transparent px-3 py-1 text-base motion-colors file:h-[var(--control-height-xs)] file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
