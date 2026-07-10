<script lang="ts" module>
  export interface EmailFooterProps {
    reason: string;
    manageLabel?: string;
    manageHref?: string;
    unsubscribeLabel?: string;
    unsubscribeHref?: string;
  }
</script>

<script lang="ts">
  let {
    reason,
    manageLabel,
    manageHref = "?",
    unsubscribeLabel,
    unsubscribeHref = "?",
  }: EmailFooterProps = $props();
</script>

<div class="grid gap-2 text-xs leading-5">
  <p>{reason}</p>
  {#if manageLabel || unsubscribeLabel}
    <p class="flex flex-wrap gap-x-4 gap-y-1">
      {#if manageLabel}
        <a href={manageHref} class="font-semibold text-[var(--email-ink)] underline underline-offset-4">
          {manageLabel}
        </a>
      {/if}
      {#if unsubscribeLabel}
        <a href={unsubscribeHref} class="font-semibold text-[var(--email-ink)] underline underline-offset-4">
          {unsubscribeLabel}
        </a>
      {/if}
    </p>
  {/if}
</div>
