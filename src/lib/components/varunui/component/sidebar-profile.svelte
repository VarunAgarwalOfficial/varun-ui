<script lang="ts" module>
  export interface SidebarProfilePerson {
    name: string;
    detail?: string;
    avatar?: {
      src: string;
      alt?: string;
    };
  }

  export interface SidebarProfileProps {
    person: SidebarProfilePerson;
    collapsed?: boolean;
    href?: string;
    label?: string;
    onSelect?: (event: MouseEvent) => void;
  }

  export const sidebarProfileDemo: SidebarProfileProps = {
    label: "Open account",
    href: "?",
    person: {
      name: "Mira Chen",
      detail: "Design systems",
    },
  };
</script>

<script lang="ts">
  let {
    person,
    collapsed = false,
    href,
    label,
    onSelect,
  }: SidebarProfileProps = $props();

  const initials = $derived(
    person.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  );

  const rowLayoutClass = $derived(
    `flex w-full min-w-0 items-center text-left ${collapsed ? "justify-center p-1" : "gap-3 p-2"}`,
  );
  const interactiveRowClass = $derived(
    `motion-interactive rounded-md outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-primary/50 ${rowLayoutClass}`,
  );
</script>

{#snippet profileContent()}
  <span
    data-slot="sidebar-profile-avatar"
    class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-muted-foreground"
  >
    {#if person.avatar}
      <img
        class="size-full object-cover"
        src={person.avatar.src}
        alt={person.avatar.alt ?? person.name}
      />
    {:else}
      {initials}
    {/if}
  </span>

  {#if !collapsed}
    <span class="min-w-0 flex-1">
      <span class="block truncate text-sm font-semibold text-foreground">
        {person.name}
      </span>
      {#if person.detail}
        <span class="block truncate text-xs text-muted-foreground">
          {person.detail}
        </span>
      {/if}
    </span>
  {/if}
{/snippet}

{#if href}
  <a
    data-slot="sidebar-profile"
    href={href}
    aria-label={label ?? person.name}
    title={collapsed ? person.name : undefined}
    class={interactiveRowClass}
  >
    {@render profileContent()}
  </a>
{:else if onSelect}
  <button
    data-slot="sidebar-profile"
    type="button"
    aria-label={label ?? person.name}
    title={collapsed ? person.name : undefined}
    class={interactiveRowClass}
    onclick={onSelect}
  >
    {@render profileContent()}
  </button>
{:else}
  <div
    data-slot="sidebar-profile"
    title={collapsed ? person.name : undefined}
    class={rowLayoutClass}
  >
    {@render profileContent()}
  </div>
{/if}
