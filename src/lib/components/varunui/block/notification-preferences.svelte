<script lang="ts" module>
  interface NotificationOption {
    id: string;
    title: string;
    description: string;
    defaultEnabled?: boolean;
  }

  interface NotificationGroup {
    title: string;
    options: NotificationOption[];
  }

  export interface NotificationPreferencesProps {
    kicker?: string;
    heading?: string;
    description?: string;
    groups?: NotificationGroup[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      enabledCount?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const notificationPreferencesDemo: NotificationPreferencesProps = {
    kicker: "Notifications",
    heading: "Choose what deserves an interruption.",
    description:
      "Keep direct work visible and bundle everything that can wait. These settings remain editable.",
    groups: [
      {
        title: "Activity",
        options: [
          {
            id: "mentions",
            title: "Mentions & replies",
            description: "When someone mentions you or replies to your comment",
            defaultEnabled: true,
          },
          {
            id: "assignments",
            title: "Task assignments",
            description: "When a task is assigned to you or your team",
            defaultEnabled: true,
          },
          {
            id: "comments",
            title: "New comments",
            description: "When someone comments on your work",
            defaultEnabled: false,
          },
        ],
      },
      {
        title: "Updates",
        options: [
          {
            id: "product",
            title: "Product updates",
            description: "New features, improvements, and changelog",
            defaultEnabled: true,
          },
          {
            id: "digest",
            title: "Weekly digest",
            description: "A summary of your team's activity every Monday",
            defaultEnabled: false,
          },
          {
            id: "tips",
            title: "Tips & tutorials",
            description: "Best practices and how-to guides",
            defaultEnabled: false,
          },
        ],
      },
    ],
    primaryButton: { label: "Save and continue", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    labels: {
      enabledCount: "{count} notifications enabled",
    },
    currentStep: 4,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import SwitchField from "$lib/components/varunui/component/switch-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";

  let {
    kicker,
    heading,
    description,
    groups = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: NotificationPreferencesProps = $props();

  let enabled = $state<Set<string>>(new Set());
  let initialized = $state(false);
  const enabledLabel = $derived(
    (labels?.enabledCount ?? "{count} notifications enabled").replace(
      "{count}",
      String(enabled.size),
    ),
  );

  function setEnabled(id: string, checked: boolean) {
    const next = new Set(enabled);
    if (checked) next.add(id);
    else next.delete(id);
    enabled = next;
  }

  $effect(() => {
    if (!initialized && groups.length > 0) {
      enabled = new Set(
        groups
          .flatMap((group) => group.options)
          .filter((option) => option.defaultEnabled)
          .map((option) => option.id),
      );
      initialized = true;
    }
  });
</script>

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="yellow"
  {className}
>
      <div class="divide-y divide-border">
        {#each groups as group, groupIndex}
          <div class="py-[var(--layout-gap-md)] first:pt-0 last:pb-0">
            <h3 class="mb-4 text-sm font-medium text-muted-foreground">
              {group.title}
            </h3>
            <div class="space-y-4">
              {#each group.options as option}
                {@const isEnabled = enabled.has(option.id)}
                <SwitchField
                  id={`notification-${option.id}`}
                  label={option.title}
                  description={option.description}
                  checked={isEnabled}
                  onCheckedChange={(checked) => setEnabled(option.id, checked)}
                />
              {/each}
            </div>
          </div>
        {/each}
      </div>

  {#snippet status()}
    <p>{enabledLabel}</p>
  {/snippet}

  {#snippet actions()}
      {#if primaryButton}
        <Button size="lg" href={primaryButton.href}>
          {primaryButton.label}
          <ArrowRight class="size-4" />
        </Button>
      {/if}
      {#if secondaryButton}
        <Link href={secondaryButton.href} label={secondaryButton.label} />
      {/if}
  {/snippet}
</OnboardingStep>
