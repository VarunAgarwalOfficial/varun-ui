<script lang="ts" module>
  export const endUserLicenseAgreementDemo = {};
</script>

<script lang="ts">
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { BookOpen } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
</script>

<Section container="sm">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <BookOpen class="size-5 text-primary" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-semibold tracking-tight text-foreground">
                End User License Agreement
              </h1>
              <Badge variant="muted" class="text-xs">EULA</Badge>
            </div>
            <p class="mt-1 text-sm text-muted-foreground">
              This agreement governs your use of the software. Please review
              each clause carefully before proceeding.
            </p>
          </div>
        </div>
      </div>

      <div class="divide-y divide-border">
        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            <span class="mr-1 text-muted-foreground">1.</span>
            License Grant
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Subject to the terms of this agreement, we grant you a limited,
            non-exclusive, non-transferable, revocable license to use the
            software for your personal or internal business purposes. This
            license does not include the right to sublicense, modify, or
            distribute the software.
          </p>
        </div>

        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            <span class="mr-1 text-muted-foreground">2.</span>
            Restrictions
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            You may not reverse engineer, decompile, or disassemble the
            software. You may not rent, lease, or lend the software to third
            parties. You may not use the software to build a competing product
            or service, or remove any proprietary notices or labels.
          </p>
        </div>

        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            <span class="mr-1 text-muted-foreground">3.</span>
            Intellectual Property
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            The software and all copies thereof are proprietary and title
            remains with us. All rights in the software not specifically granted
            in this agreement are reserved. Your feedback and suggestions may be
            used without obligation to you.
          </p>
        </div>

        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            <span class="mr-1 text-muted-foreground">4.</span>
            Disclaimer of Warranties
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            The software is provided "as is" without warranty of any kind,
            express or implied, including but not limited to the warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the software will be
            error-free or uninterrupted.
          </p>
        </div>

        <div class="px-6 py-4">
          <h3 class="mb-2 text-sm font-medium text-foreground">
            <span class="mr-1 text-muted-foreground">5.</span>
            Limitation of Liability
          </h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            In no event shall we be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of or related
            to your use of the software. Our total liability shall not exceed the
            amount you paid for the software in the twelve months preceding the
            claim.
          </p>
        </div>
      </div>

      <div class="border-t border-border bg-muted px-6 py-3">
        <p class="text-center text-xs text-muted-foreground">
          By installing or using this software, you agree to these terms.
        </p>
      </div>
    </div>
</Section>
