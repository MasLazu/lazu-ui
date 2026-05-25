import type { HTMLAttributes, ReactNode } from "react";

export interface ChartSeriesDatum {
  x: string | number;
  y: number | null;
}

export interface ChartSeries {
  name: string;
  data: ChartSeriesDatum[];
  color?: string;
}

export interface PieChartDatum {
  name: string;
  value: number;
  color?: string;
}

export interface HeatmapChartDatum {
  x: string;
  y: string;
  value: number | null;
}

export interface SankeyChartNode {
  name: string;
}

export interface SankeyChartLink {
  source: string;
  target: string;
  value: number;
}

export interface GeoMapChartDatum {
  name: string;
  value: number;
}

export interface GaugeChartThreshold {
  stop: number;
  color: string;
}

export interface BaseChartProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  height?: number | string;
  emptyMessage?: ReactNode;
}
