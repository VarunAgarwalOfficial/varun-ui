<script lang="ts" module>
  import type { Component } from "svelte";
  import {
    KeyRound,
    Mail,
    Shield,
    Smartphone,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  type SecurityStatus = "completed" | "optional" | "pending";

  interface SecurityStep {
    id: string;
    icon?: Component;
    title: string;
    description: string;
    status: SecurityStatus;
    actionLabel: string;
  }

  export interface SecuritySetupProps {
    kicker?: string;
    heading?: string;
    description?: string;
    steps?: SecurityStep[];
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      completed?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const securitySetupDemo: SecuritySetupProps = {
    kicker: "Security",
    heading: "Protect the account before work begins.",
    description:
      "Finish recovery and sign-in safeguards now, or return to the unfinished items from security settings.",
    steps: [
      {
        id: "email",
        icon: Mail,
        title: "Verify recovery email",
        description: "Add a backup email for account recovery",
        status: "completed",
        actionLabel: "Verified",
      },
      {
        id: "2fa",
        icon: Smartphone,
        title: "Two-factor authentication",
        description: "Add an extra layer of security with 2FA",
        status: "pending",
        actionLabel: "Enable",
      },
      {
        id: "backup",
        icon: KeyRound,
        title: "Backup codes",
        description: "Generate one-time recovery codes",
        status: "pending",
        actionLabel: "Generate",
      },
      {
        id: "password",
        icon: Shield,
        title: "Strong password",
        description: "Ensure your password meets security requirements",
        status: "completed",
        actionLabel: "Updated",
      },
    ],
    primaryButton: { label: "Continue", href: "?" },
    secondaryButton: { label: "I'll do this later", href: "?" },
    labels: {
      completed: "Done",
    },
    currentStep: 3,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";

  let {
    kicker,
    heading,
    description,
    steps = [],
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: SecuritySetupProps = $props();

  let completed = $state<Set<string>>(new Set());
  let initialized = $state(false);

  function toggleComplete(id: string) {
    const next = new Set(completed);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    completed = next;
  }

  $effect(() => {
    if (!initialized && steps.length > 0) {
      completed = new Set(
        steps
          .filter((step) => step.status === "completed")
          .map((step) => step.id),
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
  tone="purple"
  {className}
>
      <div class="divide-y divide-border">
        {#each steps as step}
          {@const isDone = completed.has(step.id)}
          <div
            class="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
          >
            <div
              class={`flex size-10 shrink-0 items-center justify-center rounded-sm border ${isDone ? "border-success/40 bg-success/10 text-success" : "border-border bg-background text-muted-foreground"}`}
            >
              {#if step.icon}
                {@const Icon = step.icon}
                <Icon class="size-5" />
              {/if}
            </div>

            <div class="min-w-0 flex-1 text-left">
              <p class="font-medium">{step.title}</p>
              <p class="mt-0.5 text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>

            <div class="sm:justify-self-end">
              {#if isDone}
                <span class="text-xs font-semibold text-success">
                  {labels?.completed ?? "Done"}
                </span>
              {:else}
                <Button
                  size="sm"
                  variant="outline"
                  class="text-xs"
                  onclick={() => toggleComplete(step.id)}
                >
                  {step.actionLabel}
                </Button>
              {/if}
            </div>
          </div>
        {/each}
      </div>

  {#snippet status()}
    <p>{completed.size} of {steps.length} safeguards complete.</p>
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
