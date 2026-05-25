import * as React from "react";

import { Chart, CHART_COLORS } from "./chart";
import { truncateLabel } from "./chart-utils";
import type { BaseChartProps, ChartSeries } from "./types";

export interface BarChartProps extends BaseChartProps {
  series: ChartSeries[];
  layout?: "vertical" | "horizontal";
  xLabelRotate?: number;
  xLabelMaxLength?: number;
  showLabels?: boolean;
}

export function BarChart({ series, layout = "vertical", xLabelRotate, xLabelMaxLength, showLabels = false, height = 320, emptyMessage, className, ...props }: BarChartProps) {
  const option = React.useMemo(() => {
    const categories = Array.from(new Set(series.flatMap((entry) => entry.data.map((point) => String(point.x)))));
    if (categories.length === 0 || series.length === 0) return null;

    const isHorizontal = layout === "horizontal";
    const labelRotate = xLabelRotate ?? (isHorizontal ? 0 : 30);
    const categoryLabelMaxLength = xLabelMaxLength ?? (isHorizontal ? 16 : 14);

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: { color: "hsl(var(--border))", type: "dashed", opacity: 0.8 },
        },
        formatter: (params: Array<{ axisValueLabel?: string; seriesName?: string; value?: number | [string, number] }>) => {
          if (!Array.isArray(params) || params.length === 0) return "";
          const label = params[0]?.axisValueLabel ?? "";
          const lines = params.map((param) => {
            const rawValue = Array.isArray(param.value) ? param.value[1] : param.value;
            return `${param.seriesName ?? "Value"}: ${rawValue ?? "-"}`;
          });
          return [label, ...lines].join("<br/>");
        },
      },
      legend: { show: series.length > 1, data: series.map((entry) => entry.name) },
      xAxis: {
        type: isHorizontal ? "value" : "category",
        data: isHorizontal ? undefined : categories,
        axisLine: { show: !isHorizontal, lineStyle: { color: "hsl(var(--border))" } },
        axisLabel: {
          color: "hsl(var(--muted-foreground))",
          interval: 0,
          rotate: labelRotate,
          width: isHorizontal ? undefined : 96,
          overflow: isHorizontal ? undefined : "truncate",
          formatter: (value: string) => (isHorizontal ? value : truncateLabel(value, categoryLabelMaxLength)),
        },
        axisTick: { show: !isHorizontal, alignWithLabel: true },
        splitLine: { show: isHorizontal, lineStyle: { color: "hsl(var(--border))", type: "dashed", opacity: 0.5 } },
      },
      yAxis: {
        type: isHorizontal ? "category" : "value",
        data: isHorizontal ? categories : undefined,
        inverse: isHorizontal,
        axisLine: { show: isHorizontal, lineStyle: { color: "hsl(var(--border))" } },
        axisTick: { show: isHorizontal, alignWithLabel: true },
        axisLabel: {
          color: "hsl(var(--muted-foreground))",
          interval: 0,
          width: isHorizontal ? 120 : undefined,
          overflow: isHorizontal ? "truncate" : undefined,
          formatter: (value: string) => (isHorizontal ? truncateLabel(value, categoryLabelMaxLength) : value),
        },
        splitLine: {
          show: !isHorizontal,
          lineStyle: { color: "hsl(var(--border))", type: "dashed", opacity: 0.5 },
        },
      },
      series: series.map((entry, index) => {
        const valueMap = new Map(entry.data.map((point) => [String(point.x), point.y]));
        return {
          name: entry.name,
          type: "bar",
          barWidth: "60%",
          data: categories.map((category) => valueMap.get(category) ?? null),
          label: {
            show: showLabels,
            position: layout === "horizontal" ? "right" : "top",
            color: "#64748b",
            fontSize: 11,
          },
          itemStyle: {
            color: entry.color ?? CHART_COLORS[index % CHART_COLORS.length],
            borderRadius: isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
            opacity: 1,
          },
          emphasis: { disabled: true },
          blur: { itemStyle: { opacity: 1 } },
          select: { disabled: true },
        };
      }),
    };
  }, [layout, series, showLabels, xLabelMaxLength, xLabelRotate]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
