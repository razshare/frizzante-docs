<style>
    :root {
        --searchbar-text: #5f5e5a;
        --searchbar-gap: 1rem;
        --searchbar-border: 1px solid #5f5e5a;
        --searchbar-roundness: 1rem;
        --searchbar-padding: 1rem;
    }
    .searchbar {
        color: var(--searchbar-text);
        border-radius: var(--searchbar-roundness);
        border: var(--searchbar-border);
        gap: var(--searchbar-gap);
        padding: var(--searchbar-padding);
        display: grid;
        position: relative;
        grid-template-columns: auto 1fr auto;
        grid-template-areas: "icon placeholder shortcut";
    }
    .icon {
        grid-area: icon;
    }
    .placeholder {
        grid-area: placeholder;
    }
    .shortcut {
        grid-area: shortcut;
    }
</style>

<script>
    import Icon from "$lib/components/icons/icon.svelte"
    import { mdiSelectSearch } from "@mdi/js"
</script>

<div class="searchbar">
    <div class="icon"><Icon path={mdiSelectSearch} /></div>
    <div class="placeholder">Search</div>
    <div class="shortcut">Ctrl K</div>
</div>
