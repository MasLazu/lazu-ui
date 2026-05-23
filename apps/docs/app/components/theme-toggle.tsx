import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@maslazu/lazu-ui";

export function ThemeToggle({ iconOnly = false }: { iconOnly?: boolean }) {
  return <ThemeToggleButton iconOnly={iconOnly} />;
}

export function ThemeToggleButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label="Toggle theme" className="gap-2">
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {iconOnly ? null : isDark ? "Light" : "Dark"}
    </Button>
  );
}
