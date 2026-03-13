<script lang="ts">
    import { onMount, type Snippet } from "svelte"
    import Footer from "$lib/components/footer.svelte"
    import Layout from "$lib/components/layout.svelte"
    import Navbar from "$lib/components/navbar.svelte"
    import LeftSidebar from "$lib/components/left_sidebar.svelte"
    type Props = {
        title: string
        rightSidebar: Snippet
        children: Snippet
    }
    let { title, children, rightSidebar: sidebar }: Props = $props()
    let searchQuery: string = $state("")
    let searchFocused: boolean = $state(false)
    onMount(function start() {
        // There is a very good chance that the URL contains a HASH.
        // Since pages are loaded asynchronously, the first render of the DOM
        // may not actually contain the contents of the page.
        //
        // If the DOM does not contain the content of the page, and the URL HASH
        // references an ID within the content of the page, then we need to force the
        // browser to re-evaluate the URL HASH, so that it scrolls to the target element.
        //
        // onMount() ensures that whatever code we run inside it, it is running AFTER
        // the contents of this component have rendered, which makes it safe to re-evaluate the URL HASH.
        location.hash = location.hash
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
        <Footer />
    {/snippet}
    {#snippet leftSidebar()}
        <LeftSidebar />
    {/snippet}
    {#snippet rightSidebar()}
        {@render sidebar()}
    {/snippet}
</Layout>
