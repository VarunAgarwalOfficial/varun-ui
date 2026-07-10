<script lang="ts" module>
  export interface DataRetentionRow {
    category: string;
    period: string;
    basis: string;
  }

  export interface DataRetentionLabels {
    categoryHeader?: string;
    periodHeader?: string;
    basisHeader?: string;
    footer?: string;
  }

  export interface DataRetentionProps {
    title?: string;
    description?: string;
    rows?: DataRetentionRow[];
    labels?: DataRetentionLabels;
    className?: string;
  }

  export const dataRetentionDemo: DataRetentionProps = {
    title: "Data Retention Schedule",
    description:
      "How long we keep different types of data and the legal basis for retention.",
    rows: [
      {
        category: "Account Information",
        period: "Duration of account",
        basis: "Contract performance",
      },
      {
        category: "Transaction Records",
        period: "7 years",
        basis: "Legal obligation",
      },
      {
        category: "Usage Analytics",
        period: "24 months",
        basis: "Legitimate interest",
      },
      {
        category: "Support Tickets",
        period: "3 years",
        basis: "Legitimate interest",
      },
      {
        category: "Marketing Preferences",
        period: "Until withdrawal",
        basis: "Consent",
      },
      {
        category: "Server Logs",
        period: "90 days",
        basis: "Legitimate interest",
      },
      {
        category: "Backup Data",
        period: "30 days after deletion",
        basis: "Legitimate interest",
      },
    ],
    labels: {
      categoryHeader: "Data Category",
      periodHeader: "Retention Period",
      basisHeader: "Legal Basis",
      footer: "Data is securely deleted after the retention period expires.",
    },
  };
</script>

<script lang="ts">
  import { Database } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    title = dataRetentionDemo.title,
    description = dataRetentionDemo.description,
    rows = dataRetentionDemo.rows,
    labels = dataRetentionDemo.labels,
    className,
  }: DataRetentionProps = $props();
</script>

<Section container="prose" className={cn("bg-background", className)}>
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <Database class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-semibold text-foreground">{title}</h2>
            {#if description}
              <p class="mt-1 text-sm text-muted-foreground">{description}</p>
            {/if}
          </div>
        </div>
      </div>

      {#if rows?.length}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border bg-muted">
                <th
                  class="px-6 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {labels?.categoryHeader}
                </th>
                <th
                  class="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {labels?.periodHeader}
                </th>
                <th
                  class="px-6 py-2.5 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {labels?.basisHeader}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              {#each rows as row, index (index)}
                <tr>
                  <td class="px-6 py-3 text-sm text-foreground">
                    {row.category}
                  </td>
                  <td class="px-4 py-3 text-sm text-muted-foreground">
                    {row.period}
                  </td>
                  <td class="px-6 py-3 text-right">
                    <Badge variant="outline" class="text-xs">{row.basis}</Badge>
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
