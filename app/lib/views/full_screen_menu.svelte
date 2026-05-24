<style>
    :root {
        --full_screen_menu-padding: 1rem;
        --full_screen_menu-content-padding: 1rem;
    }
    .full_screen_menu {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        display: grid;
        padding: var(--full_screen_menu-padding);
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "full_screen_menu-navbar"
            "full_screen_menu-content";
    }
    .full_screen_menu-navbar {
        grid-area: full_screen_menu-navbar;
    }
    .full_screen_menu-content {
        grid-area: full_screen_menu-content;
        padding: var(--full_screen_menu-content-padding);
        overflow: auto;
    }
</style>

<script lang="ts">
    import LeftSidebar from "$lib/components/left_sidebar.svelte"
    import Navbar from "$lib/components/navbar.svelte"
    import { onMount } from "svelte"
    let { prefix } = $props()
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

<div class="full_screen_menu">
    <div class="full_screen_menu-content">
        <LeftSidebar {prefix} />
    </div>
    <div class="full_screen_menu-navbar">
        <Navbar bind:search={searchQuery} bind:focused={searchFocused} noMenuLink {prefix} />
    </div>
</div>
