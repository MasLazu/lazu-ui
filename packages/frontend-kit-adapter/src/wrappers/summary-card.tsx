import type { SummaryCardProps } from "@maslazu/frontend-kit-ui-contracts";
import { Card } from "@maslazu/lazu-ui";

export function SummaryCard({ title, value, description, ...props }: SummaryCardProps) {
  return (
    <Card {...props}>
      <div className="space-y-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
      </div>
    </Card>
  );
}
