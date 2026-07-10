<script lang="ts" module>
  interface ActionItem {
    label: string;
    href?: string;
    variant?: "primary" | "outline";
  }

  export interface ClosingCtaProps {
    kicker?: string;
    heading?: string;
    description?: string;
    actions?: ActionItem[];
  }

  export const closingCtaDemo: ClosingCtaProps = {
    kicker: "Ready when you are",
    heading: "Trade the busywork for a clearer workspace.",
    description:
      "Bring one real project into varunUI and let the system carry the repetitive coordination.",
    actions: [
      { label: "Start a workspace", href: "?" },
      { label: "Read the docs", href: "?", variant: "outline" },
    ],
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";

  let {
    kicker = closingCtaDemo.kicker,
    heading = closingCtaDemo.heading,
    description = closingCtaDemo.description,
    actions = closingCtaDemo.actions ?? [],
  }: ClosingCtaProps = $props();
</script>

<Section size="lg" container="sm">
  <div class="flex flex-col items-center text-center">
    {#if kicker}
      <Marker text={kicker} tone="yellow" emphasis={true} />
    {/if}

    {#if heading}
      <h2
        class="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl"
      >
        {heading}
      </h2>
    {/if}

    {#if description}
      <p
        class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        {description}
      </p>
    {/if}

    <div class="mt-[var(--layout-gap-lg)]">
      <ActionRow>
        {#each actions.slice(0, 2) as action, index (`${action.label}-${index}`)}
          <Button
            href={action.href}
            variant={action.variant ?? (index === 0 ? "primary" : "outline")}
          >
            {action.label}
          </Button>
        {/each}
      </ActionRow>
    </div>
  </div>
</Section>
