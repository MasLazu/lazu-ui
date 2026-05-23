export type ThemeTokenId =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "success"
  | "success-foreground"
  | "warning"
  | "warning-foreground"
  | "border"
  | "input"
  | "ring"
  | "sidebar"
  | "sidebar-foreground"
  | "sidebar-primary"
  | "sidebar-primary-foreground"
  | "sidebar-accent"
  | "sidebar-accent-foreground"
  | "sidebar-border"
  | "sidebar-ring"
  | "surface"
  | "surface-foreground"
  | "code"
  | "code-foreground"
  | "code-highlight"
  | "code-number"
  | "selection"
  | "selection-foreground"
  | "overlay"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "radius";

export type ThemeMode = "light" | "dark";

export type ThemeTokenDefinition = {
  id: ThemeTokenId;
  label: string;
  description: string;
  swatch?: boolean;
};

export type ThemeTokenGroup = {
  id: string;
  title: string;
  description: string;
  tokens: ThemeTokenDefinition[];
};

export const themeTokenGroups: ThemeTokenGroup[] = [
  {
    id: "core-tokens",
    title: "Core Tokens",
    description: "Foundation tokens for content, text, actions, feedback, borders, and focus.",
    tokens: [
      { id: "background", label: "Background", description: "App background surface.", swatch: true },
      { id: "foreground", label: "Foreground", description: "Default text color.", swatch: true },
      { id: "card", label: "Card", description: "Card surface background.", swatch: true },
      { id: "card-foreground", label: "Card Foreground", description: "Card text color.", swatch: true },
      { id: "popover", label: "Popover", description: "Popup surface background.", swatch: true },
      { id: "popover-foreground", label: "Popover Foreground", description: "Popup text color.", swatch: true },
      { id: "primary", label: "Primary", description: "Primary action and active accent.", swatch: true },
      { id: "primary-foreground", label: "Primary Foreground", description: "Text on primary surfaces.", swatch: true },
      { id: "secondary", label: "Secondary", description: "Secondary filled surfaces.", swatch: true },
      { id: "secondary-foreground", label: "Secondary Foreground", description: "Text on secondary surfaces.", swatch: true },
      { id: "muted", label: "Muted", description: "Low emphasis fill surface.", swatch: true },
      { id: "muted-foreground", label: "Muted Foreground", description: "Low emphasis text color.", swatch: true },
      { id: "accent", label: "Accent", description: "Hover and active neutral surface.", swatch: true },
      { id: "accent-foreground", label: "Accent Foreground", description: "Text on accent surfaces.", swatch: true },
      { id: "destructive", label: "Destructive", description: "Danger surface and text accent.", swatch: true },
      { id: "destructive-foreground", label: "Destructive Foreground", description: "Text on destructive surfaces.", swatch: true },
      { id: "success", label: "Success", description: "Success state color.", swatch: true },
      { id: "success-foreground", label: "Success Foreground", description: "Text on success surfaces.", swatch: true },
      { id: "warning", label: "Warning", description: "Warning state color.", swatch: true },
      { id: "warning-foreground", label: "Warning Foreground", description: "Text on warning surfaces.", swatch: true },
      { id: "border", label: "Border", description: "Standard divider and border tone.", swatch: true },
      { id: "input", label: "Input", description: "Input border/fill role.", swatch: true },
      { id: "ring", label: "Ring", description: "Focus ring color.", swatch: true },
      { id: "radius", label: "Radius", description: "Shared corner radius value." },
    ],
  },
  {
    id: "shell-tokens",
    title: "Shell Tokens",
    description: "Outer docs chrome and inset content shell surfaces.",
    tokens: [
      { id: "sidebar", label: "Sidebar", description: "Unified docs chrome surface.", swatch: true },
      { id: "sidebar-foreground", label: "Sidebar Foreground", description: "Text on docs chrome.", swatch: true },
      { id: "sidebar-primary", label: "Sidebar Primary", description: "Brand tint inside chrome.", swatch: true },
      { id: "sidebar-primary-foreground", label: "Sidebar Primary Foreground", description: "Text on sidebar primary surfaces.", swatch: true },
      { id: "sidebar-accent", label: "Sidebar Accent", description: "Chrome hover surface.", swatch: true },
      { id: "sidebar-accent-foreground", label: "Sidebar Accent Foreground", description: "Text on chrome hover surface.", swatch: true },
      { id: "sidebar-border", label: "Sidebar Border", description: "Chrome border/divider color if needed.", swatch: true },
      { id: "sidebar-ring", label: "Sidebar Ring", description: "Focus ring on chrome controls.", swatch: true },
      { id: "surface", label: "Surface", description: "Inset panel and page shell surface.", swatch: true },
      { id: "surface-foreground", label: "Surface Foreground", description: "Text on inset panels.", swatch: true },
    ],
  },
  {
    id: "code-tokens",
    title: "Code Tokens",
    description: "Code blocks, inline code chips, and code-adjacent surfaces.",
    tokens: [
      { id: "code", label: "Code", description: "Code block surface.", swatch: true },
      { id: "code-foreground", label: "Code Foreground", description: "Code text color.", swatch: true },
      { id: "code-highlight", label: "Code Highlight", description: "Code header and inline chip surface.", swatch: true },
      { id: "code-number", label: "Code Number", description: "Line numbers and low-emphasis code metadata.", swatch: true },
    ],
  },
  {
    id: "utility-tokens",
    title: "Utility Tokens",
    description: "Selection, overlays, and chart accents used across previews.",
    tokens: [
      { id: "selection", label: "Selection", description: "Selected text background.", swatch: true },
      { id: "selection-foreground", label: "Selection Foreground", description: "Selected text color.", swatch: true },
      { id: "overlay", label: "Overlay", description: "Backdrop overlay value.", swatch: false },
      { id: "chart-1", label: "Chart 1", description: "Chart accent 1.", swatch: true },
      { id: "chart-2", label: "Chart 2", description: "Chart accent 2.", swatch: true },
      { id: "chart-3", label: "Chart 3", description: "Chart accent 3.", swatch: true },
      { id: "chart-4", label: "Chart 4", description: "Chart accent 4.", swatch: true },
      { id: "chart-5", label: "Chart 5", description: "Chart accent 5.", swatch: true },
    ],
  },
];

export const themeTokenDefaults: Record<ThemeMode, Record<ThemeTokenId, string>> = {
  light: {
    background: "0 0% 100%",
    foreground: "222.2 47.4% 11.2%",
    card: "0 0% 100%",
    "card-foreground": "222.2 47.4% 11.2%",
    popover: "0 0% 100%",
    "popover-foreground": "222.2 47.4% 11.2%",
    primary: "221.2 83.2% 53.3%",
    "primary-foreground": "210 40% 98%",
    secondary: "210 40% 96.1%",
    "secondary-foreground": "222.2 47.4% 11.2%",
    muted: "210 40% 96.1%",
    "muted-foreground": "215.4 16.3% 46.9%",
    accent: "210 40% 96.1%",
    "accent-foreground": "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "210 40% 98%",
    success: "142.1 76.2% 36.3%",
    "success-foreground": "355.7 100% 97.3%",
    warning: "38 92% 50%",
    "warning-foreground": "48 96% 89%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "221.2 83.2% 53.3%",
    sidebar: "0 0% 100%",
    "sidebar-foreground": "222.2 47.4% 11.2%",
    "sidebar-primary": "221.2 83.2% 53.3%",
    "sidebar-primary-foreground": "210 40% 98%",
    "sidebar-accent": "210 40% 96.1%",
    "sidebar-accent-foreground": "222.2 47.4% 11.2%",
    "sidebar-border": "214.3 31.8% 91.4%",
    "sidebar-ring": "221.2 83.2% 53.3%",
    surface: "210 40% 98%",
    "surface-foreground": "222.2 47.4% 11.2%",
    code: "0 0% 100%",
    "code-foreground": "222.2 47.4% 11.2%",
    "code-highlight": "210 40% 96.1%",
    "code-number": "215.4 16.3% 46.9%",
    selection: "221.2 83.2% 53.3%",
    "selection-foreground": "210 40% 98%",
    overlay: "222.2 47.4% 11.2% / 0.48",
    "chart-1": "221.2 83.2% 53.3%",
    "chart-2": "142.1 76.2% 36.3%",
    "chart-3": "38 92% 50%",
    "chart-4": "330 80% 55%",
    "chart-5": "260 80% 65%",
    radius: "1rem",
  },
  dark: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    "card-foreground": "210 40% 98%",
    popover: "222.2 84% 4.9%",
    "popover-foreground": "210 40% 98%",
    primary: "217.2 91.2% 59.8%",
    "primary-foreground": "222.2 47.4% 11.2%",
    secondary: "217.2 32.6% 17.5%",
    "secondary-foreground": "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    "muted-foreground": "215 20.2% 65.1%",
    accent: "217.2 32.6% 17.5%",
    "accent-foreground": "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "210 40% 98%",
    success: "149 61% 22%",
    "success-foreground": "149 80% 91%",
    warning: "48 96% 51%",
    "warning-foreground": "26 83% 14%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "224.3 76.3% 48%",
    sidebar: "222.2 84% 4.9%",
    "sidebar-foreground": "210 40% 98%",
    "sidebar-primary": "217.2 91.2% 59.8%",
    "sidebar-primary-foreground": "222.2 47.4% 11.2%",
    "sidebar-accent": "217.2 32.6% 17.5%",
    "sidebar-accent-foreground": "210 40% 98%",
    "sidebar-border": "217.2 32.6% 17.5%",
    "sidebar-ring": "224.3 76.3% 48%",
    surface: "222.2 47% 11%",
    "surface-foreground": "210 40% 98%",
    code: "222.2 47% 11%",
    "code-foreground": "210 40% 98%",
    "code-highlight": "217.2 32.6% 17.5%",
    "code-number": "215 20.2% 65.1%",
    selection: "217.2 91.2% 59.8%",
    "selection-foreground": "222.2 47.4% 11.2%",
    overlay: "210 40% 2% / 0.72",
    "chart-1": "210 100% 85%",
    "chart-2": "142 70% 80%",
    "chart-3": "40 100% 80%",
    "chart-4": "330 100% 85%",
    "chart-5": "260 100% 85%",
    radius: "1rem",
  },
};

export function getThemeCssVariables(values: Record<ThemeTokenId, string>) {
  return Object.fromEntries(Object.entries(values).map(([token, value]) => [`--${token}`, value]));
}

export function getThemeCssBlock(mode: ThemeMode, values: Record<ThemeTokenId, string>) {
  const selector = mode === "light" ? ":root" : ".dark";
  const body = Object.entries(values)
    .map(([token, value]) => `  --${token}: ${value};`)
    .join("\n");
  return `${selector} {\n${body}\n}`;
}
