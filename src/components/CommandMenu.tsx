import { Dialog as DialogPrimitive } from "@base-ui/react";
import { SearchIcon, SunIcon, MoonIcon, HomeIcon, XIcon } from "lucide-react";
import * as React from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const changeTheme = (theme: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    // Dispatch a storage event or theme toggle update
    window.dispatchEvent(new Event("storage"));
    setOpen(false);
  };

  const commands: CommandItem[] = React.useMemo(
    () => [
      {
        id: "home",
        title: "Go to Home",
        subtitle: "Navigate to the landing page",
        icon: HomeIcon,
        action: () => {
          window.location.href = "/";
          setOpen(false);
        },
      },
      {
        id: "theme-light",
        title: "Set Theme: Light",
        subtitle: "Switch appearance to light mode",
        icon: SunIcon,
        action: () => changeTheme("light"),
      },
      {
        id: "theme-dark",
        title: "Set Theme: Dark",
        subtitle: "Switch appearance to dark mode",
        icon: MoonIcon,
        action: () => changeTheme("dark"),
      },
      {
        id: "github",
        title: "View GitHub Repository",
        subtitle: "Open the source code repository",
        icon: Icons.gitHub,
        action: () => {
          window.open(
            "https://github.com/area44/astro-shadcn-ui-template",
            "_blank",
            "noopener,noreferrer",
          );
          setOpen(false);
        },
      },
    ],
    [],
  );

  const filteredCommands = React.useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return commands;
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(query) ||
        (cmd.subtitle && cmd.subtitle.toLowerCase().includes(query)),
    );
  }, [search, commands]);

  return (
    <>
      {/* Trigger Button inside Header */}
      <Button
        variant="outline"
        className="relative h-9 w-40 justify-start text-muted-foreground sm:w-64"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-2 size-4 shrink-0" />
        <span className="text-xs">Search commands...</span>
        <kbd className="pointer-events-none absolute top-2 right-2 hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          {/* Backdrop */}
          <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />

          {/* Positioner / Container */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
            <DialogPrimitive.Popup className="relative w-full max-w-lg rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
              {/* Header with Search Input */}
              <div className="flex items-center border-b border-border px-4 py-3">
                <SearchIcon className="mr-3 size-5 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  aria-label="Search commands"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <DialogPrimitive.Close
                  render={<Button variant="ghost" size="icon-xs" />}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <XIcon />
                </DialogPrimitive.Close>
              </div>

              {/* Suggestions / Results */}
              <div className="no-scrollbar max-h-80 overflow-y-auto p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Suggestions
                </div>
                {filteredCommands.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredCommands.map((cmd) => {
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground group-hover:text-accent-foreground" />
                          <div className="flex-1">
                            <div className="font-medium">{cmd.title}</div>
                            {cmd.subtitle && (
                              <div className="text-xs text-muted-foreground group-hover:text-accent-foreground/80">
                                {cmd.subtitle}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <kbd className="rounded border bg-muted px-1.5 font-mono text-[10px]">ESC</kbd> to
                  close
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="rounded border bg-muted px-1.5 font-mono text-[10px]">↵</kbd> to
                  select
                </div>
              </div>
            </DialogPrimitive.Popup>
          </div>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
