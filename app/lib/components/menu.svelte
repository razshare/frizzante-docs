<style>
    :root {
        --menu-padding: 1rem;
    }
    .menu {
        display: grid;
        position: relative;
        justify-items: end;
        grid-template-areas: "";
        padding: var(--menu-padding);
    }
</style>

<script>
    import { href } from "$lib/scripts/core/href"
    import MenuItem from "$lib/components/menu_item.svelte"
</script>

<div class="menu">
    <MenuItem>
        <a {...href("/")}>Overview</a>
        {#snippet menu()}
            <MenuItem><a {...href("/get_started")}>Get Started</a></MenuItem>
            <MenuItem><a {...href("/basics")}>Basics</a></MenuItem>
        {/snippet}
    </MenuItem>
</div>
