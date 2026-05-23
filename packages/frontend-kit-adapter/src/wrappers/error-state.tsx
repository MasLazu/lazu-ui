import type { ErrorStateProps } from "../types";
import { Alert, AlertDescription, AlertTitle } from "@maslazu/lazu-ui";

export function ErrorState({ title = "Something went wrong", description, retryAction }: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <span aria-hidden="true">[x]</span>
      <AlertTitle>{title}</AlertTitle>
      {description ? <AlertDescription>{description}</AlertDescription> : null}
      {retryAction ? <div className="col-start-2 mt-3">{retryAction}</div> : null}
    </Alert>
  );
}
