<script lang="ts" module>
  export interface EmailFactProps {
    label: string;
    value: string;
  }
</script>

<script lang="ts">
  let { label, value }: EmailFactProps = $props();
</script>

<dl class="grid gap-1">
  <dt class="text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--email-muted-ink)]">
    {label}
  </dt>
  <dd class="text-sm font-semibold text-[var(--email-ink)]">{value}</dd>
</dl>
