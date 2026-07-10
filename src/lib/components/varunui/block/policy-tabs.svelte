<script lang="ts" module>
  export const policyTabsDemo = {};
</script>

<script lang="ts">
  import { FileText } from "$lib/components/varunui/internal/icons/phosphor.js";
  import * as Tabs from "$lib/components/varunui/internal/ui/tabs/index.js";
  import Section from "$lib/components/varunui/layout/section.svelte";
</script>

<Section container="prose" className="bg-background">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <FileText class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-semibold text-foreground">Platform Policies</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Review our policies organized by topic.
            </p>
          </div>
        </div>
      </div>

      <Tabs.Root value="data" class="w-full gap-0">
        <div class="border-b border-border px-6">
          <Tabs.List
            class="h-auto w-full justify-start gap-0 rounded-none bg-transparent p-0"
          >
            <Tabs.Trigger
              value="data"
              class="flex-none cursor-pointer rounded-none border-0 border-b-2 border-transparent px-3 py-2.5 text-xs data-active:border-transparent data-active:bg-primary data-active:text-background"
            >
              Data Use
            </Tabs.Trigger>
            <Tabs.Trigger
              value="security"
              class="flex-none cursor-pointer rounded-none border-0 border-b-2 border-transparent px-3 py-2.5 text-xs data-active:border-transparent data-active:bg-primary data-active:text-background"
            >
              Security
            </Tabs.Trigger>
            <Tabs.Trigger
              value="cookies"
              class="flex-none cursor-pointer rounded-none border-0 border-b-2 border-transparent px-3 py-2.5 text-xs data-active:border-transparent data-active:bg-primary data-active:text-background"
            >
              Cookies
            </Tabs.Trigger>
            <Tabs.Trigger
              value="rights"
              class="flex-none cursor-pointer rounded-none border-0 border-b-2 border-transparent px-3 py-2.5 text-xs data-active:border-transparent data-active:bg-primary data-active:text-background"
            >
              Your Rights
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <Tabs.Content value="data" class="mt-0 px-6 py-4">
          <p class="text-sm leading-relaxed text-muted-foreground">
            We collect and process personal data solely for the purpose of
            delivering our services. This includes account information, usage
            patterns, and communication preferences. All data processing
            activities have a lawful basis under applicable privacy regulations.
            We conduct regular data protection impact assessments for new
            features and maintain detailed records of all processing activities.
            Third-party processors are bound by data processing agreements that
            enforce equivalent protections.
          </p>
        </Tabs.Content>

        <Tabs.Content value="security" class="mt-0 px-6 py-4">
          <p class="text-sm leading-relaxed text-muted-foreground">
            Our security program follows industry best practices and is
            certified under SOC 2 Type II and ISO 27001. All data is encrypted
            using AES-256 at rest and TLS 1.3 in transit. We employ a zero-trust
            architecture with role-based access controls, multi-factor
            authentication for all internal systems, and continuous monitoring.
            Penetration testing is conducted quarterly by independent security
            firms. Our incident response plan is tested annually through
            tabletop exercises.
          </p>
        </Tabs.Content>

        <Tabs.Content value="cookies" class="mt-0 px-6 py-4">
          <p class="text-sm leading-relaxed text-muted-foreground">
            We use essential cookies to maintain your session and preferences.
            Analytics cookies help us understand how the platform is used and
            are only activated with your consent. We do not use advertising or
            tracking cookies. You can manage cookie preferences at any time from
            your account settings. Essential cookies cannot be disabled as they
            are necessary for the platform to function properly. All cookies
            have a maximum lifetime of 12 months.
          </p>
        </Tabs.Content>

        <Tabs.Content value="rights" class="mt-0 px-6 py-4">
          <p class="text-sm leading-relaxed text-muted-foreground">
            You have the right to access all personal data we hold about you,
            request corrections to inaccurate data, and request complete deletion
            of your account and associated data. You may export your data at any
            time in machine-readable formats including JSON and CSV. Requests are
            fulfilled within 30 days. If you believe your rights have been
            violated, you may lodge a complaint with your local supervisory
            authority. We will cooperate fully with any investigation.
          </p>
        </Tabs.Content>
      </Tabs.Root>

      <div class="border-t border-border bg-muted px-6 py-3">
        <p class="text-center text-xs text-muted-foreground">
          Last updated: February 2026
        </p>
      </div>
    </div>
</Section>
