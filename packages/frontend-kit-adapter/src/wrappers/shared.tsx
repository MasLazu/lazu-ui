import { cn } from "@maslazu/lazu-ui";
import type { ReactNode } from "react";

export { cn };

export function FieldShell({
  label,
  required,
  hint,
  error,
  children,
}: {
  label?: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label ? <label className="text-sm font-medium leading-none text-foreground">{label}{required ? <span className="ml-1 text-destructive">*</span> : null}</label> : null}
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
