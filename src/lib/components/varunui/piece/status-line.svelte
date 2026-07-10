<script lang="ts" module>
  export type StatusTone = "success" | "warning" | "danger" | "info" | "muted";

  export type StatusLineSize = "sm" | "md";

  export interface StatusLineProps {
    label: string;
    description?: string;
    meta?: string;
    tone?: StatusTone;
    pulse?: boolean;
    size?: StatusLineSize;
  }

  export const statusLineDemo: StatusLineProps = {
    label: "All systems operational",
    description: "Last checked 38 seconds ago",
    meta: "Live",
    tone: "success",
    pulse: true,
  };
</script>

<script lang="ts">
  const sizeClasses: Record<StatusLineSize, string> = {
    sm: "gap-2.5 py-2",
    md: "gap-3 py-3",
  };

  const toneClasses: Record<StatusTone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    muted: "bg-muted-foreground",
  };

  let {
    label,
    description,
    meta,
    tone = "success",
    pulse = false,
    size = "md",
  }: StatusLineProps = $props();
</script>

<div class={`flex min-w-0 items-start border-b border-border last:border-b-0 ${sizeClasses[size]}`}>
  <span class="relative mt-1.5 inline-flex size-2 shrink-0" aria-hidden="true">
    {#if pulse}
      <span
        class={`absolute inline-flex size-full rounded-full opacity-60 motion-ping ${toneClasses[tone]}`}
      ></span>
    {/if}
    <span class={`relative inline-flex size-full rounded-full ${toneClasses[tone]}`}
    ></span>
  </span>
  <div class="min-w-0 flex-1">
    <p class="text-sm font-semibold text-foreground">{label}</p>
    {#if description}
      <p class="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</p>
    {/if}
  </div>
  {#if meta}
    <span class="shrink-0 font-mono text-xs text-muted-foreground">{meta}</span>
  {/if}
</div>
