import { createHighlighter } from "shiki";

const lightTheme = "github-light";
const darkTheme = "github-dark";

let highlighterPromise: Promise<Awaited<ReturnType<typeof createHighlighter>>> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [lightTheme, darkTheme],
      langs: ["tsx", "ts", "jsx", "js", "bash", "text", "json", "css"],
    });
  }

  return highlighterPromise;
}

export async function highlightCode(code: string, lang: string) {
  const highlighter = await getHighlighter();

  return {
    lightHtml: highlighter.codeToHtml(code, { lang, theme: lightTheme }),
    darkHtml: highlighter.codeToHtml(code, { lang, theme: darkTheme }),
  };
}
