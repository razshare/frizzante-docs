<style>
    :root {
        --note-background: #12253b;
        --note-text: #cbc1de;
        --note-icon: #90b1c4;
        --note-title: #90b1c4;
        --note-padding: 0.7rem;
        --note-roundness: 0.3rem;
        --note-gap: 0.5rem;
    }
    .note {
        position: relative;
        display: grid;
        gap: var(--note-gap);
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "icon title"
            "empty empty"
            "content content";
        background-color: var(--note-background);
        color: var(--note-text);
        padding: var(--note-padding);
        border-radius: var(--note-roundness);
    }
    .icon {
        grid-area: icon;
        color: var(--note-icon);
    }
    .title {
        grid-area: title;
        color: var(--note-title);
    }
    .content {
        grid-area: content;
    }
</style>

<script lang="ts">
    import { mdiInformationOutline } from "@mdi/js"
    import Icon from "$lib/components/icons/icon.svelte"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet }
    let { children }: Props = $props()
</script>

<div class="note">
    <div class="icon">
        <Icon path={mdiInformationOutline} size="1.5rem" />
    </div>
    <div class="title">Note</div>
    <div class="content">{@render children()}</div>
</div>
