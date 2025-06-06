// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://frizzante.github.io",
  base: "/frizzante-docs",
  integrations: [
    starlight({
      title: "Frizzante Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/razshare/frizzante",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Get Started", slug: "guides/get-started" },
            { label: "Routes", slug: "guides/routes" },
            { label: "Views", slug: "guides/views" },
            { label: "Sessions", slug: "guides/sessions" },
          ],
        },
      ],
      plugins: [catppuccin()],
    }),
  ],
});
