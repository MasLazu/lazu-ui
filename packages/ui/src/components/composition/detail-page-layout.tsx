import * as React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "../primitives/button";
import { PageLayout, type PageLayoutProps } from "./page-layout";

export interface DetailPageLayoutProps extends PageLayoutProps {
  onBack?: () => void;
  backTo?: string;
  toolbar?: ReactNode;
  secondaryActions?: ReactNode;
  aside?: ReactNode;
}

export function DetailPageLayout({
  pageIcon: Icon,
  title,
  description,
  onBack,
  backTo,
  toolbar,
  actions,
  secondaryActions,
  aside,
  children,
}: DetailPageLayoutProps) {
  const headerContent = (
    <div className="min-w-0 flex-1 overflow-hidden">
      {typeof title === "string" ? (
        <h1 className="w-full truncate text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h1>
      ) : (
        <div className="min-w-0 overflow-hidden">{title}</div>
      )}

      {description ? (
        typeof description === "string" ? (
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{description}</p>
        ) : (
          <div className="mt-0.5 min-w-0 overflow-hidden truncate text-sm text-muted-foreground">{description}</div>
        )
      ) : null}
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full flex-col space-y-6 overflow-x-hidden">
      <div className="overflow-hidden">
        <div className="flex min-w-0 items-center gap-3 overflow-hidden lg:justify-between">
          <div className="flex min-w-0 items-center gap-3 overflow-hidden lg:w-0 lg:max-w-[33%] lg:flex-1">
            <div className="shrink-0">
              {onBack ? (
                <Button variant="outline" size="lg" className="h-9 w-9 p-0" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : backTo ? (
                <Link to={backTo}>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
              ) : null}
            </div>

            <div className="hidden shrink-0 sm:block">
              {Icon ? (
                <div className="shrink-0 rounded-xl border border-border/70 bg-code-highlight p-2.5 text-primary">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
                </div>
              ) : null}
            </div>

            {headerContent}
          </div>

          {toolbar || actions || secondaryActions ? (
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              {toolbar}
              {actions}
              {secondaryActions}
            </div>
          ) : null}
        </div>

        {toolbar || actions || secondaryActions ? (
          <div className="mt-3 grid w-full grid-cols-1 gap-2 lg:hidden [&>a]:w-full [&>button]:w-full [&>a>button]:w-full">
            {toolbar}
            {actions}
            {secondaryActions}
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">{children}</div>
        {aside ? <aside className="min-w-0 space-y-6">{aside}</aside> : null}
      </div>
    </div>
  );
}
