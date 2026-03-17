<style>
    :root {
        --tip-background: #261c39;
        --tip-text: #a193bd;
        --tip-icon: #a193bd;
        --tip-title: #a193bd;
        --tip-padding: 0.7rem;
        --tip-roundness: 1rem;
        --tip-margin: 0.5rem;
    }
    .tip {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "note-icon note-title"
            "empty empty"
            "note-content note-content";
        background-color: var(--tip-background);
        color: var(--tip-text);
        padding: var(--tip-padding);
        border-radius: var(--tip-roundness);
        margin-top: var(--tip-margin);
        margin-bottom: var(--tip-margin);
    }
    .note-icon {
        grid-area: note-icon;
        color: var(--danger-icon);
    }
    .note-title {
        grid-area: note-title;
        color: var(--tip-title);
        padding-left: var(--tip-padding);
    }
    .note-content {
        grid-area: note-content;
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import { mdiLightbulbGroupOutline } from "@mdi/js"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet }
    let { children }: Props = $props()
</script>

<div class="tip">
    <div class="note-icon">
        <Icon path={mdiLightbulbGroupOutline} size="1.5rem" />
    </div>
    <div class="note-title">Tip</div>
    <div class="note-content">{@render children()}</div>
</div>
