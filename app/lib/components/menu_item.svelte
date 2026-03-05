<style>
    :root {
        --menu-item-gap: 1rem;
    }
    .menu-item {
        display: grid;
        position: relative;
        gap: var(--menu-item-gap);
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "menu-item-children menu-item-children"
            "empty menu-item-menu";
    }
    .menu-item-children {
        grid-area: menu-item-children;
    }
    .menu-item-menu {
        grid-area: menu-item-menu;
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    type Props = {
        children: Snippet
        menu?: Snippet
    }
    let { children, menu }: Props = $props()
</script>

<div class="menu-item">
    <div class="menu-item-children">
        {@render children()}
    </div>
    <div class="menu-item-menu">
        {#if menu}
            {@render menu()}
        {/if}
    </div>
</div>
