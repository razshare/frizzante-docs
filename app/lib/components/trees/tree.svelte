<style>
    :root {
        --tree-padding: 1rem;
        --tree-roundness: 1rem;
        --tree-background: #1c1b1a;
        --tree-text: #878580;
    }
    .tree {
        position: relative;
        color: var(--tree-text);
        background-color: var(--tree-background);
        padding: var(--tree-padding);
        border-radius: var(--tree-roundness);
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
