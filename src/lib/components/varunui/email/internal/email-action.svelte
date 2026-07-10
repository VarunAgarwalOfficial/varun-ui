<script lang="ts" module>
  export interface EmailActionProps {
    label: string;
    href?: string;
  }
</script>

<script lang="ts">
  let { label, href = "?" }: EmailActionProps = $props();
</script>

<a
  {href}
  class="inline-flex min-h-[var(--control-height-lg)] items-center justify-center rounded-[var(--radius-control)] bg-[var(--email-primary)] px-5 py-3 text-sm font-semibold text-[var(--email-paper)]"
>
  {label}
</a>
