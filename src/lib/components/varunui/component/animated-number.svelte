<script lang="ts" module>
  export interface AnimatedNumberProps {
    value: string | number;
    from?: number;
    prefix?: string;
    suffix?: string;
    delay?: number;
    animate?: boolean;
    ariaLabel?: string;
    class?: string;
  }

  export const animatedNumberDemo: AnimatedNumberProps = {
    value: "128,400",
    suffix: "+",
    ariaLabel: "128,400 active users",
  };
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { cn } from "$lib/utils.js";

  let {
    value,
    from = 0,
    prefix = "",
    suffix = "",
    delay = 0,
    animate = true,
    ariaLabel,
    class: className,
  }: AnimatedNumberProps = $props();

  let element: HTMLSpanElement;
  let rendered = $state<string>();
  let frame = 0;
  let timeout = 0;
  let observer: IntersectionObserver | undefined;

  const parsed = $derived(parseValue(value));
  const displayValue = $derived(rendered ?? `${prefix}${value}${suffix}`);

  function parseValue(input: string | number) {
    const text = String(input);
    const match = text.match(/-?[\d,]+(?:\.\d+)?/);
    if (!match || match.index === undefined) return undefined;

    const number = Number(match[0].replaceAll(",", ""));
    if (!Number.isFinite(number)) return undefined;

    return {
      number,
      before: text.slice(0, match.index),
      after: text.slice(match.index + match[0].length),
      decimals: match[0].match(/\.(\d+)/)?.[1]?.length ?? 0,
      grouped: match[0].includes(","),
    };
  }

  function formatNumber(nextValue: number) {
    if (!parsed) return String(nextValue);
    const rounded = Number(nextValue.toFixed(parsed.decimals));

    if (parsed.grouped) {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      }).format(rounded);
    }

    return parsed.decimals > 0
      ? rounded.toFixed(parsed.decimals)
      : Math.round(rounded).toString();
  }

  function stop() {
    cancelAnimationFrame(frame);
    clearTimeout(timeout);
  }

  function start() {
    if (!parsed) return;
    stop();

    timeout = window.setTimeout(() => {
      let startedAt: number | undefined;

      const step = (timestamp: number) => {
        startedAt ??= timestamp;
        const progress = Math.min((timestamp - startedAt) / 1000, 1);
        const eased = 1 - (1 - progress) ** 3;
        const number = from + (parsed.number - from) * eased;
        rendered = `${prefix}${parsed.before}${formatNumber(number)}${parsed.after}${suffix}`;

        if (progress < 1) frame = requestAnimationFrame(step);
        else rendered = `${prefix}${value}${suffix}`;
      };

      frame = requestAnimationFrame(step);
    }, delay);
  }

  $effect(() => {
    rendered = `${prefix}${value}${suffix}`;
    observer?.disconnect();
    stop();

    if (!animate || !parsed || !element || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        start();
        observer?.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);

    return () => {
      observer?.disconnect();
      stop();
    };
  });

  onDestroy(() => {
    observer?.disconnect();
    stop();
  });
</script>

<span
  bind:this={element}
  aria-label={ariaLabel}
  class={cn("tabular-nums", className)}
>
  {displayValue}
</span>
