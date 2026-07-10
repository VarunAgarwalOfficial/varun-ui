<script lang="ts" module>
  export type ProgressMeterKind = "progress" | "meter";
  export type ProgressMeterTone =
    | "primary"
    | "foreground"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "muted";
  export type ProgressMeterSize = "xs" | "sm" | "md";

  export interface ProgressMeterProps {
    value?: number;
    max?: number;
    kind?: ProgressMeterKind;
    tone?: ProgressMeterTone;
    size?: ProgressMeterSize;
    ariaLabel?: string;
    ariaValueText?: string;
  }

  export const progressMeterDemo: ProgressMeterProps = {
    value: 68,
    max: 100,
    kind: "progress",
    tone: "primary",
    size: "sm",
    ariaLabel: "Progress",
  };
</script>

<script lang="ts">
  const toneClasses: Record<ProgressMeterTone, string> = {
    primary: "bg-primary",
    foreground: "bg-foreground",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    muted: "bg-muted-foreground",
  };

  const sizeClasses: Record<ProgressMeterSize, string> = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2.5",
  };

  let {
    value = 0,
    max = 100,
    kind = "progress",
    tone = "primary",
    size = "sm",
    ariaLabel,
    ariaValueText,
  }: ProgressMeterProps = $props();

  const safeMax = $derived(Number.isFinite(max) && max > 0 ? max : 100);
  const safeValue = $derived(Number.isFinite(value) ? value : 0);
  const clampedValue = $derived(Math.min(safeMax, Math.max(0, safeValue)));
  const scale = $derived(clampedValue / safeMax);
  const ariaRole = $derived(kind === "meter" ? "meter" : "progressbar");
  const accessibleLabel = $derived(
    ariaLabel ?? (kind === "meter" ? "Meter" : "Progress"),
  );
</script>

<div
  data-slot="progress-meter"
  class={`w-full overflow-hidden rounded-sm bg-muted ${sizeClasses[size]}`}
  role={ariaRole}
  aria-label={accessibleLabel}
  aria-valuemin="0"
  aria-valuemax={safeMax}
  aria-valuenow={clampedValue}
  aria-valuetext={ariaValueText}
>
  <span
    aria-hidden="true"
    class={`block h-full origin-left rounded-sm motion-progress-fill will-change-transform ${toneClasses[tone]}`}
    style:transform={`scaleX(${scale})`}
  ></span>
</div>
