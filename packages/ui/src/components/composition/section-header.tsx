import * as React from "react";

import { cn } from "../../lib/utils";

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(function SectionHeader(
  { className, title, description, actions, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)} {...props}>
      <div className="min-w-0 space-y-1">
        {title ? <div className="text-lg font-semibold tracking-tight text-foreground">{title}</div> : null}
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
        {children}
      </div>
      {actions ? <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">{actions}</div> : null}
    </div>
  );
});

SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
