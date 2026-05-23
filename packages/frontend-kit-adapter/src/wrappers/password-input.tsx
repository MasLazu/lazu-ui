import type { PasswordInputProps } from "@maslazu/frontend-kit-ui-contracts";
import { Input as LazuInput } from "@maslazu/lazu-ui";
import { forwardRef, useState } from "react";
import { FieldShell } from "./shared";

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { label, error, hint, required, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);

  return (
    <FieldShell label={label} error={error} hint={hint} required={required}>
      <div className="relative">
        <LazuInput ref={ref} type={visible ? "text" : "password"} className="pr-10" aria-invalid={error ? true : undefined} {...props} />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <span className="text-xs font-medium">{visible ? "Hide" : "Show"}</span>
        </button>
      </div>
    </FieldShell>
  );
});
