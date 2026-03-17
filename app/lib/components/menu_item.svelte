<style>
    :root {
        --menu-item-gap: 1rem;
    }
    .shift {
        --shift: 0;
        padding-left: calc(1rem * var(--shift));
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    type Props = {
        children: Snippet
        shift?: number
    }
    let { children, shift = 0 }: Props = $props()
</script>

<div class="menu-item">
    <div class="shift" style:--shift={shift}>
        {@render children()}
    </div>
</div>
