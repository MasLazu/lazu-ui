import * as React from "react";
import { ArrowLeft, ArrowRight, Box } from "lucide-react";
import { Link, Navigate, useOutletContext, useParams } from "react-router";

import { Button, Card, CardContent } from "@maslazu/lazu-ui";

import { ApiReferenceSection, CompositionSection, ExamplesSection, PreviewSection, UsageSection } from "@/components/component-doc-sections";
import { docsNavigation } from "@/components/docs-sidebar";
import { PageLayout } from "@/components/page-layout";
import { componentDocs } from "@/lib/component-docs";
import type { DocsLayoutOutletContext } from "./docs-layout";

export default function ComponentDocRoute() {
  const { componentId } = useParams();
  const { setOutlineItems } = useOutletContext<DocsLayoutOutletContext>();

  if (!componentId || !(componentId in componentDocs)) {
    return <Navigate to="/docs/components/button" replace />;
  }

  const doc = componentDocs[componentId as keyof typeof componentDocs];
  const currentIndex = docsNavigation.findIndex((item) => item.id === componentId);
  const previousComponent = currentIndex > 0 ? docsNavigation[currentIndex - 1] : undefined;
  const nextComponent = currentIndex < docsNavigation.length - 1 ? docsNavigation[currentIndex + 1] : undefined;
  const outlineItems = [
    { id: "component-overview", label: "Overview" },
    { id: "component-preview", label: "Preview" },
    { id: "component-usage", label: "Usage" },
    { id: "component-composition", label: "Composition" },
    { id: "component-examples", label: "Examples" },
    { id: "component-api-reference", label: "API Reference" },
  ];

  React.useEffect(() => {
    setOutlineItems(outlineItems);
    return () => setOutlineItems([]);
  }, [setOutlineItems]);

  return (
    <PageLayout
      title={<div id="component-overview" className="scroll-mt-24">{doc.title}</div>}
      description={doc.description}
      icon={Box}
      actions={
        <>
          {previousComponent ? (
            <Link to={`/docs/components/${previousComponent.id}`}>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0" aria-label={`Previous component: ${previousComponent.label}`}>
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
          ) : null}
          {nextComponent ? (
            <Link to={`/docs/components/${nextComponent.id}`}>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0" aria-label={`Next component: ${nextComponent.label}`}>
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          ) : null}
        </>
      }
    >
      <section id="component-preview" className="scroll-mt-24">
        <PreviewSection title={`${doc.title} preview`} description={doc.description} code={doc.code}>
          {doc.preview}
        </PreviewSection>
      </section>

      <UsageSection usage={doc.usage} />

      <CompositionSection composition={doc.composition} />

      <ExamplesSection examples={doc.examples} />

      <ApiReferenceSection api={doc.api} />

      <div className="flex items-center justify-between gap-4">
        {previousComponent ? (
          <Link to={`/docs/components/${previousComponent.id}`} className="min-w-0">
            <Card className="min-w-[180px] border-border/60 transition-colors hover:bg-accent">
              <CardContent className="flex items-center gap-3 p-4">
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="truncate text-sm font-medium text-foreground">{previousComponent.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ) : <div />}
        {nextComponent ? (
          <Link to={`/docs/components/${nextComponent.id}`} className="min-w-0">
            <Card className="min-w-[180px] border-border/60 transition-colors hover:bg-accent">
              <CardContent className="flex items-center justify-end gap-3 p-4 text-right">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="truncate text-sm font-medium text-foreground">{nextComponent.label}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ) : <div />}
      </div>
    </PageLayout>
  );
}
