<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
  import { ChevronRight, UserPlus } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface Account {
    name: string;
    email: string;
    avatar?: {
      src: string;
      alt: string;
    };
    href?: string;
  }

  export interface AccountChooserProps {
    heading?: string;
    description?: string;
    accounts?: Account[];
    useAnotherAccount?: {
      label: string;
      href: string;
    };
    termsHref?: string;
    privacyHref?: string;
  }

  export const accountChooserDemo: AccountChooserProps = {
    heading: "Choose an account",
    description: "to continue to varunUI",
    accounts: [
      {
        name: "Jane Cooper",
        email: "jane@example.com",
        avatar: {
          src: peepSitting8Asset,
          alt: "Jane Cooper",
        },
        href: "?",
      },
      {
        name: "Marcus Lee",
        email: "marcus@workmail.com",
        avatar: {
          src: peepStanding5Asset,
          alt: "Marcus Lee",
        },
        href: "?",
      },
      {
        name: "Priya Sharma",
        email: "priya@studio.io",
        avatar: {
          src: peep1Asset,
          alt: "Priya Sharma",
        },
        href: "?",
      },
    ],
    useAnotherAccount: {
      label: "Use another account",
      href: "?",
    },
    termsHref: "?",
    privacyHref: "?",
  };
</script>

<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/varunui/internal/ui/avatar/index.js";
  import { FieldDescription } from "$lib/components/varunui/internal/ui/field/index.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    accounts = [],
    useAnotherAccount,
    termsHref,
    privacyHref,
  }: AccountChooserProps = $props();

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  }
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding5Asset}
      alt="A person choosing where to continue"
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

  <div class="overflow-hidden rounded-none border bg-surface">
    <ul class="divide-y">
      {#each accounts as account}
        <li>
          <a
            href={account.href ?? "?"}
            class="group/accountChooser flex items-center gap-4 p-4 motion-colors hover:bg-muted"
          >
            <Avatar class="size-11">
              {#if account.avatar}
                <AvatarImage
                  src={account.avatar.src}
                  alt={account.avatar.alt}
                  class="object-cover"
                />
              {/if}
              <AvatarFallback>{initials(account.name)}</AvatarFallback>
            </Avatar>
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium">{account.name}</p>
              <p class="truncate text-sm text-muted-foreground">
                {account.email}
              </p>
            </div>
            <ChevronRight
              class="size-5 shrink-0 text-muted-foreground motion-transform group-hover/accountChooser:translate-x-0.5"
            />
          </a>
        </li>
      {/each}

      {#if useAnotherAccount}
        <li>
          <a
            href={useAnotherAccount.href}
            class="flex items-center gap-4 p-4 motion-colors hover:bg-muted"
          >
            <span
              class="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground"
            >
              <UserPlus class="size-5" />
            </span>
            <span class="flex-1 font-medium">{useAnotherAccount.label}</span>
          </a>
        </li>
      {/if}
    </ul>
  </div>

  {#snippet footer()}
    {#if termsHref && privacyHref}
      <FieldDescription class="px-6 text-center">
        By continuing, you agree to our
        <a class="font-medium text-foreground underline underline-offset-4" href={termsHref}>Terms</a>
        and
        <a class="font-medium text-foreground underline underline-offset-4" href={privacyHref}>Privacy Policy</a>.
      </FieldDescription>
    {/if}
  {/snippet}
</AuthShell>
