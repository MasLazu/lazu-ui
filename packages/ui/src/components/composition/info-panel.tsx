import * as React from "react";

import { cn } from "../../lib/utils";

const toneClasses = {
  default: "border-border/70 bg-card text-card-foreground",
  info: "border-primary/20 bg-code-highlight text-foreground",
  success: "border-emerald-500/20 bg-emerald-500/5 text-foreground",
  warning: "border-amber-500/20 bg-amber-500/5 text-foreground",
  destructive: "border-red-500/20 bg-red-500/5 text-foreground",
} as const;

export interface InfoPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: keyof typeof toneClasses;
}

const InfoPanel = React.forwardRef<HTMLDivElement, InfoPanelProps>(function InfoPanel(
  { className, title, description, icon, tone = "default", children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("rounded-xl border px-4 py-4", toneClasses[tone], className)} {...props}>
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-0.5 shrink-0 text-primary">{icon}</div> : null}
        <div className="min-w-0 space-y-1.5">
          {title ? <div className="text-sm font-medium text-foreground">{title}</div> : null}
          {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
          {children}
        </div>
      </div>
    </div>
  );
});

InfoPanel.displayName = "InfoPanel";

export { InfoPanel };
