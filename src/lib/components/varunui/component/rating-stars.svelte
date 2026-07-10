<script lang="ts" module>
  export type RatingStarsTone = "foreground" | "primary" | "yellow" | "muted";
  export type RatingStarsGap = "tight" | "relaxed";
  export type RatingStarsSize = "xs" | "sm" | "md" | "lg";

  export interface RatingStarsProps {
    rating: number;
    max: number;
    tone?: RatingStarsTone;
    size?: RatingStarsSize;
    gap?: RatingStarsGap;
    animated?: boolean;
    label?: string;
  }

  export const ratingStarsDemo: RatingStarsProps = {
    rating: 4.8,
    max: 5,
    tone: "primary",
    animated: true,
  };
</script>

<script lang="ts">
  import { StarIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  const toneStyles: Record<RatingStarsTone, string> = {
    foreground: "text-foreground",
    primary: "text-primary",
    yellow: "text-yellow",
    muted: "text-muted-foreground",
  };

  const sizeStyles: Record<RatingStarsSize, string> = {
    xs: "size-3",
    sm: "size-3.5",
    md: "size-5",
    lg: "size-6",
  };

  const gapStyles: Record<RatingStarsGap, string> = {
    tight: "gap-0.5",
    relaxed: "gap-1",
  };

  let {
    rating,
    max,
    tone = "primary",
    size = "sm",
    gap = "tight",
    animated = false,
    label,
  }: RatingStarsProps = $props();

  const total = $derived(Math.max(0, Math.floor(max)));
  const value = $derived(Math.max(0, Math.min(total, rating)));
  const stars = $derived(Array.from({ length: total }, (_, index) => index));
  const ariaLabel = $derived(label ?? `Rated ${rating} out of ${total}`);
  const groupClass = $derived(
    [
      "inline-flex items-center",
      gapStyles[gap],
      animated && "motion-star-stagger",
    ]
      .filter(Boolean)
      .join(" "),
  );
  const fillPercent = (index: number) =>
    `${Math.max(0, Math.min(1, value - index)) * 100}%`;
</script>

<span class={groupClass} role="img" aria-label={ariaLabel}>
  {#each stars as star (star)}
    <span
      class={`relative inline-flex overflow-hidden${animated ? " motion-pop-in" : ""}`}
    >
      <StarIcon
        aria-hidden="true"
        weight="regular"
        class={`${sizeStyles[size]} text-muted-foreground/30`}
      />
      <span
        aria-hidden="true"
        class="absolute inset-y-0 left-0 overflow-hidden"
        style:width={fillPercent(star)}
      >
        <StarIcon
          aria-hidden="true"
          weight="fill"
          class={`${sizeStyles[size]} max-w-none ${toneStyles[tone]}`}
        />
      </span>
    </span>
  {/each}
</span>
