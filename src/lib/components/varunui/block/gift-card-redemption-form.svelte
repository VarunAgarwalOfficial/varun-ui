<script lang="ts" module>
  import { Check } from "$lib/components/varunui/internal/icons/phosphor.js";

  type RedeemStatus = "idle" | "loading" | "success" | "error";

  export interface GiftCardRedemptionFormProps {
    kicker?: string;
    heading?: string;
    description?: string;
    placeholder?: string;
    submitLabel?: string;
    onRedeem?: (
      code: string,
    ) => Promise<{ success: boolean; balance?: number; message?: string }>;
    currency?: string;
    className?: string;
  }

  export const giftCardRedemptionFormDemo: GiftCardRedemptionFormProps = {
    kicker: "Stored value",
    heading: "Add a gift card to your account.",
    description: "Enter the code once. A successful redemption adds the full remaining balance to your account.",
    placeholder: "VUI-7Q4M-9K2P",
    submitLabel: "Redeem gift card",
    currency: "$",
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    placeholder = "Enter gift card code",
    submitLabel = "Redeem gift card",
    onRedeem,
    currency = "$",
    className,
  }: GiftCardRedemptionFormProps = $props();

  let code = $state("");
  let status = $state<RedeemStatus>("idle");
  let message = $state("");
  let balance = $state<number | null>(null);

  const canRedeem = $derived(
    code.trim().length > 0 && status !== "loading" && status !== "success",
  );
  const fieldMessage = $derived(
    message && balance !== null && status === "success"
      ? `${message} ${currency}${balance.toFixed(2)} was added.`
      : message,
  );

  async function redeem() {
    if (!canRedeem) return;

    status = "loading";
    message = "";
    balance = null;

    try {
      if (onRedeem) {
        const result = await onRedeem(code);
        status = result.success ? "success" : "error";
        message =
          result.message ??
          (result.success ? "Gift card redeemed!" : "Invalid gift card code");
        balance = result.success ? (result.balance ?? null) : null;
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      const normalizedCode = code.trim().replaceAll("-", "").toUpperCase();
      if (normalizedCode === "VUI7Q4M9K2P") {
        status = "success";
        message = "Gift card redeemed.";
        balance = 50;
      } else {
        status = "error";
        message = "That code is invalid or has already been redeemed.";
      }
    } catch {
      status = "error";
      message = "We could not redeem this gift card. Try again.";
    }
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    redeem();
  }
</script>

<Section container="panel" className={className}>
  <Stack gap="lg">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      markerTone="purple"
    />

    <PastelField tone="purple" className="border-y border-border">
      <form
        onsubmit={handleSubmit}
      >
        <Stack gap="md">
          <InputField
            id="gift-card-code"
            name="gift-card-code"
            label="Gift card code"
            description="Codes are not case sensitive. Use VUI-7Q4M-9K2P in this preview."
            {placeholder}
            bind:value={code}
            disabled={status === "loading" || status === "success"}
            invalid={status === "error"}
            message={fieldMessage}
            messageTone={status === "error" ? "error" : status === "success" ? "success" : "neutral"}
            onValueChange={() => {
              if (status === "error") {
                status = "idle";
                message = "";
              }
            }}
          />

        <Button
          type="submit"
          class="w-full"
          size="lg"
          disabled={!canRedeem}
          loading={status === "loading"}
          loadingLabel="Redeeming…"
        >
          {#if status === "success"}
            <Check class="size-4" />
          {/if}
          {status === "success" ? "Redeemed" : submitLabel}
        </Button>
        </Stack>
      </form>
    </PastelField>
  </Stack>
</Section>
