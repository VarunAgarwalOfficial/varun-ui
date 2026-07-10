<script lang="ts" module>
  import type { HTMLInputAttributes } from "svelte/elements";

  export type InputFieldType =
    "text" | "email" | "url" | "tel" | "password" | "number";
  export type InputFieldAutocomplete = HTMLInputAttributes["autocomplete"];
  export type InputFieldMessageTone = "neutral" | "success" | "error";

  export interface InputFieldProps {
    id?: string;
    name?: string;
    value?: string;
    label: string;
    description?: string;
    placeholder?: string;
    type?: InputFieldType;
    autocomplete?: InputFieldAutocomplete;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    message?: string;
    messageTone?: InputFieldMessageTone;
    min?: HTMLInputAttributes["min"];
    max?: HTMLInputAttributes["max"];
    step?: HTMLInputAttributes["step"];
    pattern?: HTMLInputAttributes["pattern"];
    onValueChange?: (value: string) => void;
  }

  export const inputFieldDemo: InputFieldProps = {
    id: "input-field1-demo",
    label: "Display name",
    description: "Shown anywhere your profile is visible.",
    placeholder: "Enter a name",
    value: "Varun",
  };
</script>

<script lang="ts">
  import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-input`,
    name,
    value = $bindable(""),
    label,
    description,
    placeholder,
    type = "text",
    autocomplete,
    required,
    disabled,
    readonly,
    invalid,
    message,
    messageTone = "neutral",
    min,
    max,
    step,
    pattern,
    onValueChange,
  }: InputFieldProps = $props();

  const descriptionId = $derived(description ? `${id}-description` : undefined);
  const messageId = $derived(message ? `${id}-message` : undefined);
  const describedBy = $derived(
    [descriptionId, messageId].filter(Boolean).join(" ") || undefined,
  );
  const isInvalid = $derived(Boolean(invalid || messageTone === "error"));
  const inputClass = $derived(
    [
      "motion-colors h-[var(--control-height-md)] w-full min-w-0 rounded-lg border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground read-only:cursor-default disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
      isInvalid
        ? "border-danger/55 focus-visible:border-danger focus-visible:ring-3 focus-visible:ring-danger/20"
        : "border-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50",
    ].join(" "),
  );
  const messageClass = $derived(
    messageTone === "success"
      ? "text-success"
      : messageTone === "error"
        ? "text-danger"
        : "text-muted-foreground",
  );

  function updateValue(nextValue: string) {
    if (readonly) return;

    value = nextValue;
    onValueChange?.(nextValue);
  }
</script>

<Field
  data-slot="input-field"
  data-disabled={disabled || undefined}
  data-invalid={isInvalid || undefined}
  class="min-w-0"
>
  <FieldLabel for={id}>{label}</FieldLabel>
  {#if description}
    <FieldDescription id={descriptionId}>{description}</FieldDescription>
  {/if}

  <input
    {id}
    {name}
    {type}
    {value}
    {placeholder}
    {autocomplete}
    {required}
    {disabled}
    readonly={readonly || undefined}
    aria-describedby={describedBy}
    aria-invalid={isInvalid ? "true" : undefined}
    {min}
    {max}
    {step}
    {pattern}
    oninput={(event) =>
      updateValue((event.currentTarget as HTMLInputElement).value)}
    class={inputClass}
  />

  {#if message}
    <p id={messageId} class={`text-xs leading-normal ${messageClass}`}>
      {message}
    </p>
  {/if}
</Field>
