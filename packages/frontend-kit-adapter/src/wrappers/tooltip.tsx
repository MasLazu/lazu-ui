import type { TooltipProps } from "../types";
import { Tooltip as LazuTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@maslazu/lazu-ui";

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <TooltipProvider>
      <LazuTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </LazuTooltip>
    </TooltipProvider>
  );
}
