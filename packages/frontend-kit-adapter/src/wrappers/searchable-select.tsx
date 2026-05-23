import type { SearchableSelectProps } from "@maslazu/frontend-kit-ui-contracts";
import { SearchableSelect as LazuSearchableSelect } from "@maslazu/lazu-ui";
import { FieldShell } from "./shared";

export function SearchableSelect({ label, placeholder, emptyLabel, options, value, onValueChange }: SearchableSelectProps) {
  return (
    <FieldShell label={label}>
      <LazuSearchableSelect
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        emptyText={typeof emptyLabel === "string" ? emptyLabel : undefined}
        options={options.map((option) => ({
          value: option.value,
          label: typeof option.label === "string" ? option.label : option.value,
        }))}
      />
    </FieldShell>
  );
}
