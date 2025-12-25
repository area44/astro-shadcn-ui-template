import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MainNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav className={cn("items-center gap-0", className)} {...props}>
      <a
        href="https://astro.build"
        target="_blank"
        rel="noopener noreferrer"
        className="relative items-center"
      >
        <Button variant="ghost" size="sm" className="px-2.5">
          Astro
        </Button>
      </a>
      <a
        href="https://ui.shadcn.com"
        target="_blank"
        rel="noopener noreferrer"
        className="relative items-center"
      >
        <Button variant="ghost" size="sm" className="px-2.5">
          {" "}
          shadcn/ui
        </Button>
      </a>
    </nav>
  );
}
