<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  interface Notification {
    id: string;
    type: "like" | "comment" | "follow" | "mention";
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    isRead?: boolean;
    postPreview?: string;
  }

  export interface NotificationFeedProps {
    notifications?: Notification[];
    unreadCount?: number;
    labels?: {
      title?: string;
      markAllRead?: string;
      viewAll?: string;
    };
    className?: string;
  }

  export const notificationFeedDemo: NotificationFeedProps = {
    unreadCount: 5,
    labels: {
      title: "Notifications",
      markAllRead: "Mark all read",
      viewAll: "View all notifications",
    },
    notifications: [
      {
        id: "1",
        type: "like",
        user: {
          name: "Emma Wilson",
          avatar:
            peepSitting13Asset,
        },
        content: "liked your post",
        timestamp: "2m ago",
        isRead: false,
        postPreview: "Just launched my new portfolio...",
      },
      {
        id: "2",
        type: "comment",
        user: {
          name: "Alex Rivera",
          avatar:
            peepStanding18Asset,
        },
        content: "commented on your post",
        timestamp: "15m ago",
        isRead: false,
        postPreview: '"This is amazing work! How did you..."',
      },
      {
        id: "3",
        type: "follow",
        user: {
          name: "Sarah Chen",
          avatar:
            peepSitting8Asset,
        },
        content: "started following you",
        timestamp: "1h ago",
        isRead: false,
      },
      {
        id: "4",
        type: "mention",
        user: {
          name: "Marcus Johnson",
          avatar:
            peepStanding5Asset,
        },
        content: "mentioned you in a comment",
        timestamp: "2h ago",
        isRead: false,
        postPreview: '"@you should check this out!"',
      },
    ],
  };
</script>

<script lang="ts">
  import {
    AtSign,
    BellRingingIcon,
    ChatCircleIcon,
    Heart,
    UserPlus,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let props: NotificationFeedProps = $props();
  let data = $derived({ ...notificationFeedDemo, ...props });
  let labels = $derived({ ...notificationFeedDemo.labels, ...data.labels });

  function tone(type: Notification["type"]) {
    if (type === "like") return "bg-rose-500/10 text-rose-600";
    if (type === "comment") return "bg-blue-500/10 text-blue-600";
    if (type === "follow") return "bg-emerald-500/10 text-emerald-600";
    return "bg-amber-500/10 text-amber-600";
  }
</script>

<Section container="form" className={cn("bg-background", data.className)}>
    <div class="overflow-hidden rounded-none border border-border bg-surface">
      <div class="flex items-center justify-between gap-3 border-b border-border p-5">
        <div class="flex items-center gap-2">
          <BellRingingIcon class="size-5 text-primary" aria-hidden="true" />
          <h2 class="font-semibold text-foreground">{labels.title}</h2>
          {#if data.unreadCount}
            <Badge variant="muted">{data.unreadCount}</Badge>
          {/if}
        </div>
        <Button variant="quiet" size="sm">{labels.markAllRead}</Button>
      </div>

      <div class="divide-y divide-border">
        {#each data.notifications ?? [] as notification (notification.id)}
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a
            href="?"
            class={cn(
              "block p-4 motion-colors hover:bg-muted/60",
              !notification.isRead && "bg-primary/5",
            )}
          >
            <div class="flex gap-3">
              <div class="relative shrink-0">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  class="size-11 rounded-full object-cover"
                />
                <span
                  class={cn(
                    "absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full ring-2 ring-surface",
                    tone(notification.type),
                  )}
                >
                  {#if notification.type === "like"}
                    <Heart class="size-3.5" />
                  {:else if notification.type === "comment"}
                    <ChatCircleIcon class="size-3.5" />
                  {:else if notification.type === "follow"}
                    <UserPlus class="size-3.5" />
                  {:else}
                    <AtSign class="size-3.5" />
                  {/if}
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm leading-5">
                  <span class="font-medium text-foreground">{notification.user.name}</span>
                  <span class="ml-1 text-muted-foreground">{notification.content}</span>
                </p>
                {#if notification.postPreview}
                  <p class="mt-1 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                    {notification.postPreview}
                  </p>
                {/if}
                <p class="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>
              </div>
              {#if !notification.isRead}
                <span class="mt-2 size-2 rounded-full bg-primary"></span>
              {/if}
            </div>
          </a>
        {/each}
      </div>

      <div class="border-t border-border p-3 text-center">
        <Button variant="quiet" href="?">{labels.viewAll}</Button>
      </div>
    </div>
</Section>
