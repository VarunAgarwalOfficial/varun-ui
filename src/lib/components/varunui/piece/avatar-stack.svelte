<script lang="ts" module>
  export interface AvatarStackItem {
    src?: string;
    alt: string;
    initials?: string;
    label?: string;
  }

  export type AvatarStackSize = "sm" | "md" | "lg";

  export interface AvatarStackProps {
    items?: AvatarStackItem[];
    overflowLabel?: string;
    size?: AvatarStackSize;
    label?: string;
  }

  export const avatarStackDemo: AvatarStackProps = {
    label: "Customer team avatars",
    overflowLabel: "+2k",
    items: [
      {
        alt: "Mira Chen",
        initials: "MC",
      },
      {
        alt: "Ari Bell",
        initials: "AB",
      },
      {
        alt: "Jon Reed",
        initials: "JR",
        label: "Jon Reed",
      },
    ],
  };
</script>

<script lang="ts">
  let {
    items = [],
    overflowLabel,
    size = "md",
    label,
  }: AvatarStackProps = $props();

  const avatarClasses: Record<AvatarStackSize, string> = {
    sm: "size-8",
    md: "size-11",
    lg: "size-14",
  };

  const overflowClasses: Record<AvatarStackSize, string> = {
    sm: "h-8 px-2 text-xs",
    md: "h-11 px-3 text-sm",
    lg: "h-14 px-4 text-base",
  };

  const labelOffsetClasses: Record<AvatarStackSize, string> = {
    sm: "-top-8",
    md: "-top-9",
    lg: "-top-10",
  };

  const stackClass = $derived(
    [
      "flex items-center",
      size === "sm" ? "-space-x-2" : "",
      size === "md" ? "-space-x-3" : "",
      size === "lg" ? "-space-x-4" : "",
    ]
      .filter(Boolean)
      .join(" "),
  );

  function initialsFor(item: AvatarStackItem) {
    return (
      item.initials ??
      item.alt
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    );
  }
</script>

{#if items.length > 0 || overflowLabel}
  <div class={stackClass} aria-label={label}>
    {#each items as item, index (`${item.alt}-${index}`)}
      <div class="relative">
        {#if item.label}
          <div class={`absolute left-1/2 z-10 -translate-x-1/2 ${labelOffsetClasses[size]}`}>
            <div
              class="whitespace-nowrap rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {item.label}
            </div>
            <span
              class="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-border bg-surface"
              aria-hidden="true"
            ></span>
          </div>
        {/if}

        <span
          class={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-muted font-semibold text-muted-foreground ${avatarClasses[size]}`}
        >
          {#if item.src}
            <img
              class="size-full object-cover"
              src={item.src}
              alt={item.alt}
            />
          {:else}
            <span aria-hidden="true">{initialsFor(item)}</span>
            <span class="sr-only">{item.alt}</span>
          {/if}
        </span>
      </div>
    {/each}

    {#if overflowLabel}
      <span
        class={`flex shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted font-semibold text-muted-foreground ${overflowClasses[size]}`}
      >
        {overflowLabel}
      </span>
    {/if}
  </div>
{/if}
