<script lang="ts" module>
  import type { FaqItem } from "$lib/components/varunui/component/faq-accordion.svelte";

  export interface PrivacyFaqAccordionLabels {
    footer?: string;
  }

  export interface PrivacyFaqAccordionProps {
    title?: string;
    description?: string;
    items?: FaqItem[];
    labels?: PrivacyFaqAccordionLabels;
  }

  export const privacyFaqAccordionDemo: PrivacyFaqAccordionProps = {
    title: "Privacy FAQ",
    description:
      "Common questions about how we collect, use, and protect your personal data.",
    items: [
      {
        question: "What personal data do you collect?",
        answer:
          "We collect your name, email address, and usage analytics when you create an account. Payment information is processed by our payment provider and never stored on our servers. We also collect device and browser information for security purposes.",
      },
      {
        question: "How do you use my data?",
        answer:
          "Your data is used to provide the service, send important notifications, and improve the platform experience. We never sell your personal data to third parties. Aggregated, anonymized data may be used for product research and development.",
      },
      {
        question: "Can I delete my account and data?",
        answer:
          "Yes. You can request full account deletion from your settings page. Upon deletion, all personal data is permanently removed within 30 days. Some anonymized, aggregated data may be retained for analytics purposes but cannot be traced back to you.",
      },
      {
        question: "Do you share data with third parties?",
        answer:
          "We share data only with essential service providers such as hosting, email delivery, and payment processing. All providers are contractually obligated to protect your data. We do not share data with advertisers or data brokers.",
      },
      {
        question: "How is my data protected?",
        answer:
          "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We conduct regular security audits, employ strict access controls, and maintain SOC 2 Type II compliance. Our infrastructure is hosted in ISO 27001-certified data centers.",
      },
      {
        question: "What are my rights under GDPR?",
        answer:
          "If you are in the EU, you have the right to access, rectify, erase, restrict processing, and port your data. You may also object to processing and withdraw consent at any time. To exercise these rights, contact our Data Protection Officer.",
      },
    ],
    labels: {
      footer: "Can't find your answer? Contact the privacy team.",
    },
  };
</script>

<script lang="ts">
  import { QuestionIcon } from "$lib/components/varunui/internal/icons/phosphor.js";
  import FaqAccordion from "$lib/components/varunui/component/faq-accordion.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";

  let {
    title = privacyFaqAccordionDemo.title,
    description = privacyFaqAccordionDemo.description,
    items = privacyFaqAccordionDemo.items,
    labels = privacyFaqAccordionDemo.labels,
  }: PrivacyFaqAccordionProps = $props();

  let accordionValue = $state("");
</script>

<Section container="prose" className="bg-background">
    <div class="border-y border-border">
      <div class="border-b border-border px-6 py-5">
        <div class="flex items-start gap-3">
          <div class="rounded-md bg-primary/10 p-2">
            <QuestionIcon class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-semibold text-foreground">{title}</h2>
            {#if description}
              <p class="mt-1 text-sm text-muted-foreground">{description}</p>
            {/if}
          </div>
        </div>
      </div>

      {#if items?.length}
        <div class="px-6 py-4">
          <FaqAccordion
            {items}
            bind:value={accordionValue}
          />
        </div>
      {/if}

      {#if labels?.footer}
        <div class="border-t border-border bg-muted px-6 py-3">
          <p class="text-center text-xs text-muted-foreground">
            {labels.footer}
          </p>
        </div>
      {/if}
    </div>
</Section>
