<style>
    :root {
        --sidebar-gap: 1rem;
        --sidebar-padding: 1rem;
    }
    .sidebar {
        display: grid;
        position: relative;
        gap: var(--sidebar-gap);
        padding: var(--sidebar-padding);
        grid-template-columns: 1fr auto;
        grid-template-areas: "empty content";
    }
    .content {
        grid-area: content;
    }
</style>

<script>
    import Menu from "$lib/components/menu.svelte"
</script>

<div class="sidebar">
    <div class="content">
        <Menu />
    </div>
</div>
