<script lang="ts">
    import Layout from "$lib/components/layout.svelte"
    import LeftSidebar from "$lib/components/left_sidebar.svelte"
    import Navbar from "$lib/components/navbar.svelte"
    import { scrollTo } from "$lib/scripts/scroll_to"
    import { onMount, type Snippet } from "svelte"
    type Props = {
        title: string
        rightSidebar: Snippet<[{ body: HTMLDivElement }]>
        footer: Snippet
        children: Snippet
        prefix: string
    }
    let { title, children, rightSidebar: rightSidebar_, footer: pageFooter, prefix }: Props = $props()
    let searchQuery: string = $state("")
    let searchFocused: boolean = $state(false)
    let body: false | HTMLDivElement = $state(false)
    onMount(async function start() {
        // There is a very good chance that the URL contains a hash.
        // Since pages are loaded asynchronously, the first render of the dom
        // may not actually contain the contents of the page.
        //
        // If the DOM does not contain the content of the page, and the url hash
        // references an ID within the content of the page, then the browser doesn't
        // know what to do with the url hash, it won't scroll down.
        //
        // The onMount() event function ensures that whatever code we run inside it,
        // it is running **after** the contents of the page have rendered,
        // which makes it safe to re-evaluate the url hash.
        //
        // We force the browser to re-evaluate the url hash,
        // so that it scrolls to the target element.
        if (window.location.hash !== "") {
            window.location.hash = window.location.hash
            if (!body) {
                console.warn("body element not found")
                return
            }
            scrollTo({ container: body, targetId: window.location.hash.substring(1) })
        }
    })
</script>

<Layout {title} bind:body>
    {#snippet navbar()}
        <Navbar bind:search={searchQuery} bind:focused={searchFocused} {prefix} />
    {/snippet}
    {#snippet content()}
        {@render children()}
    {/snippet}
    {#snippet footer()}
        {@render pageFooter()}
    {/snippet}
    {#snippet leftSidebar()}
        <LeftSidebar {prefix} />
    {/snippet}
    {#snippet rightSidebar()}
        {#if body}
            {@render rightSidebar_({ body })}
        {/if}
    {/snippet}
</Layout>
