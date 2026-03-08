<style>
    :root {
        --searchbar-text: #5f5e5a;
        --searchbar-text-focused: #c0c0c0;
        --searchbar-gap: 1rem;
        --searchbar-border: 1px solid #5f5e5a;
        --searchbar-border-focused: 1px solid #c0c0c0;
        --searchbar-roundness: 1rem;
        --searchbar-padding: 0.5rem;
        --searchbar-results-background: #0b0a0a;
        --searchbar-results-roundness: 1rem;
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
    }
    .text.focused {
        color: var(--searchbar-text-focused);
    }
    .shortcut {
        grid-area: shortcut;
        pointer-events: none;
        display: grid;
        align-items: center;
        padding-right: var(--searchbar-padding);
    }
    .results {
        position: absolute;
        background: var(--searchbar-results-background);
        border-radius: var(--searchbar-results-roundness);
        padding: var(--searchbar-results-padding);
        left: 0;
        right: 0;
        top: 5rem;
        height: 20rem;
        overflow: hidden;
    }
    .results-container {
        border-radius: var(--searchbar-results-roundness);
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    import SearchbarResults from "./searchbar_results.svelte"
    import Icon from "$lib/components/icons/icon.svelte"
    import { find } from "$lib/scripts/searchbar/find"
    import { mdiTextSearch } from "@mdi/js"
    import { onMount } from "svelte"
    type Props = {
        query: string
        focused: boolean
    }
    let { query = $bindable(""), focused = $bindable(false) }: Props = $props()
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
        <div class="icon"><Icon path={mdiTextSearch} size="1.5rem" /></div>
        <input
            bind:this={input}
            class="text"
            class:focused
            type="text"
            {onfocus}
            {onblur}
            bind:value={query}
            onkeydown={oninputkeydown}
        />
        <div class="shortcut">Ctrl K</div>
    </button>
    {#if query !== ""}
        <div class="results">
            <div class="results-container">
                <SearchbarResults {suggestions} />
            </div>
        </div>
    {/if}
</div>
