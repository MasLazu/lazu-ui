import type { TextareaProps } from "../types";
import { Textarea as LazuTextarea } from "@maslazu/lazu-ui";
import { forwardRef } from "react";
import { FieldShell } from "./shared";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, error, hint, required, ...props }, ref) {
  return (
    <FieldShell label={label} error={error} hint={hint} required={required}>
      <LazuTextarea ref={ref} aria-invalid={error ? true : undefined} {...props} />
    </FieldShell>
  );
});
