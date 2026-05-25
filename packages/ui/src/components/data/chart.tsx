import type { HTMLAttributes, ReactNode } from "react";

import type { EChartsOption } from "echarts";
import EChartsModule from "echarts-for-react";

import { cn } from "../../lib/utils";

const ReactECharts =
  (EChartsModule as unknown as { default?: typeof EChartsModule }).default ??
  EChartsModule;

export const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const defaultTheme: Record<string, unknown> = {
  tooltip: {
    confine: true,
    backgroundColor: "hsl(var(--card))",
    borderColor: "hsl(var(--border))",
    textStyle: { color: "hsl(var(--foreground))" },
  },
  legend: {
    textStyle: { color: "hsl(var(--muted-foreground))" },
    bottom: 0,
    icon: "circle",
    itemWidth: 10,
    itemHeight: 10,
  },
  grid: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40,
    containLabel: true,
  },
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base };

  for (const key of Object.keys(override)) {
    if (isPlainObject(result[key]) && isPlainObject(override[key])) {
      result[key] = deepMerge(result[key] as Record<string, unknown>, override[key] as Record<string, unknown>);
      continue;
    }

    result[key] = override[key];
  }

  return result;
}

export type ChartOption = Record<string, unknown>;

export interface ChartProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  option: ChartOption | null | undefined;
  height?: number | string;
  emptyMessage?: ReactNode;
  onEvents?: Record<string, (params: unknown) => void>;
}

export function Chart({ option, className, height = 320, emptyMessage = "No data", onEvents, ...props }: ChartProps) {
  if (!option) {
    return (
      <div
        className={cn("flex w-full items-center justify-center rounded-xl border border-dashed border-border/70 bg-card text-sm text-muted-foreground", className)}
        style={{ height }}
        {...props}
      >
        {emptyMessage}
      </div>
    );
  }

  const merged = deepMerge(defaultTheme, option);

  return (
    <div className={cn("min-w-0 max-w-full overflow-hidden", className)} style={{ height }} {...props}>
      <ReactECharts option={merged as EChartsOption} style={{ height: "100%", width: "100%" }} opts={{ renderer: "svg" }} notMerge lazyUpdate onEvents={onEvents} />
    </div>
  );
}
