<script lang="ts" module>
  import type { Component } from "svelte";

  export type RotatingTextSealSize = "sm" | "md" | "lg";

  export interface RotatingTextSealProps {
    text: string;
    icon?: Component;
    size?: RotatingTextSealSize;
    animated?: boolean;
  }

  export const rotatingTextSealDemo: RotatingTextSealProps = {
    text: "Made with intent • Built to be used • ",
    size: "md",
  };
</script>

<script lang="ts">
  import { AsteriskIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  const sizeClasses: Record<RotatingTextSealSize, string> = {
    sm: "size-20",
    md: "size-28",
    lg: "size-36",
  };

  let {
    text,
    icon: Icon = AsteriskIcon,
    size = "md",
    animated = false,
  }: RotatingTextSealProps = $props();

  const pathId = $props.id();
</script>

<div
  class={`relative grid shrink-0 place-items-center text-primary ${sizeClasses[size]}`}
>
  <svg
    viewBox="0 0 100 100"
    class={`size-full ${animated ? "motion-spin-in" : ""}`}
    aria-hidden="true"
  >
    <defs>
      <path
        id={pathId}
        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
        fill="none"
      />
    </defs>
    <text
      fill="currentColor"
      font-size="10.5"
      class="font-mono uppercase tracking-[0.18em]"
    >
      <textPath href={`#${pathId}`}>{text}</textPath>
    </text>
  </svg>
  <Icon class="absolute size-5" aria-hidden="true" />
  <span class="sr-only">{text}</span>
</div>
