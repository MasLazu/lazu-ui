import type { DialogProps } from "../types";
import {
  Dialog as LazuDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@maslazu/lazu-ui";

export function Dialog({ open, title, description, children, onClose }: DialogProps) {
  return (
    <LazuDialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </LazuDialog>
  );
}
