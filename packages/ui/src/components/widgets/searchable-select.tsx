"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Check, ChevronDown, Search } from "lucide-react";

import { Input } from "../primitives/input";
import { cn } from "../../lib/utils";

const PopoverImpl = Popover as any;

export interface SearchableSelectOption {
  value: string;
  label: string;
  description?: string | null;
}

interface SearchableSelectProps {
  value?: string | null;
  onValueChange: (value: string) => void;
  options: SearchableSelectOption[];
  onSearchChange?: (search: string) => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  allowCustomValue?: boolean;
  customValueLabel?: string;
  customValueDescription?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  onSearchChange,
  onOpenChange,
  placeholder = "Search",
  searchPlaceholder = "Search",
  emptyText = "No results",
  allowCustomValue = false,
  customValueLabel = "Confirm",
  customValueDescription = "Custom value",
  disabled = false,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const selected = useMemo(() => options.find((option) => option.value === value) ?? null, [options, value]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = !query
      ? options
      : options.filter((option) => [option.label, option.value, option.description ?? ""].join(" ").toLowerCase().includes(query));

    if (!allowCustomValue || !query) {
      return base;
    }

    const trimmed = search.trim();
    const hasExactMatch = options.some((option) => option.value.toLowerCase() === query);
    if (hasExactMatch) {
      return base;
    }

    return [
      {
        value: trimmed,
        label: `${customValueLabel} "${trimmed}"`,
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
           "data-[popup-open]:border-ring data-[popup-open]:ring-ring/40 inline-flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-left text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          {selected ? (
            <span className="flex min-w-0 flex-col">
              <span className="truncate">{selected.label}</span>
              {selected.description ? <span className="truncate text-xs text-muted-foreground">{selected.description}</span> : null}
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </PopoverImpl.Trigger>

      <PopoverImpl.Portal>
        <PopoverImpl.Positioner side="bottom" align="start" sideOffset={6} className="z-50">
          <PopoverImpl.Popup className="w-[var(--anchor-width)] min-w-[260px] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none">
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

            <div className="max-h-72 overflow-y-auto p-1">
              {filtered.length === 0 ? (
                <div className="px-3 py-6 text-sm text-muted-foreground">{emptyText}</div>
              ) : (
                filtered.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={cn(
                        "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                      )}
                      onClick={() => {
                        onValueChange(option.value);
                        setOpen(false);
                        setSearch("");
                      }}
                    >
                      <span className="mt-0.5 flex h-4 w-4 items-center justify-center">{isSelected ? <Check className="h-4 w-4" /> : null}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{option.label}</span>
                        {option.description ? <span className="block truncate text-muted-foreground">{option.description}</span> : null}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </PopoverImpl.Popup>
        </PopoverImpl.Positioner>
      </PopoverImpl.Portal>
    </PopoverImpl.Root>
  );
}
