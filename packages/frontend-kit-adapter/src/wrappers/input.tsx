import type { InputProps } from "@maslazu/frontend-kit-ui-contracts";
import { Input as LazuInput } from "@maslazu/lazu-ui";
import { forwardRef } from "react";
import { FieldShell } from "./shared";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, error, hint, required, ...props }, ref) {
  return (
    <FieldShell label={label} error={error} hint={hint} required={required}>
      <LazuInput ref={ref} aria-invalid={error ? true : undefined} {...props} />
    </FieldShell>
  );
});
