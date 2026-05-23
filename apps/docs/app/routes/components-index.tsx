import * as React from "react";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { Link, useOutletContext } from "react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@maslazu/lazu-ui";

import { PageLayout } from "@/components/page-layout";
import { docsNavigation } from "@/components/docs-sidebar";
import { componentDocIds, componentDocs } from "@/lib/component-docs";
import type { DocsLayoutOutletContext } from "./docs-layout";

const componentIconMap = new Map(docsNavigation.map((item) => [item.id, item.icon]));
const componentGroupMap = new Map(docsNavigation.map((item) => [item.id, item.group]));
const componentGroups = ["Forms", "Selection", "Feedback", "Overlay", "Navigation", "Data Display"] as const;
const groupSectionIdMap = new Map(componentGroups.map((group) => [group, `components-group-${group.toLowerCase().replace(/\s+/g, "-")}`]));

export default function ComponentsIndexRoute() {
  const { setOutlineItems } = useOutletContext<DocsLayoutOutletContext>();
  const outlineItems = [
    { id: "components-overview", label: "Overview" },
    { id: "components-catalog", label: "Catalog" },
    ...componentGroups.map((group) => ({ id: groupSectionIdMap.get(group)!, label: group })),
  ];

  React.useEffect(() => {
    setOutlineItems(outlineItems);
    return () => setOutlineItems([]);
  }, [setOutlineItems]);

  return (
    <PageLayout
      title={<div id="components-overview" className="scroll-mt-24">Component catalog</div>}
      description="Browse available `lazu-ui` primitives and richer shared controls. Each card links to usage, preview, and example code."
      icon={LayoutGrid}
    >
      <section id="components-catalog" className="scroll-mt-24 space-y-8">
        {componentGroups.map((group) => {
          const groupIds = componentDocIds().filter((id) => componentGroupMap.get(id) === group);

          if (groupIds.length === 0) return null;

          return (
            <div key={group} id={groupSectionIdMap.get(group)} className="scroll-mt-24 space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">{group}</h2>
                <p className="text-sm text-muted-foreground">Browse {group.toLowerCase()} primitives in Dev Kit.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {groupIds.map((id) => {
                  const doc = componentDocs[id];
                  const Icon = componentIconMap.get(id);

                  return (
                    <Card key={id} className="h-full">
                      <CardHeader className="gap-2 pb-5">
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="flex items-center gap-2">
                            {Icon ? <Icon className="size-4 shrink-0 text-primary" /> : null}
                            <span>{doc.title}</span>
                          </CardTitle>
                          <Link className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline" to={`/docs/components/${id}`}>
                            Open
                            <ArrowRight className="size-4" />
                          </Link>
                        </div>
                        <CardDescription>{doc.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </PageLayout>
  );
}
