<style>
    :root {
        --inline-code-background: #343331;
        --inline-code-text: #cecdc3;
        --inline-code-margin: 0.3rem;
        --inline-code-padding: 0.3rem;
        --inline-code-roundness: 0.3rem;
    }
    .inline-code {
        position: relative;
        margin-left: var(--inline-code-margin);
        margin-right: var(--inline-code-margin);
    }
    .inline-code > .text {
        position: relative;
        color: var(--inline-code-text);
        padding-left: var(--inline-code-padding);
        padding-right: var(--inline-code-padding);
        z-index: 1;
    }
    .inline-code > .background {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
        position: absolute;
        pointer-events: none;
        border-radius: var(--inline-code-roundness);
        background-color: var(--inline-code-background);
    }
</style>

<script lang="ts">
    type Props = { source: string }
    let { source }: Props = $props()
</script>

<span class="inline-code">
    <span class="text">{source}</span>
    <span class="background"></span>
</span>
