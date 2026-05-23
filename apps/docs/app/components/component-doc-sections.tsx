import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "@maslazu/lazu-ui";

import { CodeBlock } from "@/components/code-block";
import type { ComponentDoc } from "@/lib/component-docs";

export function PreviewSection({ title, description, children, code }: { title: string; description: string; children: ReactNode; code: string }) {
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

export function InstallationSection({ installation }: { installation: ComponentDoc["installation"] }) {
  return (
    <section id="component-installation" className="scroll-mt-24 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">Choose quick command install or copy component source manually.</p>
      </div>

      <Tabs defaultValue="command" className="space-y-4">
        <TabsList>
          <TabsTrigger value="command">Command</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="command" className="space-y-4">
          <CodeBlock code={installation.command} lang="bash" />
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          {installation.manual.map((step, index) => (
            <div key={`${step.title}-${index}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-code-highlight text-sm font-medium text-foreground">{index + 1}</div>
                {index < installation.manual.length - 1 ? <div className="mt-2 h-full w-px bg-border" /> : null}
              </div>
              <div className="min-w-0 flex-1 space-y-3 pb-2">
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                {step.code ? <CodeBlock code={step.code} lang={step.lang ?? "tsx"} title={step.filename} /> : null}
                {step.note ? <p className="text-sm text-muted-foreground">{step.note}</p> : null}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
}

export function UsageSection({ usage }: { usage: ComponentDoc["usage"] }) {
  return (
    <section id="component-usage" className="scroll-mt-24 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <p className="text-sm text-muted-foreground">Import component, then compose it inside your feature or page.</p>
      </div>
      <CodeBlock code={usage.importCode} lang="tsx" />
      <CodeBlock code={usage.exampleCode} lang="tsx" />
    </section>
  );
}

export function CompositionSection({ composition }: { composition: ComponentDoc["composition"] }) {
  return (
    <section id="component-composition" className="scroll-mt-24 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Composition</h2>
        <p className="text-sm text-muted-foreground">{composition.description}</p>
      </div>
      <CodeBlock code={composition.tree} lang="text" />
    </section>
  );
}

export function ExamplesSection({ examples }: { examples: ComponentDoc["examples"] }) {
  return (
    <section id="component-examples" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Examples</h2>
        <p className="text-sm text-muted-foreground">Reference variations for real-world composition and styling.</p>
      </div>
      {examples.map((example) => (
        <Card key={example.id} id={`component-example-${example.id}`} className="overflow-hidden scroll-mt-24">
          <CardHeader>
            <CardTitle>{example.title}</CardTitle>
            {example.description ? <CardDescription>{example.description}</CardDescription> : null}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-xl border border-dashed border-border/70 bg-surface p-6">{example.preview}</div>
            <CodeBlock code={example.code} lang="tsx" />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export function ApiReferenceSection({ api }: { api: ComponentDoc["api"] }) {
  return (
    <section id="component-api-reference" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <p className="text-sm text-muted-foreground">Review exposed props and expected defaults for each exported piece.</p>
      </div>
      {api.map((section) => (
        <div key={section.name} className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">{section.name}</h3>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border/70 bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-code-highlight/70 text-left text-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                </tr>
              </thead>
              <tbody>
                {section.props.map((prop) => (
                  <tr key={prop.prop} className="border-t border-border/70 align-top">
                    <td className="px-4 py-3"><code className="rounded bg-code-highlight px-1.5 py-0.5 text-xs text-code-foreground">{prop.prop}</code></td>
                    <td className="px-4 py-3"><code className="rounded bg-code-highlight px-1.5 py-0.5 text-xs text-code-foreground">{prop.type}</code></td>
                    <td className="px-4 py-3"><code className="rounded bg-code-highlight px-1.5 py-0.5 text-xs text-code-foreground">{prop.default ?? "-"}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  );
}
