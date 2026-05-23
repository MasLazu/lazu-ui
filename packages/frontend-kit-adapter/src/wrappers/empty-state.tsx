import type { EmptyStateProps } from "@maslazu/frontend-kit-ui-contracts";

export function EmptyState({ title, description, action, tone = "neutral" }: EmptyStateProps) {
  const icon = tone === "warning" ? "[!]" : tone === "destructive" ? "[x]" : "[ ]";

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center">
      <span aria-hidden="true" className="text-2xl text-muted-foreground">{icon}</span>
      <div className="mt-4 text-lg font-medium text-foreground">{title}</div>
      {description ? <div className="mt-2 max-w-md text-sm text-muted-foreground">{description}</div> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
