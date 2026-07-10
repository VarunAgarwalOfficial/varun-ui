<script lang="ts" module>
  import type { HTMLTextareaAttributes } from "svelte/elements";

  export type TextareaFieldAutocomplete =
    HTMLTextareaAttributes["autocomplete"];
  export type TextareaFieldMessageTone = "neutral" | "success" | "error";
  export type TextareaFieldResize = "vertical" | "none";

  export interface TextareaFieldProps {
    id: string;
    name?: string;
    value?: string;
    label: string;
    description?: string;
    placeholder?: string;
    rows?: number;
    autocomplete?: TextareaFieldAutocomplete;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    message?: string;
    messageTone?: TextareaFieldMessageTone;
    resize?: TextareaFieldResize;
    spellcheck?: boolean;
    onValueChange?: (value: string) => void;
  }

  export const textareaFieldDemo: TextareaFieldProps = {
    id: "textarea-field1-demo",
    label: "Notes",
    description: "Add context that will help collaborators understand this item.",
    placeholder: "Write a short note",
    value: "Ship the compact version first, then expand the filters.",
    rows: 4,
  };
</script>

<script lang="ts">
  import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";

  let {
    id,
    name,
    value = $bindable(""),
    label,
    description,
    placeholder,
    rows,
    autocomplete,
    required,
    disabled,
    readonly,
    invalid,
    message,
    messageTone = "neutral",
    resize = "vertical",
    spellcheck,
    onValueChange,
  }: TextareaFieldProps = $props();

  const descriptionId = $derived(
    description ? `${id}-description` : undefined,
  );
  const messageId = $derived(message ? `${id}-message` : undefined);
  const describedBy = $derived(
    [descriptionId, messageId].filter(Boolean).join(" ") || undefined,
  );
  const isInvalid = $derived(Boolean(invalid || messageTone === "error"));
  const textareaClass = $derived(
    [
      "motion-colors min-h-24 w-full min-w-0 rounded-lg border bg-background px-3 py-2 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground read-only:cursor-default disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
      resize === "none" ? "resize-none" : "resize-y",
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
  data-slot="textarea-field"
  data-disabled={disabled || undefined}
  data-invalid={isInvalid || undefined}
  class="min-w-0"
>
  <FieldLabel for={id}>{label}</FieldLabel>
  {#if description}
    <FieldDescription id={descriptionId}>{description}</FieldDescription>
  {/if}

  <textarea
    {id}
    {name}
    value={value}
    {placeholder}
    {rows}
    {autocomplete}
    {required}
    {disabled}
    readonly={readonly || undefined}
    aria-describedby={describedBy}
    aria-invalid={isInvalid ? "true" : undefined}
    {spellcheck}
    oninput={(event) =>
      updateValue((event.currentTarget as HTMLTextAreaElement).value)}
    class={textareaClass}
  ></textarea>

  {#if message}
    <p id={messageId} class={`text-xs leading-normal ${messageClass}`}>
      {message}
    </p>
  {/if}
</Field>
