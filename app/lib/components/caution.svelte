<style>
    :root {
        --caution-background: #40200d;
        --caution-text: #cbc1de;
        --caution-title: #fcc192;
        --caution-icon: #fcc192;
        --caution-padding: 0.7rem;
        --caution-roundness: 0.3rem;
        --caution-gap: 0.5rem;
    }
    .caution {
        position: relative;
        display: grid;
        gap: var(--caution-gap);
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "icon title"
            "empty empty"
            "content content";
        background-color: var(--caution-background);
        color: var(--caution-text);
        padding: var(--caution-padding);
        border-radius: var(--caution-roundness);
    }
    .icon {
        grid-area: icon;
        color: var(--caution-title);
    }
    .title {
        grid-area: title;
        color: var(--caution-title);
    }
    .content {
        grid-area: content;
    }
</style>

<script lang="ts">
    import { mdiAlertRhombusOutline } from "@mdi/js"
    import Icon from "$lib/components/icons/icon.svelte"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet }
    let { children }: Props = $props()
</script>

<div class="caution">
    <div class="icon">
        <Icon path={mdiAlertRhombusOutline} size="1.5rem" />
    </div>
    <div class="title">Caution</div>
    <div class="content">{@render children()}</div>
</div>
