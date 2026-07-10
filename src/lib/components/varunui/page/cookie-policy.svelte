<script lang="ts" module>
  export const cookiePolicyDemo = {};
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { CookieIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
</script>

<Section container="sm">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <CookieIcon class="size-5 text-primary" />
          </div>
          <div>
            <h1 class="text-2xl font-semibold tracking-tight text-foreground">Cookie Policy</h1>
            <p class="mt-1 text-sm text-muted-foreground">
              We use cookies and similar technologies to provide, protect, and
              improve our services. Here's what each type does.
            </p>
          </div>
        </div>
      </div>

      <div class="divide-y divide-border">
        <div class="px-6 py-4">
          <div class="mb-1.5 flex items-center gap-2">
            <h3 class="text-sm font-medium text-foreground">
              Essential Cookies
            </h3>
            <Badge variant="muted" class="text-xs">Required</Badge>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Required for the website to function properly. These handle
            authentication, security tokens, and session management. They cannot
            be disabled.
          </p>
        </div>

        <div class="px-6 py-4">
          <div class="mb-1.5 flex items-center gap-2">
            <h3 class="text-sm font-medium text-foreground">
              Functional Cookies
            </h3>
            <Badge variant="outline" class="text-xs">Optional</Badge>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Remember your preferences such as language, region, and display
            settings. Disabling these may affect your experience but won't
            prevent you from using the service.
          </p>
        </div>

        <div class="px-6 py-4">
          <div class="mb-1.5 flex items-center gap-2">
            <h3 class="text-sm font-medium text-foreground">
              Analytics Cookies
            </h3>
            <Badge variant="outline" class="text-xs">Optional</Badge>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Help us understand how visitors interact with our website by
            collecting anonymous usage statistics. We use this data to improve
            performance and content relevance.
          </p>
        </div>

        <div class="px-6 py-4">
          <div class="mb-1.5 flex items-center gap-2">
            <h3 class="text-sm font-medium text-foreground">
              Marketing Cookies
            </h3>
            <Badge variant="outline" class="text-xs">Optional</Badge>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Used to deliver relevant advertisements and measure campaign
            effectiveness. These cookies may be set by our advertising partners
            and track browsing activity across sites.
          </p>
        </div>
      </div>

      <div class="border-t border-border bg-muted px-6 py-3">
        <p class="text-center text-xs text-muted-foreground">
          You can manage your cookie preferences at any time from your account
          settings.
        </p>
      </div>
    </div>
</Section>
