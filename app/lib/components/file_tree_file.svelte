<style>
    :root {
        --file-tree-file-gap: 0.1rem;
    }
    .file-tree-file {
        display: grid;
        gap: var(--file-tree-file-gap);
        grid-template-columns: auto 1fr;
        grid-template-areas: "file-icon file-name";
    }
    .file-icon {
        grid-area: file-icon;
        position: relative;
        top: 0.15rem;
    }
    .file-name {
        grid-area: file-name;
    }
    button {
        cursor: default;
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
    import { mdiFile } from "@mdi/js"
    type Props = {
        name: string
        icon?: string
    }
    let { name, icon = mdiFile }: Props = $props()
</script>

<div class="file-tree-file">
    <button class="file-name">{name}</button>
    <div class="file-icon"><Icon path={icon} /></div>
</div>
