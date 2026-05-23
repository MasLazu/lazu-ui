import * as React from "react";

export const SidebarContext = React.createContext<{
  desktopCollapsed: boolean;
  setDesktopCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}>({
  desktopCollapsed: false,
  setDesktopCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});
