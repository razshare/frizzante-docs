<style>
    :root {
        --tip-background: #261c39;
        --tip-text: #a193bd;
        --tip-icon: #a193bd;
        --tip-title: #a193bd;
        --tip-padding: 0.7rem;
        --tip-roundness: 0;
        --tip-margin: 0.5rem;
    }
    .tip {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "tip-icon tip-title"
            "empty empty"
            "tip-content tip-content";
        background-color: var(--tip-background);
        color: var(--tip-text);
        padding: var(--tip-padding);
        border-radius: var(--tip-roundness);
        margin-top: var(--tip-margin);
        margin-bottom: var(--tip-margin);
    }
    .tip-icon {
        grid-area: tip-icon;
        color: var(--tip-icon);
    }
    .tip-title {
        display: grid;
        align-items: center;
        grid-area: tip-title;
        color: var(--tip-title);
        padding-left: calc(var(--tip-padding) / 4);
    }
    .tip-content {
        grid-area: tip-content;
        padding-top: calc(var(--tip-padding) / 2);
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
    <div class="tip-icon">
        <Icon path={mdiLightbulbGroupOutline} size="1.4rem" />
    </div>
    <div class="tip-title">Tip</div>
    <div class="tip-content">{@render children()}</div>
</div>
