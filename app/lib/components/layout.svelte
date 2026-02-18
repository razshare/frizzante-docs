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
        overflow: hidden;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "navbar navbar navbar"
            "left-sidebar content right-sidebar"
            "footer footer footer ";
    }
    .navbar {
        grid-area: navbar;
        padding: var(--layout-padding);
        background-color: rgba(0, 0, 0, 0.3);
    }
    .left-sidebar {
        grid-area: left-sidebar;
        padding: var(--layout-padding);
    }
    .right-sidebar {
        grid-area: right-sidebar;
        padding: var(--layout-padding);
    }
    .content {
        overflow-y: auto;
        grid-area: content;
        padding: var(--layout-padding);
    }
    .footer {
        grid-area: footer;
        padding: var(--layout-padding);
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    import { fade } from "svelte/transition"
    type Props = {
        title: string
        navbar: Snippet
        leftSidebar: Snippet
        rightSidebar: Snippet
        content: Snippet
        footer: Snippet
    }
    let { title, navbar, leftSidebar, rightSidebar, content, footer }: Props = $props()
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>{title}</title>
</svelte:head>
<div class="layout" in:fade>
    <div class="navbar">{@render navbar()}</div>
    <div class="left-sidebar">{@render leftSidebar()}</div>
    <div class="right-sidebar">{@render rightSidebar()}</div>
    <div class="content">{@render content()}</div>
    <div class="footer">{@render footer()}</div>
</div>
