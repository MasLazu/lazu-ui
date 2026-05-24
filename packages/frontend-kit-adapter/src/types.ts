import type {
  ButtonHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  SVGProps,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export type ButtonVariant = "solid" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";
export type AlertVariant = "info" | "success" | "warning" | "destructive";
export type BadgeVariant = "default" | "secondary" | "outline" | "destructive" | "success" | "warning";
export type EmptyStateTone = "neutral" | "warning" | "destructive";
export type PageIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
}

export interface PasswordInputProps extends InputProps {}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  variant?: AlertVariant;
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
}

export interface OptionItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  options: OptionItem[];
}

export interface SearchableSelectProps {
  label?: ReactNode;
  placeholder?: string;
  emptyLabel?: ReactNode;
  options: OptionItem[];
  value?: string;
  onValueChange: (value: string) => void;
}

export interface SearchableMultiSelectProps {
  label?: ReactNode;
  placeholder?: string;
  emptyLabel?: ReactNode;
  options: OptionItem[];
  values: string[];
  onValuesChange: (values: string[]) => void;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{
    value: string;
    label: ReactNode;
    content: ReactNode;
    disabled?: boolean;
  }>;
}

export interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
}

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export interface DialogProps {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export interface ConfirmDialogProps {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  destructive?: boolean;
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: EmptyStateTone;
}

export interface ErrorStateProps {
  title?: ReactNode;
  description?: ReactNode;
  retryAction?: ReactNode;
}

export interface LoadingProps {
  label?: ReactNode;
}

export interface ToastApi {
  success: (message: ReactNode) => void;
  error: (message: ReactNode) => void;
  info: (message: ReactNode) => void;
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {}
export interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {}
export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {}

export interface TableComponents {
  Root: ComponentType<TableProps>;
  Header: ComponentType<TableSectionProps>;
  Body: ComponentType<TableSectionProps>;
  Row: ComponentType<TableRowProps>;
  Head: ComponentType<TableHeadCellProps>;
  Cell: ComponentType<TableCellProps>;
}

export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface SummaryCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  value: ReactNode;
  description?: ReactNode;
}

export interface MetricCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  footer?: ReactNode;
}

export interface PropertyListItem {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
}

export interface PropertyListProps {
  items: PropertyListItem[];
}

export interface PageLayoutProps {
  pageIcon?: PageIconComponent;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export interface DetailPageLayoutProps extends PageLayoutProps {
  onBack?: () => void;
  backTo?: string;
  toolbar?: ReactNode;
  secondaryActions?: ReactNode;
  aside?: ReactNode;
}

export interface AppShellProps {
  children: ReactNode;
  desktopCollapsed?: boolean;
  mobileOpen?: boolean;
  onDesktopCollapsedChange?: (collapsed: boolean) => void;
  onMobileOpenChange?: (open: boolean) => void;
  appIcon?: ReactNode;
  appTitle?: ReactNode;
  appSubtitle?: ReactNode;
  sidebarSections?: Array<{
    key: string;
    title?: ReactNode;
    items?: Array<{
      key: string;
      to: string;
      label: ReactNode;
      icon?: ReactNode;
      exact?: boolean;
    }>;
    content?: ReactNode;
  }>;
  breadcrumbContent?: ReactNode;
  topbarItems?: ReactNode;
}

export interface SectionProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export interface FormSectionProps extends SectionProps {}

export interface InfoPanelProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "info" | "success" | "warning" | "destructive";
  children?: ReactNode;
}

export interface UiComponents {
  Button: ComponentType<ButtonProps>;
  Label: ComponentType<LabelProps>;
  Input: ComponentType<InputProps>;
  PasswordInput: ComponentType<PasswordInputProps>;
  Textarea: ComponentType<TextareaProps>;
  Card: ComponentType<CardProps>;
  Badge: ComponentType<BadgeProps>;
  Alert: ComponentType<AlertProps>;
  Avatar: ComponentType<AvatarProps>;
  Switch: ComponentType<SwitchProps>;
  Tabs: ComponentType<TabsProps>;
  Tooltip: ComponentType<TooltipProps>;
  AppShell: ComponentType<AppShellProps>;
  PageLayout: ComponentType<PageLayoutProps>;
  DetailPageLayout: ComponentType<DetailPageLayoutProps>;
  Section: ComponentType<SectionProps>;
  FormSection: ComponentType<FormSectionProps>;
  SummaryCard: ComponentType<SummaryCardProps>;
  MetricCard: ComponentType<MetricCardProps>;
  PropertyList: ComponentType<PropertyListProps>;
  InfoPanel: ComponentType<InfoPanelProps>;
  EmptyState: ComponentType<EmptyStateProps>;
  ErrorState: ComponentType<ErrorStateProps>;
  Dialog: ComponentType<DialogProps>;
  ConfirmDialog: ComponentType<ConfirmDialogProps>;
  Loading: ComponentType<LoadingProps>;
  Pagination: ComponentType<PaginationProps>;
  Select: ComponentType<SelectProps>;
  SearchableSelect: ComponentType<SearchableSelectProps>;
  SearchableMultiSelect: ComponentType<SearchableMultiSelectProps>;
  DropdownMenu: ComponentType<DropdownMenuProps>;
  Table: TableComponents;
}

export interface UiKit {
  id: string;
  components: UiComponents;
  toast: ToastApi;
}
