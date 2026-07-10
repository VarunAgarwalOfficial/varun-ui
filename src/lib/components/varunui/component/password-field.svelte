<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { FullAutoFill } from "svelte/elements";

  export interface PasswordFieldProps {
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    placeholder?: string;
    autocomplete?: FullAutoFill;
    required?: boolean;
    disabled?: boolean;
    toggleLabel?: string;
    labelEnd?: Snippet;
  }

  export const passwordFieldDemo: PasswordFieldProps = {
    id: "auth-password-field1-demo",
    label: "Password",
    placeholder: "Enter your password",
    toggleLabel: "Toggle password visibility",
  };
</script>

<script lang="ts">
  import { Eye, EyeOff } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import { Field, FieldLabel } from "$lib/components/varunui/internal/ui/field/index.js";
  import Input from "$lib/components/varunui/component/input.svelte";

  const defaultAutocomplete = "current-password" satisfies FullAutoFill;

  let {
    id = "auth-password-field1-password",
    name = "password",
    value = $bindable(),
    label = "Password",
    placeholder,
    autocomplete = defaultAutocomplete,
    required = true,
    disabled = false,
    toggleLabel = "Toggle password visibility",
    labelEnd,
  }: PasswordFieldProps = $props();

  let showPassword = $state(false);
</script>

<Field
  data-slot="password-field"
  class="min-w-0 gap-2"
>
  <div class="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
    <FieldLabel for={id} class="w-auto min-w-0 flex-1">
      {label}
    </FieldLabel>
    {#if labelEnd}
      <div class="ml-auto shrink-0 whitespace-nowrap">
        {@render labelEnd()}
      </div>
    {/if}
  </div>

  <div class="relative min-w-0">
    <Input
      {id}
      {name}
      type={showPassword ? "text" : "password"}
      {placeholder}
      {autocomplete}
      {required}
      {disabled}
      bind:value
      class="pr-11"
    />
    <Button
      type="button"
      variant="quiet"
      iconOnly
      aria-label={toggleLabel}
      aria-controls={id}
      aria-pressed={showPassword}
      {disabled}
      onclick={() => (showPassword = !showPassword)}
      class="absolute right-1 top-1/2 size-9 -translate-y-1/2 rounded-md text-muted-foreground hover:text-foreground"
    >
      {#if showPassword}
        <EyeOff class="size-4" />
      {:else}
        <Eye class="size-4" />
      {/if}
    </Button>
  </div>
</Field>
