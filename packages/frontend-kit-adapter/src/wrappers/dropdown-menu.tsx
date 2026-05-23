import type { DropdownMenuProps } from "../types";
import {
  DropdownMenu as LazuDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@maslazu/lazu-ui";

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  return (
    <LazuDropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.key}
            disabled={item.disabled}
            variant={item.destructive ? "destructive" : "default"}
            onClick={() => item.onSelect()}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </LazuDropdownMenu>
  );
}
