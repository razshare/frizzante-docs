<style>
    :root {
        --keyed-section-circle-size: 1rem;
        --keyed-section-circle-background: rgba(255, 255, 255, 0.3);
        --keyed-section-link-background: rgba(255, 255, 255, 0.3);
        --keyed-section-link-width: 0.3rem;
        --keyed-section-gap: 0.3rem;
        --keyed-section-badge-key-text: inherit;
    }
    .keyed-section {
        display: grid;
        gap: var(--keyed-section-gap);
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "badge content"
            "link content"
            "empty empty";
    }
    .keyed-section-badge {
        grid-area: badge;
        position: relative;
        justify-self: center;
        align-self: center;
    }
    .keyed-section-badge > .keyed-section-badge-key {
        display: grid;
        justify-items: center;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        color: var(--keyed-section-badge-key-text);
        font-weight: bold;
    }
    .keyed-section-badge > .keyed-section-badge-circle {
        position: relative;
        background: var(--keyed-section-circle-background);
        border-radius: 50%;
        padding: var(--keyed-section-circle-size);
    }
    .keyed-section-content {
        grid-area: content;
        padding-top: 0.3rem; /* A small padding because OCD. */
        overflow: auto;
    }
    .keyed-section-link {
        grid-area: link;
        position: relative;
        display: grid;
        justify-items: center;
        align-items: center;
    }
    .keyed-section-link > .keyed-section-badge-bar {
        position: absolute;
        top: 0;
        bottom: 0;
        width: var(--keyed-section-link-width);
        border-radius: var(--keyed-section-link-width);
        background: var(--keyed-section-link-background);
    }
    .keyed-section-link.hidden {
        display: none;
    }
</style>

<script lang="ts">
    import Title from "$lib/components/title.svelte"
    import type { Snippet } from "svelte"
    type Props = {
        key: string
        description: string
        children: Snippet
        noLink?: boolean
    }
    let { key, description, children, noLink = false }: Props = $props()
</script>

<div class="keyed-section">
    <div class="keyed-section-badge">
        <div class="keyed-section-badge-circle"></div>
        <span class="keyed-section-badge-key">{key[0]}</span>
    </div>
    <div class="keyed-section-content">
        <Title type="h6" text={description} noMargin />
        {@render children()}
    </div>
    <div class="keyed-section-link" class:hidden={noLink}>
        <div class="keyed-section-badge-bar"></div>
    </div>
</div>
