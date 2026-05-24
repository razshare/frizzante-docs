<style>
    :root {
        --searchbar-text: #6e6e6e;
        --searchbar-text-focused: #c0c0c0;
        --searchbar-border: 1px solid #6e6e6e;
        --searchbar-border-focused: 1px solid #c0c0c0;
        --searchbar-roundness: 0;
        --searchbar-padding: 0.5rem;
        --searchbar-gap: 0.1rem;
        --searchbar-results-background: #0b0a0a;
        --searchbar-results-roundness: 0;
        --searchbar-results-padding: 1rem;
    }
    .searchbar {
        position: relative;
    }
    .button {
        color: var(--searchbar-text);
        border-radius: var(--searchbar-roundness);
        border: var(--searchbar-border);
        gap: var(--searchbar-gap);
        padding: var(--searchbar-padding);
        width: 100%;
        display: grid;
        position: relative;
        justify-items: start;
        align-items: center;
        background-color: transparent;
        grid-template-columns: auto 1fr auto;
        grid-template-areas: "icon text shortcut";
    }
    .button.focused {
        border: var(--searchbar-border-focused);
    }
    .icon {
        grid-area: icon;
        display: grid;
        pointer-events: none;
        align-items: center;
        left: var(--searchbar-padding);
        color: var(--searchbar-text);
    }
    .icon.focused {
        color: var(--searchbar-text-focused);
    }
    .text {
        grid-area: text;
        display: grid;
        align-items: center;
        background-color: transparent;
        padding: var(--searchbar-padding);
        border: 0;
        outline: none;
        color: inherit;
        width: 100%;
        color: var(--searchbar-text);
    }
    .text.focused {
        color: var(--searchbar-text-focused);
    }
    .results {
        position: absolute;
        background: var(--searchbar-results-background);
        border-radius: var(--searchbar-results-roundness);
        padding: var(--searchbar-results-padding);
        left: 0;
        right: 0;
        top: 4rem;
        height: 20rem;
        overflow: hidden;
    }
    @media screen and (max-width: 640px) {
        .results {
            position: fixed;
            border-radius: 0;
            height: auto;
            bottom: 0;
        }
    }
    .searchbar-results {
        border-radius: var(--searchbar-results-roundness);
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import SearchbarResults from "$lib/components/searchbar_results.svelte"
    import { find } from "$lib/scripts/searchbar/find"
    import { mdiLayersSearch } from "@mdi/js"
    import { onMount } from "svelte"
    type Props = {
        query: string
        prefix: string
        focused: boolean
        placeholder?: string
    }
    let { query = $bindable(""), focused = $bindable(false), placeholder = "", prefix }: Props = $props()
    let suggestions = $derived(find(query))
    let input: HTMLInputElement | undefined
    function onfocus() {
        focused = true
    }
    function onblur() {
        focused = false
    }
    function keydown(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            if (input) {
                input.blur()
            }
            query = ""
            focused = false
            return
        }
        if (event.ctrlKey && event.key === "k") {
            event.preventDefault()
            if (input) {
                input.focus()
            }
            return
        }
        if (event.key.length === 1 && !event.ctrlKey && !event.altKey) {
            event.preventDefault()
            if (input) {
                input.focus()
            }
            query += event.key
        }
    }
    function oninputkeydown(event: KeyboardEvent): void {
        if (event.key.length > 1 || event.ctrlKey || event.altKey) {
            return
        }
        event.preventDefault()
        if (input) {
            input.blur()
        }
    }
    function onmousedown(): void {
        if (input) {
            input.blur()
        }
        query = ""
        focused = false
    }
    onMount(function start() {
        document.addEventListener("keydown", keydown)
        document.addEventListener("mousedown", onmousedown)
        return function stop() {}
    })
</script>

<div class="searchbar">
    <button class="button" class:focused>
        <div class="icon" class:focused>
            <Icon path={mdiLayersSearch} size="1.5rem" />
        </div>
        <input
            bind:this={input}
            class="text"
            class:focused
            type="text"
            {onfocus}
            {onblur}
            bind:value={query}
            onkeydown={oninputkeydown}
            {placeholder}
        />
    </button>
    {#if query !== ""}
        <div class="results">
            <div class="searchbar-results">
                <SearchbarResults {suggestions} {prefix} />
            </div>
        </div>
    {/if}
</div>
