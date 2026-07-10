<script lang="ts" module>
  interface StepItem {
    title: string;
    description?: string;
  }

  interface ButtonItem {
    label: string;
    href?: string;
    variant?: "primary" | "outline" | "quiet" | "danger";
  }

  export interface ProcessStepsProps {
    kicker?: string;
    heading?: string;
    description?: string;
    steps?: StepItem[];
    buttons?: ButtonItem[];
  }

  export const processStepsDemo: ProcessStepsProps = {
    kicker: "First workspace",
    heading: "Begin with one useful project.",
    description: "Four explicit steps take a team from a new account to shared work without hiding the decisions in setup.",
    steps: [
      {
        title: "Create the account",
        description: "Use a work email and name the person who owns setup.",
      },
      {
        title: "Name the workspace",
        description: "Choose one clear name and the default working timezone.",
      },
      {
        title: "Invite the first owners",
        description: "Add only the people needed for the first project and assign roles.",
      },
      {
        title: "Open the first project",
        description: "Write the outcome, connect the tools, and begin with one decision.",
      },
    ],
    buttons: [{ label: "Start setup", href: "?" }],
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import ProcessStep from "$lib/components/varunui/piece/process-step.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    steps = [],
    buttons = [],
  }: ProcessStepsProps = $props();

  function columnsFor(count: number): 1 | 2 | 3 | 4 {
    if (count <= 1) return 1;
    if (count === 2) return 2;
    if (count === 3) return 3;
    return 4;
  }

  const columns = $derived(columnsFor(steps.length));
</script>

<Section>
  <Stack gap="xl">
    <SectionHeader {kicker} title={heading} {description} markerTone="yellow" />
    <div class="w-full">
      <Grid {columns}>
      {#each steps as step, index (`${step.title}-${index}`)}
        <div class="h-full border-t border-border pt-[var(--layout-gap-md)]">
          <ProcessStep
            marker={index + 1}
            title={step.title}
            description={step.description}
          />
        </div>
      {/each}
      </Grid>
    </div>

    {#if buttons.length > 0}
      <ActionRow>
        {#each buttons.slice(0, 2) as button, index (`${button.label}-${index}`)}
          <Button
            href={button.href ?? "?"}
            variant={button.variant ?? (index === 0 ? "primary" : "outline")}
          >
            {button.label}
          </Button>
        {/each}
      </ActionRow>
    {/if}
  </Stack>
</Section>
