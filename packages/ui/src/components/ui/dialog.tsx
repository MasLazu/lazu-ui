import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";

const BaseDialogImpl = BaseDialog as any;

const Dialog = BaseDialog.Root;
const DialogTrigger = BaseDialog.Trigger;
const DialogPortal = BaseDialogImpl.Portal;
const DialogClose = BaseDialogImpl.Close;

type DialogBackdropProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop> & {
  className?: string;
};

type DialogContentProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> & {
    className?: string;
  }
>;

type DialogTitleProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title> & {
    className?: string;
  }
>;

type DialogDescriptionProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description> & {
    className?: string;
  }
>;

const DialogBackdrop = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Backdrop>,
  DialogBackdropProps
>(({ className, ...props }, ref) => (
  <BaseDialogImpl.Backdrop
    ref={ref}
    className={cn(
      "bg-overlay fixed inset-0 z-50 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 transition-opacity duration-200",
      className,
    )}
    {...props}
  />
));

DialogBackdrop.displayName = "DialogBackdrop";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Popup>,
  DialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogBackdrop />
    <BaseDialogImpl.Popup
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto rounded-lg border bg-background p-6 shadow-lg duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:scale-95 sm:w-full",
        className,
      )}
      {...props}
    >
      {children}
      <DialogClose className="absolute right-4 top-4 cursor-pointer rounded-sm p-1 opacity-70 ring-offset-background transition-opacity hover:bg-accent hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </BaseDialogImpl.Popup>
  </DialogPortal>
));

DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)} {...props} />
);

DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
);

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<React.ElementRef<typeof BaseDialog.Title>, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseDialogImpl.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <BaseDialogImpl.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));

DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
