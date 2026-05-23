import React, { useContext, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  AlignLeft,
  BadgeCheck,
  BookOpen,
  Blocks,
  ChevronsLeftRight,
  CircleUserRound,
  Clock3,
  Compass,
  KeyRound,
  LayoutGrid,
  ListChecks,
  ListFilter,
  LoaderCircle,
  MenuSquare,
  MessageCircleMore,
  MousePointerClick,
  Paintbrush,
  Square,
  Rows3,
  SearchCheck,
  SquareStack,
  Table2,
  ToggleLeft,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@maslazu/lazu-ui";
import { SidebarContext } from "@/components/sidebar-context";

const faviconPath = `${import.meta.env.PROD ? "/lazu-ui" : ""}/favicon.svg`;

type DocsNavigationItem = {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
};

export const docsNavigation = [
  { id: "button", label: "Button", group: "Forms", icon: MousePointerClick },
  { id: "input", label: "Input", group: "Forms", icon: SearchCheck },
  { id: "password-input", label: "Password Input", group: "Forms", icon: KeyRound },
  { id: "switch", label: "Switch", group: "Forms", icon: ToggleLeft },
  { id: "textarea", label: "Textarea", group: "Forms", icon: AlignLeft },
  { id: "pagination", label: "Pagination", group: "Selection", icon: ChevronsLeftRight },
  { id: "select", label: "Select", group: "Selection", icon: ListFilter },
  { id: "searchable-multi-select", label: "Searchable Multi Select", group: "Selection", icon: ListChecks },
  { id: "searchable-select", label: "Searchable Select", group: "Selection", icon: SearchCheck },
  { id: "tabs", label: "Tabs", group: "Selection", icon: Rows3 },
  { id: "time-range-select", label: "Time Range Select", group: "Selection", icon: Clock3 },
  { id: "alert", label: "Alert", group: "Feedback", icon: TriangleAlert },
  { id: "badge", label: "Badge", group: "Feedback", icon: BadgeCheck },
  { id: "loading", label: "Loading", group: "Feedback", icon: LoaderCircle },
  { id: "tooltip", label: "Tooltip", group: "Feedback", icon: MessageCircleMore },
  { id: "confirm-dialog", label: "Confirm Dialog", group: "Overlay", icon: TriangleAlert },
  { id: "dialog", label: "Dialog", group: "Overlay", icon: Square },
  { id: "dropdown-menu", label: "Dropdown Menu", group: "Overlay", icon: MenuSquare },
  { id: "navigation-menu", label: "Navigation Menu", group: "Navigation", icon: Compass },
  { id: "avatar", label: "Avatar", group: "Data Display", icon: CircleUserRound },
  { id: "card", label: "Card", group: "Data Display", icon: SquareStack },
  { id: "table", label: "Table", group: "Data Display", icon: Table2 },
] satisfies DocsNavigationItem[];

const docsNavigationGroups = ["Forms", "Selection", "Feedback", "Overlay", "Navigation", "Data Display"] as const;

const docsNavigationByGroup = docsNavigationGroups.map((group) => ({
  group,
  items: docsNavigation.filter((item) => item.group === group),
}));

export function DocsSidebar() {
  const { desktopCollapsed, mobileOpen, setMobileOpen } = useContext(SidebarContext);
  const location = useLocation();
  const compactDesktop = desktopCollapsed && !mobileOpen;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, setMobileOpen]);

  return (
    <>
      <div
          className={cn(
           "bg-overlay fixed inset-0 z-30 transition-opacity duration-200 md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
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
        <div
          className={cn(
            "flex items-center",
            compactDesktop ? "px-4 py-4 md:justify-center md:px-0" : "w-full px-4 py-3",
          )}
        >
          {compactDesktop ? (
            <Link
              to="/"
              className="flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 outline-none md:h-12 md:w-12 md:justify-center md:p-1.5"
              title="Lazu UI"
            >
              <img src={faviconPath} alt="Lazu UI" className="h-11 w-11 shrink-0 rounded-xl" />
            </Link>
          ) : (
            <Link
              to="/"
              className="flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <img src={faviconPath} alt="Lazu UI" className="h-11 w-11 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-lg font-bold text-sidebar-foreground">Lazu UI</p>
              </div>
            </Link>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <nav className={cn("space-y-6", compactDesktop ? "px-4 md:px-2" : "w-64 px-4")}>
            <SidebarGroup title="Documentation" collapsed={compactDesktop}>
              <SidebarLink to="/docs/installation" label="Installation" icon={BookOpen} compactDesktop={compactDesktop} exact />
              <SidebarLink to="/docs/frontend-kit-adapter" label="Frontend Kit Adapter" icon={Blocks} compactDesktop={compactDesktop} exact />
              <SidebarLink to="/docs/components" label="All Components" icon={LayoutGrid} compactDesktop={compactDesktop} exact />
              <SidebarLink to="/docs/theme-editor" label="Theme Editor" icon={Paintbrush} compactDesktop={compactDesktop} exact />
            </SidebarGroup>
            {docsNavigationByGroup.map(({ group, items }) => (
              <SidebarGroup key={group} title={group} collapsed={compactDesktop}>
                {items.map((item) => (
                  <SidebarLink key={item.id} to={`/docs/components/${item.id}`} label={item.label} icon={item.icon} compactDesktop={compactDesktop} />
                ))}
              </SidebarGroup>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

function SidebarGroup({ title, collapsed, children }: { title: string; collapsed: boolean; children: React.ReactNode }) {
  return (
    <div className={cn(collapsed ? "mb-8 flex flex-col space-y-4 md:items-center" : "space-y-1 overflow-hidden")}>
      {!collapsed ? <h4 className="whitespace-nowrap px-2 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">{title}</h4> : null}
      {children}
    </div>
  );
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  compactDesktop,
  exact = false,
}: {
  to: string;
  label: string;
  icon?: LucideIcon;
  compactDesktop: boolean;
  exact?: boolean;
}) {
  const location = useLocation();
  const active = exact ? location.pathname === to : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <NavLink
      to={to}
      title={compactDesktop ? label : undefined}
      className={cn(
        "flex items-center",
        compactDesktop ? "interactive-chrome mx-auto mb-1 flex h-11 w-11 justify-center rounded-xl p-3" : "w-full gap-3 rounded-md px-3 py-2 text-sm font-medium",
        active ? "interactive-selected" : "interactive-chrome text-sidebar-foreground/70",
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      {compactDesktop ? null : <span className="truncate">{label}</span>}
    </NavLink>
  );
}
