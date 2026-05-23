import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@maslazu/lazu-ui";

import { ThemeToggle } from "@/components/theme-toggle";

const proofPoints = ["22 shared components", "Light + dark themes", "Semantic tokens", "React Router docs"] as const;

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto bg-background px-4 py-6 text-foreground md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <Card className="border-border/60 bg-surface">
          <CardHeader className="gap-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Lazu UI</p>
              <ThemeToggle />
            </div>
            <div className="space-y-3">
              <CardTitle className="text-4xl tracking-tight md:text-5xl">Shared React UI for Beacon products.</CardTitle>
              <CardDescription className="max-w-2xl text-base md:text-lg">
                Reusable primitives, richer shared controls, semantic theme tokens, and route-driven docs in one workspace. Package lives in `packages/ui`. Docs app lives in `apps/docs`.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/docs/components">
                <Button className="gap-2">
                  Browse components
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/docs/theme-editor">
                <Button variant="outline" className="gap-2">
                  Open theme editor
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            {proofPoints.map((item) => (
              <div key={item} className="rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
