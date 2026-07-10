<script lang="ts" module>
  import type { DataTableProps as DataTableDemoProps } from "./data-table-model.js";

  export type {
    DataTableAlign,
    DataTableCellContext,
    DataTableColumn,
    DataTableColumnType,
    DataTableColumnWidth,
    DataTableDensity,
    DataTableFilterOption,
    DataTableLabels,
    DataTableLabelOverrides,
    DataTableProps,
    DataTableRow,
    DataTableSortDirection,
    DataTableStatusOption,
    DataTableTone,
    DataTableValue,
  } from "./data-table-model.js";

  export const dataTableDemo: DataTableDemoProps = {
    title: "Usage overview",
    description: "Sortable, searchable, filterable rows with selection and export.",
    caption: "Workspace usage by plan, status, and renewal date.",
    captionMeta: "6 accounts · Updated Jul 10",
    searchable: true,
    paginated: true,
    selectable: true,
    exportable: true,
    fullscreenable: true,
    columnVisibility: true,
    densityControl: true,
    columnFilters: true,
    resizableColumns: true,
    columns: [
      {
        id: "account",
        header: "Account",
        width: "lg",
        sortable: true,
        filterable: true,
        truncate: true,
      },
      {
        id: "plan",
        header: "Plan",
        sortable: true,
        filterable: true,
        options: [
          { label: "Starter", value: "Starter" },
          { label: "Growth", value: "Growth" },
          { label: "Scale", value: "Scale" },
        ],
      },
      {
        id: "usage",
        header: "Usage",
        width: "md",
        type: "number",
        align: "right",
        sortable: true,
      },
      {
        id: "status",
        header: "Status",
        type: "status",
        sortable: true,
        filterable: true,
        statuses: {
          healthy: { label: "Healthy", tone: "success" },
          watch: { label: "Watch", tone: "warning" },
          blocked: { label: "Blocked", tone: "danger" },
        },
        options: [
          { label: "Healthy", value: "healthy" },
          { label: "Watch", value: "watch" },
          { label: "Blocked", value: "blocked" },
        ],
      },
      {
        id: "renewal",
        header: "Renewal",
        type: "date",
        width: "md",
        align: "right",
        sortable: true,
      },
    ],
    rows: [
      {
        id: "varunui",
        account: "varunUI team",
        plan: "Scale",
        usage: 84210,
        status: "healthy",
        renewal: "2026-08-12",
      },
      {
        id: "design-team",
        account: "Design team",
        plan: "Growth",
        usage: 32180,
        status: "watch",
        renewal: "2026-09-04",
      },
      {
        id: "research-team",
        account: "Research team",
        plan: "Starter",
        usage: 12840,
        status: "healthy",
        renewal: "2026-10-19",
      },
      {
        id: "operations-team",
        account: "Operations team",
        plan: "Scale",
        usage: 116420,
        status: "blocked",
        renewal: "2026-11-01",
      },
      {
        id: "product-team",
        account: "Product team",
        plan: "Growth",
        usage: 45200,
        status: "healthy",
        renewal: "2026-11-18",
      },
      {
        id: "support-team",
        account: "Support team",
        plan: "Starter",
        usage: 9780,
        status: "watch",
        renewal: "2026-12-02",
      },
    ],
    labels: {
      searchPlaceholder: "Search accounts",
      selectRow: (row) => `Select ${row.account}`,
    },
  };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import {
    CaretDownIcon,
    CaretUpDownIcon,
    CaretUpIcon,
    Check,
    Download,
    Eye,
    Maximize2,
    Minimize2,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import PaginationNav from "$lib/components/varunui/component/pagination-nav.svelte";
  import SearchField from "$lib/components/varunui/component/search-field.svelte";
  import SelectMenu from "$lib/components/varunui/component/select-menu.svelte";
  import DataCaption from "$lib/components/varunui/component/data-caption.svelte";
  import Checkbox from "$lib/components/varunui/internal/ui/checkbox/checkbox.svelte";
  import {
    escapeTableCsvCell,
    defaultDataTableLabels,
    formatTableValue,
    getTableValue,
    sortTableRows,
    tableRowMatchesFilters,
    tableRowMatchesQuery,
    type DataTableAlign,
    type DataTableColumn,
    type DataTableColumnWidth,
    type DataTableDensity,
    type DataTableProps,
    type DataTableRow,
    type DataTableSortState,
    type DataTableTone,
  } from "./data-table-model.js";

  const densityCellClass: Record<DataTableDensity, string> = {
    compact: "px-3 py-2",
    comfortable: "px-4 py-3",
    roomy: "px-5 py-4",
  };

  const densityRowClass: Record<DataTableDensity, string> = {
    compact: "h-10",
    comfortable: "h-12",
    roomy: "h-14",
  };

  const alignClass: Record<DataTableAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const widthClass: Record<DataTableColumnWidth, string> = {
    sm: "w-28",
    md: "w-40",
    lg: "w-56",
    xl: "w-72",
  };

  const toneClass: Record<DataTableTone, string> = {
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    info: "bg-info/10 text-info",
  };

  let {
    columns,
    rows,
    labels: labelOverrides = {},
    caption,
    captionMeta,
    title,
    description,
    density = $bindable("comfortable"),
    pageSize = $bindable(10),
    pageSizeOptions = [10, 25, 50],
    fileName,
    searchable = false,
    selectable = false,
    paginated = false,
    exportable = false,
    fullscreenable = false,
    columnVisibility = false,
    densityControl = false,
    columnFilters = false,
    resizableColumns = false,
    selectedIds = $bindable([]),
    onSelectedIdsChange,
    onRowClick,
  }: DataTableProps = $props();

  let query = $state("");
  let sort = $state<DataTableSortState | undefined>();
  let page = $state(1);
  let hiddenColumnIds = $state<string[]>([]);
  let filters = $state<Record<string, string>>({});
  let columnsOpen = $state(false);
  let fullscreen = $state(false);
  let columnPixelWidths = $state<Record<string, number>>({});

  const labels = $derived({
    ...defaultDataTableLabels,
    ...labelOverrides,
    densityOptions: {
      ...defaultDataTableLabels.densityOptions,
      ...(labelOverrides.densityOptions ?? {}),
    },
  });

  const visibleColumns = $derived(
    columns.filter((column) => !hiddenColumnIds.includes(column.id)),
  );
  const filterColumns = $derived(
    visibleColumns.filter(
      (column) => column.filterable || Boolean(column.options?.length),
    ),
  );
  const densityOptions = $derived(
    (Object.keys(labels.densityOptions) as DataTableDensity[]).map(
      (value) => ({
        value,
        label: labels.densityOptions[value],
      }),
    ),
  );
  const pageSizeSelectOptions = $derived(
    pageSizeOptions.map((size) => ({ value: `${size}`, label: `${size}` })),
  );

  const filteredRows = $derived(
    rows.filter(
      (row) =>
        tableRowMatchesQuery(row, columns, query) &&
        tableRowMatchesFilters(row, columns, filters),
    ),
  );
  const sortedRows = $derived(sortTableRows(filteredRows, columns, sort));
  const pageCount = $derived(
    paginated ? Math.max(1, Math.ceil(sortedRows.length / pageSize)) : 1,
  );
  const currentPage = $derived(Math.min(page, pageCount));
  const visibleRows = $derived(
    paginated
      ? sortedRows.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize,
        )
      : sortedRows,
  );
  const visibleRowIds = $derived(visibleRows.map((row) => row.id));
  const selectedVisibleCount = $derived(
    visibleRowIds.filter((id) => selectedIds.includes(id)).length,
  );
  const allVisibleSelected = $derived(
    visibleRowIds.length > 0 && selectedVisibleCount === visibleRowIds.length,
  );
  const someVisibleSelected = $derived(
    selectedVisibleCount > 0 && !allVisibleSelected,
  );
  const rangeStart = $derived(
    sortedRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1,
  );
  const rangeEnd = $derived(
    paginated
      ? Math.min(currentPage * pageSize, sortedRows.length)
      : sortedRows.length,
  );
  const showToolbar = $derived(
    searchable ||
      columnVisibility ||
      densityControl ||
      exportable ||
      fullscreenable,
  );

  function cellClass(column: DataTableColumn) {
    const align =
      column.align ??
      (column.type === "number" || column.type === "currency"
        ? "right"
        : "left");
    const truncate = column.truncate ? "max-w-64 truncate" : "";
    const numeric =
      column.type === "number" || column.type === "currency"
        ? "font-mono tabular-nums"
        : "";
    const width = columnPixelWidths[column.id]
      ? ""
      : column.width
        ? widthClass[column.width]
        : "";

    return `${densityCellClass[density]} ${alignClass[align]} ${width} ${truncate} ${numeric}`;
  }

  function headerClass(column: DataTableColumn) {
    const align =
      column.align ??
      (column.type === "number" || column.type === "currency"
        ? "right"
        : "left");
    const width = columnPixelWidths[column.id]
      ? ""
      : column.width
        ? widthClass[column.width]
        : "";
    return `${densityCellClass[density]} ${alignClass[align]} ${width} font-medium`;
  }

  function columnStyle(column: DataTableColumn) {
    const width = columnPixelWidths[column.id];
    return width ? `width: ${width}px; min-width: ${width}px;` : undefined;
  }

  function columnSort(column: DataTableColumn) {
    if (sort?.columnId !== column.id) return "none";
    return sort.direction === "asc" ? "ascending" : "descending";
  }

  function sortColumn(column: DataTableColumn) {
    if (column.sortable === false) return;

    if (sort?.columnId !== column.id) {
      sort = { columnId: column.id, direction: "asc" };
    } else if (sort.direction === "asc") {
      sort = { columnId: column.id, direction: "desc" };
    } else {
      sort = undefined;
    }

    page = 1;
  }

  function updateFilter(columnId: string, value: string) {
    filters = { ...filters, [columnId]: value };
    page = 1;
  }

  function updatePageSize(value: string) {
    pageSize = Number(value);
    page = 1;
  }

  function updateDensity(value: string) {
    density = value as DataTableDensity;
  }

  function setSelectedIds(nextIds: string[]) {
    selectedIds = nextIds;
    onSelectedIdsChange?.(nextIds);
  }

  function toggleRow(row: DataTableRow, checked: boolean) {
    if (checked) {
      setSelectedIds([...new Set([...selectedIds, row.id])]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== row.id));
    }
  }

  function toggleVisibleRows(checked: boolean) {
    if (checked) {
      setSelectedIds([...new Set([...selectedIds, ...visibleRowIds])]);
    } else {
      setSelectedIds(selectedIds.filter((id) => !visibleRowIds.includes(id)));
    }
  }

  function toggleColumn(columnId: string) {
    const nextHiddenColumnIds = hiddenColumnIds.includes(columnId)
      ? hiddenColumnIds.filter((id) => id !== columnId)
      : [...hiddenColumnIds, columnId];
    const nextVisibleCount = columns.filter(
      (column) => !nextHiddenColumnIds.includes(column.id),
    ).length;

    if (nextVisibleCount === 0) return;

    hiddenColumnIds = nextHiddenColumnIds;
  }

  function canToggleColumn(column: DataTableColumn, checked: boolean) {
    if (column.hideable === false) return false;
    if (!checked) return true;
    return visibleColumns.length > 1;
  }

  function resizeColumn(column: DataTableColumn, event: PointerEvent) {
    const cell = (event.currentTarget as HTMLElement).closest("th");
    if (!cell) return;

    event.preventDefault();

    const startX = event.clientX;
    const startWidth = columnPixelWidths[column.id] ?? cell.offsetWidth;
    const pointerId = event.pointerId;
    const target = event.currentTarget as HTMLElement;

    target.setPointerCapture(pointerId);

    function move(moveEvent: PointerEvent) {
      const width = Math.max(96, Math.round(startWidth + moveEvent.clientX - startX));
      columnPixelWidths = { ...columnPixelWidths, [column.id]: width };
    }

    function stop() {
      target.releasePointerCapture(pointerId);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", stop);
      target.removeEventListener("pointercancel", stop);
    }

    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", stop);
    target.addEventListener("pointercancel", stop);
  }

  function choosePage(nextPage: number, event: MouseEvent) {
    event.preventDefault();
    page = nextPage;
  }

  function exportCsv() {
    if (typeof document === "undefined") return;

    const header = visibleColumns.map((column) => column.header);
    const body = sortedRows.map((row) =>
      visibleColumns.map((column) =>
        formatTableValue(getTableValue(row, column), row, column),
      ),
    );
    const csv = [header, ...body]
      .map((line) => line.map(escapeTableCsvCell).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName ?? "data-table.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

</script>

<div
  data-slot="data-table"
  data-fullscreen={fullscreen || undefined}
  class={`grid gap-3 ${fullscreen ? "fixed inset-4 z-50 overflow-hidden rounded-md border border-border bg-background p-4" : ""}`}
>
  {#if title || description}
    <div data-slot="data-table-heading" class="grid gap-1">
      {#if title}
        <h3 class="text-base font-semibold text-foreground">{title}</h3>
      {/if}
      {#if description}
        <p class="max-w-[var(--layout-prose)] text-sm text-muted-foreground">{description}</p>
      {/if}
    </div>
  {/if}

  {#if showToolbar}
    <div
      data-slot="data-table-toolbar"
      class="flex flex-col gap-2 rounded-lg border border-border bg-surface p-2 md:flex-row md:items-center md:justify-between"
    >
      <div class="min-w-0 flex-1">
        {#if searchable}
          <SearchField
            bind:value={query}
            label={labels.search}
            placeholder={labels.searchPlaceholder}
            size="sm"
            clearable={true}
            onValueChange={() => (page = 1)}
          />
        {/if}
      </div>

      <div class="flex flex-wrap items-center gap-2">
        {#if columnVisibility}
          <DropdownMenu.Root bind:open={columnsOpen}>
            <DropdownMenu.Trigger
              type="button"
              class="motion-interactive inline-flex h-[var(--control-height-sm)] items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50 data-[state=open]:bg-muted"
            >
              <Eye class="size-4 text-muted-foreground" aria-hidden="true" />
              <span>{labels.columns}</span>
              <CaretDownIcon
                class="size-4 text-muted-foreground motion-transform data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              class="z-50 min-w-56 rounded-lg border border-border bg-surface p-1 text-foreground data-[state=closed]:motion-popover-out data-[state=open]:motion-popover"
            >
              {#each columns as column (column.id)}
                {@const checked = !hiddenColumnIds.includes(column.id)}
                {@const toggleable = canToggleColumn(column, checked)}
                <button
                  type="button"
                  disabled={!toggleable}
                  class="motion-colors flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-muted focus-visible:bg-muted disabled:pointer-events-none disabled:opacity-50"
                  onclick={() => toggleable && toggleColumn(column.id)}
                >
                  <span class="truncate">{column.header}</span>
                  {#if checked}
                    <Check class="size-4 text-primary" aria-hidden="true" />
                  {/if}
                </button>
              {/each}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {/if}

        {#if densityControl}
          <SelectMenu
            value={density}
            label={labels.density}
            options={densityOptions}
            size="sm"
            width="fit"
            onValueChange={updateDensity}
          />
        {/if}

        {#if exportable}
          <button
            type="button"
            class="motion-interactive inline-flex h-[var(--control-height-sm)] items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50"
            onclick={exportCsv}
          >
            <Download class="size-4 text-muted-foreground" aria-hidden="true" />
            <span>{labels.export}</span>
          </button>
        {/if}

        {#if fullscreenable}
          <button
            type="button"
            class="motion-interactive inline-flex h-[var(--control-height-sm)] items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50"
            aria-pressed={fullscreen}
            aria-label={fullscreen ? labels.exitFullscreen : labels.fullscreen}
            onclick={() => (fullscreen = !fullscreen)}
          >
            {#if fullscreen}
              <Minimize2
                class="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span>{labels.exitFullscreen}</span>
            {:else}
              <Maximize2
                class="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span>{labels.fullscreen}</span>
            {/if}
          </button>
        {/if}
      </div>
    </div>
  {/if}

  <div
    data-slot="data-table-surface"
    class="overflow-hidden rounded-none border border-border bg-surface"
  >
    <div class="overflow-x-auto">
      <table class="w-full min-w-[760px] caption-bottom text-sm">
        {#if caption}
          <DataCaption as="table" description={caption} meta={captionMeta} />
        {/if}
        <thead>
          <tr
            class="border-b border-border bg-muted/40 text-xs text-muted-foreground"
          >
            {#if selectable}
              <th scope="col" class={`${densityCellClass[density]} w-10`}>
                <Checkbox
                  checked={allVisibleSelected}
                  indeterminate={someVisibleSelected}
                  aria-label={labels.selectAll}
                  onCheckedChange={(checked) =>
                    toggleVisibleRows(Boolean(checked))}
                />
              </th>
            {/if}
            {#each visibleColumns as column (column.id)}
              <th
                scope="col"
                aria-sort={column.sortable === false ? undefined : columnSort(column)}
                class={headerClass(column)}
                style={columnStyle(column)}
              >
                <div class="relative">
                  {#if column.sortable === false}
                    <span class="inline-flex items-center gap-1.5">
                      {column.header}
                    </span>
                  {:else}
                    <button
                      type="button"
                      class={`motion-colors inline-flex items-center gap-1.5 rounded-md outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50 ${column.align === "right" ? "ml-auto" : column.align === "center" ? "mx-auto" : ""}`}
                      aria-label={labels.sort(column.header)}
                      onclick={() => sortColumn(column)}
                    >
                      <span>{column.header}</span>
                      {#if sort?.columnId === column.id && sort.direction === "asc"}
                        <CaretUpIcon
                          class="size-3.5 text-primary"
                          aria-hidden="true"
                        />
                      {:else if sort?.columnId === column.id}
                        <CaretDownIcon
                          class="size-3.5 text-primary"
                          aria-hidden="true"
                        />
                      {:else}
                        <CaretUpDownIcon
                          class="size-3.5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      {/if}
                    </button>
                  {/if}

                  {#if resizableColumns}
                    <button
                      type="button"
                      aria-label={labels.resizeColumn(column.header)}
                      class="motion-colors absolute -right-1 top-1/2 h-5 w-2 -translate-y-1/2 cursor-col-resize rounded-full border border-transparent hover:border-border hover:bg-muted focus-visible:border-primary focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-primary/50"
                      onpointerdown={(event) => resizeColumn(column, event)}
                    ></button>
                  {/if}
                </div>
              </th>
            {/each}
          </tr>

          {#if columnFilters && filterColumns.length > 0}
            <tr class="border-b border-border bg-background">
              {#if selectable}
                <th class={densityCellClass[density]}></th>
              {/if}
              {#each visibleColumns as column (column.id)}
                <th class={densityCellClass[density]}>
                  {#if column.filterable || column.options?.length}
                    {#if column.options?.length}
                      <SelectMenu
                        value={filters[column.id] ?? ""}
                        label={labels.filterColumn(column.header)}
                        options={[
                          { label: labels.filterAll, value: "" },
                          ...column.options,
                        ]}
                        size="sm"
                        width="full"
                        onValueChange={(value) => updateFilter(column.id, value)}
                      />
                    {:else}
                      <input
                        value={filters[column.id] ?? ""}
                        aria-label={labels.filterColumn(column.header)}
                        placeholder={labels.filterPlaceholder(column.header)}
                        oninput={(event) =>
                          updateFilter(
                            column.id,
                            (event.currentTarget as HTMLInputElement).value,
                          )}
                        class="motion-colors h-[var(--control-height-sm)] w-full rounded-lg border border-border bg-background px-3 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/50"
                      />
                    {/if}
                  {/if}
                </th>
              {/each}
            </tr>
          {/if}
        </thead>

        <tbody>
          {#each visibleRows as row, index (row.id)}
            <tr
              data-selected={selectedIds.includes(row.id) || undefined}
              class={`border-b border-border motion-colors last:border-b-0 hover:bg-muted/40 data-[selected=true]:bg-primary/5 ${densityRowClass[density]} ${index % 2 === 1 ? "bg-muted/15" : ""} ${onRowClick ? "cursor-pointer" : ""}`}
              onclick={(event) => onRowClick?.(row, event)}
            >
              {#if selectable}
                <td class={`${densityCellClass[density]} w-10`}>
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    aria-label={labels.selectRow(row)}
                    onCheckedChange={(checked) => toggleRow(row, Boolean(checked))}
                    onclick={(event) => event.stopPropagation()}
                  />
                </td>
              {/if}
              {#each visibleColumns as column (column.id)}
                {@const value = getTableValue(row, column)}
                {@const formatted = formatTableValue(value, row, column)}
                <td class={cellClass(column)}>
                  {#if column.cell}
                    {@render column.cell({ row, column, value, formatted })}
                  {:else if column.type === "status"}
                    {@const status = column.statuses?.[String(value)]}
                    {#if status}
                      <span
                        class={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${toneClass[status.tone]}`}
                      >
                        {status.label}
                      </span>
                    {:else}
                      <span>{formatted}</span>
                    {/if}
                  {:else}
                  <span>{formatted}</span>
                {/if}
              </td>
              {/each}
            </tr>
          {:else}
            <tr>
              <td
                colspan={visibleColumns.length + (selectable ? 1 : 0)}
                class="px-4 py-12 text-center text-sm text-muted-foreground"
              >
                {labels.empty}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div
    data-slot="data-table-footer"
    class="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"
  >
    <div class="flex flex-wrap items-center gap-3">
      <span>{labels.range(rangeStart, rangeEnd, sortedRows.length)}</span>
      {#if selectable}
        <span>{labels.selected(selectedIds.length, sortedRows.length)}</span>
      {/if}
    </div>

    {#if paginated}
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium uppercase text-muted-foreground">
            {labels.rowsPerPage}
          </span>
          <SelectMenu
            value={`${pageSize}`}
            label={labels.rowsPerPage}
            options={pageSizeSelectOptions}
            size="sm"
            width="fit"
            onValueChange={updatePageSize}
          />
        </div>

        <PaginationNav
          currentPage={currentPage}
          {pageCount}
          ariaLabel={labels.pagination}
          previousLabel={labels.previousPage}
          nextLabel={labels.nextPage}
          pageLabel={labels.page}
          onPageChange={choosePage}
        />
      </div>
    {/if}
  </div>
</div>
