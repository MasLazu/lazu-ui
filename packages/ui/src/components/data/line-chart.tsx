import * as React from "react";

import { Chart, CHART_COLORS } from "./chart";
import { formatUnitValue, hasChartSeriesData } from "./chart-utils";
import type { BaseChartProps, ChartSeries } from "./types";

export interface LineChartProps extends BaseChartProps {
  series: ChartSeries[];
  stacked?: boolean;
  unit?: string | null;
}

function isTimeSeries(series: ChartSeries[]) {
  return series.some((entry) => entry.data.some((point) => typeof point.x === "string" && !Number.isNaN(Date.parse(point.x))));
}

export function LineChart({ series, stacked = false, unit = null, height = 320, emptyMessage, className, ...props }: LineChartProps) {
  const option = React.useMemo(() => {
    if (!series.length || !hasChartSeriesData(series)) return null;

    const useTimeAxis = isTimeSeries(series);

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: { color: "hsl(var(--border))", type: "dashed", opacity: 0.8 },
        },
        valueFormatter: (value: number) => formatUnitValue(value, unit),
      },
      legend: { show: series.length > 1, data: series.map((entry) => entry.name) },
      xAxis: {
        type: useTimeAxis ? "time" : "category",
        axisLine: { lineStyle: { color: "hsl(var(--border))" } },
        axisLabel: { color: "hsl(var(--muted-foreground))" },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "hsl(var(--muted-foreground))",
          formatter: (value: number) => formatUnitValue(value, unit),
        },
        splitLine: {
          lineStyle: { color: "hsl(var(--border))", type: "dashed", opacity: 0.5 },
        },
      },
      series: series.map((entry, index) => {
        const color = entry.color ?? CHART_COLORS[index % CHART_COLORS.length];
        const areaOpacity = stacked ? 0.6 : 0.2;

        return {
          name: entry.name,
          type: "line",
          showSymbol: false,
          smooth: true,
          data: entry.data.map((point) => [point.x, point.y]),
          itemStyle: { color },
          lineStyle: { width: 2, color },
          areaStyle: { opacity: areaOpacity, color },
          stack: stacked ? "total" : undefined,
          emphasis: { disabled: true },
          blur: {
            lineStyle: { opacity: 1, color },
            itemStyle: { opacity: 1, color },
            areaStyle: { opacity: areaOpacity, color },
          },
          select: { disabled: true },
        };
      }),
    };
  }, [series, stacked, unit]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
