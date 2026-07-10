<script lang="ts" module>
  export interface HoldToConfirmProps {
    label: string;
    confirmedLabel: string;
    disabled?: boolean;
    onConfirm?: () => void;
  }

  export const holdToConfirmDemo: HoldToConfirmProps = {
    label: "Hold to delete",
    confirmedLabel: "Deleted",
  };
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { CheckIcon, TrashIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  type HoldState = "idle" | "holding" | "confirmed";

  let {
    label,
    confirmedLabel,
    disabled = false,
    onConfirm,
  }: HoldToConfirmProps = $props();

  let state = $state<HoldState>("idle");
  let holdTimer: ReturnType<typeof setTimeout> | undefined;
  let resetTimer: ReturnType<typeof setTimeout> | undefined;
  const instructionId = $props.id();

  const holding = $derived(state === "holding");
  const confirmed = $derived(state === "confirmed");

  function start() {
    if (disabled || state !== "idle") return;

    state = "holding";
    holdTimer = setTimeout(confirm, holdDurationMs());
  }

  function cancel() {
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = undefined;
    if (state !== "holding") return;
    state = "idle";
  }

  function confirm() {
    if (state !== "holding") return;

    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = undefined;
    state = "confirmed";
    onConfirm?.();
    resetTimer = setTimeout(() => {
      state = "idle";
    }, 1600);
  }

  function holdDurationMs() {
    const rawDuration = getComputedStyle(document.documentElement)
      .getPropertyValue("--motion-duration-hold")
      .trim();
    const duration = rawDuration.endsWith("ms")
      ? Number.parseFloat(rawDuration)
      : rawDuration.endsWith("s")
        ? Number.parseFloat(rawDuration) * 1000
        : Number.NaN;

    return Number.isFinite(duration) && duration > 0 ? duration : 1200;
  }

  $effect(() => {
    if (disabled) cancel();
  });

  onDestroy(() => {
    if (holdTimer) clearTimeout(holdTimer);
    if (resetTimer) clearTimeout(resetTimer);
  });
</script>

<Button
  type="button"
  variant="danger"
  {disabled}
  aria-label={confirmed ? confirmedLabel : label}
  aria-describedby={instructionId}
  onpointerdown={(event) => event.button === 0 && start()}
  onpointerup={cancel}
  onpointerleave={cancel}
  onpointercancel={cancel}
  onblur={cancel}
  onkeydown={(event) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) {
      event.preventDefault();
      start();
    }
  }}
  onkeyup={(event) => {
    if (event.key === " " || event.key === "Enter") cancel();
  }}
  class="relative isolate touch-none overflow-hidden border-danger/40"
>
  <span class="relative z-10 inline-flex items-center gap-2">
    {#if confirmed}
      <CheckIcon aria-hidden="true" />
      {confirmedLabel}
    {:else}
      <TrashIcon aria-hidden="true" />
      {label}
    {/if}
  </span>

  <span
    aria-hidden="true"
    class={`absolute inset-y-0 left-0 z-0 bg-danger/25 ${holding ? "hold-fill" : "w-0"}`}
  ></span>
  <span id={instructionId} class="sr-only" aria-live="polite">
    {holding
      ? "Keep holding"
      : confirmed
        ? confirmedLabel
        : "Press and hold to confirm. Releasing cancels."}
  </span>
</Button>

<style>
  .hold-fill {
    transition: width var(--motion-duration-hold) linear;
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    .hold-fill {
      transition-timing-function: steps(4, end);
    }
  }
</style>
