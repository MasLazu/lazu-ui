import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/lazu-ui/" : "/",
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    dedupe: ["react", "react-dom"]
  }
});
