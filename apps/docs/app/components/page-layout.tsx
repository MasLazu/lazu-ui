import type { ElementType, ReactNode } from "react";

interface PageLayoutProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ElementType;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, description, icon: Icon, actions, children }: PageLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full flex-col space-y-6 overflow-x-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4 lg:items-center">
          {Icon ? (
            <div className="shrink-0 rounded-xl border border-border/70 bg-code-highlight p-2.5 text-primary shadow-sm">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            </div>
          ) : null}
          <div className="min-w-0">
            {typeof title === "string" ? <h1 className="break-words text-2xl font-bold tracking-tight text-foreground">{title}</h1> : title}
            {description ? <p className="mt-0.5 break-words text-sm text-muted-foreground">{description}</p> : null}
          </div>
        </div>
        {actions ? <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-2">{actions}</div> : null}
      </div>
      <div className="min-h-0 flex-1 space-y-6">{children}</div>
    </div>
  );
}
