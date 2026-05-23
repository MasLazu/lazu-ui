import type { AvatarProps } from "../types";
import { Avatar as LazuAvatar } from "@maslazu/lazu-ui";

export function Avatar({ name, src, alt: _alt, fallback: _fallback, ...props }: AvatarProps) {
  return <LazuAvatar name={name ?? "User"} src={src} {...props} />;
}
