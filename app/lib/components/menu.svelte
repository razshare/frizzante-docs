<style>
    :root {
        --menu-padding: 1rem;
        --menu-border: 1px solid #63625e;
    }
    .menu {
        display: grid;
        position: relative;
        justify-items: end;
        grid-template-areas: "";
        border-right: var(--menu-border);
        padding: var(--menu-padding);
    }
</style>

<script>
    import { href } from "$lib/scripts/core/href"
    import MenuItem from "./menu_item.svelte"
</script>

<div class="menu">
    <MenuItem>
        <a {...href("/")}>Overview</a>
        {#snippet menu()}
            <MenuItem><a {...href("/get_started")}>Get Started</a></MenuItem>
        {/snippet}
    </MenuItem>
</div>
