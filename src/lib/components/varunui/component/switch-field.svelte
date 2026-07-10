<script lang="ts" module>
  export type SwitchFieldMessageTone = "neutral" | "error";

  export interface SwitchFieldProps {
    id?: string;
    checked?: boolean;
    label: string;
    description?: string;
    disabled?: boolean;
    invalid?: boolean;
    message?: string;
    messageTone?: SwitchFieldMessageTone;
    name?: string;
    value?: string;
    onCheckedChange?: (checked: boolean) => void;
  }

  export const switchFieldDemo: SwitchFieldProps = {
    label: "Reduce motion",
    description: "Keep interface movement minimal while preserving state.",
    checked: false,
  };
</script>

<script lang="ts">
  import { Switch as SwitchPrimitive } from "bits-ui";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-switch`,
    checked = $bindable(false),
    label,
    description,
    disabled = false,
    invalid = false,
    message,
    messageTone = "neutral",
    name,
    value,
    onCheckedChange,
  }: SwitchFieldProps = $props();

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
  data-slot="switch-field"
  class="group/field flex items-center justify-between gap-4 text-sm"
  data-disabled={disabled || undefined}
  data-invalid={isInvalid || undefined}
>
  <span class="grid gap-1">
    <span class="font-medium leading-none text-foreground">{label}</span>
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
  <SwitchPrimitive.Root
    {id}
    bind:checked
    {disabled}
    {name}
    {value}
    aria-describedby={describedBy}
    aria-invalid={isInvalid ? "true" : undefined}
    onCheckedChange={chooseChecked}
    class="motion-colors relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-border bg-muted outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
  >
    <SwitchPrimitive.Thumb
      class="motion-transform block size-4 translate-x-1 rounded-full bg-background data-[state=checked]:translate-x-5"
    />
  </SwitchPrimitive.Root>
</label>
