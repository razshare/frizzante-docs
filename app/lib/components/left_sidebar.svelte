<style>
    :root {
        --left-sidebar-padding: 1rem;
        --left-sidebar-item-padding: 0.5rem;
        --left-sidebar-item-roundness: 1rem;
        --left-sidebar-item-hover-background: rgba(162, 222, 206, 0.1);
    }
    .left-sidebar {
        position: relative;
        padding: var(--left-sidebar-padding);
    }
    .left-sidebar-item {
        display: grid;
        grid-template-columns: auto 1fr;
        padding: var(--left-sidebar-item-padding);
        border-radius: var(--left-sidebar-item-roundness);
        grid-template-areas: "left-sidebar-hint left-sidebar-text";
    }
    .left-sidebar-item:hover {
        background-color: var(--left-sidebar-item-hover-background);
    }
    .left-sidebar-hint {
        grid-area: left-sidebar-hint;
    }
    .left-sidebar-text {
        grid-area: left-sidebar-text;
    }
    .icon {
        position: relative;
        padding-right: 0.1rem;
        top: 0.1rem;
    }
</style>

<script lang="ts">
    import MenuItem from "$lib/components/menu_item.svelte"
    import Link from "$lib/components/links/link.svelte"
    import { getContext } from "svelte"
    import type { View } from "$lib/scripts/core/view"
    import Icon from "./icons/icon.svelte"
    import { mdiArrowRight, mdiCloudRefresh } from "@mdi/js"
    const view = getContext("view") as View<unknown>
    type Item = { text: string; viewName: string; href: string }
</script>

{#snippet item(item: Item)}
    <Link href={item.href}>
        {#snippet children({ pending })}
            <div class="left-sidebar-item">
                <div class="left-sidebar-hint">
                    {#if pending}
                        <div class="icon"><Icon path={mdiCloudRefresh} /></div>
                    {:else if view.name === item.viewName}
                        <div class="icon"><Icon path={mdiArrowRight} /></div>
                    {/if}
                </div>
                <div class="left-sidebar-text">
                    <MenuItem>{item.text}</MenuItem>
                </div>
            </div>
        {/snippet}
    </Link>
{/snippet}

<div class="left-sidebar">
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
