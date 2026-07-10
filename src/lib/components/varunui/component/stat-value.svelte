<script lang="ts" module>
  export type StatValueSize = "sm" | "md" | "lg" | "display";
  export type StatValueTone =
    | "foreground"
    | "muted"
    | "success"
    | "danger"
    | "primary";

  export interface StatValueProps {
    value: string | number;
    prefix?: string;
    suffix?: string;
    size?: StatValueSize;
    tone?: StatValueTone;
    delay?: number;
    animate?: boolean;
    ariaLabel?: string;
  }

  export const statValueDemo: StatValueProps = {
    value: "128,400",
    suffix: "+",
    size: "lg",
    ariaLabel: "Active users",
  };
</script>

<script lang="ts">
  import AnimatedNumber from "$lib/components/varunui/component/animated-number.svelte";

  const sizeClasses: Record<StatValueSize, string> = {
    sm: "text-lg font-semibold leading-none",
    md: "text-2xl font-bold leading-none",
    lg: "text-3xl font-bold leading-none md:text-4xl",
    display: "block text-6xl font-bold leading-none tracking-tight md:text-8xl lg:text-9xl",
  };

  const toneClasses: Record<StatValueTone, string> = {
    foreground: "text-foreground",
    muted: "text-muted-foreground",
    success: "text-success",
    danger: "text-danger",
    primary: "text-primary",
  };

  let {
    value,
    prefix,
    suffix,
    size = "md",
    tone = "foreground",
    delay = 0,
    animate = true,
    ariaLabel,
  }: StatValueProps = $props();

  const valueClass = $derived(
    `${sizeClasses[size]} ${toneClasses[tone]} tabular-nums`,
  );
</script>

<AnimatedNumber
  {value}
  {prefix}
  {suffix}
  {delay}
  {animate}
  {ariaLabel}
  class={valueClass}
/>
