import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { Github, PanelLeft } from "lucide-react";

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@maslazu/lazu-ui";

import { docsNavigation } from "@/components/docs-sidebar";
import { SidebarContext } from "@/components/sidebar-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@maslazu/lazu-ui";

const componentTitleMap = new Map(docsNavigation.map((item) => [item.id, item.label]));
const docsPageTitleMap = new Map([
  ["installation", "Installation"],
  ["theme-editor", "Theme Editor"],
]);
const docsVersions = ["v0.x", "v1.x"] as const;

interface DocsTopbarProps {
  className?: string;
}

export function DocsTopbar({ className }: DocsTopbarProps) {
  const { desktopCollapsed, mobileOpen, setDesktopCollapsed, setMobileOpen } = useContext(SidebarContext);
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const isComponentRoute = pathParts[0] === "docs" && pathParts[1] === "components";
  const isDocsPageRoute = pathParts[0] === "docs" && pathParts.length === 2;
  const currentComponentId = isComponentRoute ? pathParts[2] : undefined;
  const currentComponentLabel = currentComponentId ? componentTitleMap.get(currentComponentId) : undefined;
  const currentDocsPageLabel = isDocsPageRoute ? docsPageTitleMap.get(pathParts[1]) : undefined;

  return (
    <header className={cn("flex h-16 w-full bg-sidebar text-sidebar-foreground", className)}>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (window.matchMedia("(min-width: 768px)").matches) {
                  setDesktopCollapsed(!desktopCollapsed);
                  return;
                }
                setMobileOpen(!mobileOpen);
              }}
              className="interactive-chrome h-10 w-10 rounded-xl p-0 text-sidebar-foreground/70"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>

            <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link to="/" className="truncate transition-colors hover:text-primary">
                Dev Kit
              </Link>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="px-0.5 text-lg leading-none text-muted-foreground/30">&rsaquo;</span>
                <Link to={currentDocsPageLabel ? "/docs/theme-editor" : "/docs/components"} className="cursor-pointer transition-colors hover:text-primary">
                  {currentDocsPageLabel ? "Theme Editor" : "Components"}
                </Link>
                {currentComponentLabel ? (
                  <>
                    <span className="px-0.5 text-lg leading-none text-muted-foreground/30">&rsaquo;</span>
                    <span className="font-bold text-foreground">{currentComponentLabel}</span>
                  </>
                ) : currentDocsPageLabel ? null : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Select defaultValue="v0.x">
            <SelectTrigger size="sm" className="w-[92px] border-sidebar-border bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent focus-visible:ring-sidebar-ring/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {docsVersions.map((version) => (
                <SelectItem key={version} value={version}>{version}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <a href="https://github.com/MasLazu/lazu-ui" target="_blank" rel="noreferrer" aria-label="Open GitHub repository">
            <Button variant="ghost" size="sm" aria-label="Open GitHub repository">
              <Github className="size-4" />
            </Button>
          </a>
          <ThemeToggle iconOnly />
        </div>
      </div>
    </header>
  );
}
