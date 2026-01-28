<style>
    :root {
        --danger-background: #af1414;
        --danger-text: #cbc1de;
        --danger-icon: #ff9995;
        --danger-title: #ff9995;
        --danger-padding: 0.7rem;
        --danger-roundness: 0.3rem;
        --danger-gap: 0.5rem;
    }
    .danger {
        position: relative;
        height: 100%;
        display: grid;
        gap: var(--danger-gap);
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "icon title"
            "empty empty"
            "content content";
        background-color: var(--danger-background);
        color: var(--danger-text);
        padding: var(--danger-padding);
        border-radius: var(--danger-roundness);
    }
    .icon {
        grid-area: icon;
        color: var(--danger-icon);
    }
    .title {
        grid-area: title;
        color: var(--danger-title);
    }
    .content {
        grid-area: content;
    }
</style>

<script lang="ts">
    import { mdiFireCircle } from "@mdi/js"
    import Icon from "$lib/components/icons/icon.svelte"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet }
    let { children }: Props = $props()
</script>

<div class="danger">
    <div class="icon">
        <Icon path={mdiFireCircle} size="1.5rem" />
    </div>
    <div class="title">Danger</div>
    <div class="content">{@render children()}</div>
</div>
