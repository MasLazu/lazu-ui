import * as React from "react";

import { Chart, CHART_COLORS } from "./chart";
import type { BaseChartProps, PieChartDatum } from "./types";

export interface PieChartProps extends BaseChartProps {
  data: PieChartDatum[];
}

export function PieChart({ data, height = 320, emptyMessage, className, ...props }: PieChartProps) {
  const option = React.useMemo(() => {
    if (!data.length) return null;

    return {
      tooltip: {
        trigger: "item",
        formatter: (params: { name: string; value: number; percent: number }) => `${params.name}: ${params.value} (${params.percent}%)`,
      },
      legend: { show: true },
      series: [
        {
          type: "pie",
          radius: ["42%", "72%"],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 8, borderColor: "hsl(var(--card))", borderWidth: 2 },
          label: { color: "hsl(var(--foreground))" },
          data: data.map((entry, index) => ({
            name: entry.name,
            value: entry.value,
            itemStyle: { color: entry.color ?? CHART_COLORS[index % CHART_COLORS.length] },
          })),
        },
      ],
    };
  }, [data]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
