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
            "icon name"
            "link content";
    }
    .icon {
        position: relative;
        top: 0.2rem;
        grid-area: icon;
    }
    .icon:hover {
        color: var(--directory-text-hover);
    }
    .name {
        position: relative;
        grid-area: name;
    }
    .name:hover {
        color: var(--directory-text-hover);
    }
    .content {
        grid-area: content;
    }
    .link {
        grid-area: link;
        position: relative;
        display: grid;
        justify-items: center;
        align-items: center;
    }
    .link > .bar {
        position: absolute;
        top: 0;
        bottom: 0;
        width: var(--directory-link-width);
        border-radius: var(--directory-link-width);
        background: var(--directory-link-background);
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

<div class="directory">
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
