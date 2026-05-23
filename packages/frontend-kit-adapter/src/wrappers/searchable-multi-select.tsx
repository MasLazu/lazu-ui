import type { SearchableMultiSelectProps } from "@maslazu/frontend-kit-ui-contracts";
import { SearchableMultiSelect as LazuSearchableMultiSelect } from "@maslazu/lazu-ui";
import { FieldShell } from "./shared";

export function SearchableMultiSelect({ label, placeholder, emptyLabel, options, values, onValuesChange }: SearchableMultiSelectProps) {
  return (
    <FieldShell label={label} hint={emptyLabel}>
      <LazuSearchableMultiSelect
        values={values}
        onValuesChange={onValuesChange}
        placeholder={placeholder}
        options={options.map((option) => ({
          value: option.value,
          label: typeof option.label === "string" ? option.label : option.value,
        }))}
      />
    </FieldShell>
  );
}
