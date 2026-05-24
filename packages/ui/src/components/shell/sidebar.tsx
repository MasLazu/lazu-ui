import * as React from "react";

import { cn } from "../../lib/utils";

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(function Sidebar({ className, ...props }, ref) {
  return <aside ref={ref} className={cn("flex h-screen w-72 shrink-0 flex-col border-r border-border/60 bg-sidebar text-sidebar-foreground", className)} {...props} />;
});

Sidebar.displayName = "Sidebar";

export interface SidebarBrandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

const SidebarBrand = React.forwardRef<HTMLDivElement, SidebarBrandProps>(function SidebarBrand(
  { className, icon, title, subtitle, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("border-b border-border/60 px-4 py-4", className)} {...props}>
      <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
        {icon ? <div className="rounded-xl border border-border/70 bg-code-highlight p-2 text-primary">{icon}</div> : null}
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-sidebar-foreground">{title}</p>
          {subtitle ? <p className="truncate text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
});

SidebarBrand.displayName = "SidebarBrand";

export interface SidebarSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(function SidebarSection(
  { className, title, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {title ? <h3 className="px-2 text-xs font-semibold uppercase text-sidebar-foreground/60">{title}</h3> : null}
      <div className="space-y-2">{children}</div>
    </div>
  );
});

SidebarSection.displayName = "SidebarSection";

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  active?: boolean;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(function SidebarItem(
  { className, icon, label, description, active = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition",
        active ? "interactive-selected" : "interactive-chrome text-sidebar-foreground/70",
        className,
      )}
      {...props}
    >
      {icon ? <div className="mt-0.5 size-4 shrink-0">{icon}</div> : null}
      <span className="space-y-1">
        <span className="block truncate">{label}</span>
        {description ? <span className="block text-xs leading-5 text-sidebar-foreground/60">{description}</span> : null}
      </span>
    </div>
  );
});

SidebarItem.displayName = "SidebarItem";

export { Sidebar, SidebarBrand, SidebarItem, SidebarSection };
