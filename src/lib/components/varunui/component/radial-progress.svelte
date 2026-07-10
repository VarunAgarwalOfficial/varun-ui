<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type RadialProgressSize = "sm" | "md" | "lg";
  export type RadialProgressThickness = "sm" | "md" | "lg";
  export type RadialProgressTone =
    | "primary"
    | "foreground"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "muted";

  export interface RadialProgressProps {
    value?: number;
    max?: number;
    valueLabel?: string;
    showValue?: boolean;
    tone?: RadialProgressTone;
    size?: RadialProgressSize;
    thickness?: RadialProgressThickness;
    animated?: boolean;
    ariaLabel?: string;
    ariaValueText?: string;
    children?: Snippet;
  }

  export const radialProgressDemo: RadialProgressProps = {
    value: 72,
    valueLabel: "72%",
    tone: "primary",
    size: "md",
    ariaLabel: "Storage used",
  };
</script>

<script lang="ts">
  const viewBoxSize = 120;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const sizeClasses: Record<RadialProgressSize, string> = {
    sm: "size-20",
    md: "size-28",
    lg: "size-32 md:size-36",
  };

  const thicknessValues: Record<RadialProgressThickness, number> = {
    sm: 6,
    md: 8,
    lg: 10,
  };

  const toneClasses: Record<RadialProgressTone, string> = {
    primary: "text-primary",
    foreground: "text-foreground",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    info: "text-info",
    muted: "text-muted-foreground",
  };

  let {
    value = 0,
    max = 100,
    valueLabel,
    showValue = true,
    tone = "primary",
    size = "md",
    thickness = "md",
    animated = true,
    ariaLabel,
    ariaValueText,
    children,
  }: RadialProgressProps = $props();

  let isVisible = $state(false);

  const safeMax = $derived(Number.isFinite(max) && max > 0 ? max : 100);
  const safeValue = $derived(Number.isFinite(value) ? value : 0);
  const clampedValue = $derived(Math.min(safeMax, Math.max(0, safeValue)));
  const percent = $derived((clampedValue / safeMax) * 100);
  const displayValue = $derived(valueLabel ?? `${Math.round(percent)}%`);
  const isDrawn = $derived(!animated || isVisible);
  const arcOffset = $derived(
    isDrawn ? circumference * (1 - percent / 100) : circumference,
  );
  const strokeWidth = $derived(thicknessValues[thickness]);
  const accessibleLabel = $derived(ariaLabel ?? "Progress");
  const accessibleValueText = $derived(ariaValueText ?? displayValue);

  function reveal(node: HTMLElement, enabled: boolean) {
    let observer: IntersectionObserver | undefined;

    function observe(nextEnabled: boolean) {
      observer?.disconnect();

      if (!nextEnabled || typeof IntersectionObserver === "undefined") {
        isVisible = true;
        return;
      }

      isVisible = false;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            isVisible = true;
            observer?.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(node);
    }

    observe(enabled);

    return {
      update(nextEnabled: boolean) {
        observe(nextEnabled);
      },
      destroy() {
        observer?.disconnect();
      },
    };
  }
</script>

<div
  data-slot="radial-progress"
  class={`relative inline-grid place-items-center ${sizeClasses[size]}`}
  role="progressbar"
  aria-label={accessibleLabel}
  aria-valuemin="0"
  aria-valuemax={safeMax}
  aria-valuenow={clampedValue}
  aria-valuetext={accessibleValueText}
  use:reveal={animated}
>
  <svg
    class={`size-full -rotate-90 ${toneClasses[tone]}`}
    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
    aria-hidden="true"
  >
    <circle
      cx={viewBoxSize / 2}
      cy={viewBoxSize / 2}
      r={radius}
      fill="none"
      stroke-width={strokeWidth}
      class="stroke-muted"
    />
    <circle
      cx={viewBoxSize / 2}
      cy={viewBoxSize / 2}
      r={radius}
      fill="none"
      stroke="currentColor"
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-dasharray={circumference}
      stroke-dashoffset={arcOffset}
      class="motion-progress-fill motion-reduce:transition-none"
    />
  </svg>

  {#if children || showValue}
    <div
      class="absolute inset-0 flex items-center justify-center text-foreground"
      aria-hidden="true"
    >
      {#if children}
        {@render children()}
      {:else}
        <span class="text-lg font-bold tabular-nums">{displayValue}</span>
      {/if}
    </div>
  {/if}
</div>
