<script lang="ts" module>
  import type { CatalogKind } from "$showcase/catalog.generated.js";

  export type CatalogPreviewRendererMode = "detail" | "embed";
</script>

<script lang="ts">
  import type { Component } from "svelte";
  import {
    loadPreviewModule,
    previewPropsFor,
  } from "$showcase/components/preview-loader.js";
  import { demoPreviewGuards } from "$showcase/components/demo-preview-guards.js";
  import { composedPreviewDemos } from "$showcase/components/composed-preview-demos/index.js";
  import { layoutPreviewDemos } from "$showcase/components/layout-preview-demos/index.js";

  let {
    kind,
    name,
    mode = "detail",
  }: {
    kind: CatalogKind;
    name: string;
    mode?: CatalogPreviewRendererMode;
  } = $props();

  type PreviewState =
    | { status: "idle" | "loading" }
    | { status: "ready"; component: Component; props: Record<string, unknown> }
    | { status: "error"; message: string };

  let preview = $state<PreviewState>({ status: "idle" });

  const fullWidthKinds = new Set<CatalogKind>([
    "blocks",
    "layouts",
    "pages",
  ]);

  function previewFrameClass(
    nextKind: CatalogKind,
    nextName: string,
    nextMode: CatalogPreviewRendererMode,
  ) {
    if (nextMode === "embed") {
      return fullWidthKinds.has(nextKind) || nextKind === "emails"
        ? "w-full bg-background"
        : "flex h-full w-full items-center justify-center bg-background p-6";
    }
    if (nextKind === "canvases") {
      return "mx-auto flex h-[min(80vh,60rem)] w-full items-center justify-center bg-muted/30 p-6 md:p-10";
    }
    if (nextKind === "emails") {
      return "w-full bg-muted/30 px-[var(--layout-gutter)] py-[var(--layout-section-space-sm)]";
    }
    if (nextKind === "pieces") {
      return "mx-auto flex h-[420px] w-full max-w-[var(--layout-content-sm)] items-center justify-center px-6";
    }
    if (
      fullWidthKinds.has(nextKind) ||
      (nextKind === "components" && nextName === "app-shell")
    ) {
      return "w-full";
    }
    return "mx-auto flex w-full max-w-4xl items-center justify-center px-6 py-8";
  }

  const frameClass = $derived(previewFrameClass(kind, name, mode));

  $effect(() => {
    let active = true;

    preview = { status: "loading" };

    const composedDemo =
      composedPreviewDemos[`${kind}:${name}`] ??
      (kind === "layouts" ? layoutPreviewDemos[name] : undefined);

    if (composedDemo) {
      preview = {
        status: "ready",
        component: composedDemo,
        props: {},
      };

      return () => {
        active = false;
      };
    }

    loadPreviewModule(kind, name)
      .then((module) => {
        if (!active) return;

        preview = {
          status: "ready",
          component: module.default,
          props: previewPropsFor(module, name),
        };
      })
      .catch((error: unknown) => {
        if (!active) return;
        preview = {
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : `Failed to load ${kind}/${name}.`,
        };
      });

    return () => {
      active = false;
    };
  });
</script>

<div class={frameClass} use:demoPreviewGuards>
  {#if preview.status === "ready"}
    <preview.component {...preview.props} />
  {:else if preview.status === "error"}
    <div
      class="max-w-xl rounded-md border border-border bg-surface p-6 text-center"
    >
      <p class="text-sm font-medium text-foreground">Preview failed to load</p>
      <p class="mt-2 text-sm text-muted-foreground">{preview.message}</p>
    </div>
  {:else}
    <div
      class="motion-spinner h-8 w-8 rounded-full border-b-2 border-foreground"
      role="status"
      aria-label="Loading preview"
    ></div>
  {/if}
</div>
