<style>
    :root {
        --indexed-section-circle-size: 1rem;
        --indexed-section-circle-background: rgba(0, 0, 0, 0.3);
        --indexed-section-link-background: rgba(0, 0, 0, 0.3);
        --indexed-section-link-width: 0.3rem;
        --indexed-section-gap: 0.3rem;
        --indexed-section-badge-key-text: inherit;
    }
    .keyed-section {
        display: grid;
        gap: var(--indexed-section-gap);
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
        color: var(--indexed-section-badge-key-text);
        font-weight: bold;
    }
    .keyed-section-badge > .keyed-section-badge-circle {
        position: relative;
        background: var(--indexed-section-circle-background);
        border-radius: 50%;
        padding: var(--indexed-section-circle-size);
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
        width: var(--indexed-section-link-width);
        border-radius: var(--indexed-section-link-width);
        background: var(--indexed-section-link-background);
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
