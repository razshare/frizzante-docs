<style>
    :root {
        --code-background: #121212;
        --code-text: #cecdc3;
        --code-margin: 1rem;
        --code-padding: 1rem;
        --code-roundness: 1rem;
    }
    .code {
        position: relative;
        margin: var(--inline-code-margin);
        overflow: auto;
        border-radius: var(--code-roundness);
        background-color: var(--code-background);
    }
    .code > .text {
        position: relative;
        color: var(--code-text);
        padding: var(--code-padding);
        z-index: 1;
    }
</style>

<script lang="ts">
    import { codeToHtml } from "shiki"
    import { onMount } from "svelte"
    type Props = { source: string; lang: string }
    let { source, lang }: Props = $props()
    let html = $state("")
    onMount(async function ready() {
        const lines = []
        let firstMeaningfulLine = ""
        for (const line of source.split("\n")) {
            const lineIsEmpty = line.trim() === ""
            if (firstMeaningfulLine === "") {
                firstMeaningfulLine = line
            }
            if (lineIsEmpty && firstMeaningfulLine === "") {
                continue
            }
            let lineLocal = line
            const matches = firstMeaningfulLine.match(/^(\s+)/g) ?? []
            if (matches.length !== 0) {
                lineLocal = lineLocal.replace(matches[0] ?? "", "")
            }

            lines.push(lineLocal)
        }
        html = await codeToHtml(lines.join("\n").trim(), {
            lang: lang,
            theme: "vitesse-dark",
        })
    })
</script>

<div class="code">
    {#if html === ""}
        <pre class="text">{source}</pre>
    {:else}
        <!--eslint-disable-next-line svelte/no-at-html-tags-->
        {@html html}
    {/if}
</div>
