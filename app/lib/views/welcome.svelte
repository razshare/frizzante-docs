<script>
    import Footer from "$lib/components/footer.svelte"
    import Layout from "$lib/components/layout.svelte"
    import Navbar from "$lib/components/navbar.svelte"
    import Overview from "$lib/components/overview.svelte"
    import Sidebar from "$lib/components/sidebar.svelte"
</script>

<Layout title="welcome">
    {#snippet navbar()}
        <Navbar />
    {/snippet}
    {#snippet content()}
        <Overview />
    {/snippet}
    {#snippet footer()}
        <Footer />
    {/snippet}
    {#snippet sidebar()}
        <Sidebar />
    {/snippet}
</Layout>
