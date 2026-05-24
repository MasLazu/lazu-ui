import * as React from "react";

import { cn } from "../../lib/utils";

export interface PropertyListItem {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
}

export interface PropertyListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: PropertyListItem[];
}

const PropertyList = React.forwardRef<HTMLDivElement, PropertyListProps>(function PropertyList({ className, items, ...props }, ref) {
  return (
    <div ref={ref} className={cn("space-y-3", className)} {...props}>
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-border/70 bg-background px-4 py-3">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</div>
          <div className="mt-1 text-sm text-foreground">{item.value}</div>
          {item.hint ? <div className="mt-1 text-xs text-muted-foreground">{item.hint}</div> : null}
        </div>
      ))}
    </div>
  );
});

PropertyList.displayName = "PropertyList";

export { PropertyList };
