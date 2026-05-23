import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../../lib/utils";

const TabsPrimitiveImpl = TabsPrimitive as any;

type TabsProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    className?: string;
  }
>;

type TabsListProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants> & {
      className?: string;
    }
>;

type TabsTriggerProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Tab> & {
    className?: string;
  }
>;

type TabsContentProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Panel> & {
    className?: string;
  }
>;

function Tabs({ className, orientation = "horizontal", ...props }: TabsProps) {
  return (
    <TabsPrimitiveImpl.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-11 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-background",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  return (
    <TabsPrimitiveImpl.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitiveImpl.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-8 flex-1 items-center justify-center whitespace-nowrap rounded-md border border-transparent px-3 text-sm font-medium text-foreground/60 shadow-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start dark:text-muted-foreground dark:hover:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[active]:bg-transparent",
        "data-[active]:border-primary/10 data-[active]:bg-primary/10 data-[active]:text-primary data-[active]:shadow-none dark:data-[active]:border-primary/20 dark:data-[active]:bg-primary/10 dark:data-[active]:text-primary",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsContentProps) {
  return <TabsPrimitiveImpl.Panel data-slot="tabs-content" className={cn("flex-1 text-sm outline-none", className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
