<style>
    :root {
        --sidebar-gap: 1rem;
    }
    .sidebar {
        display: grid;
        position: relative;
        gap: var(--sidebar-gap);
        grid-template-columns: auto;
        grid-template-areas:
            "searchbar"
            "content";
    }
    .searchbar {
        grid-area: searchbar;
    }
    .content {
        grid-area: content;
    }
</style>

<script>
    import Searchbar from "$lib/components/searchbar.svelte"
    import Menu from "$lib/components/menu.svelte"
</script>

<div class="sidebar">
    <div class="searchbar">
        <Searchbar />
    </div>
    <div class="content">
        <Menu />
    </div>
</div>
