<script lang="ts">
  import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import {
    Center,
    StoryScene,
    Cluster,
    Grid,
    LabelValue,
    Marker,
    Rail,
    Reel,
    RotatingTextSeal,
    Section,
    SectionHeader,
    Split,
    Stack,
    Link,
  } from "$lib";
  import Button from "$lib/components/varunui/component/button.svelte";

  const layers = [
    {
      title: "Components",
      href: "/components",
      description:
        "Accessible controls and expressive UI with real state, semantics, and behavior.",
      rule: "Behavior belongs here.",
    },
    {
      title: "Pieces",
      href: "/pieces",
      description:
        "Small, stateless content relationships that stay useful across product domains.",
      rule: "Meaning without page placement.",
    },
    {
      title: "Layouts",
      href: "/layouts",
      description:
        "Proven geometry for vertical flow, horizontal flow, rails, reading, and application shells.",
      rule: "Structure survives new content.",
    },
    {
      title: "Blocks",
      href: "/blocks",
      description:
        "Reusable page regions that perform one recognisable product or content job.",
      rule: "One region. One job. Clear edges.",
    },
    {
      title: "Pages",
      href: "/pages",
      description:
        "Full curated compositions for product, marketing, commerce, support, auth, legal, and system flows.",
      rule: "The complete task owns the order.",
    },
    {
      title: "Emails",
      href: "/emails",
      description:
        "Static messages for security, collaboration, lifecycle, billing, receipts, and service updates.",
      rule: "One message. One reason. One action.",
    },
    {
      title: "Characters",
      href: "/characters",
      description:
        "The small storyteller cast for welcome, guidance, support, recovery, and campaign moments.",
      rule: "Every appearance needs a narrative job.",
    },
    {
      title: "Canvases",
      href: "/canvases",
      description:
        "Fixed-format recipes for announcements, stories, posts, covers, and posters.",
      rule: "Format and safe area are design decisions.",
    },
  ] as const;

  const ownership = [
    {
      layer: "Token",
      owns: "Shared decisions",
      detail: "Color, type, spacing, measure, radius, texture, control size, and motion timing.",
    },
    {
      layer: "Primitive",
      owns: "The substrate",
      detail: "Low-level semantics and styling hooks used to build the public vocabulary; not a product recipe.",
    },
    {
      layer: "Component",
      owns: "Behavior",
      detail: "Interaction, state, keyboard support, validation, and accessibility.",
    },
    {
      layer: "Piece",
      owns: "Meaning",
      detail: "A compact, domain-neutral content relationship with no page placement.",
    },
    {
      layer: "Layout",
      owns: "Geometry",
      detail: "Measure, flow, gap, placement, wrapping, collapse, and sticky behavior.",
    },
    {
      layer: "Block",
      owns: "The opinion",
      detail: "Hierarchy, layout nesting, responsive choreography, and expressive moments.",
    },
    {
      layer: "Page",
      owns: "Information order",
      detail: "A full route-level composition of Blocks with one deliberate task flow.",
    },
    {
      layer: "Email",
      owns: "Outgoing delivery",
      detail: "A static 600px message with a preheader, exact information order, and one clear route back to the product.",
    },
    {
      layer: "Canvas",
      owns: "Fixed output",
      detail: "A square composition with a fixed safe area, content budget, and publishing purpose.",
    },
    {
      layer: "Application",
      owns: "The truth",
      detail: "Data, routing, permissions, persistence, analytics, and side effects.",
    },
  ] as const;

  const layoutPatterns = [
    ["Stack", "/layouts/stack", "Vertical flow"],
    ["Cluster", "/layouts/cluster", "Wrapping horizontal flow"],
    ["Switcher", "/layouts/switcher", "Intrinsic direction change"],
    ["Reel", "/layouts/reel", "Horizontal overflow"],
    ["Grid", "/layouts/grid", "Repeated content"],
    ["Rail", "/layouts/rail", "Context beside detail"],
    ["Article", "/layouts/article", "Long-form reading"],
    ["Pancake", "/layouts/pancake", "Header, flexible main, footer"],
  ] as const;
</script>

<svelte:head>
  <title>varunUI | An opinionated Svelte system</title>
  <meta
    name="description"
    content="An opinionated Svelte system of expressive components, general pieces, proven layouts, complete pages, and outgoing email recipes."
  />
</svelte:head>

<main>
  <div class="border-b border-border">
    <Section size="lg" container="max">
      <Split
        mediaSide="right"
        align="center"
        gap="lg"
      >
        <Stack gap="lg" align="start">
            <p class="text-sm font-semibold">
              <Marker text="The recipe system" tone="yellow" emphasis />
            </p>

            <Stack gap="md" align="start">
              <h1
                class="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl"
              >
                Start with a page. Keep only the decisions that matter.
              </h1>
              <p class="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
                varunUI is a page-first Svelte system of curated flows, useful blocks, proven layouts, and expressive components.
              </p>
            </Stack>

            <Cluster gap="md">
              <Button href="/pages" size="lg">Browse pages</Button>
              <Link href="/blocks" label="Browse page building blocks" />
            </Cluster>
        </Stack>

        {#snippet media()}
          <div class="mx-auto w-full max-w-lg lg:ml-auto">
            <StoryScene
              src={peepStanding23Asset}
              alt="A person welcoming someone into the system"
              tone="yellow"
            />
          </div>
        {/snippet}
      </Split>
    </Section>
  </div>

  <div class="border-b border-border">
    <Section size="lg" container="max">
      <Stack gap="xl">
        <SectionHeader
          align="left"
          title="Eight public catalogs. One clear contract."
          description="Each layer has one job, so composition stays flexible without becoming vague."
        />

        <Stack gap="sm">
          {#each layers as layer (layer.title)}
            <article
              data-tone="yellow"
              class="surface-pastel grid gap-[var(--layout-gap-md)] border border-border p-[var(--surface-padding-md)] lg:grid-cols-[minmax(10rem,0.45fr)_minmax(0,1fr)_minmax(11rem,0.55fr)] lg:items-center"
            >
              <h3 class="text-xl font-semibold tracking-tight">{layer.title}</h3>
              <p class="max-w-[var(--layout-prose)] text-sm leading-6 text-muted-foreground">
                {layer.description}
              </p>
              <div class="space-y-2 md:text-right">
                <p class="text-sm font-semibold">{layer.rule}</p>
                <div class="md:flex md:justify-end">
                  <Link
                    href={layer.href}
                    label={`Browse ${layer.title.toLowerCase()}`}
                  />
                </div>
              </div>
            </article>
          {/each}
        </Stack>

        <Link href="/pages" label="See complete page compositions" />
      </Stack>
    </Section>
  </div>

  <div class="border-b border-border">
    <Section size="lg" container="max">
      <Stack gap="xl">
        <SectionHeader
          align="left"
          title="A little character, used on purpose."
          description="Marker orients, characters explain the moment, and the seal is saved for rare milestones."
        />

        <Grid columns={2} gap="sm">
          <article data-tone="yellow" class="surface-pastel flex min-h-72 flex-col justify-between border border-border p-[var(--surface-padding-lg)]">
            <p class="text-sm font-medium text-muted-foreground">Default orientation</p>
            <div class="text-3xl font-semibold sm:text-4xl">
              <Marker text="Mark the thought" tone="red" emphasis />
            </div>
            <p class="max-w-sm text-sm leading-6 text-muted-foreground">
              One meaningful mark per region is enough.
            </p>
          </article>

          <article class="grid min-h-72 place-items-center border border-border bg-primary/10 p-[var(--surface-padding-lg)]">
            <div class="text-center">
              <RotatingTextSeal text="WELCOME / LAUNCH / COMPLETE / " size="lg" />
              <p class="mt-4 text-sm font-medium text-muted-foreground">
                Save the seal for a real occasion.
              </p>
            </div>
          </article>

          <article data-tone="pink" class="surface-pastel border border-border p-[var(--surface-padding-lg)] md:col-span-2">
            <Split
              mediaSide="right"
              align="center"
              gap="md"
            >
              <Stack gap="md" align="start">
                  <h3 class="text-3xl font-semibold tracking-tight">
                    Characters tell the story.
                  </h3>
                  <p class="max-w-lg leading-7 text-muted-foreground">
                    Use them for welcome, guidance, waiting, support, and recovery. Give every appearance a job.
                  </p>
                  <Link href="/characters" label="Meet the cast" />
              </Stack>

              {#snippet media()}
                <div class="mx-auto w-full max-w-sm">
                  <StoryScene
                    src={peepSitting8Asset}
                    alt="A person sitting and reading"
                    tone="pink"
                  />
                </div>
              {/snippet}
            </Split>
          </article>
        </Grid>
      </Stack>
    </Section>
  </div>

  <div class="border-b border-border">
    <Section size="lg" container="max">
      <Stack gap="2xl">
        <Rail sticky={false}>
          {#snippet rail()}
            <Stack gap="md" align="start">
              <h2 class="text-3xl font-semibold tracking-tight">
                Responsibility stays visible.
              </h2>
              <p class="text-sm leading-6 text-muted-foreground">
                Clear ownership makes the system easier to learn, compose, and change.
              </p>
            </Stack>
          {/snippet}

          <div class="border border-border bg-surface px-[var(--surface-padding-md)]">
            {#each ownership as item (item.layer)}
              <div class="border-b border-border py-[var(--surface-padding-md)] last:border-b-0">
                <LabelValue
                  label={item.layer}
                  value={item.owns}
                  description={item.detail}
                  tone={item.layer === "Block" ? "primary" : "default"}
                />
              </div>
            {/each}
          </div>
        </Rail>

        <Stack gap="lg">
          <Stack gap="sm" align="start">
            <h2 class="text-3xl font-semibold tracking-tight">
              Compose inside-out.
            </h2>
            <p class="max-w-[var(--layout-prose)] leading-7 text-muted-foreground">
              Start with flow, add structure, then place components and pieces inside it.
            </p>
          </Stack>

          <Reel label="Layout patterns">
            {#each layoutPatterns as pattern (pattern[0])}
              <article class="border border-border bg-surface p-[var(--surface-padding-md)]">
                <Stack gap="md" align="start">
                  <Link href={pattern[1]} label={pattern[0]} />
                  <p class="text-sm leading-6 text-muted-foreground">{pattern[2]}</p>
                </Stack>
              </article>
            {/each}
          </Reel>
        </Stack>
      </Stack>
    </Section>
  </div>

  <Section size="lg" container="full">
    <Center measure="lg">
      <div data-tone="green" class="surface-pastel border border-border p-[var(--surface-padding-xl)]">
        <Stack gap="lg" align="start">
          <p class="text-sm font-semibold">
            <Marker text="The admission rule" tone="green" emphasis />
          </p>
          <h2 class="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            New work earns its place by covering a new job, constraint, behavior, or composition.
          </h2>
          <p class="max-w-[var(--layout-prose)] leading-7 text-muted-foreground">
            A decorative variation is not a new component. A distinct user need is.
          </p>
          <Button href="/blocks" size="lg">Browse blocks</Button>
        </Stack>
      </div>
    </Center>
  </Section>
</main>
