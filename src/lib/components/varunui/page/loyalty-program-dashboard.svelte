<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    Check,
    Crown,
    Sparkles,
    Star,
    Trophy,
    Zap,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface Tier {
    title: string;
    minPoints: number;
    perks: string[];
    color: string;
  }

  interface Reward {
    title: string;
    description: string;
    pointsCost: number;
    available?: boolean;
  }

  interface EarnMethod {
    title: string;
    points: number;
    description?: string;
  }

  export interface LoyaltyProgramDashboardProps {
    kicker?: string;
    heading?: string;
    description?: string;
    memberName?: string;
    currentPoints?: number;
    currentTierIndex?: number;
    tiers?: Tier[];
    rewards?: Reward[];
    earnMethods?: EarnMethod[];
    labels?: {
      yourPoints?: string;
      nextTier?: string;
      pointsAway?: string;
      availableRewards?: string;
      redeem?: string;
      earnMore?: string;
      perks?: string;
    };
    onRedeemReward?: (rewardIndex: number) => void;
    className?: string;
  }

  export const loyaltyProgramDashboardDemo: LoyaltyProgramDashboardProps = {
    kicker: "Rewards Program",
    heading: "Your Loyalty Status",
    description: "Earn points with every purchase and unlock exclusive rewards",
    memberName: "Sarah",
    currentPoints: 2450,
    currentTierIndex: 1,
    tiers: [
      {
        title: "Bronze",
        minPoints: 0,
        perks: ["Free shipping on orders $50+", "Birthday reward"],
        color: "var(--color-warning)",
      },
      {
        title: "Silver",
        minPoints: 1000,
        perks: [
          "Free shipping on all orders",
          "Early access to sales",
          "Birthday reward",
        ],
        color: "var(--color-muted-foreground)",
      },
      {
        title: "Gold",
        minPoints: 5000,
        perks: [
          "Free express shipping",
          "Exclusive products",
          "Double points days",
          "Birthday reward",
        ],
        color: "var(--color-primary)",
      },
      {
        title: "Platinum",
        minPoints: 10000,
        perks: [
          "Free priority shipping",
          "VIP support",
          "Triple points days",
          "Exclusive events",
          "Birthday reward",
        ],
        color: "var(--color-info)",
      },
    ],
    rewards: [
      {
        title: "$10 Off",
        description: "On your next order",
        pointsCost: 500,
        available: true,
      },
      {
        title: "$25 Off",
        description: "On orders $75+",
        pointsCost: 1200,
        available: true,
      },
      {
        title: "Free Product",
        description: "Choose from select items",
        pointsCost: 2500,
        available: false,
      },
      {
        title: "$50 Off",
        description: "On orders $100+",
        pointsCost: 2000,
        available: true,
      },
    ],
    earnMethods: [
      { title: "Make a purchase", points: 1, description: "per $1 spent" },
      { title: "Write a review", points: 50, description: "with photo +25" },
      { title: "Refer a friend", points: 500, description: "when they order" },
      { title: "Follow on social", points: 25, description: "per platform" },
    ],
    labels: {
      yourPoints: "Your Points",
      nextTier: "Next tier",
      pointsAway: "points away",
      availableRewards: "Available Rewards",
      redeem: "Redeem",
      earnMore: "Ways to Earn",
      perks: "Your Perks",
    },
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import { cn } from "$lib/utils.js";

  let {
    kicker,
    heading,
    description,
    memberName,
    currentPoints = 0,
    currentTierIndex = 0,
    tiers = [],
    rewards = [],
    earnMethods = [],
    labels = {},
    onRedeemReward,
    className,
  }: LoyaltyProgramDashboardProps = $props();

  const tierIcons: Component[] = [Star, Zap, Crown, Trophy];
  const currentTier = $derived(tiers[currentTierIndex]);
  const nextTierData = $derived(tiers[currentTierIndex + 1]);
  const CurrentTierIcon = $derived(tierIcons[currentTierIndex] ?? Star);
  const pointsToNextTier = $derived(
    nextTierData ? nextTierData.minPoints - currentPoints : 0,
  );
  const progressToNextTier = $derived(
    nextTierData && currentTier
      ? ((currentPoints - currentTier.minPoints) /
          (nextTierData.minPoints - currentTier.minPoints)) *
          100
      : 100,
  );
</script>

<div class={cn("w-full", className)}>
  <Section container="lg">
    <div class="mb-10 text-center">
      {#if kicker}
        <p class="mb-4 text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">
          <Marker text={kicker} tone="yellow" emphasis />
        </p>
      {/if}
      {#if heading}
        <h1 class="mb-4 text-3xl font-bold md:text-4xl">{heading}</h1>
      {/if}
      {#if description}
        <p class="mx-auto max-w-[var(--layout-prose)] text-muted-foreground">{description}</p>
      {/if}
    </div>

    <div class="mb-8 rounded-none border border-border bg-surface p-6 md:p-8">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex items-center gap-4">
          <div
            class="flex size-16 items-center justify-center rounded-full"
            style:background-color={currentTier
              ? `color-mix(in oklab, ${currentTier.color} 18%, transparent)`
              : undefined}
          >
            <CurrentTierIcon
              class="size-8"
              style={currentTier ? `color: ${currentTier.color}` : undefined}
            />
          </div>
          <div>
            {#if memberName}
              <p class="text-sm text-muted-foreground">
                Welcome back, {memberName}!
              </p>
            {/if}
            <h3 class="text-2xl font-bold" style:color={currentTier?.color}>
              {currentTier?.title} Member
            </h3>
          </div>
        </div>

        <div class="text-center md:text-right">
          <p class="text-sm text-muted-foreground">
            {labels.yourPoints ?? "Your Points"}
          </p>
          <p class="text-4xl font-bold">{currentPoints.toLocaleString()}</p>
        </div>
      </div>

      {#if nextTierData}
        <div class="mt-6">
          <div class="mb-2 flex items-center justify-between text-sm">
            <span class="font-medium">{currentTier?.title}</span>
            <span class="text-muted-foreground">
              {pointsToNextTier.toLocaleString()}
              {labels.pointsAway ?? "points away"}
              {labels.nextTier ?? "Next tier"}
              {nextTierData.title}
            </span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-muted">
            <div
              class="h-full rounded-full motion-interactive"
              style:width={`${Math.min(progressToNextTier, 100)}%`}
              style:background-color={currentTier?.color}
            ></div>
          </div>
        </div>
      {/if}

      {#if currentTier?.perks && currentTier.perks.length > 0}
        <div class="mt-6 border-t border-border pt-6">
          <p class="mb-3 text-sm font-medium">{labels.perks ?? "Your Perks"}</p>
          <div class="flex flex-wrap gap-2">
            {#each currentTier.perks as perk}
              <div
                class="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm"
              >
                <Check class="size-3 text-success" />
                {perk}
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="bg-muted/30 p-6">
        <div class="mb-4 flex items-center gap-2">
          <Sparkles class="size-5 text-primary" />
          <h3 class="text-lg font-semibold">
            {labels.availableRewards ?? "Available Rewards"}
          </h3>
        </div>
        <div class="space-y-3">
          {#each rewards as reward, index}
            {@const canRedeem =
              currentPoints >= reward.pointsCost && reward.available !== false}
            <div
              class={cn(
                "flex items-center justify-between rounded-md bg-muted/50 p-3",
                !canRedeem && "opacity-50",
              )}
            >
              <div>
                <p class="font-medium">{reward.title}</p>
                <p class="text-sm text-muted-foreground">{reward.description}</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm font-semibold text-primary">
                  {reward.pointsCost.toLocaleString()} pts
                </span>
                <Button
                  size="sm"
                  variant={canRedeem ? "primary" : "outline"}
                  disabled={!canRedeem}
                  onclick={() => onRedeemReward?.(index)}
                >
                  {labels.redeem ?? "Redeem"}
                </Button>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="bg-muted/30 p-6">
        <div class="mb-4 flex items-center gap-2">
          <Zap class="size-5 text-primary" />
          <h3 class="text-lg font-semibold">
            {labels.earnMore ?? "Ways to Earn"}
          </h3>
        </div>
        <div class="space-y-3">
          {#each earnMethods as method}
            <div
              class="flex items-center justify-between rounded-md bg-muted/50 p-3"
            >
              <div>
                <p class="font-medium">{method.title}</p>
                {#if method.description}
                  <p class="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                {/if}
              </div>
              <Badge variant="muted" class="font-semibold">
                +{method.points} pts
              </Badge>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </Section>
</div>
