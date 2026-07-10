<script lang="ts" module>
  export interface MediaCaptionProps {
    title: string;
    description?: string;
    index?: string;
    credit?: string;
  }

  export const mediaCaptionDemo: MediaCaptionProps = {
    index: "Fig. 04",
    title: "The first working prototype",
    description: "Machined aluminium, paper controls, and one very long afternoon.",
    credit: "Studio archive",
  };
</script>

<script lang="ts">
  let { title, description, index, credit }: MediaCaptionProps = $props();
</script>

<div
  data-slot="media-caption"
  class="grid gap-3 border-t border-border pt-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-5"
>
  {#if index}
    <span class="font-mono text-xs text-primary">{index}</span>
  {/if}
  <div class="min-w-0">
    <p class="text-sm font-semibold text-foreground">{title}</p>
    {#if description}
      <p class="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
    {/if}
  </div>
  {#if credit}
    <span class="font-mono text-xs text-muted-foreground sm:text-right">{credit}</span>
  {/if}
</div>
