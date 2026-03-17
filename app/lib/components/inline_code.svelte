<style>
    :root {
        --inline-code-background: rgba(30, 119, 148, 0.1);
        --inline-code-text: rgba(255, 255, 255, 0.7);
        --inline-code-top: 0.1.3rem;
        --inline-code-padding: 0.3rem;
        --inline-code-roundness: 0.3rem;
    }
    .inline-code {
        position: relative;
        display: inline-flex;
        align-items: center;
        top: var(--inline-code-top);
    }
    .inline-code > .text {
        color: var(--inline-code-text);
        padding-left: var(--inline-code-padding);
        padding-right: var(--inline-code-padding);
        z-index: 1;
    }
    .inline-code > .background {
        left: 1px;
        right: 1px;
        top: 1px;
        bottom: 1px;
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
