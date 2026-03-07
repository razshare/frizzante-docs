<style>
    a {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.3rem;
    }
</style>

<script lang="ts">
    import MenuItem from "$lib/components/menu_item.svelte"
    import { scroll } from "$lib/scripts/scroll/scroll.svelte"
    import { textToAnchor } from "$lib/scripts/text_to_anchor"
    type Props = {
        text: string
        group?: string
        shift?: number
    }
    let { text, group = "", shift = 0 }: Props = $props()
    let id = $derived(textToAnchor(`${group}-${text}`))
    let active = $derived(scroll.active === id)
</script>

<MenuItem {shift}>
    <a href="#{id}">
        {#if active}
            <span>#</span>
        {:else}
            <span></span>
        {/if}
        <span>{text}</span>
    </a>
</MenuItem>
