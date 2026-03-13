<style>
    :root {
        --navbar-title-text: #a2dece;
        --navbar-gap: 1rem;
    }
    .navbar {
        position: relative;
        display: grid;
        gap: var(--navbar-gap);
        align-items: center;
        grid-template-columns: auto 1fr 1fr 1fr auto;
        grid-template-areas: "navbar-logo navbar-title navbar-searchbar empty navbar-links";
    }
    .navbar-logo {
        grid-area: navbar-logo;
    }
    .navbar-title {
        grid-area: navbar-title;
        color: var(--navbar-title-text);
    }
    .navbar-searchbar {
        grid-area: navbar-searchbar;
    }
    .navbar-links {
        grid-area: navbar-links;
        text-align: end;
    }
</style>

<script lang="ts">
    import { logo } from "$lib/scripts/logo"
    import { mdiGithub } from "@mdi/js"
    import Icon from "$lib/components/icons/icon.svelte"
    import Searchbar from "$lib/components/searchbar.svelte"
    import Image from "$lib/components/image.svelte"
    import { IS_BROWSER } from "$lib/scripts/core/is_browser"
    type Props = {
        search: string
        focused: boolean
    }
    let { search = $bindable(""), focused = $bindable(false) }: Props = $props()
</script>

<div class="navbar">
    <div class="navbar-logo">
        <Image src={logo} width="32px" height="32px" alt="logo" />
    </div>
    <div class="navbar-title">Frizzante Docs</div>
    <div class="navbar-searchbar">
        {#if IS_BROWSER}
            <Searchbar bind:query={search} bind:focused />
        {/if}
    </div>
    <div class="navbar-links">
        <a target="_blank" href="https://github.com/razshare/frizzante">
            <Icon size="2rem" path={mdiGithub} />
        </a>
    </div>
</div>
