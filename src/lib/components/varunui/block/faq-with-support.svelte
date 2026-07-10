<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import type { FaqItem } from "$lib/components/varunui/component/faq-accordion.svelte";

  interface FaqSupport {
    kicker?: string;
    heading?: string;
    description?: string;
    action?: { label: string; href: string };
  }

  export interface FaqWithSupportProps {
    kicker?: string;
    heading?: string;
    support?: FaqSupport;
    items?: FaqItem[];
    character?: {
      src: string;
      alt: string;
    };
  }

  export const faqWithSupportDemo: FaqWithSupportProps = {
    kicker: "Still curious",
    heading: "Answers, and a door that's always open.",
    support: {
      kicker: "Direct line",
      heading: "Didn't see your question?",
      description:
        "Tell us what you are trying to do. A person will reply with a useful next step within one workday.",
      action: {
        label: "Start a conversation",
        href: "/contact",
      },
    },
    character: {
      src: peepStanding23Asset,
      alt: "A person ready to help",
    },
    items: [
      {
        question: "How does a varunUI trial begin?",
        answer:
          "Create a workspace, invite the people doing the work, and add one active project. The guided setup takes about ten minutes.",
      },
      {
        question: "Can we bring work in from another tool?",
        answer:
          "Yes. Import projects from a spreadsheet or connect an existing workspace. We show a preview before anything is created.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most teams set up a workspace in one sitting. Larger teams can start with a pilot project and add permissions later.",
      },
      {
        question: "Can guests review work without a paid seat?",
        answer:
          "Yes. Guests can review shared work and leave feedback without joining the workspace as a full member.",
      },
      {
        question: "How do we get help?",
        answer:
          "Start in the help centre or send a support note. A varunUI specialist keeps the context from your original request.",
      },
    ],
  };
</script>

<script lang="ts">
  import Button from "$lib/components/varunui/component/button.svelte";
  import FaqAccordion from "$lib/components/varunui/component/faq-accordion.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import PastelField from "$lib/components/varunui/piece/pastel-field.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let props: FaqWithSupportProps = $props();
  let data = $derived({
    ...faqWithSupportDemo,
    ...props,
    support: {
      ...faqWithSupportDemo.support,
      ...(props.support ?? {}),
    },
  });
  const items = $derived(data.items ?? []);
  const hasSide = $derived(
    Boolean(data.character || data.support),
  );
</script>

<Section container="max">
  <Stack gap="2xl">
    <SectionHeader
      kicker={data.kicker}
      title={data.heading}
      size="lg"
      markerTone="pink"
    />
    <Rail>
      {#snippet rail()}
        {#if hasSide}
          <aside class="grid gap-[var(--layout-gap-sm)]">
            {#if data.character}
              <StoryScene
                src={data.character.src}
                alt={data.character.alt}
                tone="pink"
              />
            {/if}

            {#if data.support}
              <PastelField tone="pink">
                {#if data.support.kicker}
                  <Marker text={data.support.kicker} tone="pink" emphasis={true} />
                {/if}
                {#if data.support.heading}
                  <h3 class="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                    {data.support.heading}
                  </h3>
                {/if}
                {#if data.support.description}
                  <p class="mt-3 text-sm leading-6 text-muted-foreground">
                    {data.support.description}
                  </p>
                {/if}
                {#if data.support.action}
                  <div class="mt-6">
                    <Button href={data.support.action.href}>
                      {data.support.action.label}
                    </Button>
                  </div>
                {/if}
              </PastelField>
            {/if}
          </aside>
        {/if}
      {/snippet}

      <div class="min-w-0">
        <FaqAccordion {items} />
      </div>
    </Rail>
  </Stack>
</Section>
