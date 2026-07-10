<script lang="ts" module>
  import {
    CreditCard,
    Eye,
    EyeOff,
    Gift,
    History,
    Plus,
    ShoppingBagIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface Transaction {
    title: string;
    date: string;
    amount: number;
    type: "purchase" | "reload" | "refund";
  }

  interface GiftCard {
    cardNumber: string;
    balance: number;
    expiresAt?: string;
    transactions?: Transaction[];
  }

  export interface GiftCardBalanceCheckerProps {
    kicker?: string;
    heading?: string;
    description?: string;
    giftCard?: GiftCard;
    reloadOptions?: number[];
    labels?: {
      currentBalance?: string;
      cardNumber?: string;
      expiresOn?: string;
      recentTransactions?: string;
      reloadCard?: string;
      shopNow?: string;
      checkBalance?: string;
      enterCardNumber?: string;
      noTransactions?: string;
    };
    onCheckBalance?: (cardNumber: string) => void;
    onReload?: (amount: number) => void;
    onShopNow?: () => void;
    className?: string;
  }

  export const giftCardBalanceCheckerDemo: GiftCardBalanceCheckerProps = {
    kicker: "Stored value",
    heading: "Your gift card",
    description:
      "See what is left, review recent activity, or add value before your next order.",
    giftCard: {
      cardNumber: "4532 **** **** 7821",
      balance: 125.5,
      expiresAt: "December 2027",
      transactions: [
        {
          title: "Bike Journey print",
          date: "9 July 2026",
          amount: -45.99,
          type: "purchase",
        },
        {
          title: "Card reload",
          date: "2 July 2026",
          amount: 100.0,
          type: "reload",
        },
        {
          title: "Standing Welcome print",
          date: "18 June 2026",
          amount: -28.5,
          type: "purchase",
        },
        {
          title: "Refund · order 1234",
          date: "11 June 2026",
          amount: 15.99,
          type: "refund",
        },
      ],
    },
    reloadOptions: [25, 50, 100, 200],
    labels: {
      currentBalance: "Current balance",
      cardNumber: "Card number",
      expiresOn: "Expires",
      recentTransactions: "Recent activity",
      reloadCard: "Add value",
      shopNow: "Browse prints",
      checkBalance: "Check balance",
      enterCardNumber: "Enter your gift card number",
      noTransactions: "No transactions yet",
    },
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import OptionSelector from "$lib/components/varunui/component/option-selector.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import { cn } from "$lib/utils.js";

  let {
    kicker,
    heading,
    description,
    giftCard,
    reloadOptions = [],
    labels = {},
    onCheckBalance,
    onReload,
    onShopNow,
    className,
  }: GiftCardBalanceCheckerProps = $props();

  let showCardNumber = $state(false);
  let selectedReload = $state("");
  let inputCardNumber = $state("");

  const transactionIcons = {
    purchase: ShoppingBagIcon,
    reload: Plus,
    refund: CreditCard,
  };
  const reloadChoices = $derived(
    reloadOptions.map((amount) => ({ value: String(amount), label: `$${amount}` })),
  );
</script>

<Section container="lg" className={className}>
    <div class="mb-[var(--layout-gap-xl)]">
      <SectionHeader {kicker} title={heading} {description} markerTone="purple" />
    </div>

    {#if giftCard}
      <div class="grid gap-[var(--layout-gap-lg)] lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.6fr)]">
        <div class="lg:col-span-1">
          <PastelField tone="purple" className="border border-border">
            <div class="mb-[var(--layout-gap-lg)] flex items-center justify-between">
              <Gift class="size-8" />
              <CreditCard class="size-6 text-muted-foreground" />
            </div>

            <p class="mb-1 text-sm text-muted-foreground">
              {labels.currentBalance ?? "Current balance"}
            </p>
            <p class="mb-[var(--layout-gap-lg)] text-4xl font-semibold tabular-nums">
              ${giftCard.balance.toFixed(2)}
            </p>

            <div class="grid gap-[var(--layout-gap-md)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div class="min-w-0">
                <p class="mb-1 text-xs text-muted-foreground">
                  {labels.cardNumber ?? "Card number"}
                </p>
                <div class="flex items-center gap-2">
                  <p class="truncate font-mono text-sm">
                    {showCardNumber
                      ? giftCard.cardNumber.replace(/\*/g, "0")
                      : giftCard.cardNumber}
                  </p>
                  <Button
                    type="button"
                    variant="quiet"
                    size="xs"
                    iconOnly
                    onclick={() => (showCardNumber = !showCardNumber)}
                    aria-label={showCardNumber ? "Hide card number" : "Show card number"}
                  >
                    {#if showCardNumber}
                      <EyeOff class="size-4" />
                    {:else}
                      <Eye class="size-4" />
                    {/if}
                  </Button>
                </div>
              </div>
              {#if giftCard.expiresAt}
                <div class="sm:text-right">
                  <p class="mb-1 text-xs text-muted-foreground">
                    {labels.expiresOn ?? "Expires"}
                  </p>
                  <p class="text-sm">{giftCard.expiresAt}</p>
                </div>
              {/if}
            </div>
          </PastelField>

          <div class="mt-[var(--layout-gap-sm)]">
            <Button onclick={onShopNow} class="w-full" size="lg">
              <ShoppingBagIcon class="size-4" />
              {labels.shopNow ?? "Shop Now"}
            </Button>
          </div>

          {#if reloadOptions.length > 0}
            <div class="mt-[var(--layout-gap-lg)] border-y border-border py-[var(--surface-padding-md)]">
              <OptionSelector
                label={labels.reloadCard ?? "Reload card"}
                options={reloadChoices}
                bind:value={selectedReload}
              />
              <Button
                onclick={() => selectedReload && onReload?.(Number(selectedReload))}
                disabled={!selectedReload}
                variant="outline"
                class="mt-[var(--layout-gap-sm)] w-full"
              >
                <Plus class="size-4" />
                {labels.reloadCard ?? "Add value"}
              </Button>
            </div>
          {/if}
        </div>

        <div>
          <div>
            <div class="mb-[var(--layout-gap-md)] flex items-center gap-2">
              <History class="size-5 text-primary" />
              <h3 class="text-lg font-semibold">
                {labels.recentTransactions ?? "Recent activity"}
              </h3>
            </div>

            {#if giftCard.transactions && giftCard.transactions.length > 0}
              <div class="divide-y divide-border border-y border-border">
                {#each giftCard.transactions as transaction}
                  {@const Icon = transactionIcons[transaction.type]}
                  {@const isPositive = transaction.amount > 0}
                  <div
                    class="flex items-center justify-between gap-4 py-[var(--layout-gap-md)]"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="flex size-10 shrink-0 items-center justify-center border border-border bg-background text-muted-foreground"
                      >
                        <Icon class="size-5" />
                      </div>
                      <div>
                        <p class="font-medium">{transaction.title}</p>
                        <p class="text-sm text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <span
                      class={cn(
                        "shrink-0 font-mono text-sm font-semibold tabular-nums",
                        isPositive ? "text-success" : "text-foreground",
                      )}
                    >
                      {isPositive ? "+" : ""}${Math.abs(
                        transaction.amount,
                      ).toFixed(2)}
                    </span>
                  </div>
                {/each}
              </div>
            {:else}
              <div class="flex flex-col items-center justify-center border-y border-border py-12 text-center">
                <History class="mb-4 size-12 text-muted-foreground/30" />
                <p class="text-muted-foreground">
                  {labels.noTransactions ?? "No transactions yet"}
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {:else}
      <div class="mx-auto max-w-md">
        <PastelField tone="purple" className="border-y border-border">
          <div class="mb-6 flex justify-center">
            <div
              class="flex size-16 items-center justify-center border border-border bg-background text-primary"
            >
              <CreditCard class="size-8" />
            </div>
          </div>
          <div class="mb-4">
            <InputField
              id="gift-card-number"
              name="gift-card-number"
              label={labels.cardNumber ?? "Card number"}
              placeholder={labels.enterCardNumber ?? "Enter your gift card number"}
              bind:value={inputCardNumber}
            />
          </div>
          <Button
            onclick={() => onCheckBalance?.(inputCardNumber)}
            disabled={!inputCardNumber}
            class="w-full"
          >
            {labels.checkBalance ?? "Check balance"}
          </Button>
        </PastelField>
      </div>
    {/if}
</Section>
