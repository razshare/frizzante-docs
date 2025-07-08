// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeFlexoki from "starlight-theme-flexoki";

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
            {
              label: "Order of Operations",
              slug: "guides/order-of-operations",
            },
            { label: "Query", slug: "guides/query" },
            { label: "Forms", slug: "guides/forms" },
            { label: "Json", slug: "guides/json" },
            { label: "Cookies", slug: "guides/cookies" },
            { label: "Redirect", slug: "guides/redirect" },
            { label: "Navigate", slug: "guides/navigate" },
            { label: "Web Sockets", slug: "guides/web-sockets" },
            { label: "Server Sent Events", slug: "guides/server-sent-events" },
            { label: "Sessions", slug: "guides/sessions" },
            { label: "Views", slug: "guides/views" },
            { label: "Embedding Assets", slug: "guides/embedding-assets" },
            { label: "Web Standards", slug: "guides/web-standards" },
            { label: "Todos Example", slug: "guides/todos-example" },
          ],
        },
      ],
      plugins: [starlightThemeFlexoki()],
    }),
  ],
});
