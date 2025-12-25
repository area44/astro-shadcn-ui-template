import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";

export function MainNav({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav className={cn("items-center gap-0", className)} {...props}>
      <Button variant="ghost">
        <a
          href="https://astro.build"
          target="_blank"
          rel="noopener noreferrer"
          className="relative items-center"
        >
          Astro
        </a>
      </Button>

      <Button variant="ghost">
        <a
          href="https://ui.shadcn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative items-center"
        >
          shadcn/ui
        </a>
      </Button>
    </nav>
  );
}
