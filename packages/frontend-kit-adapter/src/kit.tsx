import type { UiKit } from "./types";
import { adapterToast } from "./toast";
import { Alert } from "./wrappers/alert";
import { Avatar } from "./wrappers/avatar";
import { ConfirmDialog } from "./wrappers/confirm-dialog";
import { DetailPageLayout } from "./wrappers/detail-page-layout";
import { Dialog } from "./wrappers/dialog";
import { DropdownMenu } from "./wrappers/dropdown-menu";
import { EmptyState } from "./wrappers/empty-state";
import { ErrorState } from "./wrappers/error-state";
import { Input } from "./wrappers/input";
import { Loading } from "./wrappers/loading";
import { PageLayout } from "./wrappers/page-layout";
import { PasswordInput } from "./wrappers/password-input";
import { SearchableMultiSelect } from "./wrappers/searchable-multi-select";
import { SearchableSelect } from "./wrappers/searchable-select";
import { Select } from "./wrappers/select";
import { SummaryCard } from "./wrappers/summary-card";
import { Switch } from "./wrappers/switch";
import { Table } from "./wrappers/table";
import { Tabs } from "./wrappers/tabs";
import { Textarea } from "./wrappers/textarea";
import { Tooltip } from "./wrappers/tooltip";
import {
  Badge,
  Button,
  Card,
  Label,
  Pagination,
} from "@maslazu/lazu-ui";

export function createLazuFrontendKitAdapter(): UiKit {
  return {
    id: "lazu-ui",
    components: {
      Button,
      Label,
      Input,
      PasswordInput,
      Textarea,
      Card,
      Badge,
      Alert,
      Avatar,
      Switch,
      Tabs,
      Tooltip,
      PageLayout,
      DetailPageLayout,
      SummaryCard,
      EmptyState,
      ErrorState,
      Dialog,
      ConfirmDialog,
      Loading,
      Pagination,
      Select,
      SearchableSelect,
      SearchableMultiSelect,
      DropdownMenu,
      Table,
    },
    toast: adapterToast,
  };
}

export const lazuFrontendKitAdapter = createLazuFrontendKitAdapter();
