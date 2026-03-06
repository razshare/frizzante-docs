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
    let search: string = $state("")
    let mode: "default" | "zen" = $derived.by(function update() {
        if (search !== "") {
            return "zen"
        }
        return "default"
    })
</script>

<Layout {title} {mode}>
    {#snippet navbar()}
        <Navbar bind:search />
    {/snippet}
    {#snippet content()}
        {#if search !== ""}
            <span>Searching for:{search}</span>
        {:else}
            {@render children()}
        {/if}
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
