import type { ChartSeries } from "./types";

export function truncateLabel(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, Math.max(1, maxLength - 1))}...` : value;
}

export function formatUnitValue(value: number, unit?: string | null): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  switch (unit) {
    case "bytes":
    case "By": {
      const units = ["B", "KB", "MB", "GB", "TB"];
      let next = value;
      let index = 0;
      while (next >= 1024 && index < units.length - 1) {
        next /= 1024;
        index += 1;
      }
      return `${next.toFixed(next >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
    }
    case "%":
      return `${value.toFixed(value < 10 ? 2 : 1)}%`;
    case "{event}/s":
      return value >= 1000 ? `${(value / 1000).toFixed(1)}K eps` : `${value.toFixed(value < 10 ? 2 : 1)} eps`;
    case "{event}":
    case "{batch}":
      return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toFixed(value < 10 ? 2 : 0);
    default:
      return value >= 1000 ? value.toLocaleString() : value.toFixed(value < 10 ? 2 : 0);
  }
}

export function hasChartSeriesData(series: ChartSeries[]) {
  return series.some((entry) => entry.data.some((point) => point.y !== null));
}
