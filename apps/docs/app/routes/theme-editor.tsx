import * as React from "react";
import { Check, Copy, Moon, Paintbrush, RotateCcw, Search, Sun } from "lucide-react";
import { Link, useOutletContext } from "react-router";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Tabs, TabsContent, TabsList, TabsTrigger, cn } from "@maslazu/lazu-ui";

import { PageLayout } from "@/components/page-layout";
import { docsNavigation } from "@/components/docs-sidebar";
import { componentDocs } from "@/lib/component-docs";
import { getThemeCssBlock, getThemeCssVariables, themeTokenDefaults, themeTokenGroups, type ThemeMode, type ThemeTokenDefinition, type ThemeTokenId } from "@/lib/theme-tokens";
import type { DocsLayoutOutletContext } from "./docs-layout";

type ThemeState = Record<ThemeMode, Record<ThemeTokenId, string>>;

type ThemePreset = {
  id: string;
  label: string;
  values: ThemeState;
};

const outlineItems = [
  { id: "theme-editor-overview", label: "Overview" },
  { id: "theme-editor-presets", label: "Modes" },
  { id: "theme-editor-core-tokens", label: "Tokens" },
];

const themePresets: ThemePreset[] = [
  {
    id: "default",
    label: "Default",
    values: {
      light: { ...themeTokenDefaults.light },
      dark: { ...themeTokenDefaults.dark },
    },
  },
  {
    id: "violet",
    label: "Violet",
    values: {
      light: {
        ...themeTokenDefaults.light,
        primary: "262 83% 58%",
        ring: "262 83% 58%",
        sidebar: "252 100% 99%",
        "sidebar-accent": "252 86% 96%",
        surface: "252 100% 99%",
        "code-highlight": "252 86% 96%",
      },
      dark: {
        ...themeTokenDefaults.dark,
        primary: "262 83% 68%",
        ring: "262 83% 68%",
        sidebar: "252 24% 11%",
        "sidebar-accent": "252 22% 16%",
        surface: "252 22% 13%",
        "code-highlight": "252 18% 18%",
      },
    },
  },
  {
    id: "forest",
    label: "Forest",
    values: {
      light: {
        ...themeTokenDefaults.light,
        primary: "154 54% 36%",
        ring: "154 54% 36%",
        sidebar: "138 43% 98%",
        "sidebar-accent": "138 27% 94%",
        surface: "120 25% 98%",
        "code-highlight": "138 27% 94%",
      },
      dark: {
        ...themeTokenDefaults.dark,
        primary: "154 52% 52%",
        ring: "154 52% 52%",
        sidebar: "150 20% 10%",
        "sidebar-accent": "150 18% 15%",
        surface: "150 16% 12%",
        "code-highlight": "150 14% 18%",
      },
    },
  },
  {
    id: "rose",
    label: "Rose",
    values: {
      light: {
        ...themeTokenDefaults.light,
        primary: "342 82% 52%",
        ring: "342 82% 52%",
        sidebar: "345 100% 99%",
        "sidebar-accent": "345 71% 96%",
        surface: "350 100% 99%",
        "code-highlight": "345 71% 96%",
        accent: "345 71% 96%",
      },
      dark: {
        ...themeTokenDefaults.dark,
        primary: "342 86% 67%",
        ring: "342 86% 67%",
        sidebar: "336 24% 10%",
        "sidebar-accent": "336 20% 15%",
        surface: "336 18% 12%",
        "code-highlight": "336 16% 18%",
        accent: "336 20% 15%",
      },
    },
  },
  {
    id: "amber",
    label: "Amber",
    values: {
      light: {
        ...themeTokenDefaults.light,
        primary: "35 92% 52%",
        ring: "35 92% 52%",
        sidebar: "42 100% 98%",
        "sidebar-accent": "40 100% 94%",
        surface: "48 100% 98%",
        "code-highlight": "40 100% 94%",
        accent: "40 100% 94%",
      },
      dark: {
        ...themeTokenDefaults.dark,
        primary: "40 96% 62%",
        ring: "40 96% 62%",
        sidebar: "36 28% 10%",
        "sidebar-accent": "36 24% 15%",
        surface: "36 22% 12%",
        "code-highlight": "36 20% 18%",
        accent: "36 24% 15%",
      },
    },
  },
  {
    id: "ocean",
    label: "Ocean",
    values: {
      light: {
        ...themeTokenDefaults.light,
        primary: "191 91% 42%",
        ring: "191 91% 42%",
        sidebar: "190 100% 98%",
        "sidebar-accent": "189 72% 94%",
        surface: "195 100% 98%",
        "code-highlight": "189 72% 94%",
        accent: "189 72% 94%",
      },
      dark: {
        ...themeTokenDefaults.dark,
        primary: "191 88% 58%",
        ring: "191 88% 58%",
        sidebar: "196 30% 10%",
        "sidebar-accent": "196 24% 15%",
        surface: "196 22% 12%",
        "code-highlight": "196 18% 18%",
        accent: "196 24% 15%",
      },
    },
  },
  {
    id: "graphite",
    label: "Graphite",
    values: {
      light: {
        ...themeTokenDefaults.light,
        primary: "220 9% 32%",
        ring: "220 9% 32%",
        sidebar: "220 14% 97%",
        "sidebar-accent": "220 10% 92%",
        surface: "220 14% 98%",
        "code-highlight": "220 10% 92%",
        accent: "220 10% 92%",
      },
      dark: {
        ...themeTokenDefaults.dark,
        primary: "220 10% 72%",
        ring: "220 10% 72%",
        sidebar: "220 14% 9%",
        "sidebar-accent": "220 10% 14%",
        surface: "220 12% 11%",
        "code-highlight": "220 10% 16%",
        accent: "220 10% 14%",
      },
    },
  },
];

export default function ThemeEditorRoute() {
  const { setOutlineItems, setRightSidebarContent } = useOutletContext<DocsLayoutOutletContext>();
  const [mode, setMode] = React.useState<ThemeMode>("light");
  const [search, setSearch] = React.useState("");
  const [sidebarView, setSidebarView] = React.useState<"tokens" | "presets">("tokens");
  const [themeState, setThemeState] = React.useState<ThemeState>({
    light: { ...themeTokenDefaults.light },
    dark: { ...themeTokenDefaults.dark },
  });
  const [copied, setCopied] = React.useState<"all" | null>(null);

  React.useEffect(() => {
    setOutlineItems(outlineItems);
    return () => {
      setOutlineItems([]);
      setRightSidebarContent(null);
    };
  }, [setOutlineItems, setRightSidebarContent]);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const query = search.trim().toLowerCase();
  const visibleGroups = React.useMemo(
    () =>
      themeTokenGroups
        .map((group) => ({
          ...group,
          tokens: group.tokens.filter((token) => {
            if (!query) return true;
            return [token.id, token.label, token.description].join(" ").toLowerCase().includes(query);
          }),
        }))
        .filter((group) => group.tokens.length > 0),
    [query],
  );

  const activeValues = themeState[mode];
  const visibleTokens = React.useMemo(() => visibleGroups.flatMap((group) => group.tokens), [visibleGroups]);
  const fullExportBlock = `${getThemeCssBlock("light", themeState.light)}\n\n${getThemeCssBlock("dark", themeState.dark)}`;
  const previewVariables = React.useMemo(() => getThemeCssVariables(themeState[mode]), [mode, themeState]);

  const updateToken = (token: ThemeTokenId, value: string) => {
    setThemeState((current) => ({
      ...current,
      [mode]: {
        ...current[mode],
        [token]: value,
      },
    }));
  };

  const resetAll = () => {
    setThemeState({
      light: { ...themeTokenDefaults.light },
      dark: { ...themeTokenDefaults.dark },
    });
  };

  const resetToken = (token: ThemeTokenId) => {
    setThemeState((current) => ({
      ...current,
      [mode]: {
        ...current[mode],
        [token]: themeTokenDefaults[mode][token],
      },
    }));
  };

  const applyPreset = (preset: ThemePreset) => {
    setThemeState({
      light: { ...preset.values.light },
      dark: { ...preset.values.dark },
    });
  };

  const activePresetId = React.useMemo(() => {
    const matchesPreset = (preset: ThemePreset) =>
      (Object.keys(themeTokenDefaults.light) as ThemeTokenId[]).every(
        (token) => preset.values.light[token] === themeState.light[token] && preset.values.dark[token] === themeState.dark[token],
      );

    return themePresets.find(matchesPreset)?.id ?? null;
  }, [themeState]);

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied("all");
  }

  React.useEffect(() => {
    setRightSidebarContent(
        <ThemeTokenSidebar
          mode={mode}
          search={search}
          sidebarView={sidebarView}
          activeValues={activeValues}
          visibleTokens={visibleTokens}
          onSearchChange={setSearch}
          onSidebarViewChange={setSidebarView}
          onUpdateMode={setMode}
          onResetToken={resetToken}
          onUpdateToken={updateToken}
          presets={themePresets}
          activePresetId={activePresetId}
          onApplyPreset={applyPreset}
        />,
    );
  }, [activePresetId, activeValues, mode, search, setRightSidebarContent, sidebarView, visibleTokens]);

  return (
    <PageLayout
      title={<div id="theme-editor-overview" className="scroll-mt-24">Theme Editor</div>}
      description="Edit semantic token values live while previewing component surfaces."
      icon={Paintbrush}
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-2" onClick={resetAll}>
            <RotateCcw className="size-4" />
            Reset all
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => copyText(fullExportBlock)}>
            <Copy className="size-4" />
            {copied === "all" ? "Copied all" : "Copy all"}
          </Button>
        </>
      }
    >
      <section id="theme-editor-core-tokens" className="scroll-mt-24 space-y-4">
        <div className={cn("grid gap-4 lg:grid-cols-2", mode === "dark" && "dark")} style={previewVariables}>
          {docsNavigation.map((item) => {
            const doc = componentDocs[item.id as keyof typeof componentDocs];
            if (!doc) return null;

            const Icon = item.icon;

            return (
              <Card key={item.id} id={`theme-component-${item.id}`} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" />
                        <span>{doc.title}</span>
                      </CardTitle>
                      <CardDescription>{doc.description}</CardDescription>
                    </div>
                    <Link to={`/docs/components/${item.id}`}>
                      <Button variant="ghost" size="sm">Open docs</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-dashed border-border/70 bg-surface p-6">{doc.preview}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}

function TokenSwatch({ value }: { value: string }) {
  return <div className="size-9 shrink-0 rounded-lg border border-border/70" style={{ backgroundColor: `hsl(${value})` }} aria-hidden="true" />;
}

function PresetPalette({ preset, mode }: { preset: ThemePreset; mode: ThemeMode }) {
  const values = preset.values[mode];
  const palette = [values.primary, values.sidebar, values.surface, values.accent, values.card];

  return (
    <div className="flex items-center gap-2" aria-label={`${preset.label} palette`}>
      {palette.map((value, index) => (
        <div
          key={`${preset.id}-${mode}-${index}`}
          className="size-5 rounded-lg border border-sidebar-border/60"
          style={{ backgroundColor: `hsl(${value})` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ThemeTokenSidebar({
  mode,
  search,
  sidebarView,
  activeValues,
  visibleTokens,
  onSearchChange,
  onSidebarViewChange,
  onUpdateMode,
  onUpdateToken,
  onResetToken,
  presets,
  activePresetId,
  onApplyPreset,
}: {
  mode: ThemeMode;
  search: string;
  sidebarView: "tokens" | "presets";
  activeValues: Record<ThemeTokenId, string>;
  visibleTokens: ThemeTokenDefinition[];
  onSearchChange: (value: string) => void;
  onSidebarViewChange: (value: "tokens" | "presets") => void;
  onUpdateMode: (mode: ThemeMode) => void;
  onUpdateToken: (token: ThemeTokenId, value: string) => void;
  onResetToken: (token: ThemeTokenId) => void;
  presets: ThemePreset[];
  activePresetId: string | null;
  onApplyPreset: (preset: ThemePreset) => void;
}) {
  return (
    <div className="space-y-4 px-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sidebar-foreground/60" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search tokens"
              className="h-9 border-sidebar-border bg-sidebar pl-9 text-sidebar-foreground placeholder:text-sidebar-foreground/60"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-9 w-9 rounded-xl border-sidebar-border bg-sidebar p-0", mode === "dark" ? "interactive-selected" : "text-sidebar-foreground/70")}
            onClick={() => onUpdateMode(mode === "light" ? "dark" : "light")}
            aria-label="Toggle light and dark token set"
          >
            {mode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </div>
      <Tabs value={sidebarView} onValueChange={(value) => onSidebarViewChange(value as "tokens" | "presets")} className="gap-3">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tokens" className="w-full">
            Tokens
          </TabsTrigger>
          <TabsTrigger value="presets" className="w-full">
            Presets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tokens" className="space-y-3">
          {visibleTokens.map((token) => (
            <div key={token.id} className="rounded-xl border border-sidebar-border/60 bg-sidebar-accent/40 p-3">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-sidebar-foreground">{token.label}</p>
                    <code className="rounded bg-code-highlight px-1.5 py-0.5 text-[11px] text-code-foreground">--{token.id}</code>
                  </div>
                  <p className="text-xs text-sidebar-foreground/70">{token.description}</p>
                </div>
                {token.swatch ? <TokenSwatch value={activeValues[token.id]} /> : null}
              </div>
              <div className="flex items-center gap-2">
                <Input value={activeValues[token.id]} onChange={(event) => onUpdateToken(token.id, event.target.value)} spellCheck={false} className="h-9 flex-1 bg-sidebar text-sidebar-foreground" />
                <Button variant="outline" size="sm" className="h-9 w-9 rounded-xl border-sidebar-border bg-sidebar p-0 text-sidebar-foreground/70" onClick={() => onResetToken(token.id)} aria-label={`Reset ${token.label} token`}>
                  <RotateCcw className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="presets" className="space-y-3">
          {presets.map((preset) => {
            const selected = preset.id === activePresetId;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset)}
                className={cn(
                  "w-full rounded-xl border p-3 text-left transition-colors",
                  selected
                    ? "border-primary/40 bg-sidebar-accent text-sidebar-foreground"
                    : "border-sidebar-border/60 bg-sidebar-accent/40 text-sidebar-foreground hover:bg-sidebar-accent/70",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">{preset.label}</p>
                    <PresetPalette preset={preset} mode={mode} />
                  </div>
                  {selected ? <Check className="mt-0.5 size-4 text-primary" /> : null}
                </div>
              </button>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
