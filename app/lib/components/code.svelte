<style>
    :root {
        --code-background: #121212;
        --code-text: #cecdc3;
        --code-margin: 1rem;
        --code-padding: 1rem;
        --code-roundness: 0;
    }
    .code {
        margin-top: var(--code-margin);
        margin-bottom: var(--code-margin);
        overflow: auto;
        border-radius: var(--code-roundness);
        background-color: var(--code-background);
    }
    .code > .text {
        color: var(--code-text);
        padding: var(--code-padding);
        z-index: 1;
    }
</style>

<script lang="ts">
    import { highlighter } from "$lib/scripts/highlighter"
    import { type BundledLanguage } from "shiki"
    import { onMount } from "svelte"
    type Props = {
        source: string
        lang?: BundledLanguage
    }
    let { source, lang = "sh" }: Props = $props()
    let html = $state("")
    function align(text: string): string {
        const lines = []
        let firstMeaningfulLine = ""
        for (const line of text.split("\n")) {
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
        return lines.join("\n").trim()
    }
    onMount(async function ready() {
        const singleton = await highlighter()
        html = singleton.codeToHtml(align(source), {
            lang: lang,
            theme: "vitesse-dark",
        })
    })
</script>

<div class="code">
    {#if html === ""}
        <pre class="text">{align(source)}</pre>
    {:else}
        <!--eslint-disable-next-line svelte/no-at-html-tags-->
        {@html html}
    {/if}
</div>
