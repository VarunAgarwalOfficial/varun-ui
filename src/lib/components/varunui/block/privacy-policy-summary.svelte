<script lang="ts" module>
  export interface PrivacyPolicySummaryLabels {
    badge?: string;
    footer?: string;
  }

  export interface PrivacyPolicySummaryProps {
    title?: string;
    description?: string;
    items?: string[];
    labels?: PrivacyPolicySummaryLabels;
    className?: string;
  }

  export const privacyPolicySummaryDemo: PrivacyPolicySummaryProps = {
    title: "Privacy Policy",
    description:
      "We value your privacy. Here's a quick overview of how we handle your data.",
    items: [
      "We only collect data necessary to provide the service",
      "Your data is encrypted in transit and at rest",
      "We never sell your personal information to third parties",
      "You can request data deletion at any time",
      "Cookies are used only for essential functionality",
      "We retain data only as long as your account is active",
    ],
    labels: {
      badge: "Privacy",
      footer: "Last updated: February 2026",
    },
  };
</script>

<script lang="ts">
  import { Shield } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    title = privacyPolicySummaryDemo.title,
    description = privacyPolicySummaryDemo.description,
    items = privacyPolicySummaryDemo.items,
    labels = privacyPolicySummaryDemo.labels,
    className,
  }: PrivacyPolicySummaryProps = $props();
</script>

<Section container="prose" className={cn("bg-background", className)}>
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <Shield class="size-5 text-primary" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-semibold text-foreground">{title}</h2>
              {#if labels?.badge}
                <Badge variant="muted" class="text-xs">{labels.badge}</Badge
                >
              {/if}
            </div>
            {#if description}
              <p class="mt-1 text-sm text-muted-foreground">{description}</p>
            {/if}
          </div>
        </div>
      </div>

      {#if items?.length}
        <ul class="divide-y divide-border">
          {#each items as item, index (index)}
            <li class="px-6 py-3 text-sm text-muted-foreground">{item}</li>
          {/each}
        </ul>
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
