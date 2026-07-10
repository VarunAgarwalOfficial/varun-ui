<script lang="ts" module>
  export interface EmailBrandProps {
    label: string;
  }
</script>

<script lang="ts">
  let { label }: EmailBrandProps = $props();
</script>

<div class="flex items-center justify-between gap-4">
  <span class="font-semibold tracking-tight text-[var(--email-ink)]">varunUI</span>
  <span class="text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--email-muted-ink)]">
    {label}
  </span>
</div>
