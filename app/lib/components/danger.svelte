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
            "danger-icon danger-title"
            "danger-empty danger-empty"
            "danger-content danger-content";
        background-color: var(--danger-background);
        color: var(--danger-text);
        padding: var(--danger-padding);
        border-radius: var(--danger-roundness);
        margin-top: var(--danger-margin);
        margin-bottom: var(--danger-margin);
    }
    .danger-icon {
        grid-area: danger-icon;
        color: var(--danger-icon);
    }
    .danger-title {
        grid-area: danger-title;
        color: var(--danger-title);
        padding-left: var(--danger-padding);
    }
    .danger-content {
        grid-area: danger-content;
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
    <div class="danger-icon">
        <Icon path={mdiFireCircle} size="1.5rem" />
    </div>
    <div class="danger-title">Danger</div>
    <div class="danger-content">{@render children()}</div>
</div>
