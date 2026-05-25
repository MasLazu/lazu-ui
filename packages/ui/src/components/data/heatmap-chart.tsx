import * as React from "react";

import { Chart } from "./chart";
import type { BaseChartProps, HeatmapChartDatum } from "./types";

export interface HeatmapChartProps extends BaseChartProps {
  data: HeatmapChartDatum[];
  xLabels?: string[];
  yLabels?: string[];
  unit?: string | null;
}

export function HeatmapChart({ data, xLabels, yLabels, unit, height = 320, emptyMessage, className, ...props }: HeatmapChartProps) {
  const option = React.useMemo(() => {
    if (!data.length) return null;

    const xAxis = xLabels ?? Array.from(new Set(data.map((entry) => entry.x)));
    const yAxis = yLabels ?? Array.from(new Set(data.map((entry) => entry.y)));
    const values = data.filter((entry) => entry.value !== null).map((entry) => entry.value as number);
    const max = values.length ? Math.max(...values) : 0;

    return {
      tooltip: {
        position: "top",
        formatter: (params: { data?: [number, number, number] }) => {
          if (!params.data) return "";
          const [xIndex, yIndex, value] = params.data;
          const suffix = unit ? ` ${unit}` : "";
          return `${xAxis[xIndex]} / ${yAxis[yIndex]}: ${value}${suffix}`;
        },
      },
      grid: { top: 20, right: 20, bottom: 40, left: 80, containLabel: true },
      xAxis: {
        type: "category",
        data: xAxis,
        splitArea: { show: true },
        axisLabel: { color: "hsl(var(--muted-foreground))" },
      },
      yAxis: {
        type: "category",
        data: yAxis,
        splitArea: { show: true },
        axisLabel: { color: "hsl(var(--muted-foreground))" },
      },
      visualMap: {
        min: 0,
        max,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: 0,
        inRange: { color: ["#eff6ff", "#2563eb"] },
      },
      series: [
        {
          type: "heatmap",
          data: data.filter((entry) => entry.value !== null).map((entry) => [xAxis.indexOf(entry.x), yAxis.indexOf(entry.y), entry.value]),
          label: { show: true, color: "#0f172a" },
          itemStyle: { borderColor: "#ffffff", borderWidth: 1 },
          emphasis: {
            disabled: true,
            itemStyle: { shadowBlur: 0, shadowColor: "transparent" },
          },
          blur: { itemStyle: { opacity: 1 } },
          select: { disabled: true },
        },
      ],
    };
  }, [data, unit, xLabels, yLabels]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
