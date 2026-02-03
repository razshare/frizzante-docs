<style>
    .menu {
        display: grid;
        position: relative;
        grid-template-areas: "";
    }
</style>

<script>
    import MenuItem from "./menu_item.svelte"
</script>

<div class="menu">
    <MenuItem>
        <span>Menu</span>
        {#snippet menu()}
            <MenuItem><span>Submenu</span></MenuItem>
            <MenuItem><span>Submenu</span></MenuItem>
            <MenuItem><span>Submenu</span></MenuItem>
            <MenuItem><span>Submenu</span></MenuItem>
        {/snippet}
    </MenuItem>
</div>
