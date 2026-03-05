<style>
    :root {
        --button-padding: 1rem;
        --button-roundness: 1rem;
        --button-background: #a2dece;
        --button-text: #100f0f;
        --button-ghost-background: transparent;
        --button-ghost-text: #cecdc3;
        --button-ghost-border: 1px solid inherit;
    }
    .button {
        display: grid;
        position: relative;
        align-items: center;
        padding: var(--button-padding);
        border-radius: var(--button-roundness);
        background-color: var(--button-background);
        color: var(--button-text);
        grid-template-columns: auto 1fr auto;
        grid-template-areas: "button-start button-content button-end";
    }
    .ghost {
        background-color: var(--button-ghost-background);
        color: var(--button-ghost-text);
        border: var(--button-ghost-border);
    }
    .button-start {
        grid-area: button-start;
        text-align: start;
    }
    .button-content {
        grid-area: button-content;
        text-align: center;
    }
    .button-end {
        grid-area: button-end;
        text-align: end;
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    import { href } from "$lib/scripts/core/href"
    type Props = {
        start?: Snippet
        end?: Snippet
        children: Snippet
        ghost?: boolean
        href?: string
    }
    let { start, children, end, ghost = false, href: path = "" }: Props = $props()
</script>

<a class="button" class:ghost {...href(path)}>
    <span class="button-start">
        {#if start}
            {@render start()}
        {/if}
    </span>
    <span class="content">
        {@render children()}
    </span>
    <span class="button-end">
        {#if end}
            {@render end()}
        {/if}
    </span>
</a>
