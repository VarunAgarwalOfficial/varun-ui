<script lang="ts" module>
  export type LabelValueOrientation = "stacked" | "inline";
  export type LabelValueTone = "default" | "primary";

  export interface LabelValueProps {
    label: string;
    value: string;
    description?: string;
    orientation?: LabelValueOrientation;
    tone?: LabelValueTone;
  }

  export const labelValueDemo: LabelValueProps = {
    label: "Plan",
    value: "Studio",
    description: "Renews 18 August",
  };
</script>

<script lang="ts">
  const orientationClasses: Record<LabelValueOrientation, string> = {
    stacked: "flex-col items-start gap-1",
    inline: "items-baseline justify-between gap-4",
  };

  const valueClasses: Record<LabelValueTone, string> = {
    default: "text-foreground",
    primary: "text-primary",
  };

  let {
    label,
    value,
    description,
    orientation = "stacked",
    tone = "default",
  }: LabelValueProps = $props();
</script>

<dl class={`flex min-w-0 ${orientationClasses[orientation]}`}>
  <dt class="text-xs font-medium uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">
    {label}
  </dt>
  <dd class={`min-w-0 text-sm font-semibold ${valueClasses[tone]}`}>
    {value}
  </dd>
  {#if description}
    <dd class="text-xs leading-5 text-muted-foreground">{description}</dd>
  {/if}
</dl>
