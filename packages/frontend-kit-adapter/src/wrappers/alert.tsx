import type { AlertProps } from "../types";
import { Alert as LazuAlert, AlertDescription, AlertTitle } from "@maslazu/lazu-ui";

export function Alert({ title, description, variant = "info", children, ...props }: AlertProps) {
  const icon = variant === "success" ? "[+]" : variant === "warning" ? "[!]" : variant === "destructive" ? "[x]" : "[i]";

  return (
    <LazuAlert variant={variant === "destructive" ? "destructive" : "default"} {...props}>
      <span aria-hidden="true">{icon}</span>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {description ? <AlertDescription>{description}</AlertDescription> : null}
      {children}
    </LazuAlert>
  );
}
