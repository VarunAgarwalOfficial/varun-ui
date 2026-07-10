<script lang="ts" module>
  interface Shortcut {
    keys: string[];
    description: string;
  }

  interface ShortcutGroup {
    title: string;
    shortcuts: Shortcut[];
  }

  interface ShortcutAction {
    label: string;
    href?: string;
    variant?: "primary" | "outline";
  }

  export interface KeyboardShortcutsCheatSheetProps {
    kicker?: string;
    heading?: string;
    description?: string;
    groups?: ShortcutGroup[];
    actions?: ShortcutAction[];
    footerNote?: string;
    currentStep?: number;
    totalSteps?: number;
    className?: string;
  }

  export const keyboardShortcutsCheatSheetDemo: KeyboardShortcutsCheatSheetProps = {
    kicker: "Keep your hands moving",
    heading: "The shortcuts worth remembering.",
    description:
      "Move through the workspace, find anything, and finish common editing actions without reaching for the pointer.",
    groups: [
      {
        title: "Move",
        shortcuts: [
          { keys: ["Ctrl", "K"], description: "Open search" },
          { keys: ["Ctrl", "B"], description: "Toggle sidebar" },
          { keys: ["G", "D"], description: "Go to dashboard" },
        ],
      },
      {
        title: "Edit",
        shortcuts: [
          { keys: ["Ctrl", "S"], description: "Save changes" },
          { keys: ["Ctrl", "Z"], description: "Undo" },
          { keys: ["Ctrl", "D"], description: "Duplicate selection" },
        ],
      },
      {
        title: "Inspect",
        shortcuts: [
          { keys: ["Ctrl", "/"], description: "Search this view" },
          { keys: ["Ctrl", "."], description: "Open quick actions" },
          { keys: ["?"], description: "Show every shortcut" },
        ],
      },
    ],
    actions: [
      { label: "Finish setup", href: "?" },
      { label: "Do this later", href: "?", variant: "outline" },
    ],
    footerNote: "Press ? anywhere in the app to reopen this list.",
    currentStep: 4,
    totalSteps: 4,
  };
</script>

<script lang="ts">
  import { ArrowRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import KeyboardShortcut from "$lib/components/varunui/component/keyboard-shortcut.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import ActionRow from "$lib/components/varunui/piece/action-row.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = keyboardShortcutsCheatSheetDemo.kicker,
    heading = keyboardShortcutsCheatSheetDemo.heading,
    description = keyboardShortcutsCheatSheetDemo.description,
    groups = keyboardShortcutsCheatSheetDemo.groups ?? [],
    actions = keyboardShortcutsCheatSheetDemo.actions ?? [],
    footerNote = keyboardShortcutsCheatSheetDemo.footerNote,
    currentStep = 4,
    totalSteps = 4,
    className,
  }: KeyboardShortcutsCheatSheetProps = $props();

  const safeTotal = $derived(Math.max(1, totalSteps));
  const safeStep = $derived(Math.min(Math.max(1, currentStep), safeTotal));
</script>

<section data-slot="keyboard-shortcuts-cheat-sheet" class={className}>
  <Section container="md">
    <Stack gap="xl">
      <SectionHeader
        {kicker}
        title={heading}
        {description}
        align="left"
        markerTone="yellow"
      >
        <p class="text-sm font-medium text-muted-foreground">
          Step {safeStep} of {safeTotal}
        </p>
      </SectionHeader>

      <div class="grid grid-cols-1 border border-border md:grid-cols-3">
        {#each groups as group, groupIndex (`${group.title}-${groupIndex}`)}
          <section class="border-b border-border p-[var(--layout-gap-md)] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <h3 class="mb-[var(--layout-gap-md)] text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">
              {group.title}
            </h3>
            <ul class="divide-y divide-border">
              {#each group.shortcuts as shortcut (`${group.title}-${shortcut.description}`)}
                <li class="flex min-h-12 items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <span class="text-sm">{shortcut.description}</span>
                  <KeyboardShortcut keys={shortcut.keys} separator="+" />
                </li>
              {/each}
            </ul>
          </section>
        {/each}
      </div>

      <div class="flex flex-col justify-between gap-[var(--layout-gap-md)] border-t border-border pt-[var(--layout-gap-md)] md:flex-row md:items-center">
        {#if footerNote}
          <p class="text-sm text-muted-foreground">{footerNote}</p>
        {/if}
        {#if actions.length > 0}
          <ActionRow align="left">
            {#each actions.slice(0, 2) as action, index (`${action.label}-${index}`)}
              <Button
                size="lg"
                href={action.href}
                variant={action.variant ?? (index === 0 ? "primary" : "outline")}
              >
                {action.label}
                {#if index === 0}
                  <ArrowRight class="size-4" aria-hidden="true" />
                {/if}
              </Button>
            {/each}
          </ActionRow>
        {/if}
      </div>
    </Stack>
  </Section>
</section>
