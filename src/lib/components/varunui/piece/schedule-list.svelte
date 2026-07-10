<script lang="ts" module>
  export type ScheduleListTone =
    "primary" | "info" | "success" | "warning" | "danger" | "muted";

  export interface ScheduleListItem {
    time: string;
    title: string;
    description?: string;
    tone?: ScheduleListTone;
    disabled?: boolean;
  }

  export interface ScheduleListProps {
    title?: string;
    dateLabel?: string;
    items?: ScheduleListItem[];
    emptyLabel?: string;
    ariaLabel?: string;
  }

  export const scheduleListDemo: ScheduleListProps = {
    title: "Today",
    dateLabel: "Tue, 12 May",
    items: [
      { time: "09:00", title: "New member intake", tone: "primary" },
      { time: "11:30", title: "Care plan review", tone: "success" },
      { time: "14:00", title: "Billing sync", tone: "warning" },
    ],
  };
</script>

<script lang="ts">
  const toneClasses: Record<ScheduleListTone, string> = {
    primary: "bg-primary",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    muted: "bg-muted-foreground",
  };

  let {
    title,
    dateLabel,
    items = [],
    emptyLabel = "Nothing scheduled.",
    ariaLabel,
  }: ScheduleListProps = $props();

  const resolvedLabel = $derived(
    (ariaLabel ?? [title, dateLabel].filter(Boolean).join(", ")) || "Schedule",
  );
</script>

<section
  data-slot="schedule-list"
  class="w-full border-y border-border"
  aria-label={resolvedLabel}
>
  {#if title || dateLabel}
    <header class="flex items-baseline justify-between gap-4 border-b px-4 py-3">
      {#if title}
        <h3 class="text-base font-semibold text-foreground">{title}</h3>
      {/if}
      {#if dateLabel}
        <span class="text-sm text-muted-foreground">{dateLabel}</span>
      {/if}
    </header>
  {/if}

  {#if items.length > 0}
    <ol class="divide-y">
      {#each items as item, index (`${item.time}-${item.title}-${index}`)}
        {@const tone = item.tone ?? "primary"}
        <li
          class={`grid grid-cols-[3.5rem_auto_minmax(0,1fr)] items-start gap-3 px-4 py-3 ${item.disabled ? "opacity-50" : ""}`}
        >
          <time class="font-mono text-sm tabular-nums text-muted-foreground">
            {item.time}
          </time>
          <span
            class={`mt-1.5 size-2 rounded-full ${toneClasses[tone]}`}
            aria-hidden="true"
          ></span>
          <span class="min-w-0">
            <span class="block text-sm font-medium text-foreground">{item.title}</span>
            {#if item.description}
              <span class="mt-0.5 block text-xs leading-normal text-muted-foreground">
                {item.description}
              </span>
            {/if}
          </span>
        </li>
      {/each}
    </ol>
  {:else}
    <p class="px-4 py-6 text-sm text-muted-foreground">{emptyLabel}</p>
  {/if}
</section>
