// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeFlexoki from "starlight-theme-flexoki";
import starlightFullViewMode from "starlight-fullview-mode";

// https://astro.build/config
export default defineConfig({
  site: "https://frizzante.github.io",
  base: "/frizzante-docs",
  integrations: [
    starlight({
      title: "Frizzante Docs",
      editLink: {
        baseUrl: "https://github.com/razshare/frizzante-docs/edit/main/",
      },
      favicon: "/favicon.ico",
      logo: {
        src: "./src/assets/frizz-octo-round.webp",
      },
      social: [
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/y7tTeR7yPH",
        },
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
            { label: "Basics", slug: "guides/basics" },
            { label: "Web Sockets", slug: "guides/web-sockets" },
            { label: "Server Sent Events", slug: "guides/server-sent-events" },
            { label: "Guards", slug: "guides/guards" },
            { label: "Views", slug: "guides/views" },
            { label: "Web Standards", slug: "guides/web-standards" },
            { label: "Type Definitions", slug: "guides/type-definitions" },
            { label: "Todos Example", slug: "guides/todos-example" },
            { label: "Cli", slug: "guides/cli" },
            { label: "Docker", slug: "guides/docker" },
            { label: "Issues", slug: "guides/issues" },
            { label: "Contributing", slug: "guides/contributing" },
            { label: "Faq", slug: "guides/faq" },
          ],
        },
      ],
      plugins: [starlightThemeFlexoki(), starlightFullViewMode({})],
    }),
  ],
});
