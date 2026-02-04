<style>
    :root {
        --file-gap: 0.1rem;
    }
    .file {
        display: grid;
        position: relative;
        gap: var(--file-gap);
        grid-template-columns: auto 1fr;
        grid-template-areas: "icon name";
    }
    .icon {
        position: relative;
        top: 0.2rem;
        grid-area: icon;
    }
    .name {
        position: relative;
        grid-area: name;
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

<div class="file">
    <button class="name">{name}</button>
    <div class="icon"><Icon path={icon} /></div>
</div>
