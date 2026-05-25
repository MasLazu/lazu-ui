import * as React from "react";
import { Link, NavLink } from "react-router";
import { ChevronDown, ChevronRight, PanelLeft } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../primitives/button";

export interface AppShellNavItem {
  key: string;
  to?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  exact?: boolean;
  children?: AppShellNavItem[];
  defaultExpanded?: boolean;
}

export interface AppShellSection {
  key: string;
  title?: React.ReactNode;
  items?: AppShellNavItem[];
  content?: React.ReactNode;
}

export interface AppShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children: React.ReactNode;
  desktopCollapsed?: boolean;
  mobileOpen?: boolean;
  onDesktopCollapsedChange?: (collapsed: boolean) => void;
  onMobileOpenChange?: (open: boolean) => void;
  appIcon?: React.ReactNode;
  appTitle?: React.ReactNode;
  appSubtitle?: React.ReactNode;
  sidebarSections?: AppShellSection[];
  breadcrumbContent?: React.ReactNode;
  topbarItems?: React.ReactNode;
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  {
    className,
    children,
    desktopCollapsed = false,
    mobileOpen = false,
    onDesktopCollapsedChange,
    onMobileOpenChange,
    appIcon,
    appTitle = "Lazu UI",
    appSubtitle = "Showcase",
    sidebarSections = [],
    breadcrumbContent,
    topbarItems,
    ...props
  },
  ref,
) {
  const compactDesktop = desktopCollapsed && !mobileOpen;
  const faviconPath = "/favicon.svg";

  const isItemActive = React.useCallback((item: AppShellNavItem, pathname: string): boolean => {
    const selfActive = item.to
      ? item.exact
        ? pathname === item.to
        : item.to === "/"
          ? pathname === "/"
          : pathname === item.to || pathname.startsWith(`${item.to}/`)
      : false;

    if (selfActive) {
      return true;
    }

    return item.children?.some((child) => isItemActive(child, pathname)) ?? false;
  }, []);

  const collectExpandedKeys = React.useCallback((items: AppShellNavItem[]) => {
    const keys = new Set<string>();

    const visit = (item: AppShellNavItem) => {
      if (!item.children?.length) {
        return;
      }

      if (item.defaultExpanded || isItemActive(item, location.pathname)) {
        keys.add(item.key);
      }

      item.children.forEach(visit);
    };

    items.forEach(visit);
    return keys;
  }, [isItemActive, location.pathname]);

  const [expandedItemKeys, setExpandedItemKeys] = React.useState<Set<string>>(() => {
    const keys = new Set<string>();
    sidebarSections.forEach((section) => {
      for (const key of collectExpandedKeys(section.items ?? [])) {
        keys.add(key);
      }
    });
    return keys;
  });

  React.useEffect(() => {
    setExpandedItemKeys((current) => {
      const next = new Set(current);
      sidebarSections.forEach((section) => {
        for (const key of collectExpandedKeys(section.items ?? [])) {
          next.add(key);
        }
      });
      return next;
    });
  }, [collectExpandedKeys, sidebarSections]);

  const toggleExpanded = React.useCallback((key: string) => {
    setExpandedItemKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return (
    <div ref={ref} className={cn("flex h-screen w-full overflow-hidden bg-background text-foreground", className)} {...props}>
      <div
        className={cn(
          "bg-overlay fixed inset-0 z-30 transition-opacity duration-200 md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => onMobileOpenChange?.(false)}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col overflow-x-hidden bg-sidebar text-sidebar-foreground md:z-20",
          desktopCollapsed ? "md:w-[64px]" : "md:w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "w-72 shadow-xl md:shadow-none",
        )}
      >
        <div className={cn("flex items-center", compactDesktop ? "px-4 py-4 md:justify-center md:px-0" : "w-full px-4 py-3") }>
          {compactDesktop ? (
            <Link to="/" className="flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 outline-none md:h-12 md:w-12 md:justify-center md:p-1.5" title={typeof appTitle === "string" ? appTitle : undefined}>
              {appIcon ?? <img src={faviconPath} alt="Lazu UI" className="h-11 w-11 shrink-0 rounded-xl" />}
            </Link>
          ) : (
            <Link to="/" className="flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              {appIcon ?? <img src={faviconPath} alt="Lazu UI" className="h-11 w-11 shrink-0 rounded-xl" />}
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-lg font-bold text-sidebar-foreground">{appTitle}</p>
                {appSubtitle ? <p className="truncate text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">{appSubtitle}</p> : null}
              </div>
            </Link>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <nav className={cn("space-y-6", compactDesktop ? "px-4 md:px-2" : "w-64 px-4") }>
            {sidebarSections.map((section) => (
              <div key={section.key} className={cn(compactDesktop ? "mb-8 flex flex-col space-y-4 md:items-center" : "space-y-1 overflow-hidden")}>
                {!compactDesktop && section.title ? <h4 className="whitespace-nowrap px-2 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">{section.title}</h4> : null}
                {section.items?.map((item) => (
                  <AppShellSidebarItem
                    key={item.key}
                    item={item}
                    compactDesktop={compactDesktop}
                    pathname={location.pathname}
                    expandedItemKeys={expandedItemKeys}
                    onToggleExpanded={toggleExpanded}
                    isItemActive={isItemActive}
                  />
                ))}
                {section.content ? section.content : null}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className={cn("fixed top-0 z-40", desktopCollapsed ? "md:left-[64px]" : "md:left-64", "right-0")}>
        <header className="flex h-16 w-full bg-sidebar text-sidebar-foreground">
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (window.matchMedia("(min-width: 768px)").matches) {
                      onDesktopCollapsedChange?.(!desktopCollapsed);
                      return;
                    }
                    onMobileOpenChange?.(!mobileOpen);
                  }}
                  className="interactive-chrome h-10 w-10 rounded-xl p-0 text-sidebar-foreground/70"
                >
                  <PanelLeft className="h-5 w-5" />
                </Button>

                <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Link to="/" className="truncate transition-colors hover:text-primary">Dev Kit</Link>
                  {breadcrumbContent ? <div className="hidden items-center gap-2 sm:flex">{breadcrumbContent}</div> : null}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              {topbarItems}
            </div>
          </div>
        </header>
      </div>

      <div className={cn("flex h-screen min-w-0 flex-1 flex-col overflow-hidden", desktopCollapsed ? "md:pl-[64px]" : "md:pl-64")}>
        <main className="scrollbar-none mt-16 min-h-0 min-w-0 flex-1 overflow-y-auto rounded-tl-[2rem] rounded-tr-[2rem] border border-border/60 bg-surface p-6 text-surface-foreground md:p-8 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
});

AppShell.displayName = "AppShell";

export { AppShell };

interface AppShellSidebarItemProps {
  item: AppShellNavItem;
  compactDesktop: boolean;
  pathname: string;
  expandedItemKeys: Set<string>;
  onToggleExpanded: (key: string) => void;
  isItemActive: (item: AppShellNavItem, pathname: string) => boolean;
  level?: number;
}

function AppShellSidebarItem({ item, compactDesktop, pathname, expandedItemKeys, onToggleExpanded, isItemActive, level = 0 }: AppShellSidebarItemProps) {
  const hasChildren = (item.children?.length ?? 0) > 0;
  const isExpanded = expandedItemKeys.has(item.key);
  const active = isItemActive(item, pathname);
  const showIcon = level === 0;

  if (hasChildren) {
    return (
      <div className="flex w-full flex-col">
        <button
          type="button"
          onClick={() => onToggleExpanded(item.key)}
          title={compactDesktop && typeof item.label === "string" ? item.label : undefined}
          className={cn(
            "flex items-center outline-none transition-all duration-200",
            compactDesktop ? "interactive-chrome mx-auto mb-1 flex h-11 w-11 justify-center rounded-xl p-3" : "w-full gap-3 rounded-md px-3 py-2 text-sm font-medium",
            active && !isExpanded ? "interactive-selected" : "interactive-chrome text-sidebar-foreground/70",
          )}
        >
          {showIcon && item.icon ? <span className="size-4 shrink-0">{item.icon}</span> : null}
          {compactDesktop ? null : (
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
              <span className="truncate">{item.label}</span>
              {isExpanded ? <ChevronDown className="size-4 shrink-0 text-sidebar-foreground/60" /> : <ChevronRight className="size-4 shrink-0 text-sidebar-foreground/60" />}
            </div>
          )}
        </button>

        {!compactDesktop && isExpanded ? (
          <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/60 pl-4">
            {item.children?.map((child) => (
              <AppShellSidebarItem
                key={child.key}
                item={child}
                compactDesktop={compactDesktop}
                pathname={pathname}
                expandedItemKeys={expandedItemKeys}
                onToggleExpanded={onToggleExpanded}
                isItemActive={isItemActive}
                level={level + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (!item.to) {
    return null;
  }

  return (
    <NavLink
      to={item.to}
      end={item.exact}
      title={compactDesktop && typeof item.label === "string" ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          "flex items-center",
          compactDesktop ? "interactive-chrome mx-auto mb-1 flex h-11 w-11 justify-center rounded-xl p-3" : "w-full gap-3 rounded-md px-3 py-2 text-sm font-medium",
          !compactDesktop && level > 0 && !showIcon ? "pl-[14px]" : "",
          !compactDesktop && level > 0 && !showIcon ? "gap-0" : "",
          isActive ? "interactive-selected" : "interactive-chrome text-sidebar-foreground/70",
        )
      }
    >
      {showIcon && item.icon ? <span className="size-4 shrink-0">{item.icon}</span> : null}
      {compactDesktop ? null : <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}
