"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Check, ChevronDown, Search, X } from "lucide-react";

import { Button } from "../primitives/button";
import { Input } from "../primitives/input";
import { cn } from "../../lib/utils";
import type { SearchableSelectOption } from "./searchable-select";

const PopoverImpl = Popover as any;

interface SearchableMultiSelectProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
  options: SearchableSelectOption[];
  onSearchChange?: (search: string) => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  allowCustomValue?: boolean;
  customValueLabel?: string;
  customValueDescription?: string;
  doneLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableMultiSelect({
  values,
  onValuesChange,
  options,
  onSearchChange,
  onOpenChange,
  placeholder = "Select options",
  searchPlaceholder = "Search",
  emptyText = "No results",
  allowCustomValue = false,
  customValueLabel = "Create",
  customValueDescription = "Custom value",
  doneLabel = "Done",
  disabled = false,
  className,
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const selectedMap = useMemo(() => new Map(options.map((option) => [option.value, option])), [options]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = !query
      ? options
      : options.filter((option) => [option.label, option.value, option.description ?? ""].join(" ").toLowerCase().includes(query));

    if (!allowCustomValue || !query) {
      return base;
    }

    const custom = search.trim();
    const hasExact = options.some((option) => option.value.toLowerCase() === custom.toLowerCase());
    if (hasExact) {
      return base;
    }

    return [
      {
        value: custom,
        label: `${customValueLabel} "${custom}"`,
        description: customValueDescription,
      },
      ...base,
    ];
  }, [allowCustomValue, customValueDescription, customValueLabel, options, search]);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onValuesChange(values.filter((item) => item !== value));
      return;
    }
    onValuesChange([...values, value]);
  };

  return (
    <PopoverImpl.Root
      open={open}
      onOpenChange={(nextOpen: boolean) => {
        setOpen(nextOpen);
        if (!nextOpen) setSearch("");
        onOpenChange?.(nextOpen);
      }}
    >
      <PopoverImpl.Trigger
        disabled={disabled}
          className={cn(
           "data-[popup-open]:border-ring data-[popup-open]:ring-ring/40 flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-background px-2 py-1.5 text-left text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {values.length === 0 ? (
          <span className="px-1 text-muted-foreground">{placeholder}</span>
        ) : (
          values.map((value) => {
            const option = selectedMap.get(value);
            return (
              <span key={value} className="inline-flex max-w-full items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">
                <span className="truncate">{option?.label ?? value}</span>
                <button
                  type="button"
                  className="shrink-0"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleValue(value);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })
        )}
        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
      </PopoverImpl.Trigger>

      <PopoverImpl.Portal>
        <PopoverImpl.Positioner side="bottom" align="start" sideOffset={6} className="z-50">
          <PopoverImpl.Popup className="w-[var(--anchor-width)] min-w-[280px] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none">
            <div className="border-b border-border p-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  value={search}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const next = event.target.value;
                    setSearch(next);
                    onSearchChange?.(next);
                  }}
                  placeholder={searchPlaceholder}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="max-h-72 space-y-1 overflow-y-auto p-1">
              {filtered.length === 0 ? (
                <div className="px-3 py-6 text-sm text-muted-foreground">{emptyText}</div>
              ) : (
                filtered.map((option) => {
                  const isSelected = values.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={cn(
                        "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                      )}
                      onClick={() => toggleValue(option.value)}
                    >
                      <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-sm border border-border">{isSelected ? <Check className="h-3 w-3" /> : null}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{option.value}</span>
                        <span className="block truncate text-muted-foreground">{option.label}</span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="border-t border-border p-2">
              <Button type="button" variant="outline" className="w-full" onClick={() => setOpen(false)}>
                {doneLabel}
              </Button>
            </div>
          </PopoverImpl.Popup>
        </PopoverImpl.Positioner>
      </PopoverImpl.Portal>
    </PopoverImpl.Root>
  );
}
