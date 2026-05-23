import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/docs-layout.tsx", [
    route("docs/theme-editor", "routes/theme-editor.tsx"),
    route("docs/components", "routes/components-index.tsx"),
    route("docs/components/:componentId", "routes/component-doc.tsx"),
  ]),
] satisfies RouteConfig;
