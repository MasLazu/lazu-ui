import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./button";
import { cn } from "../../lib/utils";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(({ className, currentPage, pageSize, totalItems, onPageChange, ...props }, ref) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div ref={ref} className={cn("flex items-center justify-between gap-4 px-2", className)} {...props}>
      <div className="text-sm font-medium text-muted-foreground">
        Showing {totalItems > 0 ? `${startItem}-${endItem}` : "0"} of {totalItems} items
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} className="px-2">
          <ChevronLeft className="size-4 text-foreground" />
        </Button>

        <span className="px-2 text-sm font-semibold text-foreground">
          {currentPage} / {totalPages}
        </span>

        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="px-2">
          <ChevronRight className="size-4 text-foreground" />
        </Button>
      </div>
    </div>
  );
});

Pagination.displayName = "Pagination";

export { Pagination };
