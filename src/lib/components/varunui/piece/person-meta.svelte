<script lang="ts" module>
  export interface PersonMetaPerson {
    name: string;
    role?: string;
    avatar?: {
      src: string;
      alt?: string;
    };
  }

  export type PersonMetaSize = "sm" | "md";

  export interface PersonMetaProps {
    person: PersonMetaPerson;
    size?: PersonMetaSize;
  }

  export const personMetaDemo: PersonMetaProps = {
    person: {
      name: "Priya Raman",
      role: "Co-founder using varunUI",
    },
  };
</script>

<script lang="ts">
  let { person, size = "sm" }: PersonMetaProps = $props();

  const avatarClasses: Record<PersonMetaSize, string> = {
    sm: "size-10",
    md: "size-12",
  };
</script>

<div data-person-meta class="flex items-center gap-3">
  {#if person.avatar}
    <span
      data-person-avatar
      class={`shrink-0 overflow-hidden rounded-full bg-muted ${avatarClasses[size]}`}
    >
      <img
        class="size-full object-cover"
        src={person.avatar.src}
        alt={person.avatar.alt ?? person.name}
      />
    </span>
  {/if}
  <span class="min-w-0">
    <span class="block font-semibold text-foreground">{person.name}</span>
    {#if person.role}
      <span class="block text-sm text-muted-foreground">{person.role}</span>
    {/if}
  </span>
</div>
