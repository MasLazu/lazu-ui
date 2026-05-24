import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "../../lib/utils";

const MenuPrimitiveImpl = MenuPrimitive as any;

type DropdownMenuProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<typeof MenuPrimitive.Root>>;
type DropdownMenuPortalProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>>;
type DropdownMenuTriggerProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>>;
type DropdownMenuContentProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup> & {
    className?: string;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end";
    sideOffset?: number;
  }
>;
type DropdownMenuLabelProps = { className?: string; inset?: boolean; children?: React.ReactNode };
type DropdownMenuItemProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> & {
    className?: string;
    inset?: boolean;
    variant?: "default" | "destructive";
  }
>;
type DropdownMenuSubTriggerProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubmenuTrigger> & {
    className?: string;
    inset?: boolean;
  }
>;
type DropdownMenuCheckboxItemProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem> & {
    className?: string;
    inset?: boolean;
  }
>;
type DropdownMenuRadioItemProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem> & {
    className?: string;
    inset?: boolean;
  }
>;
type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator> & { className?: string };

function DropdownMenu(props: DropdownMenuProps) {
  return <MenuPrimitiveImpl.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return <MenuPrimitiveImpl.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <MenuPrimitiveImpl.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPortal>
      <MenuPrimitiveImpl.Positioner className="isolate z-50 outline-none" align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset}>
        <MenuPrimitiveImpl.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) min-w-32 w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 data-closed:overflow-hidden",
            className,
          )}
          {...props}
        />
      </MenuPrimitiveImpl.Positioner>
    </DropdownMenuPortal>
  );
}

function DropdownMenuGroup(props: React.PropsWithChildren<Record<string, unknown>>) {
  return <MenuPrimitiveImpl.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({ className, inset, children }: DropdownMenuLabelProps) {
  return (
    <div data-slot="dropdown-menu-label" data-inset={inset} className={cn("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className)}>
      {children}
    </div>
  );
}

function DropdownMenuItem({ className, inset, variant = "default", ...props }: DropdownMenuItemProps) {
  return (
    <MenuPrimitiveImpl.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none ring-0 data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 not-data-[variant=destructive]:focus:**:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub(props: React.PropsWithChildren<Record<string, unknown>>) {
  return <MenuPrimitiveImpl.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <MenuPrimitiveImpl.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none ring-0 data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 not-data-[variant=destructive]:focus:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitiveImpl.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({ align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...props }: React.ComponentProps<typeof DropdownMenuContent>) {
  return <DropdownMenuContent data-slot="dropdown-menu-sub-content" align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className={cn("min-w-[96px] w-auto shadow-lg", className)} {...props} />;
}

function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitiveImpl.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      checked={checked}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pl-1.5 pr-8 text-sm outline-none ring-0 data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center" data-slot="dropdown-menu-checkbox-item-indicator">
        <MenuPrimitiveImpl.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitiveImpl.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitiveImpl.CheckboxItem>
  );
}

function DropdownMenuRadioGroup(props: React.PropsWithChildren<Record<string, unknown>>) {
  return <MenuPrimitiveImpl.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({ className, children, inset, ...props }: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitiveImpl.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pl-1.5 pr-8 text-sm outline-none ring-0 data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center" data-slot="dropdown-menu-radio-item-indicator">
        <MenuPrimitiveImpl.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitiveImpl.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitiveImpl.RadioItem>
  );
}

function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return <MenuPrimitiveImpl.Separator data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground", className)} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
