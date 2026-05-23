import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "../../lib/utils";

const NavigationMenuPrimitiveImpl = NavigationMenuPrimitive as any;

type NavigationMenuProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
    className?: string;
    align?: "start" | "center" | "end";
  }
>;

type NavigationMenuTriggerProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    active?: boolean;
    className?: string;
  }
>;

type NavigationMenuContentProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> & {
    className?: string;
  }
>;

type NavigationMenuPositionerProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Positioner> & {
  className?: string;
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
};

type NavigationMenuLinkProps = React.PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean;
    closeOnClick?: boolean;
    className?: string;
  }
>;

function NavigationMenu({ align = "start", className, children, ...props }: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitiveImpl.Root data-slot="navigation-menu" className={cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)} {...props}>
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitiveImpl.Root>
  );
}

function NavigationMenuList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <NavigationMenuPrimitiveImpl.List data-slot="navigation-menu-list" className={cn("group inline-flex w-fit list-none items-center justify-center gap-1 rounded-lg bg-background p-[3px] text-muted-foreground", className)} {...props} />;
}

function NavigationMenuItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <NavigationMenuPrimitiveImpl.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />;
}

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex h-8 w-max items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium text-foreground/70 outline-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:text-foreground data-[open]:text-foreground data-[popup-open]:text-foreground dark:text-muted-foreground dark:hover:text-foreground",
);

function NavigationMenuTrigger({ active = false, className, children, ...props }: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuPrimitiveImpl.Trigger data-slot="navigation-menu-trigger" data-active={active ? "true" : "false"} className={cn(navigationMenuTriggerStyle(), "group", className)} {...props}>
      {children}
      <ChevronDownIcon className="relative top-px ml-1 size-3 transition duration-300 group-data-[open]/navigation-menu-trigger:rotate-180 group-data-[popup-open]/navigation-menu-trigger:rotate-180" aria-hidden="true" />
    </NavigationMenuPrimitiveImpl.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  return (
    <NavigationMenuPrimitiveImpl.Content
      data-slot="navigation-menu-content"
      className={cn(
        "h-full w-auto transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%] data-[starting-style]:data-[activation-direction=right]:translate-x-[50%] data-[ending-style]:data-[activation-direction=left]:translate-x-[50%] data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%] group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:p-1 group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/10 group-data-[viewport=false]/navigation-menu:data-[open]:animate-in group-data-[viewport=false]/navigation-menu:data-[closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:duration-300 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuPositioner({ className, side = "bottom", sideOffset = 8, align = "start", alignOffset = 0, ...props }: NavigationMenuPositionerProps) {
  return (
    <NavigationMenuPrimitiveImpl.Portal>
      <NavigationMenuPrimitiveImpl.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} className={cn("isolate z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-[instant]:transition-none data-[side=bottom]:before:left-0 data-[side=bottom]:before:right-0 data-[side=bottom]:before:top-[-10px]", className)} {...props}>
        <NavigationMenuPrimitiveImpl.Popup className="relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-lg bg-popover text-popover-foreground shadow outline-none ring-1 ring-foreground/10 transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150">
          <NavigationMenuPrimitiveImpl.Viewport className="relative size-full overflow-hidden" />
        </NavigationMenuPrimitiveImpl.Popup>
      </NavigationMenuPrimitiveImpl.Positioner>
    </NavigationMenuPrimitiveImpl.Portal>
  );
}

function NavigationMenuLink({ active = false, className, ...props }: NavigationMenuLinkProps) {
  return (
    <NavigationMenuPrimitiveImpl.Link
      data-slot="navigation-menu-link"
      data-active={active ? "true" : "false"}
      className={cn(
        "inline-flex h-8 w-max items-center justify-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-foreground/70 outline-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:border-primary/15 data-[active=true]:bg-primary/10 data-[active=true]:text-primary dark:text-muted-foreground dark:hover:text-foreground dark:data-[active=true]:border-primary/25 dark:data-[active=true]:bg-primary/10 dark:data-[active=true]:text-primary in-data-[slot=navigation-menu-content]:h-auto in-data-[slot=navigation-menu-content]:w-full in-data-[slot=navigation-menu-content]:justify-start in-data-[slot=navigation-menu-content]:rounded-md [&_svg:not([class*=size-])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <NavigationMenuPrimitiveImpl.Icon data-slot="navigation-menu-indicator" className={cn("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in", className)} {...props}>
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitiveImpl.Icon>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
