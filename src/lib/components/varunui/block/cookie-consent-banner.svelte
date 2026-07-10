<script lang="ts" module>
  export interface CookieConsentBannerProps {
    title?: string;
    description?: string;
    privacyPolicyUrl?: string;
    labels?: {
      privacyPolicy?: string;
      customize?: string;
      rejectAll?: string;
      acceptAll?: string;
    };
    onAcceptAll?: () => void;
    onRejectAll?: () => void;
    onCustomize?: () => void;
    onClose?: () => void;
    className?: string;
  }

  export const cookieConsentBannerDemo: CookieConsentBannerProps = {
    title: "We use cookies",
    description:
      "We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking 'Accept All', you agree to this use.",
    privacyPolicyUrl: "?",
    labels: {
      privacyPolicy: "Learn more",
      customize: "Customize",
      rejectAll: "Reject All",
      acceptAll: "Accept All",
    },
  };
</script>

<script lang="ts">
  import {
    CookieIcon as Cookie,
    Settings,
    X,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    title,
    description,
    privacyPolicyUrl,
    labels = {},
    onAcceptAll,
    onRejectAll,
    onCustomize,
    onClose,
    className,
  }: CookieConsentBannerProps = $props();

  const privacyPolicyLabel = $derived(labels.privacyPolicy);
  const customizeLabel = $derived(labels.customize);
  const rejectAllLabel = $derived(labels.rejectAll);
  const acceptAllLabel = $derived(labels.acceptAll);
</script>

<Section container="prose" className={cn("bg-background", className)}>
    <div class="overflow-hidden border-y border-border bg-surface">
      <div class="flex items-start justify-between px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="rounded-md bg-warning/10 p-2">
            <Cookie class="size-5 text-warning" aria-hidden="true" />
          </div>
          <h2 class="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <Button
          onclick={onClose}
          size="sm"
          iconOnly
          variant="outline"
          class="rounded-sm p-1 hover:bg-muted"
          aria-label="Close cookie notice"
        >
          <X class="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div class="px-6 pb-4">
        <p class="text-sm text-muted-foreground">
          {description}
          {#if privacyPolicyUrl && privacyPolicyLabel}
            <a
              href={privacyPolicyUrl}
              class="text-primary hover:underline"
            >
              {privacyPolicyLabel}
            </a>
          {/if}
        </p>
      </div>

      <div
        class="flex flex-col gap-2 border-t bg-muted/30 px-6 py-4 sm:flex-row"
      >
        <Button
          variant="outline"
          size="sm"
          class="flex-1"
          onclick={onCustomize}
        >
          <Settings class="size-4" aria-hidden="true" />
          {customizeLabel}
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="flex-1"
          onclick={onRejectAll}
        >
          {rejectAllLabel}
        </Button>
        <Button size="sm" class="flex-1" onclick={onAcceptAll}>
          {acceptAllLabel}
        </Button>
      </div>
    </div>
</Section>
