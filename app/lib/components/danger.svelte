<style>
    :root {
        --danger-background: #af1414;
        --danger-text: #ff9995;
        --danger-icon: #ff9995;
        --danger-title: #ff9995;
        --danger-padding: 0.7rem;
        --danger-roundness: 0.3rem;
        --danger-margin: 0.5rem;
    }
    .danger {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "icon title"
            "empty empty"
            "content content";
        background-color: var(--danger-background);
        color: var(--danger-text);
        padding: var(--danger-padding);
        border-radius: var(--danger-roundness);
        margin-top: var(--danger-margin);
        margin-bottom: var(--danger-margin);
    }
    .icon {
        grid-area: icon;
        color: var(--danger-icon);
    }
    .title {
        grid-area: title;
        color: var(--danger-title);
        padding-left: var(--danger-padding);
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
