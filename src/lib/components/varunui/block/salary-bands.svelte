<script lang="ts" module>
  interface SalaryBand {
    level: string;
    role: string;
    minimum: number;
    maximum: number;
    ownership?: string;
  }

  export interface SalaryBandsProps {
    kicker?: string;
    heading?: string;
    description?: string;
    bands?: SalaryBand[];
    currency?: string;
    locale?: string;
    note?: string;
    className?: string;
  }

  export const salaryBandsDemo: SalaryBandsProps = {
    kicker: "Pay transparency",
    heading: "Publish the band before asking for the application.",
    description:
      "Show the scope, base range, and ownership range together so a candidate can make an informed decision early.",
    bands: [
      { level: "L1", role: "Associate engineer", minimum: 85000, maximum: 110000, ownership: "0.01% to 0.03%" },
      { level: "L2", role: "Product engineer", minimum: 110000, maximum: 145000, ownership: "0.03% to 0.06%" },
      { level: "L3", role: "Senior engineer", minimum: 145000, maximum: 185000, ownership: "0.06% to 0.12%" },
      { level: "L4", role: "Staff engineer", minimum: 185000, maximum: 230000, ownership: "0.12% to 0.25%" },
    ],
    currency: "USD",
    locale: "en-US",
    note: "Illustrative annual base ranges. A real hiring page must state location rules, bonus terms, and how level is assessed.",
  };
</script>

<script lang="ts">
  import DataCaption from "$lib/components/varunui/component/data-caption.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker = salaryBandsDemo.kicker,
    heading = salaryBandsDemo.heading,
    description = salaryBandsDemo.description,
    bands = salaryBandsDemo.bands ?? [],
    currency = salaryBandsDemo.currency ?? "USD",
    locale = salaryBandsDemo.locale ?? "en-US",
    note = salaryBandsDemo.note,
    className,
  }: SalaryBandsProps = $props();

  const formatter = $derived(new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }));
</script>

<section data-slot="salary-bands" class={className}>
  <Section container="md">
    <Stack gap="xl">
      <SectionHeader {kicker} title={heading} {description} align="left" markerTone="green" />

      <div class="hidden overflow-x-auto border border-border md:block">
        <table class="w-full min-w-[40rem] text-sm">
          <DataCaption as="table" description="Illustrative engineering salary bands." meta={currency} />
          <thead class="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
            <tr>
              <th class="px-4 py-3 font-medium" scope="col">Level</th>
              <th class="px-4 py-3 font-medium" scope="col">Role</th>
              <th class="px-4 py-3 font-medium" scope="col">Annual base</th>
              <th class="px-4 py-3 font-medium" scope="col">Ownership</th>
            </tr>
          </thead>
          <tbody>
            {#each bands as band (`${band.level}-${band.role}`)}
              <tr class="border-b border-border last:border-b-0">
                <th class="px-4 py-4 text-left font-mono font-semibold" scope="row">{band.level}</th>
                <td class="px-4 py-4 font-medium">{band.role}</td>
                <td class="px-4 py-4 font-mono tabular-nums">{formatter.format(band.minimum)} to {formatter.format(band.maximum)}</td>
                <td class="px-4 py-4 text-muted-foreground">{band.ownership ?? "Not included"}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <ul class="divide-y divide-border border-y border-border md:hidden">
        {#each bands as band (`mobile-${band.level}-${band.role}`)}
          <li class="grid gap-2 py-4">
            <div class="flex items-center justify-between gap-4">
              <span class="font-mono text-sm font-semibold">{band.level}</span>
              <span class="text-xs text-muted-foreground">{band.ownership ?? "No ownership"}</span>
            </div>
            <p class="font-semibold">{band.role}</p>
            <p class="font-mono text-sm tabular-nums text-muted-foreground">{formatter.format(band.minimum)} to {formatter.format(band.maximum)}</p>
          </li>
        {/each}
      </ul>

      {#if note}<p class="max-w-[var(--layout-prose)] text-sm leading-6 text-muted-foreground">{note}</p>{/if}
    </Stack>
  </Section>
</section>
