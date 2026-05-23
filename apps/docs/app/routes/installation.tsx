import * as React from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { Link, useOutletContext } from "react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@maslazu/lazu-ui";

import { CodeBlock } from "@/components/code-block";
import { PageLayout } from "@/components/page-layout";
import type { DocsLayoutOutletContext } from "./docs-layout";

const outlineItems = [
  { id: "installation-overview", label: "Overview" },
  { id: "installation-package", label: "Install package" },
  { id: "installation-registry", label: "Registry auth" },
  { id: "installation-styles", label: "Import styles" },
  { id: "installation-usage", label: "Usage" },
  { id: "installation-workspace", label: "Workspace note" },
];

const packageInstallCode = `pnpm add @maslazu/lazu-ui`;
const npmrcCode = `@maslazu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=4{GITHUB_TOKEN}`;
const styleImportCode = `import "@maslazu/lazu-ui/styles.css";`;
const usageCode = `import { Button } from "@maslazu/lazu-ui";

export function Example() {
  return <Button>Open docs</Button>;
}`;

export default function InstallationRoute() {
  const { setOutlineItems } = useOutletContext<DocsLayoutOutletContext>();

  React.useEffect(() => {
    setOutlineItems(outlineItems);
    return () => setOutlineItems([]);
  }, [setOutlineItems]);

  return (
    <PageLayout
      title={<div id="installation-overview" className="scroll-mt-24">Installation</div>}
      description="Install `@maslazu/lazu-ui` from GitHub Packages, configure registry auth, and wire shared styles into your app."
      icon={BookOpen}
    >
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            `@maslazu/lazu-ui` ships as private package through GitHub Packages. Consumers need registry auth, package install, and shared CSS import.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Published package: `@maslazu/lazu-ui`</p>
          <p>Registry: `https://npm.pkg.github.com`</p>
          <p>
            Release flow lives in repository release workflow. Component docs start at <Link className="text-primary hover:underline" to="/docs/components/button">Button</Link>.
          </p>
        </CardContent>
      </Card>

      <section id="installation-package" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Install package</h2>
          <p className="text-sm text-muted-foreground">Add package from GitHub Packages with your package manager of choice. `pnpm` example below.</p>
        </div>
        <CodeBlock code={packageInstallCode} lang="bash" />
      </section>

      <section id="installation-registry" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Configure registry auth</h2>
          <p className="text-sm text-muted-foreground">Point `@maslazu` scope at GitHub Packages and provide token with `read:packages` access.</p>
        </div>
        <CodeBlock code={npmrcCode} lang="text" title=".npmrc" />
      </section>

      <section id="installation-styles" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Import styles</h2>
          <p className="text-sm text-muted-foreground">Shared components rely on semantic tokens and base styles from exported stylesheet.</p>
        </div>
        <CodeBlock code={styleImportCode} lang="tsx" />
      </section>

      <section id="installation-usage" className="scroll-mt-24 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Use components</h2>
          <p className="text-sm text-muted-foreground">Import from package root. Public API stays intentionally small: root exports plus `styles.css`.</p>
        </div>
        <CodeBlock code={usageCode} lang="tsx" />
      </section>

      <section id="installation-workspace" className="scroll-mt-24 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Workspace note</CardTitle>
            <CardDescription>Repository local development differs slightly from external consumer setup.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Inside this workspace, docs app imports source CSS directly for live development.</p>
            <p>External apps should import published stylesheet from `@maslazu/lazu-ui/styles.css`.</p>
            <p>
              Package repository: <a className="inline-flex items-center gap-1 text-primary hover:underline" href="https://github.com/MasLazu/lazu-ui" target="_blank" rel="noreferrer">github.com/MasLazu/lazu-ui <ExternalLink className="size-3" /></a>
            </p>
          </CardContent>
        </Card>
      </section>
    </PageLayout>
  );
}
