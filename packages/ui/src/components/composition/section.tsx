import * as React from "react";

import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader } from "../primitives/card";
import { SectionHeader, type SectionHeaderProps } from "./section-header";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, SectionHeaderProps {
  inset?: boolean;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(function Section(
  { className, title, description, actions, children, inset = true, ...props },
  ref,
) {
  return (
    <Card ref={ref} className={cn("border-border/70", className)} {...props}>
      {title || description || actions ? (
        <CardHeader>
          <SectionHeader title={title} description={description} actions={actions} />
        </CardHeader>
      ) : null}
      <CardContent className={cn(inset ? "space-y-4" : "space-y-0", !(title || description || actions) && "pt-6")}>{children}</CardContent>
    </Card>
  );
});

Section.displayName = "Section";

export { Section };
