<style>
    h1 {
        font-size: 2.5rem;
    }
    h2 {
        font-size: 2.2rem;
    }
    h3 {
        font-size: 2rem;
    }
    h4 {
        font-size: 1.7rem;
    }
    h5 {
        font-size: 1.5rem;
    }
    h6 {
        font-size: 1rem;
    }
    .no-margin {
        margin: 0;
    }
</style>

<script lang="ts">
    import { register } from "$lib/scripts/scroll/register"
    import { scroll } from "$lib/scripts/scroll/scroll.svelte"
    import { unregister } from "$lib/scripts/scroll/unregister"
    import { textToAnchor } from "$lib/scripts/text_to_anchor"
    import { onMount } from "svelte"
    type Props = {
        text: string
        type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        id?: string
        noAnchor?: boolean
        noMargin?: boolean
    }
    let { text, type: tag = "h1", id: providedId = "", noAnchor = false, noMargin = false }: Props = $props()
    let id: string = $state("")
    let element: HTMLAnchorElement
    onMount(function start() {
        if (providedId !== "") {
            id = providedId
        } else {
            id = textToAnchor(text)
        }
        if (noAnchor) {
            return
        }
        register(scroll, id, element)
        return function stop() {
            unregister(scroll, id)
        }
    })
</script>

<a bind:this={element} href="#{id}">
    {#if tag === "h1"}
        <h1 {id} class:no-margin={noMargin}>
            <span>#</span>
            <span>{text}</span>
        </h1>
    {:else if tag === "h2"}
        <h2 {id} class:no-margin={noMargin}>
            <span>#</span>
            <span>{text}</span>
        </h2>
    {:else if tag === "h3"}
        <h3 {id} class:no-margin={noMargin}>
            <span>#</span>
            <span>{text}</span>
        </h3>
    {:else if tag === "h4"}
        <h4 {id} class:no-margin={noMargin}>
            <span>#</span>
            <span>{text}</span>
        </h4>
    {:else if tag === "h5"}
        <h5 {id} class:no-margin={noMargin}>
            <span>#</span>
            <span>{text}</span>
        </h5>
    {:else}
        <h6 {id} class:no-margin={noMargin}>
            <span>#</span>
            <span>{text}</span>
        </h6>
    {/if}
</a>
