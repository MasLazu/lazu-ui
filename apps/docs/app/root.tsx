import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@maslazu/lazu-ui";
import "../../../packages/ui/src/styles/globals.css";

import type { Route } from "./+types/root";

const docsBasePath = import.meta.env.PROD ? "/lazu-ui" : "";

export const meta: Route.MetaFunction = () => [{ title: "Lazu UI Docs" }];

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: `${docsBasePath}/favicon.svg`, type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      <Outlet />
    </ThemeProvider>
  );
}
