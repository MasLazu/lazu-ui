import { Toaster } from "@maslazu/lazu-ui";
import type { ComponentProps } from "react";
import { toast } from "sonner";

export const adapterToast = {
  success(message: React.ReactNode) {
    toast.success(message);
  },
  error(message: React.ReactNode) {
    toast.error(message);
  },
  info(message: React.ReactNode) {
    toast(message);
  },
};

export function LazuFrontendKitToaster(props: ComponentProps<typeof Toaster>) {
  return <Toaster {...props} />;
}
