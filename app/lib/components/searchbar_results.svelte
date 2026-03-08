<style>
    :root {
        --searchbar-results-text: #c0c0c0;
        --searchbar-results-gap: 1rem;
        --searchbar-results-border: 1px solid #c0c0c0;
    }
    .searchbar-results {
        display: grid;
        justify-items: center;
    }
    .suggestion {
        width: 100%;
        padding-bottom: 0.1rem;
    }
</style>

<script lang="ts">
    import type { Suggestion } from "$lib/scripts/searchbar/suggestion"
    import SuggestionComponent from "$lib/components/suggestion.svelte"
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
