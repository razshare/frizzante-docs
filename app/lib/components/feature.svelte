<style>
    :root {
        --feature-background: #1c1b1a;
        --feature-gap: 1rem;
        --feature-padding: 3rem;
        --feature-roundness: 0;
    }
    .feature {
        display: grid;
        gap: var(--feature-gap);
        padding: var(--feature-padding);
        border-radius: var(--feature-roundness);
        grid-template-columns: auto 1fr;
        background-color: var(--feature-background);
        grid-template-areas:
            "feature-icon feature-title"
            "feature-description feature-description"
            "feature-button feature-button";
    }
    .feature-icon {
        grid-area: feature-icon;
    }
    .feature-title {
        grid-area: title;
    }
    .feature-description {
        grid-area: feature-description;
    }
    .feature-button {
        grid-area: feature-button;
    }
</style>

<script lang="ts">
    import Button from "$lib/components/button.svelte"
    import Code from "$lib/components/code.svelte"
    import Icon from "$lib/components/icons/icon.svelte"
    import type { BundledLanguage } from "shiki"
    type Props = {
        icon: string
        title: string
        description: string
        example?: {
            source: string
            lang: BundledLanguage
        }
    }
    let { icon, title, description, example }: Props = $props()
</script>

<div class="feature">
    <div class="feature-icon"><Icon path={icon} /></div>
    <div class="feature-title">{title}</div>
    <div class="feature-description">
        <span>{description}</span>
        {#if example}
            <Code {...example} />
        {/if}
    </div>
    <div class="feature-button">
        <Button ghost>Read More</Button>
    </div>
</div>
