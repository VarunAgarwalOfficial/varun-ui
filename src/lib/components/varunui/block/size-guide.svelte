<script lang="ts" module>
  import { Ruler } from "$lib/components/varunui/internal/icons/phosphor.js";

  interface SizeRow {
    size: string;
    chest?: string;
    waist?: string;
    hips?: string;
    length?: string;
  }

  export interface SizeGuideProps {
    heading?: string;
    description?: string;
    unit?: "in" | "cm";
    sizes?: SizeRow[];
    className?: string;
  }

  export const sizeGuideDemo: SizeGuideProps = {
    heading: "Size Guide",
    description:
      "Measurements are in inches. For the best fit, measure yourself and compare with the chart below.",
    unit: "in",
    sizes: [
      {
        size: "XS",
        chest: "32-34",
        waist: "26-28",
        hips: "34-36",
        length: "26",
      },
      {
        size: "S",
        chest: "34-36",
        waist: "28-30",
        hips: "36-38",
        length: "27",
      },
      {
        size: "M",
        chest: "38-40",
        waist: "32-34",
        hips: "40-42",
        length: "28",
      },
      {
        size: "L",
        chest: "42-44",
        waist: "36-38",
        hips: "44-46",
        length: "29",
      },
      {
        size: "XL",
        chest: "46-48",
        waist: "40-42",
        hips: "48-50",
        length: "30",
      },
    ],
  };
</script>

<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/varunui/internal/ui/table/index.js";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import { cn } from "$lib/utils.js";

  let {
    heading,
    description,
    unit = "in",
    sizes = [],
    className,
  }: SizeGuideProps = $props();

  const columns = $derived(
    sizes[0] ? Object.keys(sizes[0]).filter((key) => key !== "size") : [],
  );
</script>

<Section container="sm" className={className}>
    <div class="mb-8 text-center">
      <div
        class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted"
      >
        <Ruler class="size-6" />
      </div>
      {#if heading}
        <h2 class="text-2xl font-semibold">{heading}</h2>
      {/if}
      {#if description}
        <p class="mt-2 text-balance text-muted-foreground">
          {description}
        </p>
      {/if}
    </div>

    <div class="overflow-x-auto rounded-none border">
      <Table>
        <TableHeader>
          <TableRow class="bg-muted/50 hover:bg-muted/50">
            <TableHead class="h-14 text-center">Size</TableHead>
            {#each columns as col}
              <TableHead class="h-14 text-center capitalize">
                {col} ({unit})
              </TableHead>
            {/each}
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each sizes as row, index}
            <TableRow
              class={cn(index % 2 === 0 ? "bg-background" : "bg-muted/30")}
            >
              <TableCell class="h-14 text-center font-medium">
                {row.size}
              </TableCell>
              {#each columns as col}
                <TableCell class="h-14 text-center text-muted-foreground">
                  {row[col as keyof SizeRow] || "-"}
                </TableCell>
              {/each}
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </div>
</Section>
