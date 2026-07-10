<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type KanbanBoardTone =
    | "default"
    | "success"
    | "warning"
    | "info"
    | "danger";

  export interface KanbanBoardColumn {
    id: string;
    title: string;
    count?: string | number;
    tone?: KanbanBoardTone;
  }

  export interface KanbanBoardCard {
    id: string;
    title: string;
    description?: string;
    meta?: string;
    tone?: KanbanBoardTone;
  }

  export interface KanbanBoardProps {
    columns: readonly KanbanBoardColumn[];
    cardsByColumn?: Record<string, readonly KanbanBoardCard[]>;
    children?: Snippet<[KanbanBoardColumn, number]>;
  }

  export const kanbanBoardDemo: KanbanBoardProps = {
    columns: [
      { id: "planned", title: "Planned", count: 2 },
      { id: "active", title: "Active", count: 2, tone: "info" },
      { id: "review", title: "Review", count: 1, tone: "warning" },
      { id: "done", title: "Done", count: 1, tone: "success" },
    ],
    cardsByColumn: {
      planned: [
        { id: "audit", title: "Audit empty states", meta: "Design" },
        { id: "copy", title: "Rewrite onboarding copy", meta: "Content" },
      ],
      active: [
        {
          id: "shell",
          title: "Build account shell",
          description: "Wire navigation, header, and the persistent action rail.",
          meta: "Frontend",
          tone: "info",
        },
        { id: "tokens", title: "Token pass", meta: "System" },
      ],
      review: [
        { id: "qa", title: "Responsive QA", meta: "Review", tone: "warning" },
      ],
      done: [
        { id: "auth", title: "Auth form polish", meta: "Merged", tone: "success" },
      ],
    },
  };
</script>

<script lang="ts">
  let { columns, cardsByColumn = {}, children }: KanbanBoardProps = $props();

  const toneClasses: Record<KanbanBoardTone, string> = {
    default: "bg-muted-foreground/30",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
    danger: "bg-danger",
  };
</script>

<div
  data-slot="kanban-board"
  class="flex max-w-full gap-[var(--layout-gap-md)] overflow-x-auto pb-[var(--layout-gap-xs)]"
>
  {#each columns as column, index (column.id)}
    <section class="w-72 shrink-0 bg-muted/40 p-[var(--surface-padding-sm)]">
      <header class="flex items-center justify-between gap-2 px-1 pb-[var(--layout-gap-sm)]">
        <div class="flex min-w-0 items-center gap-2">
          <span
            class={`size-2 rounded-full ${toneClasses[column.tone ?? "default"]}`}
            aria-hidden="true"
          ></span>
          <h3 class="truncate text-sm font-semibold uppercase tracking-wider">
            {column.title}
          </h3>
        </div>
        {#if column.count !== undefined}
          <span class="rounded-sm bg-muted px-2 py-0.5 text-sm font-semibold text-muted-foreground">
            {column.count}
          </span>
        {/if}
      </header>

      <div class="space-y-[var(--layout-gap-sm)]">
        {#if children}
          {@render children(column, index)}
        {:else}
          {#each cardsByColumn[column.id] ?? [] as card (card.id)}
            <article class="border border-border bg-background p-[var(--surface-padding-sm)]">
              <div class="flex items-start justify-between gap-3">
                <h4 class="text-sm font-medium leading-5">{card.title}</h4>
                {#if card.meta}
                  <span class="shrink-0 text-xs text-muted-foreground">
                    {card.meta}
                  </span>
                {/if}
              </div>
              {#if card.description}
                <p class="mt-2 text-sm leading-5 text-muted-foreground">
                  {card.description}
                </p>
              {/if}
            </article>
          {/each}
        {/if}
      </div>
    </section>
  {/each}
</div>
