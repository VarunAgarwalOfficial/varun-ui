<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants";

  export const badgeVariants = tv({
    base: "motion-interactive h-5 gap-1 rounded-full border border-transparent px-2 py-0.5 text-xs font-medium outline-none has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap [&>svg]:pointer-events-none",
    variants: {
      variant: {
        primary: "bg-primary text-background [a]:hover:bg-primary/80",
        muted:
          "bg-muted text-foreground [a]:hover:bg-muted/80",
        danger:
          "bg-danger/10 [a]:hover:bg-danger/20 focus-visible:ring-danger/20 text-danger",
        outline:
          "border-border text-foreground [a]:hover:bg-muted/30 [a]:hover:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  });

  export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    href,
    class: className,
    variant = "primary",
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant;
  } = $props();
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  data-slot="badge"
  {href}
  class={cn(badgeVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
