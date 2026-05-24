import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { cn } from "../../lib/utils";

const BaseTooltipImpl = BaseTooltip as any;

const TooltipProvider = BaseTooltipImpl.Provider;
const Tooltip = BaseTooltipImpl.Root;

type TooltipTriggerProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger> & {
    className?: string;
  }
>;

type TooltipContentProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> & {
    className?: string;
    sideOffset?: number;
  }
>;

function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return (
    <BaseTooltipImpl.Trigger
      className={cn(
        "inline-flex items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}

function TooltipContent({ className, sideOffset = 8, children, ...props }: TooltipContentProps) {
  return (
    <BaseTooltipImpl.Portal>
      <BaseTooltipImpl.Positioner sideOffset={sideOffset} className="z-[80]">
        <BaseTooltipImpl.Popup
          className={cn(
            "max-w-xs rounded-md bg-foreground px-3 py-2 text-xs leading-relaxed text-background shadow-md transition-[opacity,transform] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:scale-95",
            className,
          )}
          {...props}
        >
          {children}
        </BaseTooltipImpl.Popup>
      </BaseTooltipImpl.Positioner>
    </BaseTooltipImpl.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
