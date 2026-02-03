<script lang="ts">
    import { codeToHtml } from "shiki"
    import { onMount } from "svelte"
    type Props = { source: string; lang: string }
    let { source: code, lang }: Props = $props()
    let html = $state("")
    onMount(async function ready() {
        html = await codeToHtml(code, {
            lang: lang,
            theme: "vitesse-dark",
        })
    })
</script>

<!--eslint-disable-next-line svelte/no-at-html-tags-->
<div class="code">{@html html}</div>
