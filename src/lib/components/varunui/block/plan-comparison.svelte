<script lang="ts" module>
  export type PlanComparisonMatrixValue = boolean | string;

  export interface PlanComparisonPlanAction {
    label: string;
    href?: string;
    variant?: "primary" | "outline";
    onClick?: (event: MouseEvent) => void;
  }

  export interface PlanComparisonPlan {
    title: string;
    value: string | number;
    valuePrefix?: string;
    valueSuffix?: string;
    action?: PlanComparisonPlanAction;
    highlighted?: boolean;
  }

  export interface PlanComparisonFeatureRow {
    label: string;
    values: PlanComparisonMatrixValue[];
  }

  export interface PlanComparisonProps {
    kicker?: string;
    heading?: string;
    description?: string;
    columns?: PlanComparisonPlan[];
    rows?: PlanComparisonFeatureRow[];
  }

  export const planComparisonDemo: PlanComparisonProps = {
    kicker: "Compare plans",
    heading: "See exactly what changes between plans.",
    description:
      "Every varunUI plan includes the same core system. Choose by workspace size, permissions, and support needs.",
    columns: [
      {
        title: "Solo",
        value: "$0",
        valueSuffix: "per month",
        action: { label: "Start solo", variant: "outline" },
      },
      {
        title: "Team",
        value: "$29",
        valueSuffix: "per month",
        action: { label: "Start a trial" },
        highlighted: true,
      },
      {
        title: "Company",
        value: "$99",
        valueSuffix: "per month",
        action: { label: "Talk to sales", variant: "outline" },
      },
    ],
    rows: [
      { label: "Active projects", values: ["3", "Unlimited", "Unlimited"] },
      { label: "Workspace members", values: ["1", "Up to 25", "Unlimited"] },
      { label: "Shared review links", values: [true, true, true] },
      { label: "Version history", values: ["30 days", "Unlimited", "Unlimited"] },
      { label: "Connected tools", values: [false, true, true] },
      { label: "Advanced permissions", values: [false, false, true] },
      { label: "Single sign-on", values: [false, false, true] },
      { label: "Named support contact", values: [false, false, true] },
    ],
  };
</script>

<script lang="ts">
  import { Check, Minus } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import PriceDisplay from "$lib/components/varunui/piece/price-display.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = planComparisonDemo.kicker,
    heading = planComparisonDemo.heading,
    description = planComparisonDemo.description,
    columns = planComparisonDemo.columns ?? [],
    rows = planComparisonDemo.rows ?? [],
  }: PlanComparisonProps = $props();

  const columnTemplate = $derived(
    `grid-template-columns: minmax(14rem, 1.4fr) repeat(${Math.max(columns.length, 1)}, minmax(0, 1fr))`,
  );

  const planHeaderClass = (highlighted: boolean) =>
    [
      "flex flex-col items-center gap-3 px-5 pb-6 pt-5 text-center",
      highlighted ? "bg-primary/5" : "",
    ]
      .filter(Boolean)
      .join(" ");

  const valueCellClass = (highlighted: boolean) =>
    [
      "flex h-full items-center justify-center px-4 py-5 text-center",
      highlighted ? "bg-primary/5" : "",
    ]
      .filter(Boolean)
      .join(" ");

  const mobilePlanClass = (highlighted: boolean) =>
    ["rounded-none border p-6", highlighted ? "bg-primary/5" : "bg-surface"]
      .filter(Boolean)
      .join(" ");
</script>

{#snippet matrixValue(value: PlanComparisonMatrixValue)}
  {#if value === true}
    <Check class="size-5 text-primary" aria-label="Included" />
  {:else if value === false}
    <Minus class="size-5 text-muted-foreground" aria-label="Not included" />
  {:else}
    <span class="text-base font-medium text-foreground">{value}</span>
  {/if}
{/snippet}

{#snippet planAction(plan: PlanComparisonPlan)}
  {#if plan.action}
    <Button
      href={plan.action.href}
      variant={plan.action.variant ?? (plan.highlighted ? "primary" : "outline")}
      onclick={plan.action.href ? undefined : plan.action.onClick}
      class="mt-1 w-full"
    >
      {plan.action.label}
    </Button>
  {/if}
{/snippet}

<Section container="max">
  <Stack gap="xl">
    <SectionHeader {kicker} title={heading} {description} markerTone="yellow" />
    <div class="mx-auto w-full max-w-[var(--layout-content-max)]">
      {#if columns.length > 0 && rows.length > 0}
        <div class="hidden md:block">
          <div class="grid items-stretch" style={columnTemplate}>
            <div class="flex flex-col justify-end pb-6 pr-6">
              <span class="text-base font-semibold text-foreground">
                Plan details
              </span>
            </div>

            {#each columns as plan, index (`${plan.title}-${index}`)}
              <div class={planHeaderClass(Boolean(plan.highlighted))}>
                <h3 class="text-xl font-bold tracking-tight">
                  {plan.title}
                </h3>

                <PriceDisplay
                  value={plan.value}
                  currency={plan.valuePrefix}
                  period={plan.valueSuffix}
                  size="md"
                />

                {@render planAction(plan)}
              </div>
            {/each}
          </div>

          <div class="border-t">
            {#each rows as row, rowIndex (rowIndex)}
              <div class="grid items-center border-b" style={columnTemplate}>
                <div class="py-5 pr-4 text-lg font-semibold">
                  {row.label}
                </div>

                {#each columns as plan, columnIndex (`${rowIndex}-${plan.title}-${columnIndex}`)}
                  <div
                    class={valueCellClass(Boolean(plan.highlighted))}
                  >
                    {@render matrixValue(row.values[columnIndex] ?? false)}
                  </div>
                {/each}
              </div>
            {/each}
          </div>
        </div>

        <div class="flex flex-col gap-6 md:hidden">
          {#each columns as plan, columnIndex (`${plan.title}-${columnIndex}`)}
            <article class={mobilePlanClass(Boolean(plan.highlighted))}>
              <div class="border-b pb-6">
                <h3 class="text-xl font-bold tracking-tight">
                  {plan.title}
                </h3>
                <div class="mt-4">
                  <PriceDisplay
                    value={plan.value}
                    currency={plan.valuePrefix}
                    period={plan.valueSuffix}
                    size="md"
                  />
                </div>
                <div class="mt-5">
                  {@render planAction(plan)}
                </div>
              </div>

              <dl class="mt-2">
                {#each rows as row, rowIndex (rowIndex)}
                  <div class="flex items-center justify-between gap-4 border-b py-4 last:border-b-0">
                    <dt class="text-base font-semibold">{row.label}</dt>
                    <dd class="flex items-center">
                      {@render matrixValue(row.values[columnIndex] ?? false)}
                    </dd>
                  </div>
                {/each}
              </dl>
            </article>
          {/each}
        </div>
      {/if}
    </div>
  </Stack>
</Section>
