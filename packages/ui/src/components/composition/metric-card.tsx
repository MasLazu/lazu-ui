import * as React from "react";

import { cn } from "../../lib/utils";
import { Card, CardContent } from "../primitives/card";

export interface MetricCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(function MetricCard(
  { className, title, value, description, icon, footer, ...props },
  ref,
) {
  return (
    <Card ref={ref} className={cn("border-border/70", className)} {...props}>
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">{title}</div>
            <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
          </div>
          {icon ? <div className="text-primary">{icon}</div> : null}
        </div>
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
        {footer ? <div className="text-sm text-muted-foreground">{footer}</div> : null}
      </CardContent>
    </Card>
  );
});

MetricCard.displayName = "MetricCard";

export { MetricCard };
