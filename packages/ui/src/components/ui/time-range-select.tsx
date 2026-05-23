import { useEffect, useMemo, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { CalendarIcon, ChevronDown, Clock, RefreshCw } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";
import { cn } from "../../lib/utils";

interface TimeRangeSelectProps {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
  showRefresh?: boolean;
  size?: "sm" | "md" | "lg";
}

const TIME_RANGE_SIZE_CLASSES = {
  sm: { shell: "h-9 pr-1", trigger: "h-9 px-3 text-sm", refreshButton: "h-8 w-8", divider: "h-5" },
  md: { shell: "h-10 pr-1", trigger: "h-10 px-4 text-sm", refreshButton: "h-9 w-9", divider: "h-6" },
  lg: { shell: "h-11 pr-1", trigger: "h-11 px-5 text-sm", refreshButton: "h-10 w-10", divider: "h-7" },
} as const;

const QUICK_RANGES = [
  { label: "Last 1 hour", minutes: 60 },
  { label: "Last 6 hours", minutes: 360 },
  { label: "Last 12 hours", minutes: 720 },
  { label: "Last 24 hours", minutes: 1440 },
  { label: "Last 7 days", minutes: 10080 },
  { label: "Last 30 days", minutes: 43200 },
];

function toDateTimeLocalValue(value: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function fromDateTimeLocalValue(value: string) {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
}

function formatLabel(from: string, to: string) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return "Select time range";
  }

  return `${fromDate.toLocaleString()} to ${toDate.toLocaleString()}`;
}

export function TimeRangeSelect({ from, to, onChange, showRefresh = true, size = "md" }: TimeRangeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState(toDateTimeLocalValue(from));
  const [customTo, setCustomTo] = useState(toDateTimeLocalValue(to));
  const sizeClasses = TIME_RANGE_SIZE_CLASSES[size];

  useEffect(() => {
    setCustomFrom(toDateTimeLocalValue(from));
    setCustomTo(toDateTimeLocalValue(to));
  }, [from, to]);

  const triggerLabel = useMemo(() => formatLabel(from, to), [from, to]);

  function handleApplyCustom() {
    const nextFrom = fromDateTimeLocalValue(customFrom);
    const nextTo = fromDateTimeLocalValue(customTo);
    if (!nextFrom || !nextTo) return;
    onChange(nextFrom, nextTo);
    setIsOpen(false);
  }

  function handleQuickSelect(minutes: number) {
    const end = new Date();
    const start = new Date(end.getTime() - minutes * 60 * 1000);
    onChange(start.toISOString(), end.toISOString());
    setIsOpen(false);
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn("flex w-full max-w-full items-center gap-1.5 rounded-md border border-input bg-background pl-0 sm:inline-flex sm:w-auto", sizeClasses.shell)}>
        <Popover.Trigger className={cn("inline-flex min-w-0 flex-1 items-center gap-2 rounded-md font-medium outline-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", sizeClasses.trigger, showRefresh ? "rounded-l-md" : "rounded-md")}>
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="max-w-[140px] truncate text-left sm:max-w-[220px] lg:max-w-[280px]">{triggerLabel}</span>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
        </Popover.Trigger>
        {showRefresh ? (
          <>
            <div className={cn("mx-1 w-px bg-border", sizeClasses.divider)} />
            <Button variant="ghost" size="sm" className={cn("!p-0 text-muted-foreground hover:bg-transparent hover:text-foreground", sizeClasses.refreshButton)} onClick={() => onChange(from, to)}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </>
        ) : null}
      </div>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={4} className="z-50">
          <Popover.Popup className="flex max-w-[calc(100vw-1rem)] flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none sm:max-w-[min(42rem,calc(100vw-2rem))] sm:flex-row">
            <div className="flex min-w-0 flex-1 flex-col p-3 sm:min-w-[320px] sm:border-r sm:border-border">
              <h3 className="mb-3 font-semibold">Absolute time range</h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">From</label>
                  <div className="relative">
                    <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="datetime-local" value={customFrom} onChange={(event) => setCustomFrom(event.target.value)} className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">To</label>
                  <div className="relative">
                    <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="datetime-local" value={customTo} onChange={(event) => setCustomTo(event.target.value)} className="pl-9" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full" onClick={handleApplyCustom} disabled={!customFrom || !customTo}>Apply time range</Button>
              </div>
            </div>
            <div className="border-t border-border bg-muted/30 p-2 sm:w-48 sm:shrink-0 sm:border-t-0">
              <h3 className="mb-2 px-2 py-2 font-semibold">Quick ranges</h3>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-1 sm:space-y-1">
                {QUICK_RANGES.map((range) => (
                  <button key={range.label} type="button" onClick={() => handleQuickSelect(range.minutes)} className="flex w-full rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
