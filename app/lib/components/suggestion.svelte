<style>
    :root {
        --suggestion-padding: 1rem;
        --suggestion-roundness: 0;
        --suggestion-text: #c0c0c0;
        --suggestion-hover-background: rgba(210, 67, 23, 0.05);
        --suggestion-hover-text: #d24317;
    }
    .suggestion {
        border: 0;
        width: 100%;
        position: relative;
        text-align: start;
        background-color: transparent;
        color: var(--suggestion-text);
        padding: var(--suggestion-padding);
        border-radius: var(--suggestion-roundness);
        grid-template-columns: 1fr 10fr 2fr;
        grid-template-rows: 1fr auto 1fr;
        grid-template-areas:
            "title title title"
            "content content content"
            "separator separator separator";
    }
    .suggestion:hover:not(.active) {
        background-color: var(--suggestion-hover-background);
        color: var(--suggestion-hover-text);
        cursor: pointer;
    }
    .title {
        grid-area: title;
    }
    .content {
        grid-area: content;
        min-height: 1rem;
    }
    .page {
        font-weight: bold;
        font-size: 1.2rem;
    }
    .section {
        opacity: 0.5;
        font-size: 1.2rem;
        font-style: italic;
    }
    .description {
        opacity: 0.5;
    }
    .no-description {
        opacity: 0.5;
        font-style: italic;
    }
</style>

<script lang="ts">
    import { href } from "$lib/scripts/core/href"
    import { scrollTo } from "$lib/scripts/scroll_to"
    import type { Suggestion } from "$lib/scripts/searchbar/suggestion"
    type Props = Suggestion & { prefix: string; body: false | HTMLDivElement }
    let { description, page, section, href: createSuggestionHref, prefix, body }: Props = $props()
    let suggestionHref = $derived(createSuggestionHref(prefix))
    let { onclick } = $derived(href(suggestionHref))
    async function onmousedown(event: MouseEvent) {
        event.preventDefault()
        if (!body) {
            return
        }
        await onclick(event)
        if (!body) {
            console.warn("body element not found")
            return
        }
        const id = window.location.hash.substring(1)
        scrollTo({ container: body, targetId: id })
    }
</script>

<button class="suggestion" {onmousedown}>
    <div class="title">
        <span class="page">{page}</span>
        <span class="section">#{section}</span>
    </div>
    <div class="content">
        {#if description.trim() !== ""}
            <span class="description">{description}</span>
        {:else}
            <span class="no-description">&lt;No description&gt;</span>
        {/if}
    </div>
</button>
