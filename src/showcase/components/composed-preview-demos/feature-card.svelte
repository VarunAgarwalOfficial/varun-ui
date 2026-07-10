<script lang="ts">
  import { LightningIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import FeatureCard from "$lib/components/varunui/piece/feature-card.svelte";
</script>

<div class="w-full max-w-sm">
  <FeatureCard>
    {#snippet leading()}
      <LightningIcon class="size-5" aria-hidden="true" />
    {/snippet}

    <h3 class="text-lg font-semibold">Fast capability cards</h3>
    <p class="mt-2 text-sm leading-6 text-muted-foreground">
      Use one focused card when capabilities repeat as comparable peers.
    </p>
  </FeatureCard>
</div>
