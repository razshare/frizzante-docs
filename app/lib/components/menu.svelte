<style>
    :root {
        --menu-padding: 1rem;
    }
    .menu {
        display: grid;
        position: relative;
        justify-items: start;
        grid-template-areas: "";
        padding: var(--menu-padding);
    }
    .menu-wrapper-for-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template: "menu-hint-for-item menu-content-for-item";
        width: 100%;
    }
    .menu-hint-for-item {
        grid-area: menu-hint-for-item;
    }
    .menu-content-for-item {
        grid-area: menu-content-for-item;
    }
</style>

<script lang="ts">
    import MenuItem from "$lib/components/menu_item.svelte"
    import Link from "$lib/components/links/link.svelte"
    import { getContext } from "svelte"
    import type { View } from "$lib/scripts/core/view"
    import Icon from "./icons/icon.svelte"
    import { mdiChevronRight, mdiDownloadOutline } from "@mdi/js"
    const view = getContext("view") as View<unknown>
    type Option = { text: string; viewName: string; href: string }
</script>

{#snippet item(options: Option)}
    <Link href={options.href}>
        {#snippet children({ pending })}
            <div class="menu-wrapper-for-item">
                <div class="menu-hint-for-item">
                    {#if pending}
                        <Icon path={mdiDownloadOutline} />
                    {:else if view.name === options.viewName}
                        <Icon path={mdiChevronRight} />
                    {/if}
                </div>
                <div class="menu-content-for-item">
                    <MenuItem>{options.text}</MenuItem>
                </div>
            </div>
        {/snippet}
    </Link>
{/snippet}

<div class="menu">
    {@render item({ text: "Get Started", viewName: "GetStarted", href: "/get_started" })}
    {@render item({ text: "Basics", viewName: "Basics", href: "/basics" })}
    {@render item({ text: "Web Sockets", viewName: "WebSockets", href: "/web_sockets" })}
    {@render item({ text: "Server Sent Events", viewName: "ServerSentEvents", href: "/server_sent_events" })}
    {@render item({ text: "Guards", viewName: "Guards", href: "/guards" })}
    {@render item({ text: "Views", viewName: "Views", href: "/views" })}
    {@render item({ text: "Web Standards", viewName: "WebStandards", href: "/web_standards" })}
    {@render item({ text: "Type Definitions", viewName: "TypeDefinitions", href: "/type_definitions" })}
    {@render item({ text: "Todos Example", viewName: "TodosExample", href: "/todos_example" })}
    {@render item({ text: "Cli", viewName: "Cli", href: "/cli" })}
    {@render item({ text: "Docker", viewName: "Docker", href: "/docker" })}
    {@render item({ text: "Issues", viewName: "Issues", href: "/issues" })}
    {@render item({ text: "Contributing", viewName: "Contributing", href: "/contributing" })}
    {@render item({ text: "Faq", viewName: "Faq", href: "/faq" })}
</div>
