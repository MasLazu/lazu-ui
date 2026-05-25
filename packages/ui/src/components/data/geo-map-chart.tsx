import * as React from "react";

import { Chart, CHART_COLORS } from "./chart";
import type { BaseChartProps, GeoMapChartDatum } from "./types";

export interface GeoMapChartProps extends BaseChartProps {
  data: GeoMapChartDatum[];
  mapName?: string;
}
export function GeoMapChart({ data, height = 360, emptyMessage, className, ...props }: GeoMapChartProps) {
  const option = React.useMemo(() => {
    if (!data.length) return null;

    const sorted = [...data].sort((left, right) => right.value - left.value);

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: { color: "hsl(var(--border))", type: "dashed", opacity: 0.8 },
        },
      },
      xAxis: {
        type: "category",
        data: sorted.map((entry) => entry.name),
        axisLabel: { rotate: 25, color: "hsl(var(--muted-foreground))" },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "hsl(var(--muted-foreground))" },
        splitLine: { lineStyle: { color: "hsl(var(--border))", type: "dashed", opacity: 0.5 } },
      },
      series: [
        {
          type: "bar",
          data: sorted.map((entry) => entry.value),
          itemStyle: {
            color: (params: { dataIndex: number }) => CHART_COLORS[params.dataIndex % CHART_COLORS.length],
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: { disabled: true },
          blur: { itemStyle: { opacity: 1 } },
          select: { disabled: true },
        },
      ],
    };
  }, [data]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
