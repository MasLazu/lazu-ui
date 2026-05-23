import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { cn } from "../../lib/utils";

const BaseSwitchImpl = BaseSwitch as any;

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
  className?: string;
  thumbClassName?: string;
  children?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLElement, SwitchProps>(({ className, thumbClassName, ...props }, ref) => {
  return (
    <BaseSwitchImpl.Root
      ref={ref}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-input bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary data-[checked]:bg-primary",
        className,
      )}
      {...props}
    >
      <BaseSwitchImpl.Thumb
        className={cn(
          "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-background shadow-sm transition-transform duration-200 data-[checked]:translate-x-5",
          thumbClassName,
        )}
      />
    </BaseSwitchImpl.Root>
  );
});

Switch.displayName = "Switch";
