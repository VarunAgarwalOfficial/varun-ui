<script lang="ts" module>
  export interface TeamFact {
    title: string;
    value: string;
  }

  export interface TeamMember {
    name: string;
    role: string;
    avatar?: {
      src: string;
      alt: string;
    };
  }

  export interface TeamAction {
    label: string;
    href?: string;
    variant?: "primary" | "outline";
  }

  export interface TeamAndMissionProps {
    kicker?: string;
    heading?: string;
    description?: string;
    mission?: string;
    facts?: TeamFact[];
    team?: TeamMember[];
    actions?: TeamAction[];
  }

  export const teamAndMissionDemo: TeamAndMissionProps = {
    kicker: "About varunUI",
    heading: "Project work should feel easier to follow.",
    description:
      "We are a small team of designers and engineers building a calmer home for briefs, decisions, and delivery.",
    mission:
      "varunUI keeps the reason behind a project beside the work itself. Teams can see what changed, who owns the next step, and what is ready to share without chasing another status meeting.",
    facts: [
      { title: "Spacing grid", value: "4px" },
      { title: "Paper themes", value: "2" },
      { title: "Primary colors", value: "1" },
      { title: "Card radius", value: "0px" },
    ],
    team: [
      {
        name: "Maya Chen",
        role: "Product design",
      },
      {
        name: "Arjun Mehta",
        role: "Interface engineering",
      },
      {
        name: "Inez Rodriguez",
        role: "Content systems",
      },
      {
        name: "Noah Kim",
        role: "Design tooling",
      },
    ],
    actions: [
      { label: "See open roles", href: "?" },
      { label: "Read our story", href: "?", variant: "outline" },
    ],
  };
</script>

<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/varunui/internal/ui/avatar/index.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import Grid from "$lib/components/varunui/layout/grid.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Split from "$lib/components/varunui/layout/split.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = teamAndMissionDemo.kicker,
    heading = teamAndMissionDemo.heading,
    description = teamAndMissionDemo.description,
    mission = teamAndMissionDemo.mission,
    facts = teamAndMissionDemo.facts ?? [],
    team = teamAndMissionDemo.team ?? [],
    actions = teamAndMissionDemo.actions ?? [],
  }: TeamAndMissionProps = $props();

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  }
</script>

{#snippet Mission()}
  <div>
    {#if mission}
      <p class="text-base leading-relaxed text-muted-foreground md:text-lg">
        {mission}
      </p>
    {/if}

    {#if facts.length > 0}
      <div class="mt-[var(--layout-gap-lg)]">
        <Grid columns={2} gap="sm">
          {#each facts as fact, index (index)}
            <PastelField tone="yellow" className="p-4">
              <InlineStat value={fact.value} label={fact.title} delay={index * 80} />
            </PastelField>
          {/each}
        </Grid>
      </div>
    {/if}
  </div>
{/snippet}

{#snippet Team()}
  <Grid columns={2} gap="sm">
    {#each team as member, index (index)}
      <PastelField tone="pink" className="flex flex-col items-center justify-center text-center">
        <Avatar class="mb-4 size-16">
          {#if member.avatar}
            <AvatarImage
              src={member.avatar.src}
              alt={member.avatar.alt}
              class="object-cover"
            />
          {/if}
          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
        </Avatar>
        <h3 class="text-sm font-semibold md:text-base">{member.name}</h3>
        <p class="mt-1 text-xs text-muted-foreground md:text-sm">
          {member.role}
        </p>
      </PastelField>
    {/each}
  </Grid>
{/snippet}

<Section>
  <Stack gap="xl">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="lg"
      markerTone="pink"
    />
    {#if team.length > 0}
      <Split
        media={Team}
        mediaSide="right"
        align="start"
      >
        {@render Mission()}
      </Split>
    {:else}
      {@render Mission()}
    {/if}

    {#if actions.length > 0}
      <ActionRow align="left">
        {#each actions.slice(0, 2) as action, index (`${action.label}-${index}`)}
          <Button
            href={action.href}
            variant={action.variant ?? (index === 0 ? "primary" : "outline")}
          >
            {action.label}
          </Button>
        {/each}
      </ActionRow>
    {/if}
  </Stack>
</Section>
