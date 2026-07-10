<script lang="ts" module>
  export type PlanFeatureListTone = "default" | "inverse";

  export interface PlanFeatureListProps {
    features: string[];
    heading?: string;
    tone?: PlanFeatureListTone;
  }

  export const planFeatureListDemo: PlanFeatureListProps = {
    heading: "Includes",
    features: [
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
    ],
  };
</script>

<script lang="ts">
  import { Check } from "$lib/components/varunui/internal/icons/phosphor.js";

  const toneClasses: Record<
    PlanFeatureListTone,
    { heading: string; item: string; icon: string }
  > = {
    default: {
      heading: "text-foreground",
      item: "text-foreground",
      icon: "text-primary",
    },
    "inverse": {
      heading: "text-background",
      item: "text-background",
      icon: "text-background",
    },
  };

  let { features, heading, tone = "default" }: PlanFeatureListProps =
    $props();

  const styles = $derived(toneClasses[tone]);
</script>

<div class="space-y-5">
  {#if heading}
    <p class={`text-base font-semibold ${styles.heading}`}>{heading}</p>
  {/if}

  {#if features.length > 0}
    <ul class="space-y-3.5">
      {#each features as feature, index (`${feature}-${index}`)}
        <li class={`flex items-start gap-3 text-base ${styles.item}`}>
          <Check
            class={`mt-0.5 size-5 shrink-0 ${styles.icon}`}
            aria-hidden="true"
          />
          <span>{feature}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
