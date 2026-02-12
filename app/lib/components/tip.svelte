<style>
    :root {
        --tip-background: #261c39;
        --tip-text: #cbc1de;
        --tip-padding: 0.7rem;
        --tip-roundness: 1rem;
        --tip-gap: 0.5rem;
    }
    .tip {
        position: relative;
        display: grid;
        gap: var(--tip-gap);
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "icon title"
            "empty empty"
            "content content";
        background-color: var(--tip-background);
        color: var(--tip-text);
        padding: var(--tip-padding);
        border-radius: var(--tip-roundness);
        margin-bottom: var(--tip-gap);
    }
    .icon {
        grid-area: icon;
    }
    .title {
        grid-area: title;
    }
    .content {
        grid-area: content;
    }
</style>

<script lang="ts">
    import { mdiLightbulbGroupOutline } from "@mdi/js"
    import Icon from "$lib/components/icons/icon.svelte"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet }
    let { children }: Props = $props()
</script>

<div class="tip">
    <div class="icon">
        <Icon path={mdiLightbulbGroupOutline} size="1.5rem" />
    </div>
    <div class="title">Tip</div>
    <div class="content">{@render children()}</div>
</div>
