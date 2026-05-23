import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui/react";

import { cn } from "../../lib/utils";

const BaseAvatarImpl = BaseAvatar as any;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  seed?: string;
  size?: "sm" | "md" | "lg";
  src?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, name, seed, size = "md", src, ...props }, ref) => {
  const getInitials = (value: string) => {
    const parts = value.split(" ").filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const strToHash = (value: string) => {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      hash = value.charCodeAt(index) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const colorIndex = strToHash(seed || name) % 5;
  const colorClasses = [
    "bg-chart-1/20 text-chart-1",
    "bg-chart-2/20 text-chart-2",
    "bg-chart-3/20 text-chart-3",
    "bg-chart-4/20 text-chart-4",
    "bg-chart-5/20 text-chart-5"
  ];

  const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-12 text-base"
  };

  return (
    <BaseAvatarImpl.Root ref={ref} className={cn("relative flex shrink-0 overflow-hidden rounded-full font-bold", sizeClasses[size], className)} {...props}>
      <BaseAvatarImpl.Image src={src} alt={name} className="aspect-square h-full w-full object-cover" />
      <BaseAvatarImpl.Fallback className={cn("flex h-full w-full items-center justify-center rounded-full", colorClasses[colorIndex])}>
        {getInitials(name)}
      </BaseAvatarImpl.Fallback>
    </BaseAvatarImpl.Root>
  );
});

Avatar.displayName = "Avatar";

export { Avatar };
