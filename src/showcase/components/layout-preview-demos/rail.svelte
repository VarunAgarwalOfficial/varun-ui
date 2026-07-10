<script lang="ts">
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import FeatureCard from "$lib/components/varunui/piece/feature-card.svelte";
  import InlineStat from "$lib/components/varunui/piece/inline-stat.svelte";
  import ProgressMeter from "$lib/components/varunui/component/progress-meter.svelte";
</script>

<Section container="max" size="sm">
<Rail>
  {#snippet rail()}
    <div class="border border-border bg-blue/15 p-[var(--surface-padding-md)]">
      <p class="text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">
        <Marker text="Weekly focus" tone="blue" emphasis />
      </p>
      <h3 class="mt-4 text-xl font-semibold tracking-tight">
        Keep the launch list moving
      </h3>
      <p class="mt-2 text-sm leading-6 text-muted-foreground">
        Three owners are closing the final checklist before Friday.
      </p>
      <div class="mt-5">
        <ProgressMeter value={86} tone="primary" ariaLabel="Launch readiness" />
      </div>
      <div class="mt-4">
        <div class="border-t border-border pt-4">
          <InlineStat value="86%" label="Ready" animate={false} />
          <p class="mt-2 text-sm text-muted-foreground">
            Copy, support, and QA aligned.
          </p>
        </div>
      </div>
    </div>
  {/snippet}

  <div class="grid gap-[var(--layout-gap-sm)]">
    <FeatureCard>
      {#snippet leading()}<span class="font-mono text-xs font-semibold">Mon</span>{/snippet}
      <p class="text-xs font-medium uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">Message</p>
      <h3 class="mt-2 text-lg font-semibold">Approve final positioning</h3>
      <p class="mt-2 text-sm leading-6 text-muted-foreground">
        The value statement and launch title are ready for sign-off.
      </p>
    </FeatureCard>
    <FeatureCard>
      {#snippet leading()}<span class="font-mono text-xs font-semibold">Wed</span>{/snippet}
      <p class="text-xs font-medium uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">Readiness</p>
      <h3 class="mt-2 text-lg font-semibold">Close support prep</h3>
      <p class="mt-2 text-sm leading-6 text-muted-foreground">
        Macros and escalation owners are paired with the release checklist.
      </p>
    </FeatureCard>
    <FeatureCard>
      {#snippet leading()}<span class="font-mono text-xs font-semibold">Fri</span>{/snippet}
      <p class="text-xs font-medium uppercase tracking-[var(--tracking-kicker)] text-muted-foreground">Release</p>
      <h3 class="mt-2 text-lg font-semibold">Ship the customer note</h3>
      <p class="mt-2 text-sm leading-6 text-muted-foreground">
        Publish the update and route the first feedback themes.
      </p>
    </FeatureCard>
  </div>
</Rail>
</Section>
