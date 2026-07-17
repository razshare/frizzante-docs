<style>
    :root {
        --left-sidebar-gap: 0.5rem;
        --left-sidebar-padding: 1rem;
        --left-sidebar-item-roundness: 0;
        --left-sidebar-text: #cecdc3;
        --left-sidebar-text-active: #d24317;
    }
    .left-sidebar {
        display: grid;
        gap: var(--left-sidebar-gap);
        padding: var(--left-sidebar-padding);
        padding-top: 0;
    }
    .left-sidebar-item {
        border-radius: var(--left-sidebar-item-roundness);
        color: var(--left-sidebar-text);
        text-decoration: none;
        opacity: 0.5;
    }
    .left-sidebar-item:hover {
        text-decoration: none;
        opacity: 1;
    }
    .active {
        opacity: 1;
        color: var(--left-sidebar-text-active);
        font-weight: bold;
    }
</style>

<script lang="ts">
    import MenuItem from "$lib/components/menu_item.svelte"
    import { href } from "$lib/scripts/core/href.svelte"
    import { root } from "$lib/scripts/core/root.svelte"
    import { base } from "$lib/scripts/strings/base"
    type Item = { text: string; viewName: string; href: string }
    const pending: Record<string, boolean> = $state({})
    let { prefix } = $props()
</script>

{#snippet item(item: Item)}
    <a
        class="left-sidebar-item"
        class:active={root.view.name === item.viewName}
        {...href(item.href, {
            onpending() {
                pending[item.viewName] = true
            },
            ondone() {
                pending[item.viewName] = false
            },
        })}
    >
        <MenuItem loading={pending[item.viewName]}>{item.text}</MenuItem>
    </a>
{/snippet}

<div class="left-sidebar">
    {@render item({ text: "Get Started", viewName: "GetStarted", href: base("/get_started", { prefix }) })}
    {@render item({ text: "Basics", viewName: "Basics", href: base("/basics", { prefix }) })}
    {@render item({ text: "Web Sockets", viewName: "WebSockets", href: base("/web_sockets", { prefix }) })}
    {@render item({
        text: "Server Sent Events",
        viewName: "ServerSentEvents",
        href: base("/server_sent_events", { prefix }),
    })}
    {@render item({ text: "Guards", viewName: "Guards", href: base("/guards", { prefix }) })}
    {@render item({ text: "Views", viewName: "Views", href: base("/views", { prefix }) })}
    {@render item({ text: "Web Standards", viewName: "WebStandards", href: base("/web_standards", { prefix }) })}
    {@render item({ text: "Cli", viewName: "Cli", href: base("/cli", { prefix }) })}
    {@render item({ text: "Migrate", viewName: "Migrate", href: base("/migrate", { prefix }) })}
    {@render item({
        text: "Build Checkpoints",
        viewName: "BuildCheckpoints",
        href: base("/build_checkpoints", { prefix }),
    })}
    {@render item({
        text: "Type Definitions",
        viewName: "TypeDefinitions",
        href: base("/type_definitions", { prefix }),
    })}
    {@render item({ text: "Snapshots", viewName: "Snapshots", href: base("/snapshots", { prefix }) })}
    {@render item({ text: "Docker", viewName: "Docker", href: base("/docker", { prefix }) })}
    {@render item({ text: "Issues", viewName: "Issues", href: base("/issues", { prefix }) })}
    {@render item({ text: "Contributing", viewName: "Contributing", href: base("/contributing", { prefix }) })}
    {@render item({ text: "Faq", viewName: "Faq", href: base("/faq", { prefix }) })}
</div>
