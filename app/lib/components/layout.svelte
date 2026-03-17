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
            "layout-left-sidebar layout-body layout-right-sidebar";
    }
    @media screen and (max-width: 980px) {
        .layout {
            grid-template-columns: 15rem auto 1rem;
        }
        .layout-right-sidebar {
            display: none;
        }
    }
    @media screen and (max-width: 640px) {
        .layout {
            grid-template-columns: 1rem auto 1rem;
        }
        .layout-left-sidebar {
            display: none;
        }
        .layout-right-sidebar {
            display: none;
        }
    }
    .layout-navbar {
        grid-area: layout-navbar;
        padding: var(--layout-padding);
        background-color: var(--layout-navbar-background);
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
    .layout-body {
        grid-area: layout-body;
        overflow: auto;
        z-index: 0;
    }
    .layout-body-content {
        z-index: 0;
    }
    .layout-body-footer {
        z-index: 0;
    }
</style>

<script lang="ts">
    import { type Snippet } from "svelte"
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
<div class="layout">
    <div class="layout-left-sidebar">{@render leftSidebar()}</div>
    <div class="layout-right-sidebar">{@render rightSidebar()}</div>
    <div class="layout-body">
        <div class="layout-body-content">{@render content()}</div>
        <div class="layout-body-footer">{@render footer()}</div>
    </div>
    <div class="layout-navbar">{@render navbar()}</div>
</div>
