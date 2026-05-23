import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button, cn } from "@maslazu/lazu-ui";

import { highlightCode } from "@/lib/highlight";

interface CodeBlockProps {
  code: string;
  lang?: "tsx" | "ts" | "jsx" | "js" | "bash" | "text" | "json" | "css";
  title?: string;
  className?: string;
}

export function CodeBlock({ code, lang = "tsx", title, className }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<{ lightHtml: string; darkHtml: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void highlightCode(code, lang).then((result) => {
      if (!cancelled) setHighlighted(result);
    });

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-border/70 bg-code text-code-foreground", className)}>
      {title ? (
        <div className="border-b border-border/70 bg-code-highlight/70 px-4 py-3 pr-14">
          <p className="truncate text-xs font-medium text-muted-foreground">{title}</p>
        </div>
      ) : null}

      <div className="absolute right-3 top-2.5 z-10">
        <CopyButton code={code} copied={copied} onCopy={() => setCopied(true)} />
      </div>

      {highlighted ? (
        <div className="text-sm">
          <div className="dark:hidden" dangerouslySetInnerHTML={{ __html: highlighted.lightHtml }} />
          <div className="hidden dark:block" dangerouslySetInnerHTML={{ __html: highlighted.darkHtml }} />
        </div>
      ) : (
        <pre className="overflow-x-auto px-4 pb-4 pt-6 text-xs text-code-foreground">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

function CopyButton({ code, copied, onCopy }: { code: string; copied: boolean; onCopy: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 rounded-md border border-border/70 bg-code/90 p-0 text-code-number backdrop-blur hover:bg-code-highlight hover:text-code-foreground"
      aria-label="Copy code"
      onClick={() => {
        void navigator.clipboard.writeText(code);
        onCopy();
      }}
    >
      {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
    </Button>
  );
}
