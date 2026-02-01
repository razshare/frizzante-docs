<style>
    :root {
        --feature-background: #1c1b1a;
        --feature-gap: 1rem;
        --feature-padding: 3rem;
        --feature-roundness: 0.3rem;
    }
    .feature {
        display: grid;
        position: relative;
        gap: var(--feature-gap);
        padding: var(--feature-padding);
        border-radius: var(--feature-roundness);
        grid-template-columns: auto 1fr;
        background-color: var(--feature-background);
        grid-template-areas:
            "icon title"
            "description description"
            "button button";
    }
    .icon {
        grid-area: icon;
    }
    .title {
        grid-area: title;
    }
    .description {
        grid-area: description;
    }
    .button {
        grid-area: button;
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import Button from "$lib/components/button.svelte"
    import Code from "$lib/components/code.svelte"
    type Props = {
        icon: string
        title: string
        description: string
        example?: {
            lang: string
            code: string
        }
    }
    let { icon, title, description, example }: Props = $props()
</script>

<div class="feature">
    <div class="icon"><Icon path={icon} /></div>
    <div class="title">{title}</div>
    <div class="description">
        <span>{description}</span>
        {#if example}
            <Code {...example} />
        {/if}
    </div>
    <div class="button">
        <Button ghost>Read More</Button>
    </div>
</div>
