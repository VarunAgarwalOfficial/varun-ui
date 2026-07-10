<script lang="ts" module>
  import type { Snippet } from "svelte";
  export type CheckboxFieldMessageTone = "neutral" | "error";

  export interface CheckboxFieldProps {
    id?: string;
    checked?: boolean;
    indeterminate?: boolean;
    label: string | Snippet;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    message?: string;
    messageTone?: CheckboxFieldMessageTone;
    name?: string;
    value?: string;
    onCheckedChange?: (checked: boolean) => void;
  }

  export const checkboxFieldDemo: CheckboxFieldProps = {
    label: "Email me product updates",
    description: "Receive a short monthly note when new components ship.",
    checked: true,
  };
</script>

<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import { Check, Minus } from "$lib/components/varunui/internal/icons/phosphor.js";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-checkbox`,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    label,
    description,
    required = false,
    disabled = false,
    invalid = false,
    message,
    messageTone = "neutral",
    name,
    value,
    onCheckedChange,
  }: CheckboxFieldProps = $props();

  const descriptionId = $derived(description ? `${id}-description` : undefined);
  const messageId = $derived(message ? `${id}-message` : undefined);
  const describedBy = $derived(
    [descriptionId, messageId].filter(Boolean).join(" ") || undefined,
  );
  const isInvalid = $derived(Boolean(invalid || messageTone === "error"));
  const messageClass = $derived(
    messageTone === "error" ? "text-danger" : "text-muted-foreground",
  );

  function chooseChecked(nextChecked: boolean) {
    checked = nextChecked;
    onCheckedChange?.(nextChecked);
  }
</script>

<label
  for={id}
  data-slot="checkbox-field"
  class="group/field flex items-start gap-3 text-sm leading-none"
  data-disabled={disabled || undefined}
  data-invalid={isInvalid || undefined}
>
  <CheckboxPrimitive.Root
    {id}
    data-slot="checkbox"
    bind:checked
    bind:indeterminate
    {name}
    {value}
    required={required || undefined}
    {disabled}
    aria-describedby={describedBy}
    aria-invalid={isInvalid ? "true" : undefined}
    onCheckedChange={chooseChecked}
    class="peer relative mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border border-border motion-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 data-checked:border-primary data-checked:bg-primary data-checked:text-background disabled:cursor-not-allowed disabled:opacity-50 group-has-disabled/field:opacity-50"
  >
    {#snippet children({ checked, indeterminate })}
      <div
        data-slot="checkbox-indicator"
        class="grid place-content-center text-current [&>svg]:size-3.5"
      >
        {#if checked}
          <Check />
        {:else if indeterminate}
          <Minus />
        {/if}
      </div>
    {/snippet}
  </CheckboxPrimitive.Root>
  <span class="grid gap-1">
    <span class="font-medium text-foreground">
      {#if typeof label === "function"}
        {@render label()}
      {:else}
        {label}
      {/if}
    </span>
    {#if description}
      <span id={descriptionId} class="text-muted-foreground">
        {description}
      </span>
    {/if}
    {#if message}
      <span id={messageId} class={`text-xs leading-normal ${messageClass}`}>
        {message}
      </span>
    {/if}
  </span>
</label>
