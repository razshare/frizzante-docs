<script lang="ts">
    import type { Snippet } from "svelte"
    import Footer from "$lib/components/footer.svelte"
    import Layout from "$lib/components/layout.svelte"
    import Navbar from "$lib/components/navbar.svelte"
    import LeftSidebar from "$lib/components/left_sidebar.svelte"
    type Props = {
        title: string
        children: Snippet
        rightSidebar: Snippet
    }
    let { title, children, rightSidebar: sidebar }: Props = $props()
</script>

<Layout {title}>
    {#snippet navbar()}
        <Navbar />
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
