<script lang="ts" module>
  export type QrCodeSize = "sm" | "md" | "lg";
  export type QrCodeErrorCorrection = "low" | "medium" | "quartile" | "high";

  export interface QrCodeProps {
    value: string;
    label: string;
    size?: QrCodeSize;
    errorCorrection?: QrCodeErrorCorrection;
  }

  export const qrCodeDemo: QrCodeProps = {
    value: "https://varunui.example/invite/review-4827",
    label: "Open the Navigation review invitation",
    size: "md",
    errorCorrection: "medium",
  };
</script>

<script lang="ts">
  import { drawingSVG, qrcode } from "bwip-js/browser";

  let {
    value,
    label,
    size = "md",
    errorCorrection = "medium",
  }: QrCodeProps = $props();

  let ready = $state(false);

  const sizeClasses: Record<QrCodeSize, string> = {
    sm: "size-[var(--machine-code-size-sm)]",
    md: "size-[var(--machine-code-size-md)]",
    lg: "size-[var(--machine-code-size-lg)]",
  };

  const correctionLevels: Record<QrCodeErrorCorrection, "L" | "M" | "Q" | "H"> = {
    low: "L",
    medium: "M",
    quartile: "Q",
    high: "H",
  };

  const rendered = $derived.by(() => {
    if (!value.trim()) return { source: "", error: "A QR code needs a value." };

    try {
      const options = {
        bcid: "qrcode",
        text: value,
        scale: 3,
        paddingwidth: 4,
        paddingheight: 4,
        eclevel: correctionLevels[errorCorrection],
      };
      const svg = qrcode(options, drawingSVG());
      return {
        source: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
        error: "",
      };
    } catch (error) {
      return {
        source: "",
        error: error instanceof Error ? error.message : "The QR code could not be generated.",
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
    data-slot="qr-code"
    class={`inline-grid place-items-center overflow-hidden border border-border p-[var(--machine-code-frame-padding)] ${sizeClasses[size]}`}
    style="background: var(--machine-code-paper); color: var(--machine-code-ink);"
  >
    <img
      src={rendered.source}
      alt={label}
      data-ready={ready}
      onload={() => (ready = true)}
      class="motion-code-ready size-full object-contain"
    />
  </div>
{:else}
  <p
    data-slot="qr-code-error"
    data-tone="red"
    role="alert"
    class="surface-pastel border-y border-danger/35 px-3 py-2 text-sm text-danger"
  >
    {rendered.error}
  </p>
{/if}
