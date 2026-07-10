<script lang="ts">
  import DataCaption from "$lib/components/varunui/component/data-caption.svelte";
</script>

<figure class="w-full border-y border-border py-5">
  <div
    class="mb-5 grid h-32 grid-cols-6 items-end gap-2 border-b border-l border-border px-3 pb-3"
    aria-label="Completed work rose from 18 to 42 items"
  >
    {#each [18, 24, 21, 31, 36, 42] as value, index}
      <span
        class="bg-blue motion-reveal origin-bottom"
        style={`height: ${(value / 42) * 100}%; --motion-index: ${index};`}
        aria-hidden="true"
      ></span>
    {/each}
  </div>

  <DataCaption
    label="Figure 01"
    description="Completed work rose steadily and finished two items above plan."
    meta="Updated Jul 10"
  />
</figure>
