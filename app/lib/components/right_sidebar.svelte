<style>
    :root {
        --right-sidebar-padding: 1rem;
        --right-sidebar-item-padding: 0.5rem;
        --right-sidebar-item-roundness: 1rem;
        --right-sidebar-item-hover-background: rgba(162, 222, 206, 0.1);
    }
    .right-sidebar {
        position: relative;
        display: grid;
        padding: var(--right-sidebar-padding);
    }
    .right-sidebar-item {
        display: grid;
        grid-template-columns: auto 1fr;
        padding: var(--right-sidebar-item-padding);
        border-radius: var(--right-sidebar-item-roundness);
        grid-template-areas: "right-sidebar-hint right-sidebar-text";
    }
    .right-sidebar-item:hover {
        background-color: var(--right-sidebar-item-hover-background);
    }
    .right-sidebar-hint {
        grid-area: right-sidebar-hint;
    }
    .right-sidebar-text {
        grid-area: right-sidebar-text;
    }
    .icon {
        position: relative;
        padding-right: 0.1rem;
        top: 0.1rem;
    }
</style>

<script lang="ts">
    import { textToAnchor } from "$lib/scripts/text_to_anchor"
    import { mdiPound } from "@mdi/js"
    import Icon from "$lib/components/icons/icon.svelte"
    import MenuItem from "$lib/components/menu_item.svelte"
    import { scroll } from "$lib/scripts/scroll/scroll.svelte"
    type Item = { text: string; shift: number }
    type Props = { items: Item[] }
    let { items }: Props = $props()
</script>

{#snippet item(item: Item)}
    {@const id = textToAnchor(item.text)}
    <a href="#{id}" class="right-sidebar-item">
        <div class="right-sidebar-hint">
            {#if id === scroll.active}
                <div class="icon"><Icon path={mdiPound} /></div>
            {/if}
        </div>
        <div class="right-sidebar-text">
            <MenuItem>{item.text}</MenuItem>
        </div>
    </a>
{/snippet}

<div class="right-sidebar">
    {#each items as value, index (index)}
        {@render item(value)}
    {/each}
</div>
