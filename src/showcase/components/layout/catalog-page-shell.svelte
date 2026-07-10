<script lang="ts">
  import type { Snippet } from "svelte";
  import Cluster from "$lib/components/varunui/layout/cluster.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";

  let {
    title,
    count,
    description,
    backHref,
    backLabel,
    controls,
    children,
  }: {
    title: string;
    count?: number;
    description: string;
    backHref?: string;
    backLabel?: string;
    controls?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="min-h-[var(--layout-viewport-height)] bg-background text-foreground">
  <Section as="main" size="sm" container="max">
    <Stack gap="lg">
      {#if backHref && backLabel}
        <div class="text-muted-foreground">
          <Link
            href={backHref}
            label={backLabel}
            direction="back"
          />
        </div>
      {/if}

      <Cluster gap="lg" align="end" justify="between">
        <SectionHeader
          title={count === undefined ? title : `${title} (${count})`}
          {description}
          align="left"
          size="sm"
          level={1}
        />

        {#if controls}
          <Cluster gap="sm">
            {@render controls()}
          </Cluster>
        {/if}
      </Cluster>

      {@render children?.()}
    </Stack>
  </Section>
</div>
