<script lang="ts" module>
  import { CalendarDate, type DateValue } from "@internationalized/date";

  export interface DatePickerFieldProps {
    id?: string;
    name?: string;
    value?: DateValue;
    label: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    message?: string;
    minValue?: DateValue;
    maxValue?: DateValue;
    open?: boolean;
    onValueChange?: (value: DateValue | undefined) => void;
    onOpenChange?: (open: boolean) => void;
  }

  export const datePickerFieldDemo: DatePickerFieldProps = {
    id: "date-picker-field-demo",
    name: "review-date",
    label: "Review date",
    description: "Choose when the team should make this decision.",
    value: new CalendarDate(2026, 7, 10),
    open: true,
  };
</script>

<script lang="ts">
  import { DatePicker } from "bits-ui";
  import {
    Calendar,
    ChevronLeft,
    ChevronRight,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import { Field, FieldDescription } from "$lib/components/varunui/internal/ui/field/index.js";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-date-picker`,
    name,
    value = $bindable(),
    label,
    description,
    required = false,
    disabled = false,
    readonly = false,
    invalid = false,
    message,
    minValue,
    maxValue,
    open = $bindable(false),
    onValueChange,
    onOpenChange,
  }: DatePickerFieldProps = $props();

  const descriptionId = $derived(description ? `${id}-description` : undefined);
  const messageId = $derived(message ? `${id}-message` : undefined);
  const describedBy = $derived(
    [descriptionId, messageId].filter(Boolean).join(" ") || undefined,
  );

  function chooseValue(nextValue: DateValue | undefined) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function chooseOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
  }
</script>

<Field
  data-slot="date-picker-field"
  data-disabled={disabled || undefined}
  data-invalid={invalid || undefined}
  class="min-w-0"
>
  <DatePicker.Root
    bind:value
    bind:open
    {required}
    {disabled}
    {readonly}
    {minValue}
    {maxValue}
    weekdayFormat="short"
    weekStartsOn={1}
    fixedWeeks={true}
    calendarLabel={`${label} calendar`}
    onValueChange={chooseValue}
    onOpenChange={chooseOpen}
  >
    <DatePicker.Label class="text-sm font-medium text-foreground">
      {label}
    </DatePicker.Label>
    {#if description}
      <FieldDescription id={descriptionId}>{description}</FieldDescription>
    {/if}

    <DatePicker.Input
      {id}
      {name}
      aria-describedby={describedBy}
      aria-invalid={invalid ? "true" : undefined}
      class={`motion-colors flex h-[var(--control-height-md)] w-full min-w-0 select-none items-center rounded-lg border bg-background px-2 text-sm text-foreground outline-none focus-within:ring-3 ${invalid ? "border-danger/55 focus-within:border-danger focus-within:ring-danger/20" : "border-border focus-within:border-primary focus-within:ring-primary/50"}`}
    >
      {#snippet children({ segments })}
        {#each segments as { part, value: segmentValue }, index (`${part}-${index}`)}
          {#if part === "literal"}
            <DatePicker.Segment
              {part}
              class="select-none px-0.5 text-muted-foreground"
            >
              {segmentValue}
            </DatePicker.Segment>
          {:else}
            <DatePicker.Segment
              {part}
              class="motion-colors rounded-sm px-1.5 py-1 font-mono tabular-nums outline-none hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground"
            >
              {segmentValue}
            </DatePicker.Segment>
          {/if}
        {/each}
        <DatePicker.Trigger
          aria-label={`Open ${label} calendar`}
          class="motion-interactive ml-auto inline-grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
        >
          <Calendar class="size-4" aria-hidden="true" />
        </DatePicker.Trigger>
      {/snippet}
    </DatePicker.Input>

    <DatePicker.Portal>
      <DatePicker.Content
        side="bottom"
        align="end"
        sideOffset={6}
        class="z-50 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-background p-3 text-foreground outline-none data-closed:motion-popover-out data-open:motion-popover"
      >
        <DatePicker.Calendar>
        {#snippet children({ months, weekdays })}
          <DatePicker.Header class="mb-3 grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
            <DatePicker.PrevButton
              aria-label="Previous month"
              class="motion-interactive inline-grid size-8 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft class="size-4" aria-hidden="true" />
            </DatePicker.PrevButton>
            <DatePicker.Heading class="text-center text-sm font-semibold" />
            <DatePicker.NextButton
              aria-label="Next month"
              class="motion-interactive inline-grid size-8 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight class="size-4" aria-hidden="true" />
            </DatePicker.NextButton>
          </DatePicker.Header>

          {#each months as month (month.value.toString())}
            <DatePicker.Grid class="w-full border-collapse">
              <DatePicker.GridHead>
                <DatePicker.GridRow class="grid grid-cols-7">
                  {#each weekdays as day (day)}
                    <DatePicker.HeadCell
                      class="grid size-9 place-items-center font-mono text-[0.6875rem] font-medium uppercase text-muted-foreground"
                    >
                      {day}
                    </DatePicker.HeadCell>
                  {/each}
                </DatePicker.GridRow>
              </DatePicker.GridHead>
              <DatePicker.GridBody>
                {#each month.weeks as weekDates, weekIndex (weekIndex)}
                  <DatePicker.GridRow class="grid grid-cols-7">
                    {#each weekDates as date (date.toString())}
                      <DatePicker.Cell {date} month={month.value} class="size-9 p-0">
                        <DatePicker.Day
                          class="motion-colors inline-grid size-9 place-items-center rounded-md text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-primary/50 data-disabled:pointer-events-none data-disabled:opacity-35 data-outside-month:text-muted-foreground/45 data-selected:bg-primary data-selected:text-background data-today:font-semibold data-today:underline data-today:underline-offset-4"
                        />
                      </DatePicker.Cell>
                    {/each}
                  </DatePicker.GridRow>
                {/each}
              </DatePicker.GridBody>
            </DatePicker.Grid>
          {/each}
        {/snippet}
        </DatePicker.Calendar>
      </DatePicker.Content>
    </DatePicker.Portal>
  </DatePicker.Root>

  {#if message}
    <p
      id={messageId}
      class={`text-xs leading-normal ${invalid ? "text-danger" : "text-muted-foreground"}`}
    >
      {message}
    </p>
  {/if}
</Field>
