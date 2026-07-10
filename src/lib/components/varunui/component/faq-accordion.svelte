<script lang="ts" module>
  export interface FaqItem {
    question: string;
    answer: string;
  }

  export interface FaqAccordionProps {
    items?: FaqItem[];
    value?: string;
  }

  export const faqAccordionDemo: FaqAccordionProps = {
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major cards, PayPal, and bank transfers for annual plans.",
      },
      {
        question: "Can I cancel at any time?",
        answer:
          "Yes. Your access continues until the end of your current billing period.",
      },
      {
        question: "Do you offer a free trial?",
        answer:
          "Yes. New customers can try the full product before choosing a plan.",
      },
    ],
  };
</script>

<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "$lib/components/varunui/internal/ui/accordion/index.js";

  let {
    items = [],
    value = $bindable("item-0"),
  }: FaqAccordionProps = $props();
</script>

{#if items.length > 0}
  <Accordion type="single" bind:value class="border-y border-border">
    {#each items as item, index (item.question)}
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger class="cursor-pointer py-5 text-left text-base font-semibold md:text-lg">
          {item.question}
        </AccordionTrigger>
        <AccordionContent class="max-w-[var(--layout-prose)] pb-5 text-base leading-7 text-muted-foreground">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    {/each}
  </Accordion>
{/if}
