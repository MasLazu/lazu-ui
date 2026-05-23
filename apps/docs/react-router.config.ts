import type { Config } from "@react-router/dev/config";

export default {
  basename: process.env.NODE_ENV === "production" ? "/lazu-ui" : "/",
  ssr: false,
} satisfies Config;
