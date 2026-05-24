"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "../../lib/utils";

const Select = SelectPrimitive.Root;
const SelectPrimitiveImpl = SelectPrimitive as any;

type SelectGroupProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> & {
    className?: string;
  }
>;

type SelectValueProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> & {
    className?: string;
  }
>;

type SelectTriggerProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    size?: "sm" | "default";
  }
>;

type SelectContentProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Popup> & {
    className?: string;
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end";
    sideOffset?: number;
    align?: "center" | "start" | "end";
    alignOffset?: number;
    alignItemWithTrigger?: boolean;
  }
>;

type SelectLabelProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.GroupLabel> & {
    className?: string;
  }
>;

type SelectItemProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    className?: string;
  }
>;

type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  className?: string;
};

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return <SelectPrimitiveImpl.Group data-slot="select-group" className={cn("scroll-my-1 p-1", className)} {...props} />;
}

function SelectValue({ className, ...props }: SelectValueProps) {
  return <SelectPrimitiveImpl.Value data-slot="select-value" className={cn("flex flex-1 text-left", className)} {...props} />;
}

function SelectTrigger({ className, size = "default", children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitiveImpl.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent py-2 pl-2.5 pr-2 text-sm outline-none transition-colors select-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 gap-1.5 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitiveImpl.Icon render={<ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />} />
    </SelectPrimitiveImpl.Trigger>
  );
}

function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, ...props }: SelectContentProps) {
  return (
    <SelectPrimitiveImpl.Portal>
      <SelectPrimitiveImpl.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} alignItemWithTrigger={alignItemWithTrigger} className="isolate z-50">
        <SelectPrimitiveImpl.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate z-50 max-h-[var(--available-height)] min-w-36 w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 data-[align-trigger=true]:animate-none",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitiveImpl.List>{children}</SelectPrimitiveImpl.List>
          <SelectScrollDownButton />
        </SelectPrimitiveImpl.Popup>
      </SelectPrimitiveImpl.Positioner>
    </SelectPrimitiveImpl.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return <SelectPrimitiveImpl.GroupLabel data-slot="select-label" className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)} {...props} />;
}

function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitiveImpl.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pl-1.5 pr-8 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 not-data-[variant=destructive]:focus:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <SelectPrimitiveImpl.ItemText className="flex shrink-0 flex-1 gap-2 whitespace-nowrap">{children}</SelectPrimitiveImpl.ItemText>
      <SelectPrimitiveImpl.ItemIndicator render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"><CheckIcon className="pointer-events-none" /></span>} />
    </SelectPrimitiveImpl.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return <SelectPrimitiveImpl.Separator data-slot="select-separator" className={cn("-mx-1 my-1 h-px bg-border pointer-events-none", className)} {...props} />;
}

function SelectScrollUpButton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <SelectPrimitiveImpl.ScrollUpArrow data-slot="select-scroll-up-button" className={cn("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className)} {...props}>
      <ChevronUpIcon />
    </SelectPrimitiveImpl.ScrollUpArrow>
  );
}

function SelectScrollDownButton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <SelectPrimitiveImpl.ScrollDownArrow data-slot="select-scroll-down-button" className={cn("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className)} {...props}>
      <ChevronDownIcon />
    </SelectPrimitiveImpl.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
