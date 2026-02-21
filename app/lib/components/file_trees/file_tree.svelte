<style>
    :root {
        --file-tree-margin: 1rem;
        --file-tree-padding: 1rem;
        --file-tree-roundness: 1rem;
        --file-tree-background: #1c1b1a;
        --file-tree-text: #878580;
    }
    .tree {
        position: relative;
        color: var(--file-tree-text);
        background-color: var(--file-tree-background);
        padding: var(--file-tree-padding);
        margin-top: var(--file-tree-margin);
        border-radius: var(--file-tree-roundness);
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    import Directory from "./directory.svelte"
    import File from "./file.svelte"
    type Props = { children: Snippet<[{ Directory: typeof Directory; File: typeof File }]> }
    let { children }: Props = $props()
</script>

<div class="tree">{@render children({ Directory, File })}</div>
