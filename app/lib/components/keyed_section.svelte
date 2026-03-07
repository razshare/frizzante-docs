<style>
    :root {
        --indexed-section-circle-size: 1rem;
        --indexed-section-circle-background: rgba(0, 0, 0, 0.3);
        --indexed-section-link-background: rgba(0, 0, 0, 0.3);
        --indexed-section-link-width: 0.3rem;
        --indexed-section-gap: 0.3rem;
    }
    .keyed-section {
        display: grid;
        position: relative;
        gap: var(--indexed-section-gap);
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "badge content"
            "link content"
            "empty empty";
    }
    .badge {
        grid-area: badge;
        position: relative;
        justify-self: center;
        align-self: center;
    }
    .badge > .key {
        display: grid;
        justify-items: center;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .badge > .circle {
        position: relative;
        background: var(--indexed-section-circle-background);
        border-radius: 50%;
        padding: var(--indexed-section-circle-size);
    }
    .content {
        grid-area: content;
        padding-top: 0.3rem; /* A small padding because OCD. */
    }
    .link {
        grid-area: link;
        position: relative;
        display: grid;
        justify-items: center;
        align-items: center;
    }
    .link > .bar {
        position: absolute;
        top: 0;
        bottom: 0;
        width: var(--indexed-section-link-width);
        border-radius: var(--indexed-section-link-width);
        background: var(--indexed-section-link-background);
    }
    .link.hidden {
        display: none;
    }
</style>

<script lang="ts">
    import { onMount, type Snippet } from "svelte"
    import Title from "./title.svelte"
    import { register } from "$lib/scripts/scroll/register"
    import { unregister } from "$lib/scripts/scroll/unregister"
    import { scroll } from "$lib/scripts/scroll/scroll.svelte"
    import { textToAnchor } from "$lib/scripts/text_to_anchor"
    type Props = {
        key: string
        description: string
        children: Snippet
        noLink?: boolean
    }
    let { key, description, children, noLink = false }: Props = $props()
    let id: string = $state("")
    let element: HTMLDivElement
    onMount(function start() {
        id = textToAnchor(description)
        register(scroll, id, element)
        return function stop() {
            unregister(scroll, id)
        }
    })
</script>

<div bind:this={element} class="keyed-section">
    <div class="badge">
        <span class="key">{key[0]}</span>
        <div class="circle"></div>
    </div>
    <div class="content">
        <Title type="h3" text={description} {id} noAnchor />
        {@render children()}
    </div>
    <div class="link" class:hidden={noLink}>
        <div class="bar"></div>
    </div>
</div>
