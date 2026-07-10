<script lang="ts" module>
  export interface EmployeeBenefit {
    title: string;
    description: string;
  }

  export interface EmployeeBenefitsProps {
    kicker?: string;
    heading?: string;
    description?: string;
    items?: EmployeeBenefit[];
  }

  export const employeeBenefitsDemo: EmployeeBenefitsProps = {
    kicker: "Benefits",
    heading: "Support that makes good work sustainable.",
    description:
      "The useful basics, enough time away, and a budget for getting better at the craft.",
    items: [
      { title: "Health cover", description: "Medical, dental, and vision cover for you and your family." },
      { title: "Remote setup", description: "A home-office budget and flexible working location." },
      { title: "Learning budget", description: "Courses, conferences, books, and tools that improve the work." },
      { title: "Paid time away", description: "Flexible leave with a healthy minimum, not a hidden expectation to stay online." },
      { title: "Parental leave", description: "Paid leave for every new parent, with a gradual return if useful." },
      { title: "Shared ownership", description: "Equity for permanent team members and transparent salary bands." },
    ],
  };
</script>

<script lang="ts">
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = employeeBenefitsDemo.kicker,
    heading = employeeBenefitsDemo.heading,
    description = employeeBenefitsDemo.description,
    items = employeeBenefitsDemo.items ?? [],
  }: EmployeeBenefitsProps = $props();
</script>

<Section container="lg">
  <Stack gap="xl">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      markerTone="green"
    />
    <Grid columns={2} gap="md">
      {#each items as item (item.title)}
        <div class="border-y border-border py-5">
          <h3 class="font-semibold text-foreground">{item.title}</h3>
          <p class="mt-2 max-w-[var(--layout-prose)] text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </div>
      {/each}
    </Grid>
  </Stack>
</Section>
