<script lang="ts">
    import Layout from "$lib/components/layout.svelte"
    import LeftSidebar from "$lib/components/left_sidebar.svelte"
    import Navbar from "$lib/components/navbar.svelte"
    import { onMount, type Snippet } from "svelte"
    type Props = {
        title: string
        rightSidebar: Snippet
        footer: Snippet
        children: Snippet
    }
    let { title, children, rightSidebar: sidebar, footer: pageFooter }: Props = $props()
    let searchQuery: string = $state("")
    let searchFocused: boolean = $state(false)
    onMount(function start() {
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
        //
        if (window.location.hash !== "") {
            window.location.hash = window.location.hash
        }
    })
</script>

<Layout {title}>
    {#snippet navbar()}
        <Navbar bind:search={searchQuery} bind:focused={searchFocused} />
    {/snippet}
    {#snippet content()}
        {@render children()}
    {/snippet}
    {#snippet footer()}
        {@render pageFooter()}
    {/snippet}
    {#snippet leftSidebar()}
        <LeftSidebar />
    {/snippet}
    {#snippet rightSidebar()}
        {@render sidebar()}
    {/snippet}
</Layout>
