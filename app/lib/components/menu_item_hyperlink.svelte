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
    import type { Snippet } from "svelte"
    type Props = {
        href: string
        children: Snippet
        shift?: number
    }
    let { href, children, shift = 0 }: Props = $props()
    let active = $derived(scroll.active === href.substring(1))
</script>

<MenuItem {shift}>
    <a {href}>
        {#if active}
            <span>#</span>
        {:else}
            <span></span>
        {/if}
        <span>{@render children()}</span>
    </a>
</MenuItem>
