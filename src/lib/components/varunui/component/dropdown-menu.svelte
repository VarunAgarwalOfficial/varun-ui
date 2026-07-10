<script lang="ts" module>
  export type DropdownMenuOptionTone = "default" | "danger";
  export type DropdownMenuSize = "sm" | "md";
  export type DropdownMenuWidth = "compact" | "fit" | "wide";

  export interface DropdownMenuOption {
    label: string;
    value?: string;
    description?: string;
    shortcut?: string;
    disabled?: boolean;
    tone?: DropdownMenuOptionTone;
  }

  export interface DropdownMenuProps {
    label: string;
    options?: DropdownMenuOption[];
    size?: DropdownMenuSize;
    width?: DropdownMenuWidth;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSelect?: (option: DropdownMenuOption) => void;
  }

  export const dropdownMenuDemo: DropdownMenuProps = {
    label: "Component actions",
    open: true,
    options: [
      {
        label: "Copy import",
        value: "copy-import",
        description: "Add the component export to your clipboard.",
        shortcut: "C",
      },
      {
        label: "View registry item",
        value: "view-registry",
        description: "Open the generated registry payload.",
        shortcut: "R",
      },
      {
        label: "Remove recipe",
        value: "remove-recipe",
        description: "Delete this example from the draft set.",
        tone: "danger",
      },
      {
        label: "Publish changes",
        value: "publish-changes",
        description: "Disabled until the checklist passes.",
        disabled: true,
      },
    ],
  };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { CaretDownIcon } from "$lib/components/varunui/internal/icons/phosphor.js";

  const itemBase =
    "motion-colors relative flex w-full cursor-default select-none items-start gap-3 rounded-md px-2 py-1.5 text-left text-sm outline-none data-[highlighted]:bg-muted data-[highlighted]:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

  let {
    label,
    options = [],
    size = "md",
    width = "compact",
    open = $bindable(false),
    onOpenChange,
    onSelect,
  }: DropdownMenuProps = $props();

  const hasOptions = $derived(options.length > 0);
  const triggerSizeClass = $derived(
    size === "sm"
      ? "h-[var(--control-height-sm)] text-sm"
      : "h-[var(--control-height-md)] text-sm",
  );
  const triggerWidthClass = $derived(
    width === "wide"
      ? "w-full sm:w-72"
      : width === "fit"
        ? "min-w-0"
        : "min-w-44",
  );

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange?.(nextOpen);
  }

  function chooseOption(option: DropdownMenuOption) {
    onSelect?.(option);
  }
</script>

<DropdownMenu.Root bind:open onOpenChange={handleOpenChange}>
  <DropdownMenu.Trigger
    type="button"
    disabled={!hasOptions}
    data-slot="dropdown-menu-trigger"
    class={`motion-interactive group/dropdown-menu-trigger inline-flex max-w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 font-medium text-foreground outline-none hover:bg-muted focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 data-[state=open]:bg-muted disabled:pointer-events-none disabled:opacity-50 ${triggerSizeClass} ${triggerWidthClass}`}
  >
    <span class="truncate">{label}</span>
    <CaretDownIcon
      aria-hidden="true"
      class="size-4 shrink-0 text-muted-foreground motion-transform group-data-[state=open]/dropdown-menu-trigger:rotate-180"
    />
  </DropdownMenu.Trigger>

  {#if hasOptions}
    <DropdownMenu.Content
      align="start"
      sideOffset={6}
      class="bg-surface text-foreground data-open:motion-popover data-closed:motion-popover-out ring-foreground/10 z-50 min-w-64 rounded-lg p-1 ring-1"
    >
      {#each options as option, index (`${option.label}-${index}`)}
        <DropdownMenu.Item
          disabled={option.disabled || undefined}
          onSelect={() => chooseOption(option)}
          class={`${itemBase} ${option.tone === "danger" ? "text-danger data-[highlighted]:bg-danger/10 data-[highlighted]:text-danger" : ""}`}
        >
          <span class="min-w-0 flex-1">
            <span class="block truncate font-medium">{option.label}</span>
            {#if option.description}
              <span
                class={`mt-0.5 block line-clamp-2 text-xs text-muted-foreground ${option.tone === "danger" ? "text-danger/70" : ""}`}
              >
                {option.description}
              </span>
            {/if}
          </span>
          {#if option.shortcut}
            <span
              aria-hidden="true"
              class="mt-0.5 shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {option.shortcut}
            </span>
          {/if}
        </DropdownMenu.Item>
      {/each}
    </DropdownMenu.Content>
  {/if}
</DropdownMenu.Root>
