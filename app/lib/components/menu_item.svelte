<style>
    :root {
        --menu-item-shift: 0;
    }
    .menu-item {
        position: relative;
    }
    .menu-item-shift {
        padding-left: calc(1rem * var(--shift));
    }
    .menu-item-loading-indicator {
        position: relative;
        padding-left: 1rem;
    }
    .menu-item-loading-indicator-spinner {
        position: absolute;
        right: 0;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte"
    import { scale } from "svelte/transition"
    type Props = {
        children: Snippet
        loading?: boolean
        shift?: number
    }
    let { children, loading = false, shift = 0 }: Props = $props()
</script>

<div class="menu-item">
    <div class="menu-item-shift" style:--shift={shift}>
        {@render children()}
        {#if loading}
            <span in:scale class="menu-item-loading-indicator">
                <span class="menu-item-loading-indicator-spinner">|</span>
            </span>
        {/if}
    </div>
</div>
