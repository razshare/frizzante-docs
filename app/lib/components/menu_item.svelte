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
            "children children"
            "empty menu";
    }
    .children {
        grid-area: children;
    }
    .menu {
        grid-area: menu;
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
    <div class="children">
        {@render children()}
    </div>
    <div class="menu">
        {#if menu}
            {@render menu()}
        {/if}
    </div>
</div>
