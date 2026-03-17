<style>
    :root {
        --file-tree-directory-gap: 0.1rem;
        --file-tree-directory-text-hover: #a2dece;
        --file-tree-directory-link-background: #878580;
        --file-tree-directory-link-width: 0.1rem;
    }
    .file-tree-directory {
        display: grid;
        gap: var(--file-tree-directory-gap);
        grid-template-columns: auto auto 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas:
            "directory-icon directory-name"
            "directory-link directory-content";
    }
    .icon {
        grid-area: directory-icon;
        top: 0.2rem;
    }
    .icon:hover {
        color: var(--file-tree-directory-text-hover);
    }
    .name {
        grid-area: directory-name;
    }
    .name:hover {
        color: var(--file-tree-directory-text-hover);
    }
    .content {
        grid-area: directory-content;
    }
    .link {
        display: grid;
        position: relative;
        grid-area: directory-link;
        justify-items: center;
        align-items: center;
    }
    .link > .bar {
        position: absolute;
        top: 0;
        bottom: 0;
        width: var(--file-tree-directory-link-width);
        border-radius: var(--file-tree-directory-link-width);
        background: var(--file-tree-directory-link-background);
    }
    .link.hidden {
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

<div class="file-tree-directory">
    <button class="name" {onclick}>{name}</button>
    <button class="icon" {onclick}><Icon path={icon} /></button>
    <div class="content">
        {#if expanded && children}
            {@render children()}
        {/if}
    </div>
    <div class="link" class:hidden={!children}>
        <div class="bar"></div>
    </div>
</div>
