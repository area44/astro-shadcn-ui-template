import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {siteConfig.navItems.map((item) => {
        const isExternal = item.external;
        return (
          <a
            href={item.href}
            {...(isExternal
              ? {
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {})}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
