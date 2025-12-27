export function Footer() {
  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent dark:bg-transparent">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            Built by{" "}
            <a
              href="https://github.com/area44"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              AREA44
            </a>{" "}
            . The source code is available on{" "}
            <a
              href="https://github.com/area44/astro-shadcn-ui-template"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
