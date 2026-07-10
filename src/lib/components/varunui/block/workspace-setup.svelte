<script lang="ts" module>
  export interface WorkspaceSetupProps {
    kicker?: string;
    heading?: string;
    description?: string;
    primaryButton?: {
      label: string;
      href: string;
    };
    secondaryButton?: {
      label: string;
      href: string;
    };
    labels?: {
      workspaceName?: string;
      workspaceNamePlaceholder?: string;
      workspaceUrl?: string;
      workspaceUrlPlaceholder?: string;
      urlPrefix?: string;
      inviteHeading?: string;
      inviteDescription?: string;
      emailPlaceholder?: string;
      addAnother?: string;
    };
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const workspaceSetupDemo: WorkspaceSetupProps = {
    kicker: "Workspace",
    heading: "Create the first workspace.",
    description:
      "Set up a home for your team. You can always change these settings later.",
    primaryButton: { label: "Create workspace", href: "?" },
    secondaryButton: { label: "Skip for now", href: "?" },
    labels: {
      workspaceName: "Workspace name",
      workspaceNamePlaceholder: "Design team",
      workspaceUrl: "Workspace URL",
      workspaceUrlPlaceholder: "design-team",
      urlPrefix: "varunui.example/",
      inviteHeading: "Invite your team",
      inviteDescription: "Invite only the people needed for the first project.",
      emailPlaceholder: "colleague@company.com",
      addAnother: "Add another",
    },
    currentStep: 3,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight, Plus, Trash2 } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import Input from "$lib/components/varunui/component/input.svelte";
  import OnboardingStep from "$lib/components/varunui/block/internal/onboarding-step.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";

  let {
    kicker,
    heading,
    description,
    primaryButton,
    secondaryButton,
    labels,
    currentStep = 1,
    totalSteps = 4,
    className,
  }: WorkspaceSetupProps = $props();

  let emails = $state<string[]>([""]);

  function addEmail() {
    emails = [...emails, ""];
  }

  function removeEmail(index: number) {
    emails = emails.filter((_, itemIndex) => itemIndex !== index);
  }

  function updateEmail(index: number, value: string) {
    emails = emails.map((email, itemIndex) =>
      itemIndex === index ? value : email,
    );
  }
</script>

<OnboardingStep
  {kicker}
  title={heading}
  {description}
  {currentStep}
  {totalSteps}
  tone="blue"
  {className}
>
  <Stack gap="md">
        <InputField
          id="workspace-name"
          label={labels?.workspaceName ?? "Workspace name"}
          placeholder={labels?.workspaceNamePlaceholder ?? "varunUI Studio"}
        />

        <div>
          <label for="workspace-url" class="mb-2 block text-sm font-medium">
            {labels?.workspaceUrl ?? "Workspace URL"}
          </label>
          <div
            class="flex h-[var(--control-height-md)] overflow-hidden rounded-lg border bg-background"
          >
            <span
              class="flex items-center border-r bg-muted px-3 text-sm text-muted-foreground"
            >
              {labels?.urlPrefix ?? "app.example.com/"}
            </span>
            <Input
              id="workspace-url"
              placeholder={labels?.workspaceUrlPlaceholder ?? "design-team"}
              class="h-full flex-1 rounded-none border-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div class="border-t border-border"></div>

        <div>
          <h3 class="mb-1 font-semibold">
            {labels?.inviteHeading ?? "Invite your team"}
          </h3>
          <p class="mb-4 text-sm text-muted-foreground">
            {labels?.inviteDescription ??
              "Collaborate with your colleagues from day one"}
          </p>

          <div class="space-y-3">
            {#each emails as email, index}
              <div class="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder={labels?.emailPlaceholder ??
                    "colleague@company.com"}
                  value={email}
                  oninput={(event) =>
                    updateEmail(index, event.currentTarget.value)}
                  class="h-[var(--control-height-md)]"
                />
                {#if emails.length > 1}
                  <Button
                    type="button"
                    variant="quiet"
                    iconOnly
                    class="shrink-0 text-muted-foreground"
                    onclick={() => removeEmail(index)}
                    aria-label="Remove email"
                  >
                    <Trash2 class="size-4" />
                  </Button>
                {/if}
              </div>
            {/each}
          </div>

          <Button
            type="button"
            variant="quiet"
            size="sm"
            class="mt-2 text-muted-foreground"
            onclick={addEmail}
          >
            <Plus class="size-4" />
            {labels?.addAnother ?? "Add another"}
          </Button>
        </div>
  </Stack>

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
