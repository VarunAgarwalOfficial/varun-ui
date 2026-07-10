<script lang="ts" module>
  export interface LinkProps {
    href: string;
    label: string;
    external?: boolean;
    direction?: "forward" | "back";
  }

  export const linkDemo: LinkProps = {
    href: "?",
    label: "View all case studies",
  };
</script>

<script lang="ts">
  import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpRightIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  let {
    href,
    label,
    external = false,
    direction = "forward",
  }: LinkProps = $props();

  const Icon = $derived(
    external
      ? ArrowUpRightIcon
      : direction === "back"
        ? ArrowLeftIcon
        : ArrowRightIcon,
  );
  const iconClass = $derived(
    direction === "back"
      ? "size-3.5 motion-transform motion-safe:group-hover/link:-translate-x-0.5 motion-safe:group-focus-visible/link:-translate-x-0.5"
      : "size-3.5 motion-transform motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-focus-visible/link:translate-x-0.5",
  );
</script>

<a
  {href}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  class="group/link inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-semibold text-current motion-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2"
  class:flex-row-reverse={direction === "back"}
>
  <span class="link-underline motion-draw-left-trigger">{label}</span>
  <Icon class={iconClass} aria-hidden="true" />
</a>
