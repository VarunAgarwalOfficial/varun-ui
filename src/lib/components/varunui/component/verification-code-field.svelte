<script lang="ts" module>
  export interface VerificationCodeFieldProps {
    id?: string;
    label?: string;
    description?: string;
    value?: string;
    length?: number;
    disabled?: boolean;
    invalid?: boolean;
    onComplete?: (value: string) => void;
  }

  export const verificationCodeFieldDemo: VerificationCodeFieldProps = {
    label: "Verification code",
    description: "Enter the six digits from your email.",
    length: 6,
  };
</script>

<script lang="ts">
  import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "$lib/components/varunui/internal/ui/field/index.js";
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "$lib/components/varunui/internal/ui/input-otp/index.js";

  let {
    id = "verification-code",
    label,
    description,
    value = $bindable(""),
    length = 6,
    disabled = false,
    invalid = false,
    onComplete,
  }: VerificationCodeFieldProps = $props();

  let lastCompletedValue = "";

  $effect(() => {
    if (value.length === length && value !== lastCompletedValue) {
      lastCompletedValue = value;
      onComplete?.(value);
    }

    if (value.length < length) lastCompletedValue = "";
  });
</script>

<Field data-slot="verification-code-field">
  {#if label}
    <FieldLabel for={id}>{label}</FieldLabel>
  {/if}

  <InputOTP
    {id}
    bind:value
    maxlength={length}
    {disabled}
    aria-invalid={invalid || undefined}
    class="justify-start"
  >
    {#snippet children({ cells })}
      <InputOTPGroup>
        {#each cells as cell}
          <InputOTPSlot {cell} />
        {/each}
      </InputOTPGroup>
    {/snippet}
  </InputOTP>

  {#if description}
    <FieldDescription>{description}</FieldDescription>
  {/if}
</Field>
