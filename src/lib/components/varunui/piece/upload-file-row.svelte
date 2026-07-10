<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type UploadFileStatus = "queued" | "uploading" | "complete" | "error";

  export interface UploadFileRowProps {
    filename: string;
    meta?: string;
    status?: UploadFileStatus;
    progress?: number;
    actions?: Snippet;
  }

  export const uploadFileRowDemo: UploadFileRowProps = {
    filename: "brand-guidelines.pdf",
    meta: "12.4 MB",
    status: "uploading",
    progress: 68,
  };
</script>

<script lang="ts">
  import {
    CheckCircleIcon,
    CircleNotchIcon,
    Clock,
    FileTextIcon,
    XCircleIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";

  let {
    filename,
    meta,
    status = "queued",
    progress,
    actions,
  }: UploadFileRowProps = $props();

  const hasProgress = $derived(
    typeof progress === "number" && Number.isFinite(progress),
  );
  const safeProgress = $derived(
    hasProgress ? Math.max(0, Math.min(100, progress ?? 0)) : 0,
  );
  const statusLabel = $derived(
    status === "uploading"
      ? "Uploading"
      : status === "complete"
        ? "Complete"
        : status === "error"
          ? "Upload failed"
          : "Queued",
  );
  const statusClass = $derived(
    status === "uploading"
      ? "text-primary"
      : status === "complete"
        ? "text-success"
        : status === "error"
          ? "text-danger"
          : "text-muted-foreground",
  );
  const StatusIcon = $derived(
    status === "uploading"
      ? CircleNotchIcon
      : status === "complete"
        ? CheckCircleIcon
        : status === "error"
          ? XCircleIcon
          : Clock,
  );
  const progressTone = $derived(
    status === "error" ? "danger" : status === "complete" ? "success" : "primary",
  );
</script>

<div
  data-slot="upload-file-row"
  data-status={status}
  class="flex w-full min-w-0 flex-col gap-2 rounded-none border border-border bg-background p-3 text-foreground"
>
  <div class="flex min-w-0 items-center gap-2.5">
    <span
      class="flex size-9 shrink-0 items-center justify-center border border-border bg-background text-muted-foreground"
    >
      <FileTextIcon class="size-4" aria-hidden="true" />
    </span>

    <div class="flex min-w-0 flex-1 flex-col">
      <span class="truncate text-sm font-semibold">{filename}</span>
      {#if meta}
        <span class="truncate text-xs text-muted-foreground">{meta}</span>
      {/if}
    </div>

    {#if hasProgress}
      <span class="shrink-0 font-mono text-xs text-muted-foreground">
        {safeProgress}%
      </span>
    {/if}

    <span
      class={`inline-flex shrink-0 items-center gap-1.5 text-xs font-medium ${statusClass}`}
      aria-live="polite"
    >
      <StatusIcon class="size-4" aria-hidden="true" />
      <span class="hidden sm:inline">{statusLabel}</span>
    </span>

    {#if actions}
      <div class="flex shrink-0 items-center gap-1">
        {@render actions()}
      </div>
    {/if}
  </div>

  {#if hasProgress}
    <ProgressMeter
      value={safeProgress}
      tone={progressTone}
      size="xs"
      ariaLabel={`${filename} upload progress`}
      ariaValueText={`${safeProgress}%`}
    />
  {/if}
</div>
