import * as React from "react";

import { Chart, CHART_COLORS } from "./chart";
import type { BaseChartProps, SankeyChartLink, SankeyChartNode } from "./types";

export interface SankeyChartProps extends BaseChartProps {
  nodes: SankeyChartNode[];
  links: SankeyChartLink[];
}

export function SankeyChart({ nodes, links, height = 360, emptyMessage, className, ...props }: SankeyChartProps) {
  const option = React.useMemo(() => {
    if (!nodes.length || !links.length) return null;

    return {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "sankey",
          layout: "none",
          emphasis: { disabled: true },
          data: nodes.map((node, index) => ({
            ...node,
            itemStyle: { color: CHART_COLORS[index % CHART_COLORS.length] },
          })),
          links,
          lineStyle: {
            color: "source",
            curveness: 0.5,
            opacity: 0.55,
          },
          label: {
            color: "hsl(var(--foreground))",
          },
          blur: {
            itemStyle: { opacity: 1 },
            lineStyle: { opacity: 0.55 },
          },
          select: { disabled: true },
        },
      ],
    };
  }, [links, nodes]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
