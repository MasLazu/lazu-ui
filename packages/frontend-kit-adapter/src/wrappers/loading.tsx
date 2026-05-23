import type { LoadingProps } from "@maslazu/frontend-kit-ui-contracts";
import { Loading as LazuLoading } from "@maslazu/lazu-ui";

export function Loading({ label }: LoadingProps) {
  return <LazuLoading text={typeof label === "string" ? label : undefined} fullScreen={false} />;
}
