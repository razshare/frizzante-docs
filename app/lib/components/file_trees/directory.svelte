<style>
    :root {
        --directory-gap: 0.1rem;
        --directory-text-hover: #a2dece;
        --directory-link-background: #878580;
        --directory-link-width: 1px;
    }
    .directory {
        display: grid;
        position: relative;
        gap: var(--directory-gap);
        grid-template-columns: auto auto 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas:
            "directory-icon directory-name"
            "directory-link directory-content";
    }
    .directory-icon {
        grid-area: directory-icon;
        position: relative;
        top: 0.2rem;
    }
    .directory-icon:hover {
        color: var(--directory-text-hover);
    }
    .directory-name {
        grid-area: directory-name;
        position: relative;
    }
    .directory-name:hover {
        color: var(--directory-text-hover);
    }
    .directory-content {
        grid-area: directory-content;
    }
    .directory-link {
        grid-area: directory-link;
        position: relative;
        display: grid;
        justify-items: center;
        align-items: center;
    }
    .directory-link > .bar {
        position: absolute;
        top: 0;
        bottom: 0;
        width: var(--directory-link-width);
        border-radius: var(--directory-link-width);
        background: var(--directory-link-background);
    }
    .directory-link.hidden {
        display: none;
    }
    button {
        cursor: pointer;
        background: transparent;
        color: inherit;
        text-align: start;
        border: 0;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import { mdiFolder } from "@mdi/js"
    import type { Snippet } from "svelte"
    type Props = {
        name: string
        icon?: string
        children?: Snippet
        expanded?: boolean
    }
    let { name, icon = mdiFolder, children, expanded = $bindable(false) }: Props = $props()
    function onclick() {
        expanded = !expanded
    }
</script>

<div class="directory">
    <button class="directory-name" {onclick}>{name}</button>
    <button class="directory-icon" {onclick}><Icon path={icon} /></button>
    <div class="directory-content">
        {#if expanded && children}
            {@render children()}
        {/if}
    </div>
    <div class="directory-link" class:hidden={!children}>
        <div class="bar"></div>
    </div>
</div>
