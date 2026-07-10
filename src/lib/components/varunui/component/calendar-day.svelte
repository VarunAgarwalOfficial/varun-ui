<script lang="ts" module>
  export type CalendarDayTone =
    | "primary"
    | "foreground"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "muted";
  export type CalendarDayRange = "none" | "single" | "start" | "middle" | "end";

  export interface CalendarDayEventDot {
    tone?: CalendarDayTone;
    label?: string;
  }

  export interface CalendarDayProps {
    day?: number;
    ariaLabel?: string;
    empty?: boolean;
    today?: boolean;
    selected?: boolean;
    highlighted?: boolean;
    disabled?: boolean;
    range?: CalendarDayRange;
    events?: CalendarDayEventDot[];
    tabindex?: number;
    onSelect?: (day: number) => void;
    onFocus?: (day: number) => void;
  }

  export const calendarDayDemo: CalendarDayProps = {
    day: 23,
    ariaLabel: "April 23, 2026, today, three events",
    today: true,
    events: [
      { tone: "info", label: "Work event" },
      { tone: "primary", label: "Personal event" },
      { tone: "success", label: "Health event" },
    ],
  };
</script>

<script lang="ts">
  const rangeClasses: Record<CalendarDayRange, string> = {
    none: "",
    single: "rounded-lg bg-primary/15",
    start: "rounded-l-lg bg-primary/15",
    middle: "bg-primary/15",
    end: "rounded-r-lg bg-primary/15",
  };

  const eventToneClasses: Record<CalendarDayTone, string> = {
    primary: "bg-primary",
    foreground: "bg-foreground",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    muted: "bg-muted-foreground",
  };

  let {
    day,
    ariaLabel,
    empty = false,
    today = false,
    selected = false,
    highlighted = false,
    disabled = false,
    range = "none",
    events = [],
    tabindex = -1,
    onSelect,
    onFocus,
  }: CalendarDayProps = $props();

  let safeEvents = $derived(events.slice(0, 3));
  let eventSummary = $derived(
    events.map((event) => event.label).filter(Boolean).join(", "),
  );
  let resolvedLabel = $derived(
    ariaLabel ??
      (day === undefined
        ? undefined
        : eventSummary
          ? `${day}, ${eventSummary}`
          : `${day}`),
  );
  let stateClass = $derived(
    selected
      ? "bg-primary font-semibold text-background"
      : today
        ? "bg-foreground font-semibold text-background"
        : highlighted
          ? "bg-info/10 font-semibold text-info"
          : "text-foreground hover:bg-muted",
  );
</script>

<div
  data-slot="calendar-day"
  class={`relative flex h-[var(--control-height-xs)] min-w-0 items-center justify-center ${rangeClasses[range]}`}
  role="gridcell"
  aria-selected={selected}
  aria-current={today ? "date" : undefined}
>
  {#if empty || day === undefined}
    <span aria-hidden="true"></span>
  {:else}
    <button
      type="button"
      data-calendar-day={day}
      class={`motion-interactive inline-flex min-h-7 min-w-7 flex-col items-center justify-center gap-0.5 rounded-lg px-1.5 font-mono text-sm tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-primary/50 ${stateClass}`}
      aria-label={resolvedLabel}
      aria-pressed={selected}
      aria-current={today ? "date" : undefined}
      {disabled}
      {tabindex}
      onclick={() => onSelect?.(day)}
      onfocus={() => onFocus?.(day)}
    >
      <span>{day}</span>
      {#if safeEvents.length > 0}
        <span class="flex items-center gap-0.5" aria-hidden="true">
          {#each safeEvents as event, index (index)}
            <span
              class={`size-1 rounded-full ${selected || today ? "bg-background/80" : eventToneClasses[event.tone ?? "primary"]}`}
            ></span>
          {/each}
        </span>
      {/if}
    </button>
  {/if}
</div>
