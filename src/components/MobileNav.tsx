import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent",
            className,
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5",
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">Menu</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        variant="full"
        className="no-scrollbar overflow-y-auto bg-background/95 backdrop-blur-md"
      >
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <div className="flex flex-col gap-12 px-6 py-20">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">Menu</div>

            <div className="flex flex-col gap-3">
              <a href="/" className="text-2xl font-medium" onClick={() => setOpen(false)}>
                Home
              </a>

              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
