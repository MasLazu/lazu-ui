import { useEffect, useState } from "react";

import { cn } from "@maslazu/lazu-ui";

export interface PageOutlineItem {
  id: string;
  label: string;
}

interface PageOutlineProps {
  title?: string;
  items: PageOutlineItem[];
}

export function PageOutline({ title = "On this page", items }: PageOutlineProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observers = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (observers.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]?.target instanceof HTMLElement) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.4, 0.7],
      },
    );

    observers.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <div className="fixed bottom-0 right-0 top-16 z-20 w-80 overflow-x-hidden bg-sidebar text-sidebar-foreground">
        <div className="flex h-full flex-col">
          <div className="scrollbar-none flex-1 overflow-y-auto overflow-x-hidden py-4">
            <nav className="space-y-6 px-4">
              <div className="space-y-1 overflow-hidden">
                <h4 className="whitespace-nowrap px-2 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">
                  {title}
                </h4>
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                    activeId === item.id
                      ? "interactive-selected"
                      : "interactive-chrome text-sidebar-foreground/70",
                  )}
                >
                  <span className="truncate">{item.label}</span>
                </a>
              ))}
            </div>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
