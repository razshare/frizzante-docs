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
    import { textToAnchor } from "$lib/scripts/text_to_anchor"

    type Props = {
        text: string
        type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        noMargin?: boolean
    }
    let { text, type: tag = "h1", noMargin = false }: Props = $props()
    let id: string = $derived(textToAnchor(text))
</script>

<a href="#{id}">
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
