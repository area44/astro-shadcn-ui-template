import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/Icons";
import { HomeIcon } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { MainNav } from "@/components/MainNav";
import ThemeToggle from "@/components/ThemeToggle";

export function Header() {
  const [starCount, setStarCount] = React.useState<string>("—");

  React.useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch("https://api.github.com/repos/area44/astro-shadcn-ui-template");
        const json = await res.json();

        const stars = Number(json?.stargazers_count ?? 0);
        const formatted = stars >= 1000 ? `${Math.round(stars / 1000)}k` : stars.toLocaleString();

        setStarCount(formatted);
      } catch {
        setStarCount("—");
      }
    }

    fetchStars();
  }, []);

  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:h-4!">
          <MobileNav className="flex lg:hidden" />

          <Button variant="ghost" size="icon" className="hidden size-8 lg:flex">
            <a href="/">
              <HomeIcon className="size-5" />
              <span className="sr-only">Home</span>
            </a>
          </Button>

          <MainNav className="hidden lg:flex" />

          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <Button variant="ghost" size="sm" className="h-8 shadow-none">
              <a
                href="https://github.com/area44/astro-shadcn-ui-template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-8"
              >
                <Icons.gitHub />
                <span className="text-muted-foreground w-fit text-xs tabular-nums">
                  {starCount}
                </span>
              </a>
            </Button>

            <Separator orientation="vertical" className="my-auto" />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
