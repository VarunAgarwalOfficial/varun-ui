<script lang="ts" module>
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import { ThumbsUp } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface Review {
    id: string;
    author: string;
    avatar?: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    helpful?: number;
    verified?: boolean;
  }

  export interface ProductReviewsSectionProps {
    heading?: string;
    averageRating?: number;
    totalReviews?: number;
    reviews?: Review[];
    onLoadMore?: () => void;
    onHelpful?: (reviewId: string) => void;
    className?: string;
  }

  export const productReviewsSectionDemo: ProductReviewsSectionProps = {
    heading: "Customer Reviews",
    averageRating: 4.8,
    totalReviews: 128,
    reviews: [
      {
        id: "rev-1",
        author: "Sarah M.",
        avatar:
          peepSitting8Asset,
        rating: 5,
        date: "2 days ago",
        title: "Absolutely love it!",
        content:
          "The quality exceeded my expectations. Shipping was fast and the packaging was beautiful. Would definitely recommend to anyone looking for premium products.",
        helpful: 24,
        verified: true,
      },
      {
        id: "rev-2",
        author: "James K.",
        avatar:
          peepStanding5Asset,
        rating: 4,
        date: "1 week ago",
        title: "Great product, minor issue",
        content:
          "Overall very happy with my purchase. The only reason for 4 stars is the delivery took a bit longer than expected. Product itself is fantastic.",
        helpful: 12,
        verified: true,
      },
      {
        id: "rev-3",
        author: "Emily R.",
        rating: 5,
        date: "2 weeks ago",
        title: "Perfect gift",
        content:
          "Bought this as a gift and it was a huge hit! Beautiful craftsmanship and attention to detail. Will be ordering more.",
        helpful: 8,
        verified: false,
      },
      {
        id: "rev-4",
        author: "Michael T.",
        rating: 4,
        date: "3 weeks ago",
        title: "Solid quality",
        content:
          "Very impressed with the build quality. Looks exactly like the photos. Would buy again.",
        helpful: 5,
        verified: false,
      },
    ],
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import RatingStars from "$lib/components/varunui/component/rating-stars.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";

  let {
    heading,
    averageRating,
    totalReviews,
    reviews = [],
    onLoadMore,
    onHelpful,
    className,
  }: ProductReviewsSectionProps = $props();
</script>

<Section container="sm" className={className}>
    <div
      class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        {#if heading}
          <h2 class="text-2xl font-semibold md:text-3xl">{heading}</h2>
        {/if}
        {#if averageRating && totalReviews}
          <div class="mt-2 flex items-center gap-2">
            <RatingStars
              rating={averageRating}
              max={5}
              tone="yellow"
              size="md"
              animated={false}
              label={`Average rating ${averageRating} out of 5`}
            />
            <span class="font-medium">{averageRating}</span>
            <span class="text-muted-foreground">
              ({totalReviews} reviews)
            </span>
          </div>
        {/if}
      </div>
      <Button variant="outline">Write a Review</Button>
    </div>

    <div class="space-y-6">
      {#each reviews as review}
        <div class="border-b pb-6 last:border-0">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              {#if review.avatar}
                <img
                  src={review.avatar}
                  alt={review.author}
                  class="size-10 rounded-full object-cover"
                />
              {:else}
                <div
                  class="flex size-10 items-center justify-center rounded-full bg-muted font-medium"
                >
                  {review.author.charAt(0)}
                </div>
              {/if}
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">{review.author}</span>
                  {#if review.verified}
                    <Badge variant="muted">Verified</Badge>
                  {/if}
                </div>
                <div
                  class="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <RatingStars
                    rating={review.rating}
                    max={5}
                    tone="yellow"
                    size="xs"
                    animated={false}
                    label={`${review.rating} out of 5 stars from ${review.author}`}
                  />
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          </div>

          <h3 class="mt-3 font-medium">{review.title}</h3>
          <p class="mt-2 text-muted-foreground">{review.content}</p>

          {#if review.helpful !== undefined}
            <Button
              variant="quiet"
              size="sm"
              class="mt-2 cursor-pointer p-0 text-muted-foreground hover:text-foreground"
              onclick={() => onHelpful?.(review.id)}
            >
              <ThumbsUp class="size-4" />
              <span>Helpful ({review.helpful})</span>
            </Button>
          {/if}
        </div>
      {/each}
    </div>

    {#if onLoadMore}
      <div class="mt-8 text-center">
        <Button variant="outline" onclick={onLoadMore}>
          Load More Reviews
        </Button>
      </div>
    {/if}
</Section>
