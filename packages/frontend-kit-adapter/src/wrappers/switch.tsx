import type { SwitchProps } from "@maslazu/frontend-kit-ui-contracts";
import { Switch as LazuSwitch } from "@maslazu/lazu-ui";

export function Switch({ checked, onCheckedChange, disabled, label }: SwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <LazuSwitch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
      {label ? <span className="text-sm font-medium text-foreground">{label}</span> : null}
    </div>
  );
}
