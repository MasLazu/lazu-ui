import * as React from "react";

import { cn } from "../../lib/utils";

const ContentFrame = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(function ContentFrame(
  { className, children, ...props },
  ref,
) {
  return (
    <main ref={ref} className={cn("min-h-0 flex-1 overflow-y-auto rounded-tl-[2rem] border border-border/60 bg-surface p-4 md:p-8", className)} {...props}>
      <div className="mx-auto min-h-full max-w-7xl">{children}</div>
    </main>
  );
});

ContentFrame.displayName = "ContentFrame";

export { ContentFrame };
