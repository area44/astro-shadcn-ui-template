export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const siteConfig = {
  navItems: [
    { href: "/", label: "Home" },
    { href: "https://astro.build", label: "Astro", external: true },
    { href: "https://tailwindcss.com", label: "Tailwind CSS", external: true },
    { href: "https://ui.shadcn.com", label: "shadcn/ui", external: true },
  ] as NavItem[],
};
