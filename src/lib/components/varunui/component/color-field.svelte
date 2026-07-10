<script lang="ts" module>
  export type ColorFieldMessageTone = "neutral" | "error";

  export interface ColorFieldProps {
    id?: string;
    name?: string;
    value: string;
    label: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    message?: string;
    messageTone?: ColorFieldMessageTone;
    onValueChange?: (value: string) => void;
  }

  export const colorFieldDemo: ColorFieldProps = {
    id: "color-field-demo",
    label: "Accent",
    description: "Choose the primary interaction color.",
    value: "#6d5dfc", // token-drift-allow: raw-color; native color inputs require a literal value.
  };
</script>

<script lang="ts">
  const generatedId = $props.id();

  let {
    id = `${generatedId}-color`,
    name,
    value = $bindable(),
    label,
    description,
    required = false,
    disabled = false,
    invalid = false,
    message,
    messageTone = "neutral",
    onValueChange,
  }: ColorFieldProps = $props();

  const descriptionId = $derived(description ? `${id}-description` : undefined);
  const messageId = $derived(message ? `${id}-message` : undefined);
  const describedBy = $derived(
    [descriptionId, messageId].filter(Boolean).join(" ") || undefined,
  );
  const isInvalid = $derived(Boolean(invalid || messageTone === "error"));
  const messageClass = $derived(
    messageTone === "error" ? "text-danger" : "text-muted-foreground",
  );
  const inputClass = $derived(
    [
      "motion-colors size-9 shrink-0 cursor-pointer rounded-lg border bg-transparent p-0.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      isInvalid
        ? "border-danger/55 focus-visible:border-danger focus-visible:ring-3 focus-visible:ring-danger/20"
        : "border-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50",
    ].join(" "),
  );

  function updateValue(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
  }
</script>

<div
  data-slot="color-field"
  data-disabled={disabled || undefined}
  data-invalid={isInvalid || undefined}
  class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-background px-3 py-2"
>
  <span class="grid min-w-0 gap-1">
    <label for={id} class="truncate text-sm font-medium text-foreground">
      {label}
    </label>
    {#if description}
      <span
        id={descriptionId}
        class="truncate text-xs leading-normal text-muted-foreground"
      >
        {description}
      </span>
    {/if}
    {#if message}
      <span id={messageId} class={`text-xs leading-normal ${messageClass}`}>
        {message}
      </span>
    {/if}
  </span>

  <input
    {id}
    {name}
    type="color"
    value={value}
    required={required || undefined}
    {disabled}
    aria-describedby={describedBy}
    aria-invalid={isInvalid ? "true" : undefined}
    oninput={(event) =>
      updateValue((event.currentTarget as HTMLInputElement).value)}
    class={inputClass}
  />
</div>
