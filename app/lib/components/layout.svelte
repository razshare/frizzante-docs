<style>
    :root {
        --layout-padding: 1rem;
        --layout-navbar-background: rgba(0, 0, 0, 0.3);
    }
    .layout {
        display: grid;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        grid-template-columns: 15rem auto 15rem;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "layout-navbar layout-navbar layout-navbar"
            "layout-left-sidebar layout-content-wrapper layout-right-sidebar";
    }
    .layout-navbar {
        grid-area: layout-navbar;
        padding: var(--layout-padding);
        background-color: var(--layout-navbar-background);
        position: relative;
        z-index: 1;
    }
    .layout-left-sidebar {
        grid-area: layout-left-sidebar;
        padding: var(--layout-padding);
        overflow: auto;
        z-index: 0;
    }
    .layout-right-sidebar {
        grid-area: layout-right-sidebar;
        padding: var(--layout-padding);
        overflow: auto;
        z-index: 0;
    }
    .layout-content-wrapper {
        grid-area: layout-content-wrapper;
        display: grid;
        overflow: auto;
        grid-template-areas:
            "layout-content layout-content layout-content"
            "layout-footer layout-footer layout-footer";
        position: relative;
        z-index: 0;
    }
    .layout-content {
        grid-area: layout-content;
        position: relative;
        z-index: 0;
    }
    .layout-footer {
        grid-area: layout-footer;
        position: relative;
        z-index: 0;
    }
</style>

<script lang="ts">
    import { scroll } from "$lib/scripts/scroll/scroll.svelte"
    import { target } from "$lib/scripts/scroll/target"
    import { update } from "$lib/scripts/scroll/update"
    import { onMount, type Snippet } from "svelte"
    type Props = {
        title: string
        navbar: Snippet
        leftSidebar: Snippet
        rightSidebar: Snippet
        content: Snippet
        footer: Snippet
    }
    let { title, navbar, leftSidebar, rightSidebar, content, footer }: Props = $props()
    let contentElement: HTMLDivElement | undefined = $state(undefined)
    onMount(function start() {
        if (!contentElement) {
            return
        }
        target(scroll, contentElement)
        update(scroll)
    })
    function onscroll() {
        update(scroll)
    }
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>{title}</title>
</svelte:head>
<div class="layout">
    <div class="layout-left-sidebar">{@render leftSidebar()}</div>
    <div class="layout-right-sidebar">{@render rightSidebar()}</div>
    <div bind:this={contentElement} class="layout-content-wrapper" {onscroll}>
        <div class="layout-content">{@render content()}</div>
        <div class="layout-footer">{@render footer()}</div>
    </div>
    <div class="layout-navbar">{@render navbar()}</div>
</div>
