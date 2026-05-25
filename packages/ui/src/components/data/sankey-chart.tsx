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
          emphasis: { focus: "adjacency" },
          data: nodes.map((node, index) => ({
            ...node,
            itemStyle: { color: CHART_COLORS[index % CHART_COLORS.length] },
          })),
          links,
          lineStyle: {
            color: "source",
            curveness: 0.5,
            opacity: 0.35,
          },
          label: {
            color: "hsl(var(--foreground))",
          },
        },
      ],
    };
  }, [links, nodes]);

  return <Chart option={option} height={height} emptyMessage={emptyMessage} className={className} {...props} />;
}
