<script lang="ts" module>
  export type BarcodeFormat = "code128" | "ean13" | "upca";
  export type BarcodeSize = "sm" | "md";

  export interface BarcodeProps {
    value: string;
    label: string;
    format?: BarcodeFormat;
    size?: BarcodeSize;
  }

  export const barcodeDemo: BarcodeProps = {
    value: "VARUNUI-4827",
    label: "Review ticket VARUNUI-4827",
    format: "code128",
    size: "md",
  };
</script>

<script lang="ts">
  import { code128, drawingSVG, ean13, upca } from "bwip-js/browser";

  let { value, label, format = "code128", size = "md" }: BarcodeProps = $props();
  let ready = $state(false);

  const encoders = { code128, ean13, upca };
  const heights: Record<BarcodeSize, number> = { sm: 10, md: 14 };
  const heightClasses: Record<BarcodeSize, string> = {
    sm: "h-[var(--machine-code-bar-height-sm)]",
    md: "h-[var(--machine-code-bar-height-md)]",
  };

  const rendered = $derived.by(() => {
    if (!value.trim()) return { source: "", error: "A barcode needs a value." };

    try {
      const options = {
        bcid: format,
        text: value,
        scale: 2,
        height: heights[size],
        includetext: true,
        textxalign: "center" as const,
        paddingwidth: 4,
        paddingheight: 3,
      };
      const svg = encoders[format](options, drawingSVG());
      return {
        source: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
        error: "",
      };
    } catch (error) {
      return {
        source: "",
        error: error instanceof Error ? error.message : "The barcode could not be generated.",
      };
    }
  });

  $effect(() => {
    rendered.source;
    ready = false;
  });
</script>

{#if rendered.source}
  <div
    data-slot="barcode"
    class={`inline-flex max-w-full items-center overflow-hidden border border-border p-[var(--machine-code-frame-padding)] ${heightClasses[size]}`}
    style="background: var(--machine-code-paper); color: var(--machine-code-ink);"
  >
    <img
      src={rendered.source}
      alt={label}
      data-ready={ready}
      onload={() => (ready = true)}
      class="motion-code-ready size-full max-w-full object-contain"
    />
  </div>
{:else}
  <p
    data-slot="barcode-error"
    data-tone="red"
    role="alert"
    class="surface-pastel border-y border-danger/35 px-3 py-2 text-sm text-danger"
  >
    {rendered.error}
  </p>
{/if}
