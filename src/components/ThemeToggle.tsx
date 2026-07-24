import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(media.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form controls or contenteditables
      const activeElement = document.activeElement;
      if (activeElement) {
        const tagName = activeElement.tagName.toLowerCase();
        if (
          tagName === "input" ||
          tagName === "textarea" ||
          tagName === "select" ||
          activeElement.hasAttribute("contenteditable") ||
          activeElement.getAttribute("role") === "textbox"
        ) {
          return;
        }
      }

      // Check for Cmd+Shift+D, Ctrl+Shift+D, or just "d" / "D" (excluding modified single-key presses if modifier keys are down)
      const isD = e.key.toLowerCase() === "d";
      const isCmdShiftD = (e.metaKey || e.ctrlKey) && e.shiftKey && isD;
      const isSingleD = isD && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey;

      if (isCmdShiftD || isSingleD) {
        e.preventDefault();
        setTheme((t) => (t === "dark" ? "light" : "dark"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isDark}
    >
      {isDark ? <Moon className="size-5" /> : <Sun className="size-6" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
