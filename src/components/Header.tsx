import { HomeIcon } from "lucide-react";
import * as React from "react";

import { Icons } from "@/components/Icons";
import { MainNav } from "@/components/MainNav";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Header() {
  const [starCount, setStarCount] = React.useState<string>("—");

  React.useEffect(() => {
    async function fetchStars() {
      try {
        const githubUrl = new URL(siteConfig.links.github);
        const [, owner, repo] = githubUrl.pathname.split("/");

        if (!owner || !repo) return;

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

        if (!res.ok) return;

        const json: { stargazers_count?: number } = await res.json();
        const stars = json.stargazers_count ?? 0;

        const formatted = stars >= 1000 ? `${Math.round(stars / 1000)}k` : stars.toLocaleString();

        setStarCount(formatted);
      } catch {
        setStarCount("—");
      }
    }

    fetchStars();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6 3xl:fixed:px-0">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! 3xl:fixed:container">
          <MobileNav className="flex lg:hidden" />

          <a
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hidden size-8 lg:flex",
            )}
          >
            <HomeIcon className="size-5" />
            <span className="sr-only">Home</span>
          </a>

          <MainNav className="hidden lg:flex" />

          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "inline-flex h-8 items-center gap-2 shadow-none",
              )}
            >
              <Icons.gitHub />
              <span className="w-fit text-xs text-muted-foreground tabular-nums">{starCount}</span>
            </a>

            <Separator orientation="vertical" className="my-auto" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
