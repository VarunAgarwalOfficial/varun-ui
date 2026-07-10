<script lang="ts" module>
  interface SetupItem {
    title: string;
    description: string;
  }

  interface SetupGroup {
    title: string;
    items: SetupItem[];
  }

  export interface RemoteWorkSetupProps {
    kicker?: string;
    heading?: string;
    description?: string;
    groups?: SetupGroup[];
    className?: string;
  }

  export const remoteWorkSetupDemo: RemoteWorkSetupProps = {
    kicker: "Remote work",
    heading: "Provide the tools. Agree on the working rhythm.",
    description:
      "A remote policy should make support and collaboration predictable without prescribing where every hour happens.",
    groups: [
      {
        title: "The company provides",
        items: [
          { title: "Workstation", description: "A laptop, display, and necessary peripherals before day one." },
          { title: "Accessible setup", description: "Equipment or software adjustments without a separate approval maze." },
          { title: "Connection support", description: "A recurring contribution toward reliable internet." },
          { title: "Team time", description: "A budget for intentional in-person work when it helps the project." },
        ],
      },
      {
        title: "The team agrees",
        items: [
          { title: "Write the decision", description: "Keep decisions in the shared workspace, not only in a call." },
          { title: "Name overlap hours", description: "Publish the small window when synchronous collaboration is expected." },
          { title: "Protect focus", description: "Use review windows and meeting-light blocks instead of permanent availability." },
          { title: "Make handoffs explicit", description: "Every active item has an owner, next action, and useful context." },
        ],
      },
    ],
  };
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = remoteWorkSetupDemo.kicker,
    heading = remoteWorkSetupDemo.heading,
    description = remoteWorkSetupDemo.description,
    groups = remoteWorkSetupDemo.groups ?? [],
    className,
  }: RemoteWorkSetupProps = $props();
</script>

<section data-slot="remote-work-setup" class={className}>
  <Section container="lg">
    <Stack gap="xl">
      <SectionHeader {kicker} title={heading} {description} align="left" markerTone="green" />
      <div class="grid border border-border lg:grid-cols-2">
        {#each groups as group, groupIndex (`${group.title}-${groupIndex}`)}
          <section class="border-b border-border p-[var(--surface-padding-md)] last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <h3 class="text-lg font-semibold">{group.title}</h3>
            <ul class="mt-4 divide-y divide-border">
              {#each group.items as item (`${group.title}-${item.title}`)}
                <li class="py-4 first:pt-0 last:pb-0">
                  <p class="font-semibold">{item.title}</p>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </li>
              {/each}
            </ul>
          </section>
        {/each}
      </div>
    </Stack>
  </Section>
</section>
