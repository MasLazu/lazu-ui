import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";

import { cn } from "../../lib/utils";

const BaseButtonImpl = BaseButton as any;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "solid" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant = "solid", size = "md", ...props }, ref) => {
    return (
      <BaseButtonImpl
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "solid",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "bg-destructive px-6 text-destructive-foreground shadow-sm hover:bg-destructive/90": variant === "destructive",
            "h-9 px-3": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-11 px-8": size === "lg"
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
