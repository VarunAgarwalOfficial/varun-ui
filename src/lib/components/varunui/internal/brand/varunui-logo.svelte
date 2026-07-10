<script lang="ts">
  let { class: className }: { class?: string } = $props();
</script>

<span
  class={[
    "text-xl leading-none font-semibold tracking-normal text-current",
    className,
  ]}
>
  varunUI
</span>
