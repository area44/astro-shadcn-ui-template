// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

const site = process.env.CI
  ? process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://astro-shadcn-ui-template.vercel.app"
  : "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react()],
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
