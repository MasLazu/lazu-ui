# Lazu UI

Shared React UI components and docs workspace for Beacon products.

## Packages

- `packages/ui`: publishable component library
- `apps/docs`: React Router docs app and local consumer

## Library Package

Published package name:

```text
@maslazu/lazu-ui
```

Install from GitHub Packages:

```bash
pnpm add @maslazu/lazu-ui
```

Use in app:

```ts
import { Button } from "@maslazu/lazu-ui";
import "@maslazu/lazu-ui/styles.css";
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

Run docs:

```bash
pnpm dev:docs
```

Typecheck docs:

```bash
pnpm typecheck:docs
```

## Release

1. Update version in `packages/ui/package.json`
2. Commit changes
3. Create tag like `ui-v0.1.0`
4. Push tag
5. GitHub Actions publishes package to GitHub Packages
