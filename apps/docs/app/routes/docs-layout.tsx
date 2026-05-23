import * as React from "react";
import { Outlet, useLocation } from "react-router";

import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsTopbar } from "@/components/docs-topbar";
import { PageOutline, type PageOutlineItem } from "@/components/page-outline";
import { SidebarContext } from "@/components/sidebar-context";
import { cn } from "@maslazu/lazu-ui";
import { docsNavigation } from "@/components/docs-sidebar";

export interface DocsLayoutOutletContext {
  currentComponentLabel?: string;
  setOutlineItems: React.Dispatch<React.SetStateAction<PageOutlineItem[]>>;
  setRightSidebarContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

export default function DocsLayoutRoute() {
  const [desktopCollapsed, setDesktopCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [outlineItems, setOutlineItems] = React.useState<PageOutlineItem[]>([]);
  const [rightSidebarContent, setRightSidebarContent] = React.useState<React.ReactNode | null>(null);
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentComponentId = pathParts[0] === "docs" && pathParts[1] === "components" ? pathParts[2] : undefined;
  const currentComponentLabel = currentComponentId ? docsNavigation.find((item) => item.id === currentComponentId)?.label : undefined;

  const outlineTitle = pathParts[0] === "docs" && pathParts[1] === "theme-editor" ? "Theme Editor" : currentComponentLabel ?? "Components";

  return (
    <SidebarContext.Provider value={{ desktopCollapsed, setDesktopCollapsed, mobileOpen, setMobileOpen }}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <DocsSidebar />
        {rightSidebarContent ? (
          <aside className="hidden xl:block">
            <div className="fixed bottom-0 right-0 top-16 z-20 w-80 overflow-x-hidden bg-sidebar text-sidebar-foreground">
              <div className="scrollbar-none h-full overflow-y-auto overflow-x-hidden py-4">{rightSidebarContent}</div>
            </div>
          </aside>
        ) : (
          <PageOutline title={outlineTitle} items={outlineItems} />
        )}
        <div
          className={cn(
            "fixed top-0 z-40",
            desktopCollapsed ? "md:left-[64px]" : "md:left-64",
            "right-0",
          )}
        >
          <DocsTopbar />
        </div>
        <div
          className={cn(
            "flex h-screen min-w-0 flex-1 flex-col overflow-hidden",
            desktopCollapsed ? "md:pl-[64px]" : "md:pl-64",
            outlineItems.length > 0 || rightSidebarContent ? "xl:pr-80" : "",
          )}
        >
          <main className="scrollbar-none mt-16 min-h-0 min-w-0 flex-1 overflow-y-auto rounded-tl-[2rem] rounded-tr-[2rem] border border-border/60 bg-surface p-6 text-surface-foreground md:p-8 md:pb-8">
            <Outlet context={{ setOutlineItems, setRightSidebarContent, currentComponentLabel }} />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
