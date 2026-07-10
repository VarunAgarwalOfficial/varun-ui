<script lang="ts" module>
  export const termsOfServiceDemo = {};
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { ScrollIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
</script>

<Section container="sm">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <ScrollIcon class="size-5 text-primary" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-semibold tracking-tight text-foreground">Terms of Service</h1>
              <Badge variant="muted" class="text-xs">v3.2</Badge>
            </div>
            <p class="mt-1 text-sm text-muted-foreground">
              Please read these terms carefully before using our platform. By
              accessing or using the service, you agree to be bound by these
              terms.
            </p>
          </div>
        </div>
      </div>

      <div class="divide-y divide-border">
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            1. Acceptance of Terms
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            By creating an account or using any part of the service, you
            acknowledge that you have read, understood, and agree to be bound by
            these Terms of Service and our Privacy Policy. If you do not agree,
            you may not access or use the service.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            2. Account Responsibilities
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You must notify us immediately of any unauthorized use. We
            reserve the right to suspend accounts that violate these terms.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            3. Acceptable Use
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            You agree to use the service only for lawful purposes and in
            accordance with these terms. You may not use the service to transmit
            harmful content, infringe on intellectual property rights, or
            interfere with the operation of the platform.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            4. Payment and Billing
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Paid plans are billed in advance on a monthly or annual basis. All
            fees are non-refundable except as expressly stated in our refund
            policy. We may change pricing with 30 days notice. Failure to pay may
            result in service suspension.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            5. Termination
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Either party may terminate this agreement at any time. Upon
            termination, your right to use the service ceases immediately. We may
            retain certain data as required by law. Provisions that by their
            nature should survive termination will remain in effect.
          </p>
        </div>
      </div>

      <div class="border-t border-border bg-muted px-6 py-3">
        <p class="text-center text-xs text-muted-foreground">
          Effective date: February 1, 2026
        </p>
      </div>
    </div>
</Section>
