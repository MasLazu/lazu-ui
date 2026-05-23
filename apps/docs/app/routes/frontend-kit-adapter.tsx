import * as React from "react";
import { Blocks, ExternalLink } from "lucide-react";
import { Link, useOutletContext } from "react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@maslazu/lazu-ui";

import { CodeBlock } from "@/components/code-block";
import { PageLayout } from "@/components/page-layout";
import type { DocsLayoutOutletContext } from "./docs-layout";

const outlineItems = [
  { id: "adapter-overview", label: "Overview" },
  { id: "adapter-install", label: "Install" },
  { id: "adapter-setup", label: "App shell setup" },
  { id: "adapter-feature-usage", label: "Feature usage" },
  { id: "adapter-boundary", label: "Boundary" },
  { id: "adapter-coverage", label: "Coverage" },
];

const installCode = `pnpm add @maslazu/lazu-ui @maslazu/lazu-ui-frontend-kit-adapter @maslazu/frontend-kit-ui-contracts`;

const shellCode = `import "@maslazu/lazu-ui/styles.css";

import { UiKitProvider } from "@maslazu/frontend-kit-ui-contracts";
import {
  LazuFrontendKitToaster,
  lazuFrontendKitAdapter,
} from "@maslazu/lazu-ui-frontend-kit-adapter";

export function AppShell() {
  return (
    <UiKitProvider kit={lazuFrontendKitAdapter}>
      <AppRoutes />
      <LazuFrontendKitToaster />
    </UiKitProvider>
  );
}`;

const featureCode = `import { useToast, useUiComponents } from "@maslazu/frontend-kit-ui-contracts";

export function UsersPage() {
  const { Button, PageLayout, EmptyState } = useUiComponents();
  const toast = useToast();

  return (
    <PageLayout
      title="Users"
      description="Manage identities and access."
      actions={<Button onClick={() => toast.success("User created")}>Create user</Button>}
    >
      <EmptyState
        title="No users yet"
        description="Create the first user to begin assigning roles."
      />
    </PageLayout>
  );
}`;

const dependencyGraph = `feature modules -> @maslazu/frontend-kit-ui-contracts
app shell -> @maslazu/lazu-ui-frontend-kit-adapter
adapter -> @maslazu/lazu-ui`;

export default function FrontendKitAdapterRoute() {
  const { setOutlineItems } = useOutletContext<DocsLayoutOutletContext>();

  React.useEffect(() => {
    setOutlineItems(outlineItems);
    return () => setOutlineItems([]);
  }, [setOutlineItems]);

  return (
    <PageLayout
      title={<div id="adapter-overview" className="scroll-mt-24">Frontend Kit Adapter</div>}
      description="Use Lazu UI as the concrete implementation for `lazu-frontend-kit` UI contracts."
      icon={Blocks}
    >
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            `@maslazu/lazu-ui-frontend-kit-adapter` bridges `@maslazu/lazu-ui` to the `UiKit` contract from `lazu-frontend-kit`.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Use this package when your application is built on frontend-kit contracts but wants Lazu UI as the runtime UI layer.</p>
          <p>
            Contract package: <code>@maslazu/frontend-kit-ui-contracts</code>
          </p>
          <p>
            Concrete adapter package: <code>@maslazu/lazu-ui-frontend-kit-adapter</code>
          </p>
        </CardContent>
      </Card>

      <section id="adapter-install" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Install</h2>
          <p className="text-sm text-muted-foreground">Install the base UI library, the adapter package, and the frontend-kit UI contracts package.</p>
        </div>
        <CodeBlock code={installCode} lang="bash" />
      </section>

      <section id="adapter-setup" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">App shell setup</h2>
          <p className="text-sm text-muted-foreground">Import shared styles once, mount `UiKitProvider`, then mount toaster once near the root.</p>
        </div>
        <CodeBlock code={shellCode} lang="tsx" />
      </section>

      <section id="adapter-feature-usage" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Feature usage</h2>
          <p className="text-sm text-muted-foreground">Feature modules should consume UI through frontend-kit hooks, not by importing the adapter directly.</p>
        </div>
        <CodeBlock code={featureCode} lang="tsx" />
      </section>

      <section id="adapter-boundary" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Boundary</h2>
          <p className="text-sm text-muted-foreground">Keep feature modules bound to contracts and let the application shell choose the concrete UI adapter.</p>
        </div>
        <CodeBlock code={dependencyGraph} lang="text" />
      </section>

      <section id="adapter-coverage" className="scroll-mt-24 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Coverage</CardTitle>
            <CardDescription>Current adapter maps the full frontend-kit `UiComponents` surface to Lazu UI and thin wrappers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Primitives: `Button`, `Label`, `Card`, `Badge`, `Alert`, `Avatar`, `Tooltip`</p>
            <p>Forms: `Input`, `PasswordInput`, `Textarea`, `Select`, `SearchableSelect`, `SearchableMultiSelect`, `Switch`, `Tabs`</p>
            <p>Feedback: `Dialog`, `ConfirmDialog`, `Loading`, `EmptyState`, `ErrorState`</p>
            <p>Layouts: `PageLayout`, `DetailPageLayout`, `SummaryCard`</p>
            <p>Data: `Pagination`, `DropdownMenu`, `Table`</p>
            <p>
              Base package docs: <Link className="text-primary hover:underline" to="/docs/installation">Installation</Link>
            </p>
            <p>
              Repository: <a className="inline-flex items-center gap-1 text-primary hover:underline" href="https://github.com/MasLazu/lazu-ui" target="_blank" rel="noreferrer">github.com/MasLazu/lazu-ui <ExternalLink className="size-3" /></a>
            </p>
          </CardContent>
        </Card>
      </section>
    </PageLayout>
  );
}
