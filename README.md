# Lazu UI

Shared React UI components and docs workspace for Beacon products.

## Packages

- `packages/ui`: publishable component library
- `packages/frontend-kit-adapter`: publishable adapter from `@maslazu/lazu-ui` to frontend kit `UiKit` contracts
- `apps/docs`: React Router docs app and local consumer

## Library Package

Published package name:

```text
@maslazu/lazu-ui
```

Frontend kit adapter package name:

```text
@maslazu/lazu-ui-frontend-kit-adapter
```

Install from GitHub Packages:

```bash
pnpm add @maslazu/lazu-ui
```

Install adapter for `lazu-frontend-kit` consumers:

```bash
pnpm add @maslazu/lazu-ui @maslazu/lazu-ui-frontend-kit-adapter @maslazu/frontend-kit-ui-contracts
```

Use in app:

```ts
import { Button } from "@maslazu/lazu-ui";
import "@maslazu/lazu-ui/styles.css";
```

Use in frontend-kit app:

```tsx
import "@maslazu/lazu-ui/styles.css";

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
}
```

Consume UI from contracts inside feature modules:

```tsx
import { useToast, useUiComponents } from "@maslazu/frontend-kit-ui-contracts";

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
}
```

Consumer `.npmrc`:

```ini
@maslazu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Local Commands

Build package:

```bash
pnpm build:ui
```

Build frontend-kit adapter:

```bash
pnpm build:frontend-kit-adapter
```

Run docs:

```bash
pnpm dev:docs
```

Typecheck docs:

```bash
pnpm typecheck:docs
```

Typecheck frontend-kit adapter:

```bash
pnpm typecheck:frontend-kit-adapter
```

## Frontend Kit Adapter

`@maslazu/lazu-ui-frontend-kit-adapter` exists for apps that use `lazu-frontend-kit` UI contracts but want Lazu UI as the concrete implementation.

Dependency direction:

```text
feature modules -> @maslazu/frontend-kit-ui-contracts
app shell -> @maslazu/lazu-ui-frontend-kit-adapter
adapter -> @maslazu/lazu-ui
```

This keeps feature modules UI-library-agnostic while the app shell selects the actual UI kit.

Current adapter exports:

- `createLazuFrontendKitAdapter()`
- `lazuFrontendKitAdapter`
- `LazuFrontendKitToaster`

Current adapter contract coverage:

- primitives: `Button`, `Label`, `Card`, `Badge`, `Alert`, `Avatar`, `Tooltip`
- forms: `Input`, `PasswordInput`, `Textarea`, `Select`, `SearchableSelect`, `SearchableMultiSelect`, `Switch`, `Tabs`
- feedback: `Dialog`, `ConfirmDialog`, `Loading`, `EmptyState`, `ErrorState`
- layouts: `PageLayout`, `DetailPageLayout`, `SummaryCard`
- data: `Pagination`, `DropdownMenu`, `Table`

Consumer notes:

- import `@maslazu/lazu-ui/styles.css` once in the app shell
- mount `LazuFrontendKitToaster` once near the root
- use `useUiComponents()` and `useToast()` from frontend kit contracts inside features

## Release

1. Update version in both `packages/ui/package.json` and `packages/frontend-kit-adapter/package.json`
2. Commit changes
3. Create tag like `v0.1.11`
4. Push tag
5. GitHub Actions publishes both packages to GitHub Packages

Published together from the release workflow:

- `@maslazu/lazu-ui`
- `@maslazu/lazu-ui-frontend-kit-adapter`
