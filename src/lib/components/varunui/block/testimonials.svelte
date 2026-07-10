<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  interface TestimonialItem {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
    tags?: string[];
  }

  export interface TestimonialsProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    testimonials?: TestimonialItem[];
    className?: string;
  }

  export const testimonialsDemo: TestimonialsProps = {
    badge: { label: "Reviews", variant: "outline" },
    heading: "What users love about us",
    description:
      "Real feedback from real users, organized by what they value most",
    testimonials: [
      {
        quote:
          "The speed improvements were immediate. Our API response times dropped by 60%.",
        author: "David Chen",
        role: "Backend Engineer",
        avatar:
          peep1Asset,
        tags: ["Performance", "Speed"],
      },
      {
        quote:
          "Customer support is exceptional. They resolved our issue within an hour.",
        author: "Lisa Park",
        role: "Customer Success",
        avatar:
          peepStanding23Asset,
        tags: ["Support", "Response Time"],
      },
      {
        quote:
          "The documentation is comprehensive. We were able to integrate without any support tickets.",
        author: "Alex Turner",
        role: "Tech Lead",
        avatar:
          peepSitting1Asset,
        tags: ["Documentation", "DX"],
      },
      {
        quote:
          "Best value for money in the market. The features we get at this price are unmatched.",
        author: "Maria Santos",
        role: "Startup Founder",
        avatar:
          peepStanding12Asset,
        tags: ["Pricing", "Value"],
      },
    ],
  };
</script>

<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import TestimonialQuoteCard from "$lib/components/varunui/piece/testimonial-quote-card.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";

  let {
    badge,
    heading,
    description,
    testimonials = [],
    className,
  }: TestimonialsProps = $props();
</script>

<Section container="lg" className={className}>
    {#if badge || heading || description}
      <div class="mx-auto mb-12 max-w-[var(--layout-content-sm)] text-center md:mb-16">
        {#if badge}
          <Badge variant={badge.variant ?? "primary"} class="mb-5">
            {badge.label}
          </Badge>
        {/if}
        {#if heading}
          <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
            {heading}
          </h2>
        {/if}
        {#if description}
          <p class="mt-4 text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        {/if}
      </div>
    {/if}

    {#if testimonials.length > 0}
      <div class="grid gap-6 md:grid-cols-2">
        {#each testimonials as item, index (index)}
          <TestimonialQuoteCard
            quote={item.quote}
            tags={item.tags}
            person={{
              name: item.author,
              role: item.role,
              avatar: item.avatar
                ? {
                    src: item.avatar,
                    alt: item.author,
                  }
                : undefined,
            }}
          />
        {/each}
      </div>
    {/if}
</Section>
