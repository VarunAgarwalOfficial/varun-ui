<script lang="ts" module>
  import type {
    CalendarDayEventDot,
    CalendarDayRange,
  } from "./calendar-day.svelte";

  export interface CalendarGridDay {
    day: number;
    ariaLabel?: string;
    today?: boolean;
    selected?: boolean;
    highlighted?: boolean;
    disabled?: boolean;
    events?: CalendarDayEventDot[];
  }

  export interface CalendarGridRange {
    start: number;
    end: number;
  }

  export interface CalendarGridProps {
    weekdays: string[];
    startWeekday: number;
    days: CalendarGridDay[];
    today?: number;
    selectedDay?: number;
    highlightedDays?: number[];
    range?: CalendarGridRange;
    eventsByDay?: Record<number, CalendarDayEventDot[]>;
    monthLabel?: string;
    yearLabel?: string | number;
    ariaLabel?: string;
    onDaySelect?: (day: number) => void;
  }

  export const calendarGridDemo: CalendarGridProps = {
    weekdays: ["M", "T", "W", "T", "F", "S", "S"],
    startWeekday: 2,
    days: Array.from({ length: 30 }, (_, index) => ({ day: index + 1 })),
    today: 23,
    highlightedDays: [7, 14, 28],
    monthLabel: "April",
    yearLabel: 2026,
    ariaLabel: "April 2026 calendar",
  };
</script>

<script lang="ts">
  import CalendarDay from "./calendar-day.svelte";

  let {
    weekdays,
    startWeekday,
    days,
    today,
    selectedDay = $bindable(),
    highlightedDays = [],
    range,
    eventsByDay = {},
    monthLabel,
    yearLabel,
    ariaLabel,
    onDaySelect,
  }: CalendarGridProps = $props();

  let grid: HTMLDivElement;
  let focusDay = $state<number>();

  let normalizedWeekdays = $derived(weekdays.slice(0, 7));
  let highlightedSet = $derived(new Set(highlightedDays));
  let rangeStart = $derived(range ? Math.min(range.start, range.end) : undefined);
  let rangeEnd = $derived(range ? Math.max(range.start, range.end) : undefined);
  let cells = $derived.by(() => {
    const leading = Math.max(0, Math.min(6, startWeekday));
    const result: (CalendarGridDay | null)[] = Array.from(
      { length: leading },
      () => null,
    );
    result.push(...days);
    while (result.length % 7 !== 0) result.push(null);
    return result;
  });
  let enabledDays = $derived(days.filter((day) => !day.disabled));
  let rovingDay = $derived(
    focusDay ??
      selectedDay ??
      today ??
      enabledDays[0]?.day,
  );
  let calendarName = $derived(
    [monthLabel, yearLabel]
      .filter((part) => part !== undefined && part !== "")
      .join(" "),
  );
  let resolvedLabel = $derived(
    ariaLabel ?? (calendarName || "Calendar"),
  );

  function rangePosition(day: number): CalendarDayRange {
    if (rangeStart === undefined || rangeEnd === undefined) return "none";
    if (day < rangeStart || day > rangeEnd) return "none";
    if (rangeStart === rangeEnd) return "single";
    if (day === rangeStart) return "start";
    if (day === rangeEnd) return "end";
    return "middle";
  }

  function labelFor(day: CalendarGridDay) {
    const parts = [
      day.ariaLabel ??
        [monthLabel, day.day, yearLabel]
          .filter((part) => part !== undefined && part !== "")
          .join(" "),
    ].filter(Boolean);
    if (day.today || day.day === today) parts.push("today");
    if (day.selected || day.day === selectedDay) parts.push("selected");
    const position = rangePosition(day.day);
    if (position === "start") parts.push("range start");
    if (position === "middle") parts.push("in range");
    if (position === "end") parts.push("range end");
    const eventLabels = (day.events ?? eventsByDay[day.day] ?? [])
      .map((event) => event.label)
      .filter(Boolean);
    if (eventLabels.length > 0) parts.push(eventLabels.join(", "));
    return parts.join(", ");
  }

  function selectDay(day: number) {
    selectedDay = day;
    focusDay = day;
    onDaySelect?.(day);
  }

  function focusButton(buttons: HTMLButtonElement[], index: number) {
    const button = buttons[index];
    if (!button) return;
    focusDay = Number(button.dataset.calendarDay);
    button.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      return;
    }
    const buttons = Array.from(
      grid.querySelectorAll<HTMLButtonElement>("[data-calendar-day]:not(:disabled)"),
    );
    const currentIndex = Math.max(0, buttons.indexOf(document.activeElement as HTMLButtonElement));
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -(currentIndex % 7),
      End: 6 - (currentIndex % 7),
    };
    event.preventDefault();
    focusButton(
      buttons,
      Math.max(0, Math.min(buttons.length - 1, currentIndex + offsets[event.key])),
    );
  }
</script>

<div
  bind:this={grid}
  data-slot="calendar-grid"
  class="grid w-full grid-cols-7 gap-1 text-center"
  role="grid"
  aria-label={resolvedLabel}
  tabindex="-1"
  onkeydown={handleKeydown}
>
  {#each normalizedWeekdays as weekday, index (index)}
    <span
      class="text-xs font-medium uppercase tracking-[var(--tracking-label)] text-muted-foreground"
      role="columnheader"
    >
      {weekday}
    </span>
  {/each}

  {#each cells as cell, index (index)}
    {#if cell === null}
      <CalendarDay empty />
    {:else}
      {@const position = rangePosition(cell.day)}
      <CalendarDay
        day={cell.day}
        ariaLabel={labelFor(cell)}
        today={cell.today || cell.day === today}
        selected={
          cell.selected ||
          cell.day === selectedDay ||
          ["single", "start", "end"].includes(position)
        }
        highlighted={cell.highlighted || highlightedSet.has(cell.day)}
        disabled={cell.disabled}
        range={position}
        events={cell.events ?? eventsByDay[cell.day] ?? []}
        tabindex={cell.day === rovingDay ? 0 : -1}
        onSelect={selectDay}
        onFocus={(day) => (focusDay = day)}
      />
    {/if}
  {/each}
</div>
