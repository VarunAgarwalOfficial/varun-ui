<script lang="ts" module>
  export const regulatoryNoticeBlocksDemo = {};
</script>

<script lang="ts">
  import {
    Info,
    ShieldAlert,
    TriangleAlert,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Section from "$lib/components/varunui/layout/section.svelte";
</script>

<Section container="prose" className="bg-background">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <ShieldAlert class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-semibold text-foreground">Regulatory Notices</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Important compliance and regulatory information that applies to
              your use of our services.
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-3 px-6 py-4">
        <div class="border-l-4 border-l-primary bg-primary/5 px-4 py-3">
          <div class="mb-1.5 flex items-center gap-2">
            <Info class="size-4 text-primary" />
            <h3 class="text-sm font-medium text-foreground">
              GDPR Compliance
            </h3>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            We process personal data in accordance with the General Data
            Protection Regulation. As a data controller, we maintain records of
            processing activities and have appointed a Data Protection Officer.
            You may exercise your rights by contacting dpo@example.com.
          </p>
        </div>

        <div class="border-l-4 border-l-primary bg-primary/5 px-4 py-3">
          <div class="mb-1.5 flex items-center gap-2">
            <Info class="size-4 text-primary" />
            <h3 class="text-sm font-medium text-foreground">
              CCPA Disclosure
            </h3>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            California residents have the right to know what personal
            information is collected, request deletion, and opt out of the sale
            of personal data. We do not sell personal information. To submit a
            request, visit your account privacy settings.
          </p>
        </div>

        <div class="border-l-4 border-l-warning bg-warning/5 px-4 py-3">
          <div class="mb-1.5 flex items-center gap-2">
            <TriangleAlert class="size-4 text-warning" />
            <h3 class="text-sm font-medium text-foreground">
              Financial Services Notice
            </h3>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Our platform is not a licensed financial advisor. Any financial
            data, projections, or analytics provided are for informational
            purposes only and should not be considered investment advice. Always
            consult a qualified professional before making financial decisions.
          </p>
        </div>

        <div class="border-l-4 border-l-danger bg-danger/5 px-4 py-3">
          <div class="mb-1.5 flex items-center gap-2">
            <ShieldAlert class="size-4 text-danger" />
            <h3 class="text-sm font-medium text-foreground">
              Data Breach Notification Protocol
            </h3>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            In the event of a data breach affecting your personal information,
            we will notify you within 72 hours as required by applicable law.
            Notification will include the nature of the breach, data affected,
            and steps being taken. We maintain a dedicated incident response
            team.
          </p>
        </div>
      </div>

      <div class="border-t border-border bg-muted px-6 py-3">
        <p class="text-center text-xs text-muted-foreground">
          These notices are subject to change based on evolving regulatory
          requirements.
        </p>
      </div>
    </div>
</Section>
