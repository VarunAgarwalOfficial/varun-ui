<script lang="ts" module>
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  interface ProfileStat {
    label: string;
    value: number;
  }

  export interface ProfileHeaderProps {
    user?: {
      name: string;
      username: string;
      avatar: string;
      coverImage?: string;
      bio?: string;
      location?: string;
      website?: string;
      joinedDate?: string;
      isVerified?: boolean;
    };
    stats?: ProfileStat[];
    labels?: {
      follow?: string;
      following?: string;
      joined?: string;
    };
    isFollowing?: boolean;
    onFollow?: () => void;
    className?: string;
  }

  export const profileHeaderDemo: ProfileHeaderProps = {
    user: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar:
        peepSitting1Asset,
      coverImage:
        peepStanding12Asset,
      bio: "Product designer using varunUI to keep briefs, feedback, and delivery in one place.",
      location: "San Francisco, CA",
      website: "sarahchen.design",
      joinedDate: "March 2020",
      isVerified: true,
    },
    stats: [
      { label: "Posts", value: 1234 },
      { label: "Followers", value: 45600 },
      { label: "Following", value: 892 },
    ],
    labels: {
      follow: "Follow",
      following: "Following",
      joined: "Joined",
    },
  };
</script>

<script lang="ts">
  import { Calendar, Check, LinkIcon, MapPin } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let props: ProfileHeaderProps = $props();
  let data = $derived({ ...profileHeaderDemo, ...props });
  let labels = $derived({ ...profileHeaderDemo.labels, ...data.labels });

  function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }
</script>

<Section container="sm" className={cn("bg-background", data.className)}>
    <div class="overflow-hidden rounded-none border border-border bg-surface">
      {#if data.user?.coverImage}
        <img src={data.user.coverImage} alt="" class="h-36 w-full object-cover" />
      {/if}
      <div class="px-6 pb-6">
        <div class="-mt-10 flex items-end justify-between gap-4">
          <img
            src={data.user?.avatar}
            alt={data.user?.name}
            class="size-20 rounded-full border-4 border-surface object-cover"
          />
          <Button
            variant={data.isFollowing ? "outline" : "primary"}
            onclick={() => data.onFollow?.()}
          >
            {data.isFollowing ? labels.following : labels.follow}
          </Button>
        </div>
        <div class="mt-4">
          <div class="flex items-center gap-2">
            <h2 class="text-2xl font-semibold tracking-tight text-foreground">{data.user?.name}</h2>
            {#if data.user?.isVerified}
              <span class="flex size-5 items-center justify-center rounded-full bg-primary text-background">
                <Check class="size-3" />
              </span>
            {/if}
          </div>
          <p class="text-sm text-muted-foreground">@{data.user?.username}</p>
        </div>
        {#if data.user?.bio}
          <p class="mt-3 max-w-[var(--layout-prose)] text-sm leading-6 text-foreground">{data.user.bio}</p>
        {/if}
        <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {#if data.user?.location}
            <span class="inline-flex items-center gap-1.5">
              <MapPin class="size-4" />
              {data.user.location}
            </span>
          {/if}
          {#if data.user?.website}
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="?" class="inline-flex items-center gap-1.5 text-primary hover:underline">
              <LinkIcon class="size-4" />
              {data.user.website}
            </a>
          {/if}
          {#if data.user?.joinedDate}
            <span class="inline-flex items-center gap-1.5">
              <Calendar class="size-4" />
              {labels.joined} {data.user.joinedDate}
            </span>
          {/if}
        </div>
        <div class="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
          {#each data.stats ?? [] as stat}
            <div>
              <p class="text-lg font-semibold text-foreground">{formatNumber(stat.value)}</p>
              <p class="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
</Section>
