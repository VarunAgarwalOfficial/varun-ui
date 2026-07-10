<script lang="ts">
  import { Select as SelectPrimitive } from "bits-ui";
  import SelectPortal from "./select-portal.svelte";
  import SelectScrollUpButton from "./select-scroll-up-button.svelte";
  import SelectScrollDownButton from "./select-scroll-down-button.svelte";
  import { cn, type WithoutChild } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";
  import type { WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    sideOffset = 4,
    portalProps,
    children,
    preventScroll = true,
    ...restProps
  }: WithoutChild<SelectPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SelectPortal>>;
  } = $props();
</script>

<SelectPortal {...portalProps}>
  <SelectPrimitive.Content
    bind:ref
    {sideOffset}
    {preventScroll}
    data-slot="select-content"
    class={cn(
      "bg-surface text-foreground data-open:motion-popover data-closed:motion-popover-out ring-foreground/10 relative isolate z-50 max-h-80 min-w-36 overflow-x-hidden overflow-y-auto rounded-lg ring-1",
      className,
    )}
    {...restProps}
  >
    <SelectScrollUpButton />
    <SelectPrimitive.Viewport
      class={cn(
        "max-h-[inherit] w-full min-w-(--bits-select-anchor-width) scroll-my-1 p-1",
      )}
    >
      {@render children?.()}
    </SelectPrimitive.Viewport>
    <SelectScrollDownButton />
  </SelectPrimitive.Content>
</SelectPortal>
