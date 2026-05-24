<style>
    :root {
        --title-text: #cecdc3;
        --title-link: #d24317;
    }
    .title {
        display: grid;
        grid-template-areas: "text link";
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 1rem;
        grid-area: link;
        display: grid;
        align-items: center;
        font-weight: bold;
        margin-bottom: 1rem;
        color: var(--title-text);
    }
    .title:hover {
        text-decoration: none;
    }
    .title-text {
        grid-area: text;
    }
    .title-icon {
        opacity: 0;
        color: var(--title-link);
    }
    .title-icon.visible {
        opacity: 1;
    }
    .no-margin {
        margin: 0;
        margin-top: 0;
        margin-bottom: 0;
    }
</style>

<script lang="ts">
    import { textToAnchor } from "$lib/scripts/text_to_anchor"
    import { mdiLinkVariant } from "@mdi/js"
    import Icon from "./icons/icon.svelte"

    type Props = {
        text: string
        type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        noMargin?: boolean
    }
    let { text, type: tag = "h1", noMargin = false }: Props = $props()
    let hovered = $state(false)
    let id: string = $derived(textToAnchor(text))

    function typeToSize(tag: string): string {
        switch (tag) {
            case "h1":
                return "2rem"
            case "h2":
                return "1.8rem"
            case "h3":
                return "1.5rem"
            case "h4":
                return "1.3rem"
            case "h5":
                return "1.1rem"
            default:
                return "1rem"
        }
    }

    function onmouseover() {
        hovered = true
    }

    function onfocus() {
        hovered = true
    }

    function onmouseout() {
        hovered = false
    }

    function onblur() {
        hovered = false
    }
</script>

<a class="title" href="#{id}" {onmouseover} {onmouseout} {onfocus} {onblur}>
    <div class="title-text" style="font-size:{typeToSize(tag)}">
        {#if tag === "h1"}
            <span {id} class:no-margin={noMargin}>
                <span>{text}</span>
            </span>
        {:else if tag === "h2"}
            <span {id} class:no-margin={noMargin}>
                <span>{text}</span>
            </span>
        {:else if tag === "h3"}
            <span {id} class:no-margin={noMargin}>
                <span>{text}</span>
            </span>
        {:else if tag === "h4"}
            <span {id} class:no-margin={noMargin}>
                <span>{text}</span>
            </span>
        {:else if tag === "h5"}
            <span {id} class:no-margin={noMargin}>
                <span>{text}</span>
            </span>
        {:else}
            <span {id} class:no-margin={noMargin}>
                <span>{text}</span>
            </span>
        {/if}
    </div>
    <div class="title-icon" class:visible={hovered}>
        <Icon path={mdiLinkVariant} size={typeToSize(tag)} />
    </div>
</a>
