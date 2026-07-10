<script lang="ts" module>
  export type DecisionLogStatus = "accepted" | "review" | "blocked";

  export interface DecisionLogItem {
    id: string;
    title: string;
    owner: string;
    status: DecisionLogStatus;
    updated: string;
  }

  export interface DecisionLogProps {
    kicker?: string;
    heading?: string;
    description?: string;
    items?: readonly DecisionLogItem[];
  }

  export const decisionLogDemo: DecisionLogProps = {
    kicker: "Decision log",
    heading: "The detail behind the trend.",
    description:
      "Search recent decisions, inspect their state, and export the current view when another team needs the record.",
    items: [
      { id: "navigation", title: "Navigation handoff", owner: "Maya Chen", status: "accepted", updated: "2026-07-10" },
      { id: "permissions", title: "Permission roles", owner: "Arjun Mehta", status: "review", updated: "2026-07-09" },
      { id: "import", title: "Import mapping", owner: "Inez Rodriguez", status: "blocked", updated: "2026-07-08" },
      { id: "pricing", title: "Pricing comparison", owner: "Noah Kim", status: "accepted", updated: "2026-07-07" },
      { id: "auth", title: "Recovery flow", owner: "Maya Chen", status: "review", updated: "2026-07-05" },
      { id: "release", title: "Release notes", owner: "Inez Rodriguez", status: "accepted", updated: "2026-07-03" },
    ],
  };
</script>

<script lang="ts">
  import type {
    DataTableColumn,
    DataTableRow,
  } from "$lib/components/varunui/component/data-table.svelte";
  import DataTable from "$lib/components/varunui/component/data-table.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  const columns: readonly DataTableColumn[] = [
    {
      id: "title",
      header: "Decision",
      width: "lg",
      sortable: true,
      filterable: true,
      truncate: true,
    },
    {
      id: "owner",
      header: "Owner",
      width: "md",
      sortable: true,
      filterable: true,
    },
    {
      id: "status",
      header: "Status",
      type: "status",
      sortable: true,
      filterable: true,
      statuses: {
        accepted: { label: "Accepted", tone: "success" },
        review: { label: "In review", tone: "info" },
        blocked: { label: "Blocked", tone: "danger" },
      },
      options: [
        { label: "Accepted", value: "accepted" },
        { label: "In review", value: "review" },
        { label: "Blocked", value: "blocked" },
      ],
    },
    {
      id: "updated",
      header: "Updated",
      type: "date",
      width: "md",
      align: "right",
      sortable: true,
    },
  ];

  let {
    kicker = decisionLogDemo.kicker,
    heading = decisionLogDemo.heading,
    description = decisionLogDemo.description,
    items = decisionLogDemo.items ?? [],
  }: DecisionLogProps = $props();

  const rows = $derived<DataTableRow[]>(items.map((item) => ({ ...item })));
</script>

<Section container="max">
  <Stack gap="lg">
    <SectionHeader
      {kicker}
      title={heading}
      {description}
      align="left"
      size="md"
      markerTone="blue"
    />

    <DataTable
      {columns}
      {rows}
      labels={{ searchPlaceholder: "Search decisions" }}
      caption="Recent decisions with current owner, review state, and last update."
      captionMeta={`${rows.length} decisions, updated Jul 10`}
      searchable={true}
      exportable={true}
      fullscreenable={true}
      columnVisibility={true}
      densityControl={true}
      columnFilters={true}
      resizableColumns={true}
      paginated={rows.length > 10}
      fileName="decision-log.csv"
    />
  </Stack>
</Section>
