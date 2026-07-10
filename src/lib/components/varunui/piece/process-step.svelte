<script lang="ts" module>
  import type { Component } from "svelte";

  export interface ProcessStepProps {
    marker?: string | number;
    icon?: Component;
    title: string;
    description?: string;
    meta?: string;
  }

  export const processStepDemo: ProcessStepProps = {
    marker: "01",
    title: "Scope the work",
    description:
      "Clarify the goal, constraints, and sequence before committing the team to a build path.",
    meta: "1 week",
  };
</script>

<script lang="ts">
  let {
    marker,
    icon,
    title,
    description,
    meta,
  }: ProcessStepProps = $props();
</script>

<div class="flex items-start gap-4">
  <span
    class="flex size-10 shrink-0 items-center justify-center border border-border bg-background text-sm font-semibold text-foreground"
    aria-hidden="true"
  >
    {#if icon}
      {@const Icon = icon}
      <Icon class="size-5" />
    {:else if marker !== undefined}
      {marker}
    {/if}
  </span>

  <div class="min-w-0 flex-1">
    <h3 class="font-semibold text-foreground">{title}</h3>

    {#if description}
      <p class="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    {/if}

    {#if meta}
      <p class="mt-3 text-xs font-semibold text-muted-foreground">{meta}</p>
    {/if}
  </div>
</div>
