// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
  site: 'https://frizzante.github.io',
  base: '/frizzante-docs',
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
            { label: "Overview", slug: "guides/overview" },
            { label: "Server Mode", slug: "guides/server-mode" },
            { label: "Client Mode", slug: "guides/client-mode" },
            { label: "Full Mode", slug: "guides/full-mode" },
            { label: "Server", slug: "guides/server" },
            { label: "Notifiers", slug: "guides/notifiers" },
            { label: "Pages", slug: "guides/pages" },
            { label: "Api", slug: "guides/api" },
            { label: "Sessions", slug: "guides/sessions" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      plugins: [
        catppuccin()
      ]
    }),
  ],
});
