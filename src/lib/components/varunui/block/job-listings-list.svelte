<script lang="ts" module>
  interface JobItem {
    title: string;
    department?: string;
    location?: string;
    type?: string;
    description?: string;
    href?: string;
  }

  export interface JobListingsListProps {
    kicker?: string;
    heading?: string;
    description?: string;
    jobs?: JobItem[];
  }

  export const jobListingsListDemo: JobListingsListProps = {
    kicker: "Open roles",
    heading: "Help make product work easier to follow.",
    description:
      "Small teams, real ownership, and a clear problem to solve. Every role works directly with the system and the people using it.",
    jobs: [
      {
        title: "Interface Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description:
          "Build accessible Svelte components, motion contracts, and the tooling behind the catalog.",
        href: "?",
      },
      {
        title: "Product Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description:
          "Shape complete product flows, pressure-test the system, and turn findings into reusable patterns.",
        href: "?",
      },
      {
        title: "Design Systems Writer",
        department: "Content",
        location: "Remote",
        type: "Full-time",
        description:
          "Write component guidance, page recipes, and examples that make design decisions easy to understand.",
        href: "?",
      },
      {
        title: "Developer Advocate",
        department: "Community",
        location: "Remote",
        type: "Contract",
        description:
          "Build examples, teach the system in public, and bring real implementation feedback into the roadmap.",
        href: "?",
      },
    ],
  };
</script>

<script lang="ts">
  import { ArrowUpRightIcon, Clock, MapPin } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = jobListingsListDemo.kicker,
    heading = jobListingsListDemo.heading,
    description = jobListingsListDemo.description,
    jobs = jobListingsListDemo.jobs ?? [],
  }: JobListingsListProps = $props();

</script>

<Section container="lg">
  <Stack gap="2xl">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      size="lg"
      markerTone="pink"
    />
    <div class="border-y border-border">
      {#each jobs as job, index (`${job.title}-${index}`)}
        <article class="border-b border-border last:border-b-0">
          <a
            href={job.href ?? "?"}
            class="group/job flex items-center justify-between gap-[var(--layout-gap-md)] py-[var(--layout-gap-lg)] outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
            aria-label={`View ${job.title}`}
          >
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-[var(--layout-gap-sm)]">
                <span class="text-lg font-semibold text-foreground motion-colors group-hover/job:text-primary">
                  {job.title}
                </span>
                {#if job.department}
                  <Badge variant="muted">{job.department}</Badge>
                {/if}
              </span>

              {#if job.location || job.type}
                <span class="mt-2 flex flex-wrap gap-x-[var(--layout-gap-md)] gap-y-[var(--layout-gap-sm)] text-sm text-muted-foreground">
                  {#if job.location}
                    <span class="inline-flex items-center gap-1.5">
                      <MapPin class="size-4" aria-hidden="true" />
                      {job.location}
                    </span>
                  {/if}
                  {#if job.type}
                    <span class="inline-flex items-center gap-1.5">
                      <Clock class="size-4" aria-hidden="true" />
                      {job.type}
                    </span>
                  {/if}
                </span>
              {/if}

              {#if job.description}
                <span class="mt-3 block max-w-[var(--layout-content-sm)] text-sm leading-6 text-muted-foreground">
                  {job.description}
                </span>
              {/if}
            </span>

            <span
              class="grid size-[var(--control-height-sm)] shrink-0 place-items-center border border-border motion-colors group-hover/job:border-primary group-hover/job:bg-primary group-hover/job:text-background"
              aria-hidden="true"
            >
              <ArrowUpRightIcon class="size-4 motion-transform group-hover/job:-translate-y-0.5 group-hover/job:translate-x-0.5" />
            </span>
          </a>
        </article>
      {/each}
    </div>
  </Stack>
</Section>
