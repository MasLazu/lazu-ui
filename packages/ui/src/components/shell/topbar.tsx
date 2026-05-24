import * as React from "react";

import { cn } from "../../lib/utils";

export interface TopbarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const Topbar = React.forwardRef<HTMLElement, TopbarProps>(function Topbar(
  { className, eyebrow, title, description, actions, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cn("border-b border-border/60 bg-background px-4 py-4 md:px-6", className)} {...props}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? <div className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</div> : null}
          {title ? <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1> : null}
          {description ? <p className="mt-1 max-w-3xl text-sm text-muted-foreground md:text-base">{description}</p> : null}
        </div>
        {actions ? <div className="hidden shrink-0 gap-2 md:flex">{actions}</div> : null}
      </div>
    </header>
  );
});

Topbar.displayName = "Topbar";

export { Topbar };
