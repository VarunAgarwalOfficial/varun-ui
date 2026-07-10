<script lang="ts" module>
  export const privacyPolicyDemo = {};
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { Eye } from "$lib/components/varunui/internal/icons/phosphor.js";
</script>

<Section container="sm">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <Eye class="size-5 text-primary" />
          </div>
          <div>
            <h1 class="text-2xl font-semibold tracking-tight text-foreground">Privacy Policy</h1>
            <p class="mt-1 text-sm text-muted-foreground">
              This policy explains what personal data we collect, how we use it,
              and your rights regarding that data.
            </p>
          </div>
        </div>
      </div>

      <div class="divide-y divide-border">
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            Information We Collect
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            We collect information you provide directly, such as your name, email
            address, and payment details when you create an account. We also
            collect usage data automatically, including your IP address, browser
            type, pages visited, and interaction patterns to improve our service.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            How We Use Your Data
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            We use your data to provide and maintain the service, process
            transactions, send service-related communications, and improve user
            experience. We may also use aggregated, anonymized data for analytics
            and research purposes.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">Data Sharing</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            We do not sell your personal data. We may share data with trusted
            service providers who assist us in operating the platform, subject to
            strict confidentiality agreements. We may also disclose data when
            required by law or to protect our legal rights.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            Data Retention
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            We retain your personal data for as long as your account is active or
            as needed to provide services. After account deletion, we may retain
            certain data for up to 90 days for backup purposes and as required by
            applicable law.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">Your Rights</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            You have the right to access, correct, or delete your personal data
            at any time. You may also request data portability or object to
            certain processing activities. To exercise these rights, contact our
            privacy team through your account settings.
          </p>
        </div>
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            Security Measures
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            We implement industry-standard security measures including encryption
            in transit and at rest, regular security audits, and access controls.
            While no system is completely secure, we are committed to protecting
            your data to the best of our ability.
          </p>
        </div>
      </div>

      <div class="border-t border-border bg-muted px-6 py-3">
        <p class="text-center text-xs text-muted-foreground">
          Last revised: February 2026 - Questions? Contact the privacy team
        </p>
      </div>
    </div>
</Section>
