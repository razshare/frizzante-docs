<style>
    :root {
        --left-sidebar-gap: 1rem;
    }
    .left-sidebar {
        display: grid;
        position: relative;
        gap: var(--left-sidebar-gap);
        grid-template-columns: 1fr auto;
        grid-template-areas: "empty left-sidebar-content";
    }
    .left-sidebar-content {
        grid-area: left-sidebar-content;
    }
</style>

<script lang="ts">
    import Menu from "$lib/components/menu.svelte"
</script>

<div class="left-sidebar">
    <div class="left-sidebar-content">
        <Menu />
    </div>
</div>
