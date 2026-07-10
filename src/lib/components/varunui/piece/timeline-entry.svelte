<script lang="ts" module>
  export type TimelineEntryTone = "primary" | "muted";

  export interface TimelineEntryProps {
    marker: string;
    title: string;
    description?: string;
    meta?: string;
    last?: boolean;
    tone?: TimelineEntryTone;
  }

  export const timelineEntryDemo: TimelineEntryProps = {
    marker: "03",
    title: "Review the final proof",
    description: "Check the responsive states and approve the release candidate.",
    meta: "Today",
  };
</script>

<script lang="ts">
  const markerClasses: Record<TimelineEntryTone, string> = {
    primary: "border-primary bg-primary text-background",
    muted: "border-border bg-muted text-foreground",
  };

  let {
    marker,
    title,
    description,
    meta,
    last = false,
    tone = "primary",
  }: TimelineEntryProps = $props();
</script>

<div class="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4">
  <div class="relative flex justify-center">
    <span
      class={`relative z-10 grid size-9 place-items-center rounded-full border font-mono text-xs font-semibold ${markerClasses[tone]}`}
    >
      {marker}
    </span>
    {#if !last}
      <span class="absolute bottom-0 top-9 w-px bg-border" aria-hidden="true"></span>
    {/if}
  </div>
  <div class={last ? "pb-0" : "pb-8"}>
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h3 class="text-sm font-semibold text-foreground">{title}</h3>
      {#if meta}
        <span class="font-mono text-xs text-muted-foreground">{meta}</span>
      {/if}
    </div>
    {#if description}
      <p class="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
    {/if}
  </div>
</div>
