<style>
    :root {
        --file-tree-margin: 1rem;
        --file-tree-padding: 1rem;
        --file-tree-roundness: 1rem;
        --file-tree-background: #1c1b1a;
        --file-tree-text: #878580;
    }
    .tree {
        color: var(--file-tree-text);
        background-color: var(--file-tree-background);
        padding: var(--file-tree-padding);
        margin-top: var(--file-tree-margin);
        border-radius: var(--file-tree-roundness);
    }
</style>

<script lang="ts">
    import FileTreeDirectory from "$lib/components/file_tree_directory.svelte"
    import FileTreeFile from "$lib/components/file_tree_file.svelte"
    import type { Snippet } from "svelte"
    type Props = { children: Snippet<[{ Directory: typeof FileTreeDirectory; File: typeof FileTreeFile }]> }
    let { children }: Props = $props()
</script>

<div class="tree">
    {@render children({
        Directory: FileTreeDirectory,
        File: FileTreeFile,
    })}
</div>
