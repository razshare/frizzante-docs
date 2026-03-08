<style>
    :root {
        --suggestion-padding: 1rem;
        --suggestion-roundness: 1rem;
        --suggestion-text: #c0c0c0;
        --suggestion-hover-background: rgba(162, 222, 206, 0.1);
    }
    .suggestion {
        border: 0;
        background-color: transparent;
        width: 100%;
        color: var(--suggestion-text);
        text-align: start;
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
    import type { Suggestion } from "$lib/scripts/searchbar/suggestion"
    import { href } from "$lib/scripts/core/href"
    import { delay } from "$lib/scripts/core/delay"
    type Props = Suggestion
    let { description, page, section, href: createSuggestionHref }: Props = $props()
    let suggestionHref = $derived(createSuggestionHref())
    let { onclick } = $derived(href(suggestionHref))
    async function onmousedown(event: MouseEvent): Promise<void> {
        event.stopImmediatePropagation()
        await onclick(event)
        await delay(100)
        location.hash = suggestionHref.split("#")[1] ?? ""
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
