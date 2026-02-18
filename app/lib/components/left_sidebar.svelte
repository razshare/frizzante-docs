<style>
    :root {
        --left-sidebar-gap: 1rem;
        --left-sidebar-padding: 1rem;
    }
    .sidebar {
        display: grid;
        position: relative;
        gap: var(--left-sidebar-gap);
        padding: var(--left-sidebar-padding);
        grid-template-columns: 1fr auto;
        grid-template-areas: "empty content";
    }
    .content {
        grid-area: content;
    }
</style>

<script lang="ts">
    import Menu from "$lib/components/menu.svelte"
</script>

<div class="sidebar">
    <div class="content">
        <Menu />
    </div>
</div>
