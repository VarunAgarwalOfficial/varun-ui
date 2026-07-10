import { browser } from "$app/environment";
import { replaceState } from "$app/navigation";

type ListingUrlStateOptions = {
  defaultPageSize: string;
  categories?: string[];
};

type ListingUrlState = {
  query: string;
  category?: string;
  page: number;
  pageSize: string;
};

type WritableListingUrlState = ListingUrlState & {
  defaultPageSize: string;
};

const pageSizes = new Set(["12", "24", "48", "96"]);
let pendingReplace: ReturnType<typeof setTimeout> | undefined;

function positiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function replaceListingUrl(url: URL) {
  try {
    replaceState(url, {});
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("before router is initialized")
    ) {
      if (pendingReplace) {
        clearTimeout(pendingReplace);
      }

      pendingReplace = setTimeout(() => {
        pendingReplace = undefined;
        replaceState(url, {});
      }, 0);
      return;
    }

    throw error;
  }
}

export function readListingUrlState({
  defaultPageSize,
  categories,
}: ListingUrlStateOptions): ListingUrlState {
  if (!browser) {
    return {
      query: "",
      category: "all",
      page: 1,
      pageSize: defaultPageSize,
    };
  }

  const params = new URL(window.location.href).searchParams;
  const category = params.get("category") ?? "all";

  return {
    query: params.get("q") ?? "",
    category:
      category === "all" || categories?.includes(category) ? category : "all",
    page: positiveInteger(params.get("page"), 1),
    pageSize: pageSizes.has(params.get("pageSize") ?? "")
      ? (params.get("pageSize") ?? defaultPageSize)
      : defaultPageSize,
  };
}

export function writeListingUrlState({
  query,
  category,
  page,
  pageSize,
  defaultPageSize,
}: WritableListingUrlState) {
  if (!browser) return;

  const url = new URL(window.location.href);

  if (query.trim()) {
    url.searchParams.set("q", query);
  } else {
    url.searchParams.delete("q");
  }

  if (category === undefined || category === "all") {
    url.searchParams.delete("category");
  } else {
    url.searchParams.set("category", category);
  }

  if (page > 1) {
    url.searchParams.set("page", String(page));
  } else {
    url.searchParams.delete("page");
  }

  if (pageSize === defaultPageSize) {
    url.searchParams.delete("pageSize");
  } else {
    url.searchParams.set("pageSize", pageSize);
  }

  replaceListingUrl(url);
}
