<style>
    :root {
        --searchbar-results-text: #c0c0c0;
        --searchbar-results-gap: 1rem;
        --searchbar-results-border: 1px solid #c0c0c0;
    }
    .searchbar-results {
        display: grid;
        justify-items: start;
    }
    .suggestion {
        width: 100%;
        position: relative;
        padding-bottom: 0.1rem;
    }
</style>

<script lang="ts">
    import SuggestionComponent from "$lib/components/suggestion.svelte"
    import type { Suggestion } from "$lib/scripts/searchbar/suggestion"
    type Props = {
        suggestions: Suggestion[]
    }
    let { suggestions = [] }: Props = $props()
</script>

<div class="searchbar-results">
    {#each suggestions as suggestion, index (index)}
        <div class="suggestion">
            <SuggestionComponent {...suggestion} />
        </div>
    {:else}
        <span>No results found.</span>
    {/each}
</div>
