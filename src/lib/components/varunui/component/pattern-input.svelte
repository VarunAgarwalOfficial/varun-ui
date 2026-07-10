<script lang="ts" module>
  export interface PatternInputProps {
    value?: number[];
    minLength?: number;
    clearLabel?: string;
    onValueChange?: (value: number[]) => void;
  }

  export const patternInputDemo: PatternInputProps = {
    minLength: 4,
    clearLabel: "Clear pattern",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";

  const gridSize = 3;
  const step = 80;
  const canvas = gridSize * step;

  let {
    value = $bindable<number[]>([]),
    minLength = 4,
    clearLabel = "Clear pattern",
    onValueChange,
  }: PatternInputProps = $props();

  const polylinePoints = $derived(
    value
      .map((index) => {
        const center = dotCenter(index);
        return `${center.x},${center.y}`;
      })
      .join(" "),
  );

  function dotCenter(index: number) {
    return {
      x: (index % gridSize) * step + step / 2,
      y: Math.floor(index / gridSize) * step + step / 2,
    };
  }

  function update(nextValue: number[]) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function select(index: number) {
    if (!value.includes(index)) update([...value, index]);
  }
</script>

<div data-slot="pattern-input" class="grid justify-items-center gap-[var(--layout-gap-lg)]">
  <div
    class="relative size-60 max-w-full"
    role="group"
    aria-label={`Pattern input. Select at least ${minLength} dots.`}
  >
    <svg
      viewBox={`0 0 ${canvas} ${canvas}`}
      class="pointer-events-none absolute inset-0 size-full text-primary"
      aria-hidden="true"
    >
      {#if value.length > 1}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      {/if}
    </svg>

    {#each Array.from({ length: gridSize * gridSize }) as _, index}
      {@const center = dotCenter(index)}
      {@const isActive = value.includes(index)}
      <button
        type="button"
        onclick={() => select(index)}
        aria-pressed={isActive}
        aria-label={`Pattern dot ${index + 1}`}
        style={`left: ${(center.x / canvas) * 100}%; top: ${(center.y / canvas) * 100}%;`}
        class="absolute grid size-[var(--control-height-lg)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
      >
        <span
          class={`rounded-full motion-interactive ${
            isActive
              ? "size-5 bg-primary ring-4 ring-primary/20"
              : "size-3.5 bg-muted-foreground/35"
          }`}
          aria-hidden="true"
        ></span>
      </button>
    {/each}
  </div>

  <p class="text-sm text-muted-foreground" aria-live="polite">
    {value.length} {value.length === 1 ? "dot" : "dots"} selected
  </p>

  <Button
    type="button"
    variant="quiet"
    size="sm"
    onclick={() => update([])}
    disabled={value.length === 0}
  >
    {clearLabel}
  </Button>
</div>
