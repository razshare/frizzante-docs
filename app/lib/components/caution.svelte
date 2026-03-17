<style>
    :root {
        --caution-background: #40200d;
        --caution-text: #fcc192;
        --caution-title: #fcc192;
        --caution-icon: #fcc192;
        --caution-padding: 0.7rem;
        --caution-roundness: 1rem;
        --caution-margin: 0.5rem;
    }
    .caution {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "caution-icon caution-title"
            "caution-empty caution-empty"
            "caution-content caution-content";
        background-color: var(--caution-background);
        color: var(--caution-text);
        padding: var(--caution-padding);
        border-radius: var(--caution-roundness);
        margin-top: var(--caution-margin);
        margin-bottom: var(--caution-margin);
    }
    .caution-icon {
        grid-area: caution-icon;
        color: var(--caution-title);
    }
    .caution-title {
        grid-area: caution-title;
        color: var(--caution-title);
        padding-left: var(--caution-padding);
    }
    .caution-content {
        grid-area: caution-content;
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import { mdiAlertRhombusOutline } from "@mdi/js"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet }
    let { children }: Props = $props()
</script>

<div class="caution">
    <div class="caution-icon">
        <Icon path={mdiAlertRhombusOutline} size="1.5rem" />
    </div>
    <div class="caution-title">Caution</div>
    <div class="caution-content">{@render children()}</div>
</div>
