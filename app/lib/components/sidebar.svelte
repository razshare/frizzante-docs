<style>
    .sidebar {
        display: grid;
        position: relative;
        grid-template-columns: auto 1fr auto;
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
</script>

<div class="sidebar">
    <div class="searchbar">
        <Searchbar />
    </div>
    <div class="content"></div>
</div>
