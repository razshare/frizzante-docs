<style>
    :root {
        --note-background: #12253b;
        --note-text: #90b1c4;
        --note-icon: #90b1c4;
        --note-title: #90b1c4;
        --note-padding: 0.7rem;
        --note-roundness: 0;
        --note-margin: 0.5rem;
    }
    .note {
        display: grid;
        overflow: auto;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "note-icon note-title"
            "empty empty"
            "note-content note-content";
        background-color: var(--note-background);
        color: var(--note-text);
        padding: var(--note-padding);
        border-radius: var(--note-roundness);
        margin-top: var(--note-margin);
        margin-bottom: var(--note-margin);
    }
    .note-icon {
        display: grid;
        align-items: center;
        grid-area: note-icon;
        color: var(--note-icon);
    }
    .note-title {
        display: grid;
        align-items: center;
        grid-area: note-title;
        color: var(--note-title);
        padding-left: calc(var(--note-padding) / 4);
    }
    .note-content {
        grid-area: note-content;
        padding-top: calc(var(--note-padding) / 2);
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import { mdiInformationOutline } from "@mdi/js"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet }
    let { children }: Props = $props()
</script>

<div class="note">
    <div class="note-icon">
        <Icon path={mdiInformationOutline} size="1.4rem" />
    </div>
    <div class="note-title">Note</div>
    <div class="note-content">{@render children()}</div>
</div>
