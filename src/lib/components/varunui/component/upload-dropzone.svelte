<script lang="ts" module>
  import type { Snippet } from "svelte";

  export interface UploadDropzoneProps {
    id?: string;
    name?: string;
    files?: File[];
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onFiles?: (files: File[]) => void;
    children?: Snippet;
    helper?: Snippet;
    action?: Snippet<[openFilePicker: () => void]>;
  }

  export const uploadDropzoneDemo: UploadDropzoneProps = {
    id: "upload-dropzone-demo",
    name: "artwork",
    accept: ".png,.jpg,.jpeg,.svg,.webp",
    multiple: true,
  };
</script>

<script lang="ts">
  import { Upload } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";

  const generatedId = $props.id();

  let {
    id = `${generatedId}-upload`,
    name,
    files = $bindable<File[]>([]),
    accept,
    multiple = false,
    disabled = false,
    onFiles,
    children,
    helper,
    action,
  }: UploadDropzoneProps = $props();

  let inputElement: HTMLInputElement;
  let dragDepth = 0;
  let dragging = $state(false);

  const contentId = $derived(`${id}-content`);
  const helperId = $derived(helper ? `${id}-helper` : undefined);
  const selectionId = $derived(files.length > 0 ? `${id}-selection` : undefined);
  const describedBy = $derived(
    [contentId, helperId, selectionId].filter(Boolean).join(" ") || undefined,
  );
  const selectionLabel = $derived(
    files.length === 1 ? files[0].name : `${files.length} files selected`,
  );

  function acceptsFile(file: File) {
    const rules = accept
      ?.split(",")
      .map((rule) => rule.trim().toLowerCase())
      .filter(Boolean);

    if (!rules?.length) return true;

    const filename = file.name.toLowerCase();
    const mime = file.type.toLowerCase();

    return rules.some((rule) => {
      if (rule.startsWith(".")) return filename.endsWith(rule);
      if (rule.endsWith("/*")) return mime.startsWith(rule.slice(0, -1));
      return mime === rule;
    });
  }

  function selectFiles(nextFiles: Iterable<File>) {
    const acceptedFiles = Array.from(nextFiles).filter(acceptsFile);
    const selectedFiles = multiple ? acceptedFiles : acceptedFiles.slice(0, 1);

    files = selectedFiles;
    onFiles?.(selectedFiles);
    return selectedFiles;
  }

  function syncInputFiles(selectedFiles: File[]) {
    if (!inputElement || typeof DataTransfer === "undefined") return;

    const transfer = new DataTransfer();
    for (const file of selectedFiles) transfer.items.add(file);
    inputElement.files = transfer.files;
  }

  function openFilePicker() {
    if (!disabled) inputElement?.click();
  }

  function handleInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const selectedFiles = selectFiles(input.files ?? []);
    syncInputFiles(selectedFiles);
  }

  function handleDragEnter(event: DragEvent) {
    event.preventDefault();
    if (disabled) return;

    dragDepth += 1;
    dragging = true;
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (disabled || !event.dataTransfer) return;

    event.dataTransfer.dropEffect = "copy";
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    if (disabled) return;

    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) dragging = false;
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragDepth = 0;
    dragging = false;

    if (disabled || !event.dataTransfer) return;

    const selectedFiles = selectFiles(event.dataTransfer.files);
    syncInputFiles(selectedFiles);
  }
</script>

<div
  data-slot="upload-dropzone"
  data-dragging={dragging || undefined}
  data-disabled={disabled || undefined}
  role="region"
  aria-label="File upload"
  ondragenter={handleDragEnter}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  class="motion-colors flex min-h-48 w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-background p-[var(--layout-gap-lg)] text-center text-foreground data-[dragging]:border-primary data-[dragging]:bg-primary/5 data-[disabled]:cursor-not-allowed data-[disabled]:bg-muted/30 data-[disabled]:opacity-50"
>
  <input
    bind:this={inputElement}
    type="file"
    class="sr-only"
    {id}
    {name}
    {accept}
    {multiple}
    {disabled}
    aria-label="Choose files"
    aria-describedby={describedBy}
    onchange={handleInput}
  />

  <span
    class="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary"
  >
    <Upload class="size-5" aria-hidden="true" />
  </span>

  <div id={contentId} class="max-w-[var(--layout-form)]">
    {#if children}
      {@render children()}
    {:else}
      <p class="text-sm font-semibold">Drop {multiple ? "files" : "a file"} here</p>
      <p class="mt-1 text-xs leading-normal text-muted-foreground">
        or choose {multiple ? "files" : "one"} from your device
      </p>
    {/if}
  </div>

  {#if action}
    {@render action(openFilePicker)}
  {:else}
    <Button variant="outline" size="sm" onclick={openFilePicker} {disabled}>
      Choose {multiple ? "files" : "file"}
    </Button>
  {/if}

  {#if helper}
    <div id={helperId} class="text-xs leading-normal text-muted-foreground">
      {@render helper()}
    </div>
  {/if}

  {#if files.length > 0}
    <p
      id={selectionId}
      class="max-w-full truncate text-xs font-medium text-foreground"
      aria-live="polite"
    >
      {selectionLabel}
    </p>
  {/if}
</div>
