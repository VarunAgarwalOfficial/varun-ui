<script lang="ts" module>
  import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
  import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
  export interface ProfileSummaryProps {
    name?: string;
    username?: string;
    avatar?: string;
    coverImage?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinedDate?: string;
    followers?: number;
    following?: number;
    isVerified?: boolean;
    isFollowing?: boolean;
    labels?: {
      follow?: string;
      following?: string;
      verified?: string;
      followersLabel?: string;
      followingLabel?: string;
    };
    className?: string;
  }

  export const profileSummaryDemo: ProfileSummaryProps = {
    name: "Sarah Chen",
    username: "@sarahchen",
    avatar:
      peepStanding10Asset,
    coverImage:
      peepSitting13Asset,
    bio: "Product Designer & Creative Director. Building beautiful things for the web. Previously at Google, now independent.",
    location: "San Francisco, CA",
    website: "sarahchen.design",
    joinedDate: "Joined March 2020",
    followers: 12400,
    following: 892,
    isVerified: true,
    labels: {
      follow: "Follow",
      following: "Following",
      verified: "Verified",
      followersLabel: "Followers",
      followingLabel: "Following",
    },
  };
</script>

<script lang="ts">
  import {
    Calendar,
    Check,
    LinkIcon,
    MapPin,
    MessageSquare,
    UserPlus,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let props: ProfileSummaryProps = $props();
  let data = $derived({ ...profileSummaryDemo, ...props });
  let labels = $derived({ ...profileSummaryDemo.labels, ...data.labels });

  function formatNumber(num = 0): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }
</script>

<Section container="panel" className={cn("bg-background", data.className)}>
    <div class="overflow-hidden rounded-none border border-border bg-surface">
      {#if data.coverImage}
        <div class="h-40 overflow-hidden bg-muted">
          <img src={data.coverImage} alt="" class="size-full object-cover" />
        </div>
      {/if}

      <div class="px-6 pb-6">
        <div class="-mt-12 flex items-end justify-between gap-4">
          <div class="relative">
            <img
              src={data.avatar}
              alt={data.name}
              class="size-24 rounded-full border-4 border-surface object-cover"
            />
            {#if data.isVerified}
              <span
                class="absolute bottom-1 right-1 flex size-6 items-center justify-center rounded-full bg-primary text-background ring-2 ring-surface"
                aria-label={labels.verified}
              >
                <Check class="size-3.5" aria-hidden="true" />
              </span>
            {/if}
          </div>
          <div class="flex items-center gap-2 pb-1">
            <Button variant="outline" iconOnly href="?" aria-label="Message">
              <MessageSquare class="size-4" aria-hidden="true" />
            </Button>
            <Button variant={data.isFollowing ? "outline" : "primary"} href="?">
              {#if data.isFollowing}
                <Check class="size-4" aria-hidden="true" />
                {labels.following}
              {:else}
                <UserPlus class="size-4" aria-hidden="true" />
                {labels.follow}
              {/if}
            </Button>
          </div>
        </div>

        <div class="mt-5">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-2xl font-semibold tracking-tight text-foreground">
              {data.name}
            </h2>
            {#if data.isVerified}
              <Badge variant="muted">{labels.verified}</Badge>
            {/if}
          </div>
          <p class="text-sm text-muted-foreground">{data.username}</p>
        </div>

        {#if data.bio}
          <p class="mt-4 text-sm leading-6 text-foreground">{data.bio}</p>
        {/if}

        <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {#if data.location}
            <span class="inline-flex items-center gap-1.5">
              <MapPin class="size-4" aria-hidden="true" />
              {data.location}
            </span>
          {/if}
          {#if data.website}
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="?" class="inline-flex items-center gap-1.5 text-primary hover:underline">
              <LinkIcon class="size-4" aria-hidden="true" />
              {data.website}
            </a>
          {/if}
          {#if data.joinedDate}
            <span class="inline-flex items-center gap-1.5">
              <Calendar class="size-4" aria-hidden="true" />
              {data.joinedDate}
            </span>
          {/if}
        </div>

        <div class="mt-5 flex gap-6 text-sm">
          <span>
            <strong class="font-semibold text-foreground">{formatNumber(data.following)}</strong>
            <span class="ml-1 text-muted-foreground">{labels.followingLabel}</span>
          </span>
          <span>
            <strong class="font-semibold text-foreground">{formatNumber(data.followers)}</strong>
            <span class="ml-1 text-muted-foreground">{labels.followersLabel}</span>
          </span>
        </div>
      </div>
    </div>
</Section>
