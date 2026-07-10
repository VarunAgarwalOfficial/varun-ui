<script lang="ts" module>
  export interface PrivacyRightsItem {
    label: string;
    free: string;
    pro: string;
  }

  export interface PrivacyRightsLabels {
    freeHeader?: string;
    proHeader?: string;
    footer?: string;
  }

  export interface PrivacyRightsProps {
    title?: string;
    description?: string;
    items?: PrivacyRightsItem[];
    labels?: PrivacyRightsLabels;
    className?: string;
  }

  export const privacyRightsDemo: PrivacyRightsProps = {
    title: "Your Rights by Plan",
    description:
      "Data rights and privacy features available on each plan tier.",
    items: [
      { label: "Data Export", free: "CSV only", pro: "CSV, JSON, API" },
      { label: "Deletion Request", free: "30 days", pro: "48 hours" },
      { label: "Access Request", free: "30 days", pro: "5 business days" },
      { label: "Audit Logs", free: "Not available", pro: "Full access" },
      { label: "Consent Management", free: "Basic", pro: "Granular controls" },
      { label: "DPA Available", free: "On request", pro: "Included" },
      {
        label: "Dedicated DPO Contact",
        free: "Not available",
        pro: "Direct line",
      },
    ],
    labels: {
      freeHeader: "Free",
      proHeader: "Pro",
      footer:
        "All plans include GDPR compliance, encryption at rest, and breach notification.",
    },
  };
</script>

<script lang="ts">
  import { ScalesIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    title = privacyRightsDemo.title,
    description = privacyRightsDemo.description,
    items = privacyRightsDemo.items,
    labels = privacyRightsDemo.labels,
    className,
  }: PrivacyRightsProps = $props();
</script>

<Section container="prose" className={cn("bg-background", className)}>
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <ScalesIcon class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-semibold text-foreground">{title}</h2>
            {#if description}
              <p class="mt-1 text-sm text-muted-foreground">{description}</p>
            {/if}
          </div>
        </div>
      </div>

      {#if items?.length}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border bg-muted">
                <th
                  class="px-6 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase"
                ></th>
                <th
                  class="px-4 py-2.5 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {labels?.freeHeader}
                </th>
                <th
                  class="px-6 py-2.5 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {labels?.proHeader}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              {#each items as item, index (index)}
                <tr>
                  <td class="px-6 py-3 text-sm font-medium text-foreground">
                    {item.label}
                  </td>
                  <td class="px-4 py-3 text-center">
                    <Badge variant="outline" class="text-xs">{item.free}</Badge>
                  </td>
                  <td class="px-6 py-3 text-center">
                    <Badge variant="muted" class="text-xs">{item.pro}</Badge
                    >
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}

      {#if labels?.footer}
        <div class="border-t border-border bg-muted px-6 py-3">
          <p class="text-center text-xs text-muted-foreground">
            {labels.footer}
          </p>
        </div>
      {/if}
    </div>
</Section>
