<script lang="ts">
    import type { Snippet } from "svelte"
    import Footer from "$lib/components/footer.svelte"
    import Layout from "$lib/components/layout.svelte"
    import Navbar from "$lib/components/navbar.svelte"
    import Sidebar from "$lib/components/sidebar.svelte"
    type Props = { title: string; children: Snippet }
    let { title, children }: Props = $props()
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
    {#snippet sidebar()}
        <Sidebar />
    {/snippet}
</Layout>
