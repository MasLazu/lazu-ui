import type { ConfirmDialogProps } from "@maslazu/frontend-kit-ui-contracts";
import { ConfirmDialog as LazuConfirmDialog } from "@maslazu/lazu-ui";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  destructive,
  busy,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <LazuConfirmDialog
      open={open}
      onOpenChange={(nextOpen) => !nextOpen && onClose()}
      title={String(title)}
      description={description ? String(description) : ""}
      confirmLabel={typeof confirmLabel === "string" ? confirmLabel : undefined}
      cancelLabel={typeof cancelLabel === "string" ? cancelLabel : undefined}
      loadingLabel={busy ? "Working..." : undefined}
      variant={destructive ? "destructive" : "default"}
      onConfirm={onConfirm}
    />
  );
}
