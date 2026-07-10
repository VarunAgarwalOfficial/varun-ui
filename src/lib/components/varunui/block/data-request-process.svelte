<script lang="ts" module>
  export const dataRequestProcessDemo = {};
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { Route } from "$lib/components/varunui/internal/icons/phosphor.js";
</script>

<Section container="prose" className="bg-background">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <Route class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-semibold text-foreground">
              How We Handle Your Data Request
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              When you submit a data access, correction, or deletion request,
              here's the process we follow.
            </p>
          </div>
        </div>
      </div>

      <div class="px-6 py-4">
        <div>
          <div class="relative flex gap-4 pb-6">
            <div class="absolute top-6 left-[11px] h-full w-px bg-border"></div>
            <div
              class="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground"
            >
              1
            </div>
            <div class="pt-0.5">
              <h3 class="text-sm font-medium text-foreground">
                Request Received
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                We acknowledge your request within 24 hours via email. You'll
                receive a reference number for tracking.
              </p>
            </div>
          </div>

          <div class="relative flex gap-4 pb-6">
            <div class="absolute top-6 left-[11px] h-full w-px bg-border"></div>
            <div
              class="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground"
            >
              2
            </div>
            <div class="pt-0.5">
              <h3 class="text-sm font-medium text-foreground">
                Identity Verification
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                We verify your identity to ensure the request is legitimate.
                This may involve confirming your email or asking for additional
                proof.
              </p>
            </div>
          </div>

          <div class="relative flex gap-4 pb-6">
            <div class="absolute top-6 left-[11px] h-full w-px bg-border"></div>
            <div
              class="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground"
            >
              3
            </div>
            <div class="pt-0.5">
              <h3 class="text-sm font-medium text-foreground">
                Request Processing
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                Our data team locates all relevant records across our systems.
                For complex requests, this may take up to 15 business days.
              </p>
            </div>
          </div>

          <div class="relative flex gap-4 pb-6">
            <div class="absolute top-6 left-[11px] h-full w-px bg-border"></div>
            <div
              class="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground"
            >
              4
            </div>
            <div class="pt-0.5">
              <h3 class="text-sm font-medium text-foreground">
                Review & Approval
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                A privacy officer reviews the gathered data to ensure
                completeness and that no third-party information is
                inadvertently included.
              </p>
            </div>
          </div>

          <div class="relative flex gap-4">
            <div
              class="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground"
            >
              5
            </div>
            <div class="pt-0.5">
              <h3 class="text-sm font-medium text-foreground">Fulfillment</h3>
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                We deliver the results securely: data exports via encrypted
                download link, corrections applied directly, or deletion
                confirmed with a summary of removed records.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-border bg-muted px-6 py-3">
        <p class="text-center text-xs text-muted-foreground">
          All requests are completed within 30 days as required by GDPR Article
          12.
        </p>
      </div>
    </div>
</Section>
