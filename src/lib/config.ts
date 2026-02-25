export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  author: {
    name: string,
    url: string,
  },
  links: {
    github: string;
  };
  navItems: {
    href: string;
    label: string;
    external?: boolean;
  }[];
};

export const siteConfig: SiteConfig = {
  name: "Astro shadcn/ui template",
  description: "The template helps you build apps with Astro, Tailwind CSS, and shadcn/ui.",
  url: "https://astro-shadcn-ui-template.vercel.app",
  author: {
    name: "AREA44",
    url: "https://github.com/area44",
  },
  links: {
    github: "https://github.com/area44/astro-shadcn-ui-template",
  },
  navItems: [
    { href: "https://astro.build", label: "Astro", external: true },
    { href: "https://tailwindcss.com", label: "Tailwind CSS", external: true },
    { href: "https://ui.shadcn.com", label: "shadcn/ui", external: true },
  ],
};
