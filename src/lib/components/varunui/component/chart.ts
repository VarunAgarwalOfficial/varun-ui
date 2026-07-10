export type ChartTone =
  "purple" | "blue" | "green" | "yellow" | "red" | "pink" | "cyan" | "gray";

export interface ChartDatum {
  label: string;
  value: number;
  tone?: ChartTone;
}

export interface ChartSeries {
  name: string;
  values: number[];
  tone?: ChartTone;
}

export interface ChartTooltipItem {
  label: string;
  value: string;
  tone?: ChartTone;
}

export const chartTones: ChartTone[] = [
  "purple",
  "blue",
  "green",
  "yellow",
  "red",
  "pink",
  "cyan",
  "gray",
];

export const chartToneTextClasses: Record<ChartTone, string> = {
  purple: "text-data-purple",
  blue: "text-data-blue",
  green: "text-data-green",
  yellow: "text-data-yellow",
  red: "text-data-red",
  pink: "text-data-pink",
  cyan: "text-data-cyan",
  gray: "text-data-gray",
};

export const chartToneBackgroundClasses: Record<ChartTone, string> = {
  purple: "bg-data-purple",
  blue: "bg-data-blue",
  green: "bg-data-green",
  yellow: "bg-data-yellow",
  red: "bg-data-red",
  pink: "bg-data-pink",
  cyan: "bg-data-cyan",
  gray: "bg-data-gray",
};

const defaultNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatChartValue(value: number) {
  return defaultNumberFormatter.format(value);
}

export function toneAt(index: number, tone?: ChartTone) {
  return tone ?? chartTones[index % chartTones.length];
}

export function nextChartIndex(
  current: number,
  length: number,
  direction: number,
) {
  if (length <= 0) return -1;
  if (current < 0) return direction > 0 ? 0 : length - 1;
  return (current + direction + length) % length;
}

export function observeChartWidth(
  node: HTMLElement,
  onWidth: (width: number) => void,
) {
  const update = (width: number) => onWidth(Math.max(280, Math.round(width)));
  update(node.getBoundingClientRect().width);

  const observer = new ResizeObserver(([entry]) => {
    if (entry) update(entry.contentRect.width);
  });

  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}

export function observeChartReveal(node: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") {
    node.dataset.chartVisible = "true";
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      node.dataset.chartVisible = "true";
      observer.disconnect();
    },
    { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
  );

  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}

export function pointerPosition(
  event: PointerEvent,
  element: Element,
  width: number,
  height: number,
) {
  const bounds = element.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) / bounds.width) * width,
    y: ((event.clientY - bounds.top) / bounds.height) * height,
  };
}
