import * as React from "react";
import type { ReactNode } from "react";
import { AlertCircle, Bell, ChevronDown, CreditCard, FileText, Github, LayoutDashboard, Mail, MoreHorizontal, ShieldAlert, ShieldUser, SlidersHorizontal, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AppShell,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Loading,
  DetailPageLayout,
  FormSection,
  InfoPanel,
  MetricCard,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  PasswordInput,
  Pagination,
  PageLayout,
  SearchableMultiSelect,
  SearchableSelect,
  PropertyList,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Section,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  TimeRangeSelect,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@maslazu/lazu-ui";

type InstallationStep = {
  title: string;
  code?: string;
  filename?: string;
  lang?: "tsx" | "ts" | "jsx" | "js" | "bash" | "text" | "json";
  note?: string;
};

type ComponentExample = {
  id: string;
  title: string;
  description?: string;
  preview: ReactNode;
  code: string;
};

type ApiProp = {
  prop: string;
  type: string;
  default?: string;
};

type ApiSection = {
  name: string;
  description: string;
  props: ApiProp[];
};

export type ComponentDoc = {
  title: string;
  description: string;
  importPath: string;
  preview: ReactNode;
  code: string;
  installation: {
    command: string;
    manual: InstallationStep[];
  };
  usage: {
    importCode: string;
    exampleCode: string;
  };
  composition: {
    description: string;
    tree: string;
  };
  examples: ComponentExample[];
  api: ApiSection[];
};

const previewCodeById = {
  button: `<div className="flex flex-wrap gap-3">\n  <Button>Save changes</Button>\n  <Button variant="outline">Secondary</Button>\n  <Button variant="ghost">Ghost</Button>\n  <Button variant="destructive">Delete</Button>\n</div>`,
  "app-shell": `<AppShell\n  appIcon={<img src="/favicon.svg" alt="Lazu UI" className="h-11 w-11 shrink-0 rounded-xl" />}\n  appTitle="Lazu UI"\n  appSubtitle="Showcase"\n  sidebarSections={[\n    {\n      key: "docs",\n      title: "Documentation",\n      items: [\n        { key: "overview", to: "/", label: "Overview", icon: <LayoutDashboard className="size-4" />, exact: true },\n        { key: "operations", to: "/operations", label: "Operations", icon: <ShieldAlert className="size-4" /> },\n        { key: "forms", to: "/forms", label: "Form Lab", icon: <SlidersHorizontal className="size-4" /> },\n        {\n          key: "people",\n          label: "People",\n          icon: <ShieldUser className="size-4" />,\n          defaultExpanded: true,\n          children: [\n            { key: "profile", to: "/profile", label: "Profile", icon: <ShieldUser className="size-4" /> },\n          ],\n        },\n      ],\n    },\n  ]}\n  breadcrumbContent={<span className="font-bold text-foreground">Overview</span>}\n  topbarItems={<Button variant="ghost" size="sm"><Github className="size-4" /></Button>}\n>\n  <PageLayout pageIcon={LayoutDashboard} title="Security operations overview" />\n</AppShell>`,
  "page-layout": `<PageLayout\n  pageIcon={LayoutDashboard}\n  title="Security operations overview"\n  description="Feature page layout with shared header treatment."\n  actions={<Button>Export status</Button>}\n>\n  <Section title="Response stream" description="Composed layout content.">\n    <InfoPanel title="Contract boundary preserved" description="Feature modules stay UI-library-agnostic." />\n  </Section>\n</PageLayout>`,
  "detail-page-layout": `<DetailPageLayout\n  pageIcon={ShieldUser}\n  title="Analyst profile"\n  description="Detail layout with main content and aside surface."\n  backTo="/analysts"\n  actions={<Button variant="destructive">Suspend access</Button>}\n  aside={<PropertyList items={[{ label: "Role", value: "Privileged responder" }]} />}\n>\n  <Section title="Access posture" description="Primary detail content." />\n</DetailPageLayout>`,
  card: `<Card className="max-w-md">\n  <CardHeader>\n    <CardTitle>Weekly revenue</CardTitle>\n    <CardDescription>Snapshot from last 7 days.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-3xl font-semibold">$24,320</p>\n  </CardContent>\n  <CardFooter>\n    <Button size="sm">Open report</Button>\n  </CardFooter>\n</Card>`,
  section: `<Section title="Response stream" description="Use shared surface and header composition.">\n  <p className="text-sm text-muted-foreground">Place page-specific content here.</p>\n</Section>`,
  "form-section": `<FormSection title="Workspace configuration" description="Inputs and composed controls exposed through shared contracts.">\n  <div className="grid gap-4">\n    <div className="grid gap-2">\n      <Label htmlFor="workspace-name">Workspace name</Label>\n      <Input id="workspace-name" placeholder="Beacon SOC - Jakarta" />\n    </div>\n    <div className="grid gap-2">\n      <Label htmlFor="workspace-notes">Operational notes</Label>\n      <Textarea id="workspace-notes" rows={4} />\n    </div>\n  </div>\n</FormSection>`,
  input: `<div className="grid max-w-md gap-2">\n  <Label htmlFor="email">Email address</Label>\n  <Input id="email" type="email" placeholder="ops@lazu.dev" />\n</div>`,
  badge: `<div className="flex flex-wrap gap-3">\n  <Badge>Default</Badge>\n  <Badge variant="secondary">Secondary</Badge>\n  <Badge variant="success">Healthy</Badge>\n  <Badge variant="warning">Warning</Badge>\n  <Badge variant="destructive">Failed</Badge>\n</div>`,
  "metric-card": `<MetricCard title="Active detections" value="124" description="+18% from previous window" icon={<Sparkles className="size-4" />} />`,
  alert: `<Alert>\n  <Bell className="size-4" />\n  <AlertTitle>Deployment scheduled</AlertTitle>\n  <AlertDescription>Production rollout starts at 21:00 UTC.</AlertDescription>\n</Alert>`,
  avatar: `<div className="flex items-center gap-4">\n  <Avatar name="Maya Chen" size="sm" />\n  <Avatar name="Dimas Prakoso" size="md" />\n  <Avatar name="Siti Rahmawati" size="lg" />\n</div>`,
  "info-panel": `<InfoPanel tone="info" title="Contract boundary preserved" description="Feature modules stay UI-library-agnostic." icon={<Sparkles className="size-4" />} />`,
  "property-list": `<PropertyList\n  items={[\n    { label: "Email", value: "alya@maslazu.dev" },\n    { label: "Role", value: "Privileged responder" },\n    { label: "Last activity", value: "3 minutes ago" },\n  ]}\n/>`,
  textarea: `<div className="grid max-w-xl gap-2">\n  <Label htmlFor="notes">Handover notes</Label>\n  <Textarea id="notes" placeholder="Summarize incident timeline, actions, and follow-up items." />\n</div>`,
  dialog: `<Dialog>\n  <DialogTrigger render={<Button>Open dialog</Button>} />\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Create incident note</DialogTitle>\n      <DialogDescription>Capture timeline details before escalation.</DialogDescription>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`,
  tooltip: `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger render={<Button variant="outline">Hover for hint</Button>} />\n    <TooltipContent>Critical actions should explain impact before click.</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
  tabs: `<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="events">Events</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">Investigation overview.</TabsContent>\n</Tabs>`,
  select: `<Select defaultValue="high">\n  <SelectTrigger>\n    <SelectValue />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="high">High</SelectItem>\n  </SelectContent>\n</Select>`,
  "dropdown-menu": `<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />\n  <DropdownMenuContent align="end">\n    <DropdownMenuItem>Open details</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
  switch: `<div className="flex items-center gap-3">\n  <Switch defaultChecked />\n  <Label>Realtime sync enabled</Label>\n</div>`,
  table: `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>Suspicious Login</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
  pagination: `<Pagination currentPage={3} pageSize={25} totalItems={132} onPageChange={(page) => console.log(page)} />`,
  "navigation-menu": `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuLink href="#">Overview</NavigationMenuLink>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
  loading: `<Loading fullScreen={false} text="Fetching activity feed" />`,
  "password-input": `<PasswordInput register={register("password")} label="Account password" error="Password must be at least 12 characters." />`,
  "confirm-dialog": `<ConfirmDialog open={open} onOpenChange={setOpen} title="Archive detection" description="This removes active visibility from the rule catalog." onConfirm={handleArchive} variant="destructive" />`,
  "searchable-select": `<SearchableSelect value={value} onValueChange={setValue} options={options} placeholder="Choose severity" />`,
  "searchable-multi-select": `<SearchableMultiSelect values={values} onValuesChange={setValues} options={options} placeholder="Choose data sources" />`,
  "time-range-select": `<TimeRangeSelect from={from} to={to} onChange={(nextFrom, nextTo) => setRange(nextFrom, nextTo)} />`,
} as const;

const componentPreviews = {
  button: <div className="flex flex-wrap gap-3"><Button>Save changes</Button><Button variant="outline">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Delete</Button></div>,
  "app-shell": <AppShellPreview />,
  "page-layout": <PageLayout pageIcon={LayoutDashboard} title="Security operations overview" description="Feature page layout with shared header treatment." actions={<Button>Export status</Button>}><Section title="Response stream" description="Composed layout content."><InfoPanel title="Contract boundary preserved" description="Feature modules stay UI-library-agnostic." icon={<Sparkles className="size-4" />} /></Section></PageLayout>,
  "detail-page-layout": <DetailPageLayout pageIcon={ShieldUser} title="Analyst profile" description="Detail layout with main content and aside surface." backTo="/analysts" actions={<Button variant="destructive">Suspend access</Button>} aside={<PropertyList items={[{ label: "Role", value: "Privileged responder" }, { label: "Last activity", value: "3 minutes ago" }]} />}><Section title="Access posture" description="Primary detail content."><p className="text-sm text-muted-foreground">Assigned to cloud posture, endpoint response, and privileged identity reviews.</p></Section></DetailPageLayout>,
  card: <Card className="max-w-md"><CardHeader><CardTitle>Weekly revenue</CardTitle><CardDescription>Snapshot from last 7 days.</CardDescription></CardHeader><CardContent><p className="text-3xl font-semibold">$24,320</p></CardContent><CardFooter><Button size="sm">Open report</Button></CardFooter></Card>,
  section: <Section title="Response stream" description="Use shared surface and header composition."><p className="text-sm text-muted-foreground">Place page-specific content here.</p></Section>,
  "form-section": <FormSection title="Workspace configuration" description="Inputs and composed controls exposed through shared contracts."><div className="grid gap-4"><div className="grid gap-2"><Label htmlFor="preview-workspace-name">Workspace name</Label><Input id="preview-workspace-name" placeholder="Beacon SOC - Jakarta" /></div><div className="grid gap-2"><Label htmlFor="preview-workspace-notes">Operational notes</Label><Textarea id="preview-workspace-notes" rows={4} /></div></div></FormSection>,
  input: <div className="grid max-w-md gap-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" placeholder="ops@lazu.dev" /></div>,
  badge: <div className="flex flex-wrap gap-3"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="success">Healthy</Badge><Badge variant="warning">Warning</Badge><Badge variant="destructive">Failed</Badge></div>,
  "metric-card": <MetricCard title="Active detections" value="124" description="+18% from previous window" icon={<Sparkles className="size-4" />} />,
  alert: <div className="grid max-w-2xl gap-4"><Alert><Bell className="size-4" /><AlertTitle>Deployment scheduled</AlertTitle><AlertDescription>Production rollout starts at 21:00 UTC.</AlertDescription></Alert><Alert variant="destructive"><AlertCircle className="size-4" /><AlertTitle>Sync failed</AlertTitle><AlertDescription>Payment reconciliation queue stopped after 4 retries.</AlertDescription></Alert></div>,
  avatar: <div className="flex items-center gap-4"><Avatar name="Maya Chen" size="sm" /><Avatar name="Dimas Prakoso" size="md" /><Avatar name="Siti Rahmawati" size="lg" /></div>,
  "info-panel": <InfoPanel tone="info" title="Contract boundary preserved" description="Feature modules stay UI-library-agnostic." icon={<Sparkles className="size-4" />} />,
  "property-list": <PropertyList items={[{ label: "Email", value: "alya@maslazu.dev" }, { label: "Role", value: "Privileged responder" }, { label: "Last activity", value: "3 minutes ago" }]} />,
  textarea: <div className="grid max-w-xl gap-2"><Label htmlFor="notes">Handover notes</Label><Textarea id="notes" placeholder="Summarize incident timeline, actions, and follow-up items." /></div>,
  dialog: <Dialog><DialogTrigger render={<Button>Open dialog</Button>} /><DialogContent><DialogHeader><DialogTitle>Create incident note</DialogTitle><DialogDescription>Capture timeline details before escalation.</DialogDescription></DialogHeader><div className="grid gap-2"><Label htmlFor="dialog-title">Title</Label><Input id="dialog-title" placeholder="Suspicious outbound traffic" /></div><DialogFooter><Button variant="outline">Cancel</Button><Button>Save note</Button></DialogFooter></DialogContent></Dialog>,
  tooltip: <TooltipProvider><Tooltip><TooltipTrigger render={<Button variant="outline">Hover for hint</Button>} /><TooltipContent>Critical actions should explain impact before click.</TooltipContent></Tooltip></TooltipProvider>,
  tabs: <Tabs defaultValue="overview" className="max-w-xl"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="events">Events</TabsTrigger><TabsTrigger value="owners">Owners</TabsTrigger></TabsList><TabsContent value="overview">Investigation overview and triage summary.</TabsContent><TabsContent value="events">Recent correlated findings and source systems.</TabsContent><TabsContent value="owners">Current assignees and escalation chain.</TabsContent></Tabs>,
  select: <Select defaultValue="high"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="critical">Critical</SelectItem></SelectContent></Select>,
  "dropdown-menu": <DropdownMenu><DropdownMenuTrigger render={<Button variant="outline" size="sm"><MoreHorizontal className="size-4" /></Button>} /><DropdownMenuContent align="end"><DropdownMenuLabel>Quick actions</DropdownMenuLabel><DropdownMenuItem>Open details</DropdownMenuItem><DropdownMenuItem>Duplicate rule</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive">Archive item</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
  switch: <div className="flex items-center gap-3"><Switch defaultChecked /><Label htmlFor="">Realtime sync enabled</Label></div>,
  table: <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Owner</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Suspicious Login</TableCell><TableCell>Open</TableCell><TableCell>Ops Team</TableCell></TableRow><TableRow><TableCell>Data Exfiltration</TableCell><TableCell>Closed</TableCell><TableCell>SecEng</TableCell></TableRow></TableBody></Table>,
  pagination: <Pagination currentPage={3} pageSize={25} totalItems={132} onPageChange={() => undefined} />,
  "navigation-menu": <NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="#">Overview</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuTrigger>Resources</NavigationMenuTrigger><NavigationMenuContent><div className="grid min-w-56 gap-1 p-1"><NavigationMenuLink href="#">Runbooks</NavigationMenuLink><NavigationMenuLink href="#">Detections</NavigationMenuLink><NavigationMenuLink href="#">Assets</NavigationMenuLink></div></NavigationMenuContent></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#">Settings</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>,
  loading: <Loading fullScreen={false} text="Fetching activity feed" className="min-h-0" />,
  "password-input": <div className="max-w-md"><PasswordInput register={{ name: "password", onBlur: () => undefined, onChange: () => undefined, ref: () => undefined }} label="Account password" error="Password must be at least 12 characters." /></div>,
  "confirm-dialog": <ConfirmDialogDemo />,
  "searchable-select": <SearchableSelect value="critical" onValueChange={() => undefined} options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }, { value: "critical", label: "Critical", description: "Escalates immediately" }]} placeholder="Choose severity" searchPlaceholder="Filter severities" />,
  "searchable-multi-select": <SearchableMultiSelect values={["auth", "network"]} onValuesChange={() => undefined} options={[{ value: "auth", label: "Authentication" }, { value: "network", label: "Network" }, { value: "endpoint", label: "Endpoint" }, { value: "email", label: "Email" }]} placeholder="Choose data sources" searchPlaceholder="Filter sources" />,
  "time-range-select": <TimeRangeSelect from="2026-05-16T12:00:00.000Z" to="2026-05-17T12:00:00.000Z" onChange={() => undefined} showRefresh />,
} as const;

const baseDefinitions = {
  button: { title: "Button", description: "Primary action trigger with size and variant control.", importPath: 'import { Button } from "@maslazu/lazu-ui";' },
  "app-shell": { title: "App Shell", description: "Shared application shell with sidebar, topbar, and injected navigation chrome.", importPath: 'import { AppShell } from "@maslazu/lazu-ui";' },
  "page-layout": { title: "Page Layout", description: "Page-level frame with icon, title, description, actions, and content stack.", importPath: 'import { PageLayout } from "@maslazu/lazu-ui";' },
  "detail-page-layout": { title: "Detail Page Layout", description: "Page layout variant with primary content and optional aside column.", importPath: 'import { DetailPageLayout } from "@maslazu/lazu-ui";' },
  card: { title: "Card", description: "Structured surface for grouped content and actions.", importPath: 'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@maslazu/lazu-ui";' },
  section: { title: "Section", description: "Composed card surface with shared header for page-level content groups.", importPath: 'import { Section } from "@maslazu/lazu-ui";' },
  "form-section": { title: "Form Section", description: "Form-oriented section surface used by showcase forms and settings screens.", importPath: 'import { FormSection } from "@maslazu/lazu-ui";' },
  input: { title: "Input", description: "Single-line text field for forms and search.", importPath: 'import { Input, Label } from "@maslazu/lazu-ui";' },
  badge: { title: "Badge", description: "Compact status pill for small metadata and counts.", importPath: 'import { Badge } from "@maslazu/lazu-ui";' },
  "metric-card": { title: "Metric Card", description: "Compact metric surface for dashboard KPIs and status snapshots.", importPath: 'import { MetricCard } from "@maslazu/lazu-ui";' },
  alert: { title: "Alert", description: "Inline feedback block for warnings, info, and destructive messages.", importPath: 'import { Alert, AlertDescription, AlertTitle } from "@maslazu/lazu-ui";' },
  avatar: { title: "Avatar", description: "Profile image with deterministic fallback initials and color.", importPath: 'import { Avatar } from "@maslazu/lazu-ui";' },
  "info-panel": { title: "Info Panel", description: "Informational callout block for contextual notes inside feature pages.", importPath: 'import { InfoPanel } from "@maslazu/lazu-ui";' },
  "property-list": { title: "Property List", description: "Label-value list for profiles, summaries, and detail sidebars.", importPath: 'import { PropertyList } from "@maslazu/lazu-ui";' },
  textarea: { title: "Textarea", description: "Multi-line text field for notes, feedback, and long-form input.", importPath: 'import { Label, Textarea } from "@maslazu/lazu-ui";' },
  dialog: { title: "Dialog", description: "Modal overlay for focused tasks and confirmations.", importPath: 'import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@maslazu/lazu-ui";' },
  tooltip: { title: "Tooltip", description: "Compact hover/focus hint for supporting context.", importPath: 'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@maslazu/lazu-ui";' },
  tabs: { title: "Tabs", description: "Switch between related content sections in place.", importPath: 'import { Tabs, TabsContent, TabsList, TabsTrigger } from "@maslazu/lazu-ui";' },
  select: { title: "Select", description: "Single-choice listbox with styled trigger and popup.", importPath: 'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@maslazu/lazu-ui";' },
  "dropdown-menu": { title: "Dropdown Menu", description: "Action menu for contextual commands and secondary options.", importPath: 'import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@maslazu/lazu-ui";' },
  switch: { title: "Switch", description: "Binary control for enabling or disabling settings.", importPath: 'import { Label, Switch } from "@maslazu/lazu-ui";' },
  table: { title: "Table", description: "Structured data grid for records and metrics.", importPath: 'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@maslazu/lazu-ui";' },
  pagination: { title: "Pagination", description: "Page navigation summary with previous and next controls.", importPath: 'import { Pagination } from "@maslazu/lazu-ui";' },
  "navigation-menu": { title: "Navigation Menu", description: "Top-level navigation with optional dropdown content.", importPath: 'import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@maslazu/lazu-ui";' },
  loading: { title: "Loading", description: "Centered loading state for page and panel placeholders.", importPath: 'import { Loading } from "@maslazu/lazu-ui";' },
  "password-input": { title: "Password Input", description: "Password field with reveal toggle and inline error support.", importPath: 'import { PasswordInput } from "@maslazu/lazu-ui";' },
  "confirm-dialog": { title: "Confirm Dialog", description: "Reusable confirmation modal for destructive and high-impact actions.", importPath: 'import { ConfirmDialog } from "@maslazu/lazu-ui";' },
  "searchable-select": { title: "Searchable Select", description: "Single-select combobox with inline filtering and optional custom values.", importPath: 'import { SearchableSelect } from "@maslazu/lazu-ui";' },
  "searchable-multi-select": { title: "Searchable Multi Select", description: "Multi-select picker with removable chips and search filtering.", importPath: 'import { SearchableMultiSelect } from "@maslazu/lazu-ui";' },
  "time-range-select": { title: "Time Range Select", description: "Absolute and quick-pick time range selector with optional refresh action.", importPath: 'import { TimeRangeSelect } from "@maslazu/lazu-ui";' },
} as const;

type ComponentDocId = keyof typeof baseDefinitions;

function titleToFileName(title: string) {
  return `components/ui/${title.toLowerCase().replace(/\s+/g, "-")}.tsx`;
}

function createDoc(id: ComponentDocId, overrides: Partial<ComponentDoc> = {}): ComponentDoc {
  const base = baseDefinitions[id];
  const previewCode = previewCodeById[id];

  return {
    title: base.title,
    description: base.description,
    importPath: base.importPath,
    preview: componentPreviews[id],
    code: previewCode,
    installation: {
      command: "pnpm add @maslazu/lazu-ui",
      manual: [
        {
          title: "Install package from GitHub Packages.",
          code: "pnpm add @maslazu/lazu-ui",
          lang: "bash",
        },
        {
          title: "Import shared stylesheet once in your app shell.",
          code: 'import "@maslazu/lazu-ui/styles.css";',
          lang: "tsx",
        },
        {
          title: `Import ${base.title} from package root.`,
          code: base.importPath,
          lang: "tsx",
        },
      ],
    },
    usage: {
      importCode: base.importPath,
      exampleCode: previewCode,
    },
    composition: {
      description: `Use following composition to build ${base.title}.`,
      tree: base.title,
    },
    examples: [
      {
        id: `${id}-default`,
        title: `${base.title} preview`,
        description: base.description,
        preview: componentPreviews[id],
        code: previewCode,
      },
    ],
    api: [
      {
        name: base.title,
        description: `${base.title} component ${base.description.charAt(0).toLowerCase()}${base.description.slice(1)}`,
        props: [
          { prop: "className", type: "string", default: "-" },
        ],
      },
    ],
    ...overrides,
  };
}

export const componentDocs: Record<ComponentDocId, ComponentDoc> = {
  button: createDoc("button", {
    composition: {
      description: "Use following composition to build button actions.",
      tree: "Button",
    },
    api: [
      {
        name: "Button",
        description: "Button triggers an action with shared variant and size styling.",
        props: [
          { prop: "variant", type: '"solid" | "outline" | "ghost" | "destructive"', default: '"solid"' },
          { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { prop: "type", type: '"button" | "submit" | "reset"', default: '"button"' },
          { prop: "className", type: "string", default: "-" },
        ],
      },
    ],
  }),
  "app-shell": createDoc("app-shell", {
    composition: { description: "Use AppShell at route-layout level to own shared chrome and render feature pages inside nested content area.", tree: "AppShell\n├── appIcon\n├── appTitle\n├── appSubtitle\n├── sidebarSections\n│   └── items[]\n│       └── children[]\n├── breadcrumbContent\n├── topbarItems\n└── children" },
    api: [{ name: "AppShell", description: "AppShell renders sidebar and topbar chrome while the app injects product-specific navigation and controls.", props: [{ prop: "appIcon", type: "ReactNode", default: "-" }, { prop: "appTitle", type: "ReactNode", default: '"Lazu UI"' }, { prop: "appSubtitle", type: "ReactNode", default: '"Showcase"' }, { prop: "sidebarSections", type: "AppShellSection[]", default: "[]" }, { prop: "defaultExpanded", type: "boolean", default: "false" }, { prop: "children", type: "AppShellNavItem[]", default: "-" }, { prop: "breadcrumbContent", type: "ReactNode", default: "-" }, { prop: "topbarItems", type: "ReactNode", default: "-" }, { prop: "desktopCollapsed", type: "boolean", default: "false" }, { prop: "mobileOpen", type: "boolean", default: "false" }] }],
  }),
  "page-layout": createDoc("page-layout", {
    composition: { description: "Use PageLayout for feature-page headers with shared icon, actions, and content rhythm.", tree: "PageLayout\n├── pageIcon\n├── title\n├── description\n├── actions\n└── children" },
    api: [{ name: "PageLayout", description: "PageLayout renders page header chrome used by showcase feature screens.", props: [{ prop: "pageIcon", type: "Lucide icon component", default: "-" }, { prop: "title", type: "ReactNode", default: "required" }, { prop: "description", type: "ReactNode", default: "-" }, { prop: "actions", type: "ReactNode", default: "-" }] }],
  }),
  "detail-page-layout": createDoc("detail-page-layout", {
    composition: { description: "Use DetailPageLayout when a page needs left-side back navigation, header actions, main content, and an optional summary aside.", tree: "DetailPageLayout\n├── onBack | backTo\n├── pageIcon\n├── title\n├── description\n├── toolbar\n├── actions\n├── secondaryActions\n├── aside\n└── children" },
    api: [{ name: "DetailPageLayout", description: "DetailPageLayout extends shared page framing with built-in back navigation and optional aside column.", props: [{ prop: "pageIcon", type: "Lucide icon component", default: "-" }, { prop: "title", type: "ReactNode", default: "required" }, { prop: "description", type: "ReactNode", default: "-" }, { prop: "onBack", type: "() => void", default: "-" }, { prop: "backTo", type: "string", default: "-" }, { prop: "toolbar", type: "ReactNode", default: "-" }, { prop: "actions", type: "ReactNode", default: "-" }, { prop: "secondaryActions", type: "ReactNode", default: "-" }, { prop: "aside", type: "ReactNode", default: "-" }] }],
  }),
  card: createDoc("card", {
    composition: {
      description: "Use following composition to build card sections.",
      tree: "Card\n├── CardHeader\n├── CardTitle\n├── CardDescription\n├── CardContent\n└── CardFooter",
    },
    api: [
      { name: "Card", description: "Card provides bounded surface for grouped content.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardHeader", description: "CardHeader groups title and supporting description.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardTitle", description: "CardTitle renders emphasized heading inside card header.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardDescription", description: "CardDescription renders supporting summary text.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardContent", description: "CardContent renders main body content.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardFooter", description: "CardFooter aligns actions and summaries at bottom.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  section: createDoc("section", {
    composition: { description: "Section composes Card and SectionHeader into consistent page content blocks.", tree: "Section\n├── SectionHeader\n└── children" },
    api: [{ name: "Section", description: "Section groups related page content with shared title, description, and action treatment.", props: [{ prop: "title", type: "ReactNode", default: "-" }, { prop: "description", type: "ReactNode", default: "-" }, { prop: "actions", type: "ReactNode", default: "-" }, { prop: "inset", type: "boolean", default: "true" }] }],
  }),
  "form-section": createDoc("form-section", {
    composition: { description: "FormSection applies form-oriented grouping on top of Section.", tree: "FormSection\n├── SectionHeader\n└── form content" },
    api: [{ name: "FormSection", description: "FormSection is the showcase pattern for grouped settings and form blocks.", props: [{ prop: "title", type: "ReactNode", default: "-" }, { prop: "description", type: "ReactNode", default: "-" }, { prop: "actions", type: "ReactNode", default: "-" }] }],
  }),
  input: createDoc("input", {
    composition: { description: "Use following composition to build labeled text input.", tree: "Label\n└── Input" },
    api: [{ name: "Input", description: "Input renders single-line text, email, search, and date-time fields.", props: [{ prop: "type", type: '"text" | "email" | "password" | string', default: '"text"' }, { prop: "className", type: "string", default: "-" }, { prop: "disabled", type: "boolean", default: "false" }] }],
  }),
  badge: createDoc("badge", {
    api: [{ name: "Badge", description: "Badge displays small semantic status labels and counters.", props: [{ prop: "variant", type: '"default" | "secondary" | "success" | "warning" | "destructive"', default: '"default"' }, { prop: "className", type: "string", default: "-" }] }],
  }),
  "metric-card": createDoc("metric-card", {
    composition: { description: "MetricCard is standalone KPI surface for dashboard rows.", tree: "MetricCard" },
    api: [{ name: "MetricCard", description: "MetricCard displays compact metric title, value, description, and optional icon.", props: [{ prop: "title", type: "ReactNode", default: "required" }, { prop: "value", type: "ReactNode", default: "required" }, { prop: "description", type: "ReactNode", default: "-" }, { prop: "icon", type: "ReactNode", default: "-" }] }],
  }),
  alert: createDoc("alert", {
    usage: {
      importCode: 'import { Alert, AlertDescription, AlertTitle } from "@maslazu/lazu-ui";',
      exampleCode: `<Alert>\n  <Bell className="size-4" />\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>\n    You can add components and dependencies to your app using Dev Kit.\n  </AlertDescription>\n</Alert>`,
    },
    composition: {
      description: "Use following composition to build an Alert.",
      tree: "Alert\n├── Icon\n├── AlertTitle\n└── AlertDescription",
    },
    examples: [
      { id: "alert-basic", title: "Basic", description: "A basic alert with icon, title, and description.", preview: <Alert><Bell className="size-4" /><AlertTitle>Heads up!</AlertTitle><AlertDescription>Review alert copy before rollout.</AlertDescription></Alert>, code: `<Alert>\n  <Bell className="size-4" />\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>Review alert copy before rollout.</AlertDescription>\n</Alert>` },
      { id: "alert-destructive", title: "Destructive", description: "Use destructive variant for high-risk failures.", preview: <Alert variant="destructive"><AlertCircle className="size-4" /><AlertTitle>Sync failed</AlertTitle><AlertDescription>Payment reconciliation queue stopped after 4 retries.</AlertDescription></Alert>, code: `<Alert variant="destructive">\n  <AlertCircle className="size-4" />\n  <AlertTitle>Sync failed</AlertTitle>\n  <AlertDescription>Payment reconciliation queue stopped after 4 retries.</AlertDescription>\n</Alert>` },
    ],
    api: [
      { name: "Alert", description: "Alert displays callout for user attention.", props: [{ prop: "variant", type: '"default" | "destructive"', default: '"default"' }, { prop: "className", type: "string", default: "-" }] },
      { name: "AlertTitle", description: "AlertTitle displays heading inside alert body.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "AlertDescription", description: "AlertDescription renders supporting message copy.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  avatar: createDoc("avatar", {
    composition: { description: "Avatar is standalone surface with optional image and deterministic fallback.", tree: "Avatar" },
    api: [{ name: "Avatar", description: "Avatar renders person initials or image fallback by name.", props: [{ prop: "name", type: "string", default: "required" }, { prop: "src", type: "string", default: "-" }, { prop: "seed", type: "string", default: "-" }, { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' }, { prop: "className", type: "string", default: "-" }] }],
  }),
  "info-panel": createDoc("info-panel", {
    composition: { description: "InfoPanel is standalone contextual callout for inline guidance and status notes.", tree: "InfoPanel" },
    api: [{ name: "InfoPanel", description: "InfoPanel renders toned contextual guidance used heavily in showcase overview pages.", props: [{ prop: "title", type: "ReactNode", default: "-" }, { prop: "description", type: "ReactNode", default: "-" }, { prop: "icon", type: "ReactNode", default: "-" }, { prop: "tone", type: '"default" | "info" | "success" | "warning" | "destructive"', default: '"default"' }] }],
  }),
  "property-list": createDoc("property-list", {
    composition: { description: "PropertyList is standalone label-value stack for sidebars and detail summaries.", tree: "PropertyList\n└── items[]" },
    api: [{ name: "PropertyList", description: "PropertyList renders compact label-value rows used in detail-page asides.", props: [{ prop: "items", type: "Array<{ label: ReactNode; value: ReactNode; hint?: ReactNode }>", default: "required" }] }],
  }),
  textarea: createDoc("textarea", {
    composition: { description: "Use following composition to build multi-line form input.", tree: "Label\n└── Textarea" },
    api: [{ name: "Textarea", description: "Textarea captures longer notes and freeform content.", props: [{ prop: "className", type: "string", default: "-" }, { prop: "rows", type: "number", default: "3" }] }],
  }),
  dialog: createDoc("dialog", {
    composition: { description: "Use following composition to build modal workflows.", tree: "Dialog\n├── DialogTrigger\n└── DialogContent\n    ├── DialogHeader\n    ├── DialogTitle\n    ├── DialogDescription\n    └── DialogFooter" },
    api: [
      { name: "Dialog", description: "Dialog coordinates open state and accessibility for modal flows.", props: [{ prop: "open", type: "boolean", default: "uncontrolled" }, { prop: "onOpenChange", type: "(open: boolean) => void", default: "-" }] },
      { name: "DialogTrigger", description: "DialogTrigger opens dialog from trigger element or render prop target.", props: [{ prop: "render", type: "ReactElement", default: "-" }, { prop: "className", type: "string", default: "-" }] },
      { name: "DialogContent", description: "DialogContent renders modal panel body.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "DialogHeader", description: "DialogHeader groups dialog title and description.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "DialogFooter", description: "DialogFooter aligns action buttons in dialog footer.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "DialogTitle", description: "DialogTitle renders accessible modal heading.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "DialogDescription", description: "DialogDescription renders supporting modal copy.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  tooltip: createDoc("tooltip", {
    composition: { description: "Use following composition to build contextual hints.", tree: "TooltipProvider\n└── Tooltip\n    ├── TooltipTrigger\n    └── TooltipContent" },
    api: [
      { name: "TooltipProvider", description: "TooltipProvider shares timing and interaction behavior for nested tooltips.", props: [{ prop: "delay", type: "number", default: "-" }] },
      { name: "Tooltip", description: "Tooltip coordinates open state for trigger and content.", props: [{ prop: "open", type: "boolean", default: "uncontrolled" }, { prop: "onOpenChange", type: "(open: boolean) => void", default: "-" }] },
      { name: "TooltipTrigger", description: "TooltipTrigger defines interactive target that reveals tooltip content.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TooltipContent", description: "TooltipContent renders hint panel near trigger.", props: [{ prop: "sideOffset", type: "number", default: "8" }, { prop: "className", type: "string", default: "-" }] },
    ],
  }),
  tabs: createDoc("tabs", {
    composition: { description: "Use following composition to build section switching in place.", tree: "Tabs\n├── TabsList\n├── TabsTrigger\n└── TabsContent" },
    api: [
      { name: "Tabs", description: "Tabs manages selection state across related content panes.", props: [{ prop: "defaultValue", type: "string", default: "required" }, { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"' }, { prop: "className", type: "string", default: "-" }] },
      { name: "TabsList", description: "TabsList arranges tab triggers and supports visual variants.", props: [{ prop: "variant", type: '"default" | "line"', default: '"default"' }, { prop: "className", type: "string", default: "-" }] },
      { name: "TabsTrigger", description: "TabsTrigger selects panel associated with matching value.", props: [{ prop: "value", type: "string", default: "required" }, { prop: "className", type: "string", default: "-" }] },
      { name: "TabsContent", description: "TabsContent renders panel content for matching tab value.", props: [{ prop: "value", type: "string", default: "required" }, { prop: "className", type: "string", default: "-" }] },
    ],
  }),
  select: createDoc("select", {
    composition: { description: "Use following composition to build styled choice picker.", tree: "Select\n├── SelectTrigger\n│   └── SelectValue\n└── SelectContent\n    └── SelectItem" },
    api: [
      { name: "Select", description: "Select manages single-value listbox interaction.", props: [{ prop: "defaultValue", type: "string", default: "-" }, { prop: "value", type: "string", default: "uncontrolled" }, { prop: "onValueChange", type: "(value: string) => void", default: "-" }] },
      { name: "SelectTrigger", description: "SelectTrigger renders anchor button for current value and popup toggle.", props: [{ prop: "size", type: '"sm" | "default"', default: '"default"' }, { prop: "className", type: "string", default: "-" }] },
      { name: "SelectValue", description: "SelectValue renders selected option label or placeholder text.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "SelectContent", description: "SelectContent renders popup surface and placement behavior.", props: [{ prop: "side", type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"', default: '"bottom"' }, { prop: "align", type: '"center" | "start" | "end"', default: '"center"' }, { prop: "className", type: "string", default: "-" }] },
      { name: "SelectItem", description: "SelectItem renders selectable option row inside popup list.", props: [{ prop: "value", type: "string", default: "required" }, { prop: "className", type: "string", default: "-" }] },
    ],
  }),
  "dropdown-menu": createDoc("dropdown-menu", {
    composition: { description: "Use following composition to build contextual action menus.", tree: "DropdownMenu\n├── DropdownMenuTrigger\n└── DropdownMenuContent\n    ├── DropdownMenuLabel\n    ├── DropdownMenuItem\n    └── DropdownMenuSeparator" },
    api: [
      { name: "DropdownMenu", description: "DropdownMenu coordinates menu open state and keyboard interactions.", props: [{ prop: "open", type: "boolean", default: "uncontrolled" }, { prop: "onOpenChange", type: "(open: boolean) => void", default: "-" }] },
      { name: "DropdownMenuTrigger", description: "DropdownMenuTrigger anchors menu to trigger element or render prop target.", props: [{ prop: "render", type: "ReactElement", default: "-" }] },
      { name: "DropdownMenuContent", description: "DropdownMenuContent renders popup surface and placement behavior.", props: [{ prop: "align", type: '"start" | "center" | "end"', default: '"start"' }, { prop: "side", type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"', default: '"bottom"' }, { prop: "className", type: "string", default: "-" }] },
      { name: "DropdownMenuLabel", description: "DropdownMenuLabel renders non-interactive section heading inside menu.", props: [{ prop: "inset", type: "boolean", default: "false" }, { prop: "className", type: "string", default: "-" }] },
      { name: "DropdownMenuItem", description: "DropdownMenuItem renders action row inside menu surface.", props: [{ prop: "variant", type: '"default" | "destructive"', default: '"default"' }, { prop: "inset", type: "boolean", default: "false" }, { prop: "className", type: "string", default: "-" }] },
      { name: "DropdownMenuSeparator", description: "DropdownMenuSeparator divides related groups of menu items.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  switch: createDoc("switch", { api: [{ name: "Switch", description: "Switch toggles boolean state between on and off values.", props: [{ prop: "defaultChecked", type: "boolean", default: "false" }, { prop: "checked", type: "boolean", default: "uncontrolled" }, { prop: "thumbClassName", type: "string", default: "-" }, { prop: "className", type: "string", default: "-" }] }] }),
  table: createDoc("table", {
    composition: { description: "Use following composition to build structured tables.", tree: "Table\n├── TableHeader\n│   └── TableRow\n│       └── TableHead\n├── TableBody\n│   └── TableRow\n│       └── TableCell\n├── TableFooter\n└── TableCaption" },
    api: [
      { name: "Table", description: "Table renders outer table element and wrapper styling hook.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TableHeader", description: "TableHeader renders semantic table head section.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TableBody", description: "TableBody renders semantic table body section.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TableFooter", description: "TableFooter renders semantic table footer summary row group.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TableRow", description: "TableRow renders row with shared hover and selected styling.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TableHead", description: "TableHead renders header cell with muted label treatment.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TableCell", description: "TableCell renders body cell content.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "TableCaption", description: "TableCaption renders supporting caption below table.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  pagination: createDoc("pagination", { composition: { description: "Pagination is standalone navigation summary with previous and next controls.", tree: "Pagination" }, api: [{ name: "Pagination", description: "Pagination summarizes current page and navigation state.", props: [{ prop: "currentPage", type: "number", default: "required" }, { prop: "pageSize", type: "number", default: "required" }, { prop: "totalItems", type: "number", default: "required" }, { prop: "onPageChange", type: "(page: number) => void", default: "required" }, { prop: "className", type: "string", default: "-" }] }] }),
  "navigation-menu": createDoc("navigation-menu", {
    composition: { description: "Use following composition to build top-level nav with optional popups.", tree: "NavigationMenu\n└── NavigationMenuList\n    └── NavigationMenuItem\n        ├── NavigationMenuLink\n        ├── NavigationMenuTrigger\n        └── NavigationMenuContent" },
    api: [
      { name: "NavigationMenu", description: "NavigationMenu coordinates nav alignment and popup viewport behavior.", props: [{ prop: "align", type: '"start" | "center" | "end"', default: '"start"' }, { prop: "className", type: "string", default: "-" }] },
      { name: "NavigationMenuList", description: "NavigationMenuList arranges visible nav items across the top level.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "NavigationMenuItem", description: "NavigationMenuItem groups individual link or trigger content.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "NavigationMenuLink", description: "NavigationMenuLink renders top-level or popup navigation destination.", props: [{ prop: "active", type: "boolean", default: "false" }, { prop: "closeOnClick", type: "boolean", default: "-" }, { prop: "className", type: "string", default: "-" }] },
      { name: "NavigationMenuTrigger", description: "NavigationMenuTrigger opens popup content for nested navigation groups.", props: [{ prop: "active", type: "boolean", default: "false" }, { prop: "className", type: "string", default: "-" }] },
      { name: "NavigationMenuContent", description: "NavigationMenuContent renders popup panel content for trigger item.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  loading: createDoc("loading", { composition: { description: "Loading is standalone status surface for page or panel placeholders.", tree: "Loading" }, api: [{ name: "Loading", description: "Loading presents centered progress state for panels and pages.", props: [{ prop: "fullScreen", type: "boolean", default: "true" }, { prop: "text", type: "string", default: '"Loading..."' }, { prop: "className", type: "string", default: "-" }] }] }),
  "password-input": createDoc("password-input", {
    usage: {
      importCode: 'import { PasswordInput } from "@maslazu/lazu-ui";',
      exampleCode: `const register = {
  name: "password",
  onBlur: () => undefined,
  onChange: () => undefined,
  ref: () => undefined,
};

<PasswordInput
  register={register}
  label="Account password"
  error="Password must be at least 12 characters."
/>`,
    },
    composition: { description: "Use following composition to build secure field with reveal toggle.", tree: "PasswordInput" },
    api: [{ name: "PasswordInput", description: "PasswordInput wraps secure field, label, and validation message.", props: [{ prop: "register", type: "{ name: string; onBlur: fn; onChange: fn; ref: fn }", default: "required" }, { prop: "label", type: "string", default: "-" }, { prop: "error", type: "string", default: "-" }] }],
  }),
  "confirm-dialog": createDoc("confirm-dialog", {
    usage: {
      importCode: 'import { useState } from "react";\nimport { Button, ConfirmDialog } from "@maslazu/lazu-ui";',
      exampleCode: `function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open confirm dialog
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Archive detection"
        description="This removes active visibility from rule catalog."
        confirmLabel="Archive"
        cancelLabel="Keep it"
        onConfirm={() => undefined}
        variant="destructive"
      />
    </>
  );
}`,
    },
    composition: { description: "ConfirmDialog is standalone confirmation overlay wrapper.", tree: "ConfirmDialog" },
    api: [{ name: "ConfirmDialog", description: "ConfirmDialog handles dangerous or high-impact confirmation flows.", props: [{ prop: "open", type: "boolean", default: "required" }, { prop: "onOpenChange", type: "(open: boolean) => void", default: "required" }, { prop: "title", type: "string", default: "required" }, { prop: "description", type: "string", default: "required" }, { prop: "onConfirm", type: "() => void | Promise<void>", default: "required" }, { prop: "confirmLabel", type: "string", default: '"Confirm"' }, { prop: "cancelLabel", type: "string", default: '"Cancel"' }, { prop: "loadingLabel", type: "string", default: '"Working..."' }, { prop: "variant", type: '"default" | "destructive"', default: '"default"' }] }],
  }),
  "searchable-select": createDoc("searchable-select", {
    usage: {
      importCode: 'import { useState } from "react";\nimport { SearchableSelect } from "@maslazu/lazu-ui";',
      exampleCode: `function Example() {
  const [value, setValue] = useState("critical");
  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical", description: "Escalates immediately" },
  ];

  return (
    <SearchableSelect
      value={value}
      onValueChange={setValue}
      options={options}
      placeholder="Choose severity"
      searchPlaceholder="Filter severities"
    />
  );
}`,
    },
    composition: { description: "SearchableSelect is standalone searchable single-select popover.", tree: "SearchableSelect" },
    api: [{ name: "SearchableSelect", description: "SearchableSelect combines search filtering with single-value selection.", props: [{ prop: "options", type: "Array<{ value: string; label: string; description?: string }>", default: "required" }, { prop: "value", type: "string | null", default: "-" }, { prop: "onValueChange", type: "(value: string) => void", default: "required" }, { prop: "allowCustomValue", type: "boolean", default: "false" }, { prop: "searchPlaceholder", type: "string", default: '"Search"' }, { prop: "emptyText", type: "string", default: '"No results"' }] }],
  }),
  "searchable-multi-select": createDoc("searchable-multi-select", {
    usage: {
      importCode: 'import { useState } from "react";\nimport { SearchableMultiSelect } from "@maslazu/lazu-ui";',
      exampleCode: `function Example() {
  const [values, setValues] = useState(["auth", "network"]);
  const options = [
    { value: "auth", label: "Authentication" },
    { value: "network", label: "Network" },
    { value: "endpoint", label: "Endpoint" },
    { value: "email", label: "Email" },
  ];

  return (
    <SearchableMultiSelect
      values={values}
      onValuesChange={setValues}
      options={options}
      placeholder="Choose data sources"
      searchPlaceholder="Filter sources"
    />
  );
}`,
    },
    composition: { description: "SearchableMultiSelect is standalone searchable multi-select popover with chips.", tree: "SearchableMultiSelect" },
    api: [{ name: "SearchableMultiSelect", description: "SearchableMultiSelect manages multiple selected values with inline chips.", props: [{ prop: "options", type: "Array<{ value: string; label: string; description?: string }>", default: "required" }, { prop: "values", type: "string[]", default: "required" }, { prop: "onValuesChange", type: "(values: string[]) => void", default: "required" }, { prop: "allowCustomValue", type: "boolean", default: "false" }, { prop: "doneLabel", type: "string", default: '"Done"' }, { prop: "emptyText", type: "string", default: '"No results"' }] }],
  }),
  "time-range-select": createDoc("time-range-select", {
    usage: {
      importCode: 'import { useState } from "react";\nimport { TimeRangeSelect } from "@maslazu/lazu-ui";',
      exampleCode: `function Example() {
  const [range, setRange] = useState({
    from: "2026-05-16T12:00:00.000Z",
    to: "2026-05-17T12:00:00.000Z",
  });

  return (
    <TimeRangeSelect
      from={range.from}
      to={range.to}
      onChange={(from, to) => setRange({ from, to })}
      showRefresh
    />
  );
}`,
    },
    composition: { description: "TimeRangeSelect is standalone date-range popover with absolute and quick range controls.", tree: "TimeRangeSelect" },
    api: [{ name: "TimeRangeSelect", description: "TimeRangeSelect coordinates absolute range values and quick picks.", props: [{ prop: "from", type: "string", default: "required" }, { prop: "to", type: "string", default: "required" }, { prop: "onChange", type: "(from: string, to: string) => void", default: "required" }, { prop: "showRefresh", type: "boolean", default: "true" }, { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' }] }],
  }),
};

export type { ComponentDocId };

export function componentDocIds(): ComponentDocId[] {
  return Object.keys(componentDocs) as ComponentDocId[];
}

export const landingPreviews = [
  {
    title: "Form stack",
    component: <Card><CardHeader><CardTitle>Contact support</CardTitle><CardDescription>Minimal field stack from shared primitives.</CardDescription></CardHeader><CardContent className="grid gap-4"><div className="grid gap-2"><Label htmlFor="demo-email">Email</Label><Input id="demo-email" placeholder="name@company.com" /></div><div className="grid gap-2"><Label htmlFor="demo-notes">Issue</Label><Textarea id="demo-notes" placeholder="Describe incident context." /></div></CardContent><CardFooter><Button className="gap-2"><Mail className="size-4" />Send ticket</Button></CardFooter></Card>,
  },
  {
    title: "Status band",
    component: <div className="flex flex-wrap items-center gap-3"><Badge>Ready</Badge><Badge variant="success">Healthy</Badge><Badge variant="warning">Pending review</Badge><Badge variant="destructive">Blocked</Badge></div>,
  },
  {
    title: "Feedback loop",
    component: <div className="grid gap-3"><Alert><Sparkles className="size-4" /><AlertTitle>Starter system online</AlertTitle><AlertDescription>Foundation ready for more shared primitives and docs pages.</AlertDescription></Alert><Button variant="outline" className="w-fit gap-2" onClick={() => toast.success("Toast wired from docs app.")}><CreditCard className="size-4" />Fire toast</Button></div>,
  },
  {
    title: "Identity",
    component: <div className="flex items-center gap-3"><Avatar name="Lazu Operator" /><div><p className="font-medium">Lazu Operator</p><p className="text-sm text-muted-foreground">Design system maintainer</p></div></div>,
  },
  {
    title: "Content shell",
    component: <Card className="max-w-sm"><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="size-4" />Documentation page</CardTitle><CardDescription>Route-driven docs page with preview and code snippet.</CardDescription></CardHeader></Card>,
  }
];

function ConfirmDialogDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open confirm dialog</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Archive detection"
        description="This removes active visibility from the rule catalog."
        confirmLabel="Archive"
        cancelLabel="Keep it"
        onConfirm={() => undefined}
        variant="destructive"
      />
    </>
  );
}

function AppShellPreview() {
  return (
    <div className="h-[680px] overflow-hidden rounded-2xl border border-border/60 bg-background text-foreground">
      <div className="flex h-full w-full overflow-hidden bg-background text-foreground">
        <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground shadow-xl md:shadow-none">
          <div className="w-full px-4 py-3">
            <div className="flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5">
              <img src="/favicon.svg" alt="Lazu UI" className="h-11 w-11 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-lg font-bold text-sidebar-foreground">Lazu UI</p>
                <p className="truncate text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">Showcase</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden py-4">
            <nav className="w-64 space-y-6 px-4">
              <div className="space-y-1 overflow-hidden">
                <h4 className="whitespace-nowrap px-2 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">Documentation</h4>
                <div className="interactive-selected flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium">
                  <LayoutDashboard className="size-4 shrink-0" />
                  <span className="truncate">Overview</span>
                </div>
                <div className="interactive-chrome flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70">
                  <ShieldAlert className="size-4 shrink-0" />
                  <span className="truncate">Operations</span>
                </div>
                <div className="interactive-chrome flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70">
                  <SlidersHorizontal className="size-4 shrink-0" />
                  <span className="truncate">Form Lab</span>
                </div>
                <div className="interactive-chrome flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70">
                  <ShieldUser className="size-4 shrink-0" />
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <span className="truncate">People</span>
                    <ChevronDown className="size-4 shrink-0 text-sidebar-foreground/60" />
                  </div>
                </div>
                <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/60 pl-4">
                  <div className="interactive-chrome flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70">
                    <ShieldUser className="size-4 shrink-0" />
                    <span className="truncate">Profile</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex h-16 w-full shrink-0 bg-sidebar text-sidebar-foreground">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <Button variant="ghost" size="sm" className="interactive-chrome h-10 w-10 rounded-xl p-0 text-sidebar-foreground/70">
                    <span className="text-base">||</span>
                  </Button>
                  <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span className="truncate">Dev Kit</span>
                    <span className="px-0.5 text-lg leading-none text-muted-foreground/30">&rsaquo;</span>
                    <span className="font-bold text-foreground">Overview</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button variant="ghost" size="sm">
                  <Github className="size-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <main className="min-h-0 min-w-0 flex-1 overflow-y-auto rounded-tl-[2rem] rounded-tr-[2rem] border border-border/60 bg-surface p-6 text-surface-foreground md:p-8 md:pb-8">
              <PageLayout pageIcon={LayoutDashboard} title="Security operations overview" description="Shared app shell preview using showcase-like structure.">
                <Section title="Response stream" description="Feature content stays inside shell body.">
                  <InfoPanel title="Contract boundary preserved" description="Shell composes app chrome once." icon={<Sparkles className="size-4" />} />
                </Section>
              </PageLayout>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
