import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "https://astro.build", label: "Astro" },
  { href: "https://tailwindcss.com", label: "Tailwind CSS" },
  { href: "https://ui.shadcn.com", label: "shadcn/ui" },
];

export function MainNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
