<script lang="ts" module>
  import type { Component } from "svelte";

  export type NotificationFeedItemTone = "primary" | "success" | "warning";

  export interface NotificationFeedItemProps {
    icon?: Component;
    title: string;
    meta?: string;
    time?: string;
    tone?: NotificationFeedItemTone;
  }

  export const notificationFeedItemDemo: NotificationFeedItemProps = {
    title: "New booking confirmed",
    meta: "Rowan Blake · 09:00",
    time: "now",
    tone: "success",
  };
</script>

<script lang="ts">
  const chipStyles: Record<NotificationFeedItemTone, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };

  let {
    icon: Icon,
    title,
    meta,
    time,
    tone = "primary",
  }: NotificationFeedItemProps = $props();
</script>

<article
  data-slot="notification-feed-item"
  class="flex w-full min-w-0 items-center gap-3 border-b border-border py-3 last:border-b-0"
>
  {#if Icon}
    <span
      data-slot="notification-feed-item-icon"
      class={[
        "flex size-9 shrink-0 items-center justify-center rounded-lg",
        chipStyles[tone],
      ]}
      aria-hidden="true"
    >
      <Icon class="size-4" />
    </span>
  {/if}

  <div data-slot="notification-feed-item-content" class="min-w-0 flex-1">
    <p class="truncate text-sm font-medium text-foreground">{title}</p>
    {#if meta}
      <p class="truncate text-sm text-muted-foreground">{meta}</p>
    {/if}
  </div>

  {#if time}
    <span
      data-slot="notification-feed-item-time"
      class="shrink-0 text-xs text-muted-foreground"
    >
      {time}
    </span>
  {/if}
</article>
