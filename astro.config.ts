// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? "https://astro-shadcn-ui-template.vercel.app"
    : "http://localhost:4321",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
