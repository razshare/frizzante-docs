<style>
    :root {
        --right-sidebar-item-shift: 0;
        --right-sidebar-item-padding: 0.5rem;
        --right-sidebar-item-left-padding: 0.5rem;
        --right-sidebar-item-roundness: 1rem;
        --right-sidebar-item-hover-background: rgba(162, 222, 206, 0.1);
    }
    .right-sidebar {
        display: grid;
    }
    .right-sidebar-item {
        display: grid;
        grid-template-columns: auto 1fr;
        padding-left: calc(var(--right-sidebar-item-left-padding) * var(--right-sidebar-item-shift));
        border-radius: var(--right-sidebar-item-roundness);
        grid-template-areas: "right-sidebar-hint right-sidebar-text";
    }
    .right-sidebar-item:hover {
        background-color: var(--right-sidebar-item-hover-background);
    }
    .right-sidebar-hint {
        padding-left: var(--right-sidebar-item-padding);
        padding-top: var(--right-sidebar-item-padding);
        padding-bottom: var(--right-sidebar-item-padding);
        grid-area: right-sidebar-hint;
    }
    .right-sidebar-text {
        padding-right: var(--right-sidebar-item-padding);
        padding-top: var(--right-sidebar-item-padding);
        padding-bottom: var(--right-sidebar-item-padding);
        grid-area: right-sidebar-text;
    }
    .icon {
        padding-right: 0.1rem;
        top: 0.1rem;
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import MenuItem from "$lib/components/menu_item.svelte"
    import { textToAnchor } from "$lib/scripts/text_to_anchor"
    import { mdiPound } from "@mdi/js"
    type Item = { text: string; shift: number }
    type Props = { items: Item[] }
    let { items }: Props = $props()
</script>

{#snippet item(item: Item)}
    {@const id = textToAnchor(item.text)}
    <a href="#{id}" class="right-sidebar-item" style:--right-sidebar-item-shift={item.shift}>
        <div class="right-sidebar-hint">
            <div class="icon"><Icon path={mdiPound} /></div>
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
