import type { Snippet } from "svelte";

export type DataTableDensity = "compact" | "comfortable" | "roomy";
export type DataTableAlign = "left" | "center" | "right";
export type DataTableColumnWidth = "sm" | "md" | "lg" | "xl";
export type DataTableColumnType =
  "text" | "number" | "currency" | "date" | "status";
export type DataTableSortDirection = "asc" | "desc";
export type DataTableTone =
  "muted" | "primary" | "success" | "warning" | "danger" | "info";
export type DataTableValue =
  string | number | boolean | Date | null | undefined;

export interface DataTableStatusOption {
  label: string;
  tone: DataTableTone;
}

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableRow {
  id: string;
  [key: string]: DataTableValue;
}

export interface DataTableCellContext {
  row: DataTableRow;
  column: DataTableColumn;
  value: DataTableValue;
  formatted: string;
}

export interface DataTableColumn {
  id: string;
  header: string;
  accessor?: string;
  type?: DataTableColumnType;
  align?: DataTableAlign;
  width?: DataTableColumnWidth;
  sortable?: boolean;
  filterable?: boolean;
  hideable?: boolean;
  truncate?: boolean;
  locale?: string;
  currency?: string;
  options?: readonly DataTableFilterOption[];
  statuses?: Record<string, DataTableStatusOption>;
  format?: (value: DataTableValue, row: DataTableRow) => string;
  cell?: Snippet<[DataTableCellContext]>;
}

export interface DataTableLabels {
  search: string;
  searchPlaceholder: string;
  columns: string;
  density: string;
  export: string;
  fullscreen: string;
  exitFullscreen: string;
  rowsPerPage: string;
  empty: string;
  filterAll: string;
  pagination: string;
  selectAll: string;
  previousPage: string;
  nextPage: string;
  densityOptions: Record<DataTableDensity, string>;
  selected: (selected: number, total: number) => string;
  range: (start: number, end: number, total: number) => string;
  page: (page: number) => string;
  selectRow: (row: DataTableRow) => string;
  sort: (column: string) => string;
  resizeColumn: (column: string) => string;
  filterColumn: (column: string) => string;
  filterPlaceholder: (column: string) => string;
}

export type DataTableLabelOverrides = Partial<
  Omit<DataTableLabels, "densityOptions">
> & {
  densityOptions?: Partial<Record<DataTableDensity, string>>;
};

export const defaultDataTableLabels: DataTableLabels = {
  search: "Search rows",
  searchPlaceholder: "Search rows",
  columns: "Columns",
  density: "Density",
  export: "Export CSV",
  fullscreen: "Enter fullscreen",
  exitFullscreen: "Exit fullscreen",
  rowsPerPage: "Rows per page",
  empty: "No rows match the current view.",
  filterAll: "All",
  pagination: "Table pagination",
  selectAll: "Select all visible rows",
  previousPage: "Previous page",
  nextPage: "Next page",
  densityOptions: {
    compact: "Compact",
    comfortable: "Comfortable",
    roomy: "Roomy",
  },
  selected: (selected, total) => `${selected} of ${total} selected`,
  range: (start, end, total) => `${start}-${end} of ${total}`,
  page: (page) => `Page ${page}`,
  selectRow: (row) =>
    `Select ${String(row.name ?? row.title ?? row.account ?? row.id)}`,
  sort: (column) => `Sort by ${column}`,
  resizeColumn: (column) => `Resize ${column}`,
  filterColumn: (column) => `Filter ${column}`,
  filterPlaceholder: (column) => `Filter ${column}`,
};

export interface DataTableProps {
  columns: readonly DataTableColumn[];
  rows: readonly DataTableRow[];
  labels?: DataTableLabelOverrides;
  caption?: string;
  captionMeta?: string;
  title?: string;
  description?: string;
  density?: DataTableDensity;
  pageSize?: number;
  pageSizeOptions?: readonly number[];
  fileName?: string;
  searchable?: boolean;
  selectable?: boolean;
  paginated?: boolean;
  exportable?: boolean;
  fullscreenable?: boolean;
  columnVisibility?: boolean;
  densityControl?: boolean;
  columnFilters?: boolean;
  resizableColumns?: boolean;
  selectedIds?: string[];
  onSelectedIdsChange?: (selectedIds: string[]) => void;
  onRowClick?: (row: DataTableRow, event: MouseEvent) => void;
}

export interface DataTableSortState {
  columnId: string;
  direction: DataTableSortDirection;
}

export function getTableValue(row: DataTableRow, column: DataTableColumn) {
  return row[column.accessor ?? column.id];
}

export function formatTableValue(
  value: DataTableValue,
  row: DataTableRow,
  column: DataTableColumn,
) {
  if (column.format) return column.format(value, row);
  if (value === null || value === undefined) return "";

  if (column.type === "number" && typeof value === "number") {
    return value.toLocaleString(column.locale);
  }

  if (
    column.type === "currency" &&
    typeof value === "number" &&
    column.currency
  ) {
    return new Intl.NumberFormat(column.locale, {
      style: "currency",
      currency: column.currency,
    }).format(value);
  }

  if (column.type === "status") {
    return column.statuses?.[String(value)]?.label ?? String(value);
  }

  if (column.type === "date") {
    const date = new Date(String(value));
    return Number.isNaN(date.getTime())
      ? String(value)
      : date.toLocaleDateString(column.locale, {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
  }

  return String(value);
}

export function tableRowMatchesQuery(
  row: DataTableRow,
  columns: readonly DataTableColumn[],
  query: string,
) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return columns
    .map((column) => formatTableValue(getTableValue(row, column), row, column))
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
}

export function tableRowMatchesFilters(
  row: DataTableRow,
  columns: readonly DataTableColumn[],
  filters: Record<string, string>,
) {
  return Object.entries(filters).every(([columnId, filterValue]) => {
    if (!filterValue) return true;

    const column = columns.find((item) => item.id === columnId);
    if (!column) return true;

    const value = getTableValue(row, column);
    if (column.options?.length) return String(value) === filterValue;

    return formatTableValue(value, row, column)
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });
}

export function sortTableRows(
  rows: readonly DataTableRow[],
  columns: readonly DataTableColumn[],
  sort?: DataTableSortState,
) {
  if (!sort) return [...rows];

  const column = columns.find((item) => item.id === sort.columnId);
  if (!column) return [...rows];

  return [...rows].sort((first, second) => {
    const firstValue = getTableValue(first, column);
    const secondValue = getTableValue(second, column);
    const direction = sort.direction === "asc" ? 1 : -1;

    if (typeof firstValue === "number" && typeof secondValue === "number") {
      return (firstValue - secondValue) * direction;
    }

    return (
      String(firstValue ?? "").localeCompare(String(secondValue ?? "")) *
      direction
    );
  });
}

export function escapeTableCsvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}
