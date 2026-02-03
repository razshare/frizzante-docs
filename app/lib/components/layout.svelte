<style>
    :root {
        --layout-gap: 1rem;
        --layout-padding: 1rem;
    }
    .layout {
        display: grid;
        position: relative;
        gap: var(--layout-gap);
        padding: var(--layout-padding);
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
            "navbar navbar navbar"
            "sidebar content empty "
            "footer footer footer ";
    }
    .navbar {
        grid-area: navbar;
    }
    .sidebar {
        grid-area: sidebar;
    }
    .content {
        grid-area: content;
    }
    .footer {
        grid-area: footer;
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    type Props = {
        title: string
        navbar: Snippet
        sidebar: Snippet
        content: Snippet
        footer: Snippet
    }
    let { title, navbar, sidebar, content, footer }: Props = $props()
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
    <div class="navbar">{@render navbar()}</div>
    <div class="sidebar">{@render sidebar()}</div>
    <div class="content">{@render content()}</div>
    <div class="footer">{@render footer()}</div>
</div>
