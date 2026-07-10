<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type AuthShellContextSide = "left" | "right";

  export interface AuthShellProps {
    context: Snippet;
    header: Snippet;
    children: Snippet;
    footer?: Snippet;
    contextSide?: AuthShellContextSide;
  }
</script>

<script lang="ts">
  let {
    context,
    header,
    children,
    footer,
    contextSide = "left",
  }: AuthShellProps = $props();

  const contextClass = $derived(
    contextSide === "left"
      ? "order-2 lg:order-1"
      : "order-2 lg:order-2",
  );
  const taskClass = $derived(
    contextSide === "left" ? "order-1 lg:order-2" : "order-1 lg:order-1",
  );
</script>

<section
  data-slot="auth-shell"
  class="grid min-h-[var(--layout-viewport-height)] w-full lg:grid-cols-2"
>
  <div
    class={`grid min-h-[var(--layout-media-sm)] min-w-0 overflow-hidden lg:min-h-[var(--layout-viewport-height)] ${contextClass}`}
    data-slot="auth-shell-context"
  >
    {@render context()}
  </div>

  <div
    class={`flex min-w-0 items-center justify-center px-[var(--layout-gutter)] py-[var(--layout-section-space)] ${taskClass}`}
    data-slot="auth-shell-task"
  >
    <div class="w-full max-w-[var(--layout-form)]">
      <header class="mb-[var(--layout-gap-lg)]">
        {@render header()}
      </header>

      {@render children()}

      {#if footer}
        <footer class="mt-[var(--layout-gap-md)]">
          {@render footer()}
        </footer>
      {/if}
    </div>
  </div>
</section>
