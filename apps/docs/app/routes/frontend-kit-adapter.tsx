import * as React from "react";
import { Blocks, ExternalLink, LayoutDashboard } from "lucide-react";
import { Link, useOutletContext } from "react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@maslazu/lazu-ui";

import { CodeBlock } from "@/components/code-block";
import { PageLayout } from "@/components/page-layout";
import type { DocsLayoutOutletContext } from "./docs-layout";

const outlineItems = [
  { id: "adapter-overview", label: "Overview" },
  { id: "adapter-install", label: "Install" },
  { id: "adapter-setup", label: "App shell setup" },
  { id: "adapter-app-shell", label: "AppShell" },
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
      <LazuFrontendKitToaster richColors position="top-right" />
    </UiKitProvider>
  );
}`;

const appShellCode = `import { Github, LayoutDashboard, ShieldAlert, ShieldUser, SlidersHorizontal } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

import { useUiComponents } from "@maslazu/frontend-kit-ui-contracts";
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@maslazu/lazu-ui";

export function ShowcaseShell() {
  const { AppShell } = useUiComponents();
  const location = useLocation();

  return (
    <AppShell
      appIcon={<img src="/favicon.svg" alt="Lazu UI" className="h-11 w-11 shrink-0 rounded-xl" />}
      appTitle="Lazu UI"
      appSubtitle="Showcase"
      sidebarSections={[
        {
          key: "docs",
          title: "Documentation",
          items: [
            { key: "overview", to: "/", label: "Overview", icon: <LayoutDashboard className="size-4" />, exact: true },
            { key: "operations", to: "/operations", label: "Operations", icon: <ShieldAlert className="size-4" /> },
            { key: "forms", to: "/forms", label: "Form Lab", icon: <SlidersHorizontal className="size-4" /> },
            { key: "profile", to: "/profile", label: "Profile", icon: <ShieldUser className="size-4" /> },
          ],
        },
      ]}
      breadcrumbContent={
        <>
          <span className="px-0.5 text-lg leading-none text-muted-foreground/30">&rsaquo;</span>
          <Link to="/">Showcase</Link>
          <span className="px-0.5 text-lg leading-none text-muted-foreground/30">&rsaquo;</span>
          <span className="font-bold text-foreground truncate">{location.pathname}</span>
        </>
      }
      topbarItems={
        <>
          <Select defaultValue="local">
            <SelectTrigger size="sm" className="w-[92px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="local">local</SelectItem>
            </SelectContent>
          </Select>
          <a href="https://github.com/MasLazu/lazu-ui" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm">
              <Github className="size-4" />
            </Button>
          </a>
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
}`;

const featureCode = `import { LayoutDashboard, Sparkles } from "lucide-react";

import { useToast, useUiComponents } from "@maslazu/frontend-kit-ui-contracts";

export function OverviewPage() {
  const { Button, InfoPanel, MetricCard, PageLayout, Section } = useUiComponents();
  const toast = useToast();

  return (
    <PageLayout
      pageIcon={LayoutDashboard}
      title="Security operations overview"
      description="Feature page imports only contracts. Root app decides adapter once."
      actions={<Button onClick={() => toast.success("Status exported")}>Export status</Button>}
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Active detections" value="124" description="+18% from previous window" />
        </div>
        <Section title="Response stream" description="Composed through frontend-kit contracts.">
          <InfoPanel tone="info" title="Contract boundary preserved" description="Feature modules stay UI-library-agnostic." icon={<Sparkles className="size-4" />} />
        </Section>
      </div>
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
          <p className="text-sm text-muted-foreground">Import shared styles once, mount `UiKitProvider`, then mount toaster once near the root. This matches showcase root wiring.</p>
        </div>
        <CodeBlock code={shellCode} lang="tsx" />
      </section>

      <section className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 id="adapter-app-shell" className="scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground">AppShell</h2>
          <p className="text-sm text-muted-foreground">`AppShell` owns shared docs-style chrome. Consumer apps inject branding, nav, breadcrumb, and topbar content through props while feature routes stay focused on page content.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>When to use it</CardTitle>
            <CardDescription>Use `AppShell` in route-level layout components, not inside individual feature screens.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Mount it once around nested routes so the shell controls sidebar collapse, mobile open state, and shared topbar chrome.</p>
            <p>Feature pages should render inside the shell with `PageLayout`, `DetailPageLayout`, `Section`, and other contract-driven content blocks.</p>
          </CardContent>
        </Card>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">Showcase pattern</h3>
          <p className="text-sm text-muted-foreground">This is the same route-shell pattern used by `references/lazu-ui-showcase/app/routes/showcase-layout.tsx`.</p>
        </div>
        <CodeBlock code={appShellCode} lang="tsx" />
        <Card>
          <CardHeader>
            <CardTitle>Key props</CardTitle>
            <CardDescription>Most consumer apps only need a small stable shell API.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p><code>appIcon</code>: brand mark shown in sidebar header.</p>
            <p><code>appTitle</code> and <code>appSubtitle</code>: product identity copy.</p>
            <p><code>sidebarSections</code>: grouped navigation items and custom sidebar content.</p>
            <p><code>breadcrumbContent</code>: route-aware breadcrumb content rendered in topbar.</p>
            <p><code>topbarItems</code>: right-side actions like version switchers or repository links.</p>
            <p><code>desktopCollapsed</code> and <code>mobileOpen</code>: shell state owned by route layout.</p>
            <p><code>onDesktopCollapsedChange</code> and <code>onMobileOpenChange</code>: shell state callbacks wired by the app.</p>
          </CardContent>
        </Card>
      </section>

      <section id="adapter-feature-usage" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Feature usage</h2>
          <p className="text-sm text-muted-foreground">Feature modules should consume UI through frontend-kit hooks, not by importing the adapter directly. This example follows showcase page structure.</p>
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
            <CardDescription>Current adapter maps the frontend-kit `UiComponents` surface to Lazu UI components. Shared layouts now come from `@maslazu/lazu-ui` directly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Primitives: `Button`, `Label`, `Card`, `Badge`, `Alert`, `Avatar`, `Tooltip`</p>
            <p>Forms: `Input`, `PasswordInput`, `Textarea`, `Select`, `SearchableSelect`, `SearchableMultiSelect`, `Switch`, `Tabs`</p>
            <p>Feedback: `Dialog`, `ConfirmDialog`, `Loading`, `EmptyState`, `ErrorState`</p>
            <p>Layouts: `AppShell`, `PageLayout`, `DetailPageLayout`, `SummaryCard`</p>
            <p>Composition: `Section`, `FormSection`, `MetricCard`, `PropertyList`, `InfoPanel`</p>
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
