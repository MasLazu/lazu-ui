import * as React from "react";

import { Chart } from "./chart";
import type { BaseChartProps, GaugeChartThreshold } from "./types";

export interface GaugeChartProps extends BaseChartProps {
  value: number;
  min?: number;
  max?: number;
  label?: React.ReactNode;
  thresholds?: GaugeChartThreshold[];
}

function getAxisStops(min: number, max: number, thresholds: GaugeChartThreshold[]) {
  const span = max - min || 1;
  return thresholds
    .slice()
    .sort((left, right) => left.stop - right.stop)
    .map((entry) => [Math.min(1, Math.max(0, (entry.stop - min) / span)), entry.color]);
}

export function GaugeChart({ value, min = 0, max = 100, label, thresholds = [{ stop: max * 0.6, color: "hsl(var(--chart-2))" }, { stop: max * 0.85, color: "hsl(var(--chart-3))" }, { stop: max, color: "hsl(var(--chart-1))" }], height = 280, emptyMessage, className, ...props }: GaugeChartProps) {
  const option = React.useMemo(() => {
    if (!Number.isFinite(value)) return null;

    return {
      series: [
        {
          type: "gauge",
          min,
          max,
          progress: { show: true, width: 14 },
          axisLine: { lineStyle: { width: 14, color: getAxisStops(min, max, thresholds) } },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { color: "hsl(var(--muted-foreground))" },
          anchor: { show: true, size: 16, itemStyle: { color: "hsl(var(--foreground))" } },
          title: { show: Boolean(label), color: "hsl(var(--muted-foreground))", offsetCenter: [0, "75%"] },
          detail: { valueAnimation: true, color: "hsl(var(--foreground))", formatter: "{value}" },
          data: [{ value, name: typeof label === "string" ? label : undefined }],
        },
      ],
    };
  }, [label, max, min, thresholds, value]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
