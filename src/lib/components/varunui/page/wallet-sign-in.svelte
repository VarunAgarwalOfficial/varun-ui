<script lang="ts" module>
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import type { Component } from "svelte";
  import {
    CircleDollarSign,
    Ghost,
    QrCode,
    Wallet,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  type IconComponent = Component<Record<string, unknown>>;

  interface WalletOption {
    name: string;
    icon: IconComponent;
    detail?: string;
    badge?: string;
    href?: string;
  }

  export interface WalletSignInProps {
    heading?: string;
    description?: string;
    wallets?: WalletOption[];
    helpLink?: {
      label: string;
      href: string;
    };
    labels?: {
      footer?: string;
    };
  }

  export const walletSignInDemo: WalletSignInProps = {
    heading: "Connect your wallet",
    description: "Choose how you'd like to connect to continue.",
    wallets: [
      {
        name: "MetaMask",
        icon: Wallet,
        detail: "Browser extension",
        badge: "Detected",
        href: "?",
      },
      {
        name: "Coinbase Wallet",
        icon: CircleDollarSign,
        detail: "Mobile & extension",
        href: "?",
      },
      {
        name: "WalletConnect",
        icon: QrCode,
        detail: "Scan with any wallet",
        href: "?",
      },
      {
        name: "Phantom",
        icon: Ghost,
        detail: "Solana & more",
        href: "?",
      },
    ],
    helpLink: {
      label: "What is a wallet?",
      href: "?",
    },
    labels: {
      footer: "By connecting, you agree to the Terms and Privacy Policy.",
    },
  };
</script>

<script lang="ts">
  import { ChevronRight } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import { cn } from "$lib/utils.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    wallets = [],
    helpLink,
    labels = {},
  }: WalletSignInProps = $props();

  let selectedWallet = $state("");
  let footerText = $derived(labels.footer);

  $effect(() => {
    if (
      wallets.length > 0 &&
      !wallets.some((wallet) => wallet.name === selectedWallet)
    ) {
      selectedWallet = wallets[0].name;
    }
  });
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding5Asset}
      alt="A person standing by for a secure wallet connection"
      tone="blue"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}
    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

    <div class="overflow-hidden rounded-none border border-border">
      <ul class="divide-y">
        {#each wallets as wallet}
          {@const Icon = wallet.icon}
          {@const isActive = selectedWallet === wallet.name}
          <li>
            <a
              href={wallet.href ?? "?"}
              onclick={() => (selectedWallet = wallet.name)}
              class={cn(
                "group/walletSignIn flex items-center gap-4 p-4 motion-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                isActive && "bg-muted/60",
              )}
            >
              <span
                class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
              >
                <Icon class="size-5" aria-hidden="true" />
              </span>
              <span class="min-w-0 flex-1 text-left">
                <span class="flex items-center gap-2">
                  <span class="truncate font-medium">{wallet.name}</span>
                  {#if wallet.badge}
                    <Badge variant="muted">{wallet.badge}</Badge>
                  {/if}
                </span>
                {#if wallet.detail}
                  <span class="block truncate text-sm text-muted-foreground">
                    {wallet.detail}
                  </span>
                {/if}
              </span>
              <ChevronRight
                class={cn(
                  "size-4 shrink-0 text-muted-foreground motion-transform group-hover/walletSignIn:translate-x-0.5",
                  isActive && "text-foreground",
                )}
                aria-hidden="true"
              />
            </a>
          </li>
        {/each}
      </ul>
    </div>

  {#if helpLink || footerText}
    {#snippet footer()}
      {#if helpLink}
      <div class="text-center">
        <a
          href={helpLink.href}
          class="text-sm font-medium text-foreground hover:underline"
        >
          {helpLink.label}
        </a>
      </div>
      {/if}

      {#if footerText}
        <p
          class="mx-auto mt-4 max-w-xs text-center text-xs text-muted-foreground"
        >
          {footerText}
        </p>
      {/if}
    {/snippet}
  {/if}
</AuthShell>
