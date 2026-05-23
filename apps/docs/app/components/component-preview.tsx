import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@maslazu/lazu-ui";

import { CodeBlock } from "@/components/code-block";

interface ComponentPreviewProps {
  title: string;
  description: string;
  code: string;
  children: ReactNode;
}

export function ComponentPreview({ title, description, code, children }: ComponentPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="rounded-xl border border-dashed border-border/70 bg-surface p-6">{children}</div>
        <CodeBlock code={code} lang="tsx" />
      </CardContent>
    </Card>
  );
}
