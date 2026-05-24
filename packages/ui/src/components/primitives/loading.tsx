import * as React from "react";

import { cn } from "../../lib/utils";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ text = "Loading...", fullScreen = true, className, ...props }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-muted-foreground",
        fullScreen ? "min-h-[60vh] w-full flex-1" : "w-full py-8",
        className,
      )}
      {...props}
    >
      <div className="h-8 w-8 flex-shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      {text ? <span className="text-sm font-medium">{text}</span> : null}
    </div>
  );
}
