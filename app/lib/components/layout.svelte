<style>
    :root {
        --layout-padding: 1rem;
    }
    .layout {
        display: grid;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        grid-template-columns: 200px auto 200px;
        grid-template-rows: auto 1fr auto;
    }
    .layout.default {
        grid-template-areas:
            "layout-navbar layout-navbar layout-navbar"
            "layout-left-sidebar layout-content layout-right-sidebar"
            "layout-footer layout-footer layout-footer";
    }
    .layout.zen {
        grid-template-areas:
            "layout-navbar layout-navbar layout-navbar"
            "layout-content layout-content layout-content"
            "layout-content layout-content layout-content";
    }
    .layout-navbar {
        grid-area: layout-navbar;
        padding: var(--layout-padding);
        background-color: rgba(0, 0, 0, 0.3);
    }
    .layout-left-sidebar {
        grid-area: layout-left-sidebar;
        padding: var(--layout-padding);
    }
    .layout-right-sidebar {
        grid-area: layout-right-sidebar;
        padding: var(--layout-padding);
    }
    .layout-content {
        grid-area: layout-content;
        position: relative;
        overflow-y: auto;
    }
    .layout-footer {
        grid-area: layout-footer;
        padding: var(--layout-padding);
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    type Props = {
        title: string
        navbar: Snippet
        leftSidebar: Snippet
        rightSidebar: Snippet
        content: Snippet
        footer: Snippet
        mode?: "default" | "zen"
    }
    let { title, navbar, leftSidebar, rightSidebar, content, footer, mode = "default" }: Props = $props()
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>{title}</title>
</svelte:head>
<div class="layout {mode}">
    <div class="layout-navbar">{@render navbar()}</div>
    {#if mode === "default"}
        <div class="layout-left-sidebar">{@render leftSidebar()}</div>
        <div class="layout-right-sidebar">{@render rightSidebar()}</div>
        <div class="layout-footer">{@render footer()}</div>
    {/if}
    <div class="layout-content">{@render content()}</div>
</div>
