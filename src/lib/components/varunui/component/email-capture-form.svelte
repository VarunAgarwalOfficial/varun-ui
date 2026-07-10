<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface EmailCaptureFormProps {
    id: string;
    label: string;
    placeholder: string;
    buttonLabel: string;
    description?: string;
    value?: string;
    consent?: string;
    children?: Snippet;
  }

  export const emailCaptureFormDemo: EmailCaptureFormProps = {
    id: "email-capture-form1-demo-email",
    label: "Newsletter email",
    description: "Monthly product notes and design-system updates.",
    placeholder: "you@example.com",
    buttonLabel: "Subscribe",
    consent: "No noise, unsubscribe anytime.",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Input from "$lib/components/varunui/component/input.svelte";

  let {
    id,
    label,
    placeholder,
    buttonLabel,
    description,
    value = $bindable(""),
    consent,
    children,
  }: EmailCaptureFormProps = $props();

  const descriptionId = $derived(
    description ? `${id}-description` : undefined,
  );
  const consentId = $derived(
    consent || children ? `${id}-consent` : undefined,
  );
  const describedBy = $derived(
    [descriptionId, consentId].filter(Boolean).join(" ") || undefined,
  );

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
</script>

<form
  data-slot="email-capture-form"
  class="grid w-full min-w-0 gap-3"
  onsubmit={handleSubmit}
>
  <label for={id} class="sr-only">{label}</label>

  {#if description}
    <p id={descriptionId} class="text-sm leading-relaxed text-muted-foreground">
      {description}
    </p>
  {/if}

  <div class="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
    <Input
      {id}
      bind:value
      type="email"
      inputmode="email"
      autocomplete="email"
      {placeholder}
      aria-describedby={describedBy}
      class="motion-colors h-[var(--control-height-md)] w-full min-w-0 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50"
    />

    <Button
      type="submit"
      size="lg"
      class="h-[var(--control-height-md)] w-full min-w-0 whitespace-normal px-4 leading-snug sm:w-auto"
    >
      {buttonLabel}
    </Button>
  </div>

  {#if consent || children}
    <div
      id={consentId}
      class="grid gap-1 text-sm leading-relaxed text-muted-foreground"
    >
      {#if consent}
        <p>{consent}</p>
      {/if}
      {@render children?.()}
    </div>
  {/if}
</form>
