<style>
    .layout {
        position: relative;
        height: 100%;
        display: grid;
        grid-template-areas:
            "navbar navbar navbar"
            "sidebar content content"
            "sidebar footer footer";
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    import { scale } from "svelte/transition"
    type Props = {
        title: string
        children: Snippet
    }
    let { title, children }: Props = $props()
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>{title}</title>
</svelte:head>
<div class="layout" in:scale={{ duration: 100 }}>
    {@render children()}
</div>
