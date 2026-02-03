<style>
    :root {
        --searchbar-text: #5f5e5a;
        --searchbar-text-focused: #c0c0c0;
        --searchbar-gap: 1rem;
        --searchbar-border: 1px solid #5f5e5a;
        --searchbar-border-focused: 1px solid #c0c0c0;
        --searchbar-roundness: 1rem;
        --searchbar-padding: 1.4rem;
    }
    .searchbar {
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
        grid-template-areas: "icon content shortcut";
    }
    .icon {
        display: grid;
        pointer-events: none;
        align-items: center;
        position: absolute;
        left: var(--searchbar-padding);
        top: 0;
        bottom: 0;
    }
    .text {
        display: grid;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: transparent;
        padding: var(--searchbar-padding);
        padding-left: calc(var(--searchbar-padding) * 2.5);
        border: 0;
        outline: none;
        color: inherit;
    }
    .shortcut {
        pointer-events: none;
        display: grid;
        align-items: center;
        position: absolute;
        right: var(--searchbar-padding);
        top: 0;
        bottom: 0;
    }
    .searchbar.focused {
        border: var(--searchbar-border-focused);
    }
    .text.focused {
        color: var(--searchbar-text-focused);
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import { mdiTextSearch } from "@mdi/js"
    import { onMount } from "svelte"
    let input: HTMLInputElement
    let focused = $state(false)
    function onfocus() {
        focused = true
    }
    function onblur() {
        focused = false
    }
    function keydown(event: KeyboardEvent) {
        if (!event.ctrlKey || event.key !== "k") {
            return
        }
        event.preventDefault()
        input.focus()
    }
    onMount(function start() {
        document.addEventListener("keydown", keydown)
        return function stop() {}
    })
</script>

<button class="searchbar" class:focused>
    <div class="icon"><Icon path={mdiTextSearch} size="1.5rem" /></div>
    <input bind:this={input} class="text" class:focused type="text" {onfocus} {onblur} />
    <div class="shortcut">Ctrl K</div>
</button>
