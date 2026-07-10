<script lang="ts" module>
  interface Integration {
    name: string;
    description: string;
    category: string;
    href?: string;
  }

  interface GalleryAction {
    label: string;
    href: string;
  }

  export interface IntegrationGalleryProps {
    kicker?: string;
    heading?: string;
    description?: string;
    integrations?: Integration[];
    action?: GalleryAction;
    note?: string;
    className?: string;
  }

  export const integrationGalleryDemo: IntegrationGalleryProps = {
    kicker: "Connected work",
    heading: "Keep the useful tools. Remove the duplicate context.",
    description:
      "Bring updates into varunUI and send decisions back to the places where the team already works.",
    integrations: [
      { name: "Figma", category: "Design", description: "Attach frames to briefs and review decisions.", href: "?" },
      { name: "GitHub", category: "Engineering", description: "Connect releases, pull requests, and owners.", href: "?" },
      { name: "Linear", category: "Planning", description: "Keep issue status beside the product decision.", href: "?" },
      { name: "Slack", category: "Communication", description: "Send review prompts without losing the source.", href: "?" },
      { name: "Notion", category: "Knowledge", description: "Bring existing notes into a shared brief.", href: "?" },
      { name: "Jira", category: "Delivery", description: "Link implementation work to approved outcomes.", href: "?" },
    ],
    action: { label: "Request an integration", href: "?" },
    note: "Need something else? Start with the open API or tell us which handoff is breaking.",
  };
</script>

<script lang="ts">
  import { ArrowUpRightIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = integrationGalleryDemo.kicker,
    heading = integrationGalleryDemo.heading,
    description = integrationGalleryDemo.description,
    integrations = integrationGalleryDemo.integrations ?? [],
    action = integrationGalleryDemo.action,
    note = integrationGalleryDemo.note,
    className,
  }: IntegrationGalleryProps = $props();

  function initials(name: string) {
    return name.slice(0, 2).toUpperCase();
  }
</script>

<section data-slot="integration-gallery" class={className}>
  <Section container="lg">
    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        markerTone="blue"
      />

      {#if integrations.length > 0}
        <ul class="grid grid-cols-1 border border-border md:grid-cols-2 lg:grid-cols-3">
          {#each integrations as integration, index (`${integration.name}-${index}`)}
            <li class="border-b border-border last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
              <a
                href={integration.href ?? "?"}
                data-tone="blue"
                class="surface-pastel surface-pastel-interactive group/integration flex h-full min-h-48 flex-col gap-4 p-[var(--surface-padding-md)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50"
              >
                <span class="flex items-start justify-between gap-4">
                  <span class="grid size-11 place-items-center border border-border bg-background font-mono text-sm font-semibold" aria-hidden="true">
                    {initials(integration.name)}
                  </span>
                  <ArrowUpRightIcon class="size-4 text-muted-foreground motion-transform group-hover/integration:-translate-y-0.5 group-hover/integration:translate-x-0.5" aria-hidden="true" />
                </span>
                <span>
                  <span class="block text-lg font-semibold">{integration.name}</span>
                  <span class="mt-1 block text-xs font-medium uppercase tracking-[var(--tracking-label)] text-muted-foreground">{integration.category}</span>
                </span>
                <span class="mt-auto text-sm leading-6 text-muted-foreground">{integration.description}</span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}

      {#if action || note}
        <div class="flex flex-col justify-between gap-[var(--layout-gap-md)] border-t border-border pt-[var(--layout-gap-md)] md:flex-row md:items-center">
          {#if note}
            <p class="max-w-[var(--layout-prose)] text-sm text-muted-foreground">{note}</p>
          {/if}
          {#if action}
            <ActionRow>
              <Button href={action.href} variant="outline">{action.label}</Button>
            </ActionRow>
          {/if}
        </div>
      {/if}
    </Stack>
  </Section>
</section>
