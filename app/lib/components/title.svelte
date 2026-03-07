<style>
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 0;
        margin-bottom: 1rem;
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
    }
    let { text, type: tag = "h1", id: providedId = "", noAnchor = false }: Props = $props()
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
        <h1 {id}>
            <span>#</span>
            <span>{text}</span>
        </h1>
    {:else if tag === "h2"}
        <h2 {id}>
            <span>#</span>
            <span>{text}</span>
        </h2>
    {:else if tag === "h3"}
        <h3 {id}>
            <span>#</span>
            <span>{text}</span>
        </h3>
    {:else if tag === "h4"}
        <h4 {id}>
            <span>#</span>
            <span>{text}</span>
        </h4>
    {:else if tag === "h5"}
        <h5 {id}>
            <span>#</span>
            <span>{text}</span>
        </h5>
    {:else}
        <h6 {id}>
            <span>#</span>
            <span>{text}</span>
        </h6>
    {/if}
</a>
