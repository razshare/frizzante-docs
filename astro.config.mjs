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
            { label: "Server", slug: "guides/server" },
            { label: "Routes", slug: "guides/routes" },
            { label: "Path", slug: "guides/path" },
            { label: "Status", slug: "guides/status" },
            { label: "Header", slug: "guides/header" },
            { label: "Query", slug: "guides/query" },
            { label: "Forms", slug: "guides/forms" },
            { label: "Json", slug: "guides/json" },
            { label: "Cookies", slug: "guides/cookies" },
            { label: "Redirect", slug: "guides/redirect" },
            { label: "Navigate", slug: "guides/navigate" },
            { label: "Server sent events", slug: "guides/server-sent-events" },
            { label: "Web sockets", slug: "guides/web-sockets" },
            { label: "Sessions", slug: "guides/sessions" },
            { label: "Views", slug: "guides/views" },
            {
              label: "Order of operations",
              slug: "guides/order-of-operations",
            },
          ],
        },
      ],
      plugins: [catppuccin()],
    }),
  ],
});
