import type { SelectProps } from "@maslazu/frontend-kit-ui-contracts";
import { FieldShell } from "./shared";

export function Select({ label, error, hint, required, options, children, ...props }: SelectProps) {
  return (
    <FieldShell label={label} error={error} hint={hint} required={required}>
      <select
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {typeof option.label === "string" ? option.label : option.value}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
