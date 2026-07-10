<script lang="ts" module>
  export interface PinPadProps {
    length?: number;
    value?: string;
    backspaceLabel?: string;
    onValueChange?: (value: string) => void;
    onComplete?: (value: string) => void;
  }

  export const pinPadDemo: PinPadProps = {
    length: 4,
    backspaceLabel: "Delete last digit",
  };
</script>

<script lang="ts">
  import { Delete as BackspaceIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  let {
    length = 4,
    value = $bindable(""),
    backspaceLabel = "Delete last digit",
    onValueChange,
    onComplete,
  }: PinPadProps = $props();

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const safeLength = $derived(Math.max(1, Math.min(length, 8)));

  function update(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
    if (nextValue.length === safeLength) onComplete?.(nextValue);
  }

  function append(digit: string) {
    if (value.length < safeLength) update(`${value}${digit}`);
  }

  function backspace() {
    update(value.slice(0, -1));
  }
</script>

<div data-slot="pin-pad" class="grid gap-[var(--layout-gap-lg)] text-center">
  <div class="flex justify-center gap-3" aria-hidden="true">
    {#each Array.from({ length: safeLength }) as _, index}
      <span
        class={`size-3.5 rounded-full motion-colors ${
          index < value.length ? "bg-foreground" : "border bg-transparent"
        }`}
      ></span>
    {/each}
  </div>

  <p class="sr-only" aria-live="polite">
    {value.length} of {safeLength} digits entered
  </p>

  <div class="mx-auto grid w-fit grid-cols-3 place-items-center gap-4">
    {#each digits as digit}
      <Button
        variant="outline"
        size="lg"
        iconOnly
        class="rounded-full text-xl"
        aria-label={`Enter ${digit}`}
        onclick={() => append(digit)}
      >
        {digit}
      </Button>
    {/each}

    <span aria-hidden="true"></span>

    <Button
      variant="outline"
      size="lg"
      iconOnly
      class="rounded-full text-xl"
      aria-label="Enter 0"
      onclick={() => append("0")}
    >
      0
    </Button>

    <Button
      variant="quiet"
      size="lg"
      iconOnly
      class="rounded-full"
      aria-label={backspaceLabel}
      onclick={backspace}
      disabled={value.length === 0}
    >
      <BackspaceIcon class="size-6" aria-hidden="true" />
    </Button>
  </div>
</div>
