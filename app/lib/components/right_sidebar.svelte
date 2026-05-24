<style>
    :root {
        --right-sidebar-gap: 0.5rem;
        --right-sidebar-padding: 1rem;
        --right-sidebar-item-roundness: 0;
        --right-sidebar-text: #cecdc3;
        --right-sidebar-text-active: #d24317;
    }
    .right-sidebar {
        display: grid;
        gap: var(--right-sidebar-gap);
        padding: var(--right-sidebar-padding);
        padding-top: 0;
    }
    .right-sidebar-item {
        border-radius: var(--right-sidebar-item-roundness);
        color: var(--right-sidebar-text);
        text-decoration: none;
        opacity: 0.5;
    }
    .right-sidebar-item:hover {
        text-decoration: none;
        opacity: 1;
    }
</style>

<script lang="ts">
    import MenuItem from "$lib/components/menu_item.svelte"
    import { scrollTo } from "$lib/scripts/scroll_to"
    import { textToAnchor } from "$lib/scripts/text_to_anchor"
    type Item = { text: string; shift: number }
    type Props = { items: Item[]; body: false | HTMLDivElement }
    let { items, body = false }: Props = $props()
</script>

{#snippet item(item: Item)}
    {@const id = textToAnchor(item.text)}
    <a
        href="#{id}"
        class="right-sidebar-item"
        style:--right-sidebar-item-shift={item.shift}
        onclick={function onclick(event) {
            event.preventDefault()
            if (!body) {
                console.warn("body element not found")
                return
            }
            window.location.hash = `#${id}`
            scrollTo({ container: body, targetId: id })
        }}
    >
        <MenuItem>{item.text}</MenuItem>
    </a>
{/snippet}

<div class="right-sidebar">
    {#each items as value, index (index)}
        {@render item(value)}
    {/each}
</div>
