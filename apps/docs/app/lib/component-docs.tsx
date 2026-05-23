import * as React from "react";
import type { ReactNode } from "react";
import { AlertCircle, Bell, CreditCard, FileText, Mail, MoreHorizontal, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  Alert,
  AlertDescription,
  AlertTitle,
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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  PasswordInput,
  Pagination,
  SearchableMultiSelect,
  SearchableSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
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
  card: `<Card className="max-w-md">\n  <CardHeader>\n    <CardTitle>Weekly revenue</CardTitle>\n    <CardDescription>Snapshot from last 7 days.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-3xl font-semibold">$24,320</p>\n  </CardContent>\n  <CardFooter>\n    <Button size="sm">Open report</Button>\n  </CardFooter>\n</Card>`,
  input: `<div className="grid max-w-md gap-2">\n  <Label htmlFor="email">Email address</Label>\n  <Input id="email" type="email" placeholder="ops@lazu.dev" />\n</div>`,
  badge: `<div className="flex flex-wrap gap-3">\n  <Badge>Default</Badge>\n  <Badge variant="secondary">Secondary</Badge>\n  <Badge variant="success">Healthy</Badge>\n  <Badge variant="warning">Warning</Badge>\n  <Badge variant="destructive">Failed</Badge>\n</div>`,
  alert: `<Alert>\n  <Bell className="size-4" />\n  <AlertTitle>Deployment scheduled</AlertTitle>\n  <AlertDescription>Production rollout starts at 21:00 UTC.</AlertDescription>\n</Alert>`,
  avatar: `<div className="flex items-center gap-4">\n  <Avatar name="Maya Chen" size="sm" />\n  <Avatar name="Dimas Prakoso" size="md" />\n  <Avatar name="Siti Rahmawati" size="lg" />\n</div>`,
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
  card: <Card className="max-w-md"><CardHeader><CardTitle>Weekly revenue</CardTitle><CardDescription>Snapshot from last 7 days.</CardDescription></CardHeader><CardContent><p className="text-3xl font-semibold">$24,320</p></CardContent><CardFooter><Button size="sm">Open report</Button></CardFooter></Card>,
  input: <div className="grid max-w-md gap-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" placeholder="ops@lazu.dev" /></div>,
  badge: <div className="flex flex-wrap gap-3"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="success">Healthy</Badge><Badge variant="warning">Warning</Badge><Badge variant="destructive">Failed</Badge></div>,
  alert: <div className="grid max-w-2xl gap-4"><Alert><Bell className="size-4" /><AlertTitle>Deployment scheduled</AlertTitle><AlertDescription>Production rollout starts at 21:00 UTC.</AlertDescription></Alert><Alert variant="destructive"><AlertCircle className="size-4" /><AlertTitle>Sync failed</AlertTitle><AlertDescription>Payment reconciliation queue stopped after 4 retries.</AlertDescription></Alert></div>,
  avatar: <div className="flex items-center gap-4"><Avatar name="Maya Chen" size="sm" /><Avatar name="Dimas Prakoso" size="md" /><Avatar name="Siti Rahmawati" size="lg" /></div>,
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
  card: { title: "Card", description: "Structured surface for grouped content and actions.", importPath: 'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@maslazu/lazu-ui";' },
  input: { title: "Input", description: "Single-line text field for forms and search.", importPath: 'import { Input, Label } from "@maslazu/lazu-ui";' },
  badge: { title: "Badge", description: "Compact status pill for small metadata and counts.", importPath: 'import { Badge } from "@maslazu/lazu-ui";' },
  alert: { title: "Alert", description: "Inline feedback block for warnings, info, and destructive messages.", importPath: 'import { Alert, AlertDescription, AlertTitle } from "@maslazu/lazu-ui";' },
  avatar: { title: "Avatar", description: "Profile image with deterministic fallback initials and color.", importPath: 'import { Avatar } from "@maslazu/lazu-ui";' },
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
      command: `pnpm add ${base.title.toLowerCase().replace(/\s+/g, "-")}`,
      manual: [
        {
          title: "Copy and paste component source into your project.",
          filename: titleToFileName(base.title),
          code: previewCode,
          lang: "tsx",
        },
        {
          title: "Update import paths to match your project setup.",
          note: "Replace aliases or helpers to match your app structure before shipping.",
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
    installation: {
      command: "pnpm add button",
      manual: [
        { title: "Copy and paste button source into your project.", filename: "components/ui/button.tsx", code: previewCodeById.button, lang: "tsx" },
        { title: "Update import paths to match your project setup." },
      ],
    },
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
          { prop: "className", type: "string", default: "-" },
        ],
      },
    ],
  }),
  card: createDoc("card", {
    composition: {
      description: "Use following composition to build card sections.",
      tree: "Card\n├── CardHeader\n├── CardTitle\n├── CardDescription\n├── CardContent\n└── CardFooter",
    },
    api: [
      { name: "Card", description: "Card provides bounded surface for grouped content.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardHeader", description: "CardHeader groups title and supporting description.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardContent", description: "CardContent renders main body content.", props: [{ prop: "className", type: "string", default: "-" }] },
      { name: "CardFooter", description: "CardFooter aligns actions and summaries at bottom.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  input: createDoc("input", {
    composition: { description: "Use following composition to build labeled text input.", tree: "Label\n└── Input" },
    api: [{ name: "Input", description: "Input renders single-line text, email, and search fields.", props: [{ prop: "type", type: '"text" | "email" | "password" | string', default: '"text"' }, { prop: "className", type: "string", default: "-" }] }],
  }),
  badge: createDoc("badge", {
    api: [{ name: "Badge", description: "Badge displays small semantic status labels and counters.", props: [{ prop: "variant", type: '"default" | "secondary" | "success" | "warning" | "destructive"', default: '"default"' }, { prop: "className", type: "string", default: "-" }] }],
  }),
  alert: createDoc("alert", {
    installation: {
      command: "pnpm add alert",
      manual: [
        { title: "Copy and paste alert source into your project.", filename: "components/ui/alert.tsx", code: previewCodeById.alert, lang: "tsx" },
        { title: "Update import paths to match your project setup." },
      ],
    },
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
    api: [{ name: "Avatar", description: "Avatar renders person initials or image fallback by name.", props: [{ prop: "name", type: "string", default: "required" }, { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' }] }],
  }),
  textarea: createDoc("textarea", {
    composition: { description: "Use following composition to build multi-line form input.", tree: "Label\n└── Textarea" },
    api: [{ name: "Textarea", description: "Textarea captures longer notes and freeform content.", props: [{ prop: "className", type: "string", default: "-" }, { prop: "rows", type: "number", default: "3" }] }],
  }),
  dialog: createDoc("dialog", {
    composition: { description: "Use following composition to build modal workflows.", tree: "Dialog\n├── DialogTrigger\n└── DialogContent\n    ├── DialogHeader\n    ├── DialogTitle\n    ├── DialogDescription\n    └── DialogFooter" },
    api: [
      { name: "Dialog", description: "Dialog coordinates open state and accessibility for modal flows.", props: [{ prop: "open", type: "boolean", default: "uncontrolled" }, { prop: "onOpenChange", type: "(open: boolean) => void", default: "-" }] },
      { name: "DialogContent", description: "DialogContent renders modal panel body.", props: [{ prop: "className", type: "string", default: "-" }] },
    ],
  }),
  tooltip: createDoc("tooltip", {
    composition: { description: "Use following composition to build contextual hints.", tree: "TooltipProvider\n└── Tooltip\n    ├── TooltipTrigger\n    └── TooltipContent" },
    api: [{ name: "TooltipContent", description: "TooltipContent renders hint panel near trigger.", props: [{ prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"' }, { prop: "className", type: "string", default: "-" }] }],
  }),
  tabs: createDoc("tabs", {
    composition: { description: "Use following composition to build section switching in place.", tree: "Tabs\n├── TabsList\n├── TabsTrigger\n└── TabsContent" },
    api: [{ name: "Tabs", description: "Tabs manages selection state across related content panes.", props: [{ prop: "defaultValue", type: "string", default: "required" }, { prop: "className", type: "string", default: "-" }] }],
  }),
  select: createDoc("select", {
    composition: { description: "Use following composition to build styled choice picker.", tree: "Select\n├── SelectTrigger\n│   └── SelectValue\n└── SelectContent\n    └── SelectItem" },
    api: [{ name: "Select", description: "Select manages single-value listbox interaction.", props: [{ prop: "defaultValue", type: "string", default: "-" }, { prop: "value", type: "string", default: "uncontrolled" }] }],
  }),
  "dropdown-menu": createDoc("dropdown-menu", {
    composition: { description: "Use following composition to build contextual action menus.", tree: "DropdownMenu\n├── DropdownMenuTrigger\n└── DropdownMenuContent\n    ├── DropdownMenuLabel\n    ├── DropdownMenuItem\n    └── DropdownMenuSeparator" },
    api: [{ name: "DropdownMenuItem", description: "DropdownMenuItem renders action row inside menu surface.", props: [{ prop: "variant", type: '"default" | "destructive"', default: '"default"' }, { prop: "className", type: "string", default: "-" }] }],
  }),
  switch: createDoc("switch", { api: [{ name: "Switch", description: "Switch toggles boolean state between on and off values.", props: [{ prop: "defaultChecked", type: "boolean", default: "false" }, { prop: "checked", type: "boolean", default: "uncontrolled" }] }] }),
  table: createDoc("table", { composition: { description: "Use following composition to build structured tables.", tree: "Table\n├── TableHeader\n│   └── TableRow\n│       └── TableHead\n└── TableBody\n    └── TableRow\n        └── TableCell" } }),
  pagination: createDoc("pagination", { api: [{ name: "Pagination", description: "Pagination summarizes current page and navigation state.", props: [{ prop: "currentPage", type: "number", default: "required" }, { prop: "pageSize", type: "number", default: "required" }, { prop: "totalItems", type: "number", default: "required" }] }] }),
  "navigation-menu": createDoc("navigation-menu", { composition: { description: "Use following composition to build top-level nav with optional popups.", tree: "NavigationMenu\n└── NavigationMenuList\n    └── NavigationMenuItem\n        ├── NavigationMenuLink\n        ├── NavigationMenuTrigger\n        └── NavigationMenuContent" } }),
  loading: createDoc("loading", { api: [{ name: "Loading", description: "Loading presents centered progress state for panels and pages.", props: [{ prop: "fullScreen", type: "boolean", default: "true" }, { prop: "text", type: "string", default: '"Loading..."' }] }] }),
  "password-input": createDoc("password-input", { api: [{ name: "PasswordInput", description: "PasswordInput wraps secure field, label, and validation message.", props: [{ prop: "label", type: "string", default: "-" }, { prop: "error", type: "string", default: "-" }] }] }),
  "confirm-dialog": createDoc("confirm-dialog", { api: [{ name: "ConfirmDialog", description: "ConfirmDialog handles dangerous or high-impact confirmation flows.", props: [{ prop: "title", type: "string", default: "required" }, { prop: "description", type: "string", default: "required" }, { prop: "variant", type: '"default" | "destructive"', default: '"default"' }] }] }),
  "searchable-select": createDoc("searchable-select", { api: [{ name: "SearchableSelect", description: "SearchableSelect combines search filtering with single-value selection.", props: [{ prop: "options", type: "Array<{ value: string; label: string }>", default: "required" }, { prop: "value", type: "string", default: "-" }] }] }),
  "searchable-multi-select": createDoc("searchable-multi-select", { api: [{ name: "SearchableMultiSelect", description: "SearchableMultiSelect manages multiple selected values with inline chips.", props: [{ prop: "options", type: "Array<{ value: string; label: string }>", default: "required" }, { prop: "values", type: "string[]", default: "[]" }] }] }),
  "time-range-select": createDoc("time-range-select", { api: [{ name: "TimeRangeSelect", description: "TimeRangeSelect coordinates absolute range values and quick picks.", props: [{ prop: "from", type: "string", default: "required" }, { prop: "to", type: "string", default: "required" }, { prop: "showRefresh", type: "boolean", default: "false" }] }] }),
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
