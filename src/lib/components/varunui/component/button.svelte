<script lang="ts" module>
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";
  import { type VariantProps, tv } from "tailwind-variants";

  export const buttonVariants = tv({
    base: "motion-interactive focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger dark:aria-invalid:border-danger/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
      variant: {
        primary: "bg-primary text-background hover:bg-primary/85",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        quiet:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        danger:
          "bg-danger/10 hover:bg-danger/20 focus-visible:ring-danger/20 text-danger focus-visible:border-danger/40",
      },
      size: {
        md:
          "h-[var(--control-height-md)] gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-[var(--control-height-xs)] gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-[var(--control-height-sm)] gap-1.5 px-3 text-[0.8rem] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-[var(--control-height-lg)] gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
      },
      iconOnly: {
        true: "px-0",
        false: "",
      },
    },
    compoundVariants: [
      { size: "xs", iconOnly: true, class: "w-[var(--control-height-xs)] px-0" },
      { size: "sm", iconOnly: true, class: "w-[var(--control-height-sm)] px-0" },
      { size: "md", iconOnly: true, class: "w-[var(--control-height-md)] px-0" },
      { size: "lg", iconOnly: true, class: "w-[var(--control-height-lg)] px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
    },
  });

  export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
  export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      iconOnly?: boolean;
      loading?: boolean;
      loadingLabel?: string;
    };
</script>

<script lang="ts">
  import { Loader2 } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    class: className,
    variant = "primary",
    size = "md",
    iconOnly = false,
    ref = $bindable(null),
    href = undefined,
    type = "button",
    disabled,
    loading = false,
    loadingLabel,
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size, iconOnly }), className)}
    href={disabled || loading ? undefined : href}
    aria-disabled={disabled || loading}
    aria-busy={loading}
    role={disabled || loading ? "link" : undefined}
    tabindex={disabled || loading ? -1 : undefined}
    {...restProps}
  >
    {#if loading}
      <Loader2 class="motion-spinner" aria-hidden="true" />
    {/if}
    {#if loading && loadingLabel}
      {loadingLabel}
    {:else}
      {@render children?.()}
    {/if}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size, iconOnly }), className)}
    {type}
    disabled={disabled || loading}
    aria-busy={loading}
    {...restProps}
  >
    {#if loading}
      <Loader2 class="motion-spinner" aria-hidden="true" />
    {/if}
    {#if loading && loadingLabel}
      {loadingLabel}
    {:else}
      {@render children?.()}
    {/if}
  </button>
{/if}
