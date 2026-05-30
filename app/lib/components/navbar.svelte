<style>
    :root {
        --navbar-title-text: #d24317;
        --navbar-tile-size: 1.5rem;
        --navbar-gap: 1rem;
    }
    .navbar {
        display: grid;
        gap: var(--navbar-gap);
        align-items: center;
        grid-template-columns: 1fr 1fr 3fr 2fr 0;
        grid-template-areas: "navbar-logo navbar-title navbar-searchbar navbar-links navbar-menu-link";
    }
    .navbar-menu-link {
        grid-area: navbar-menu-link;
        display: none;
    }
    .navbar-logo {
        grid-area: navbar-logo;
        align-items: center;
        display: grid;
    }
    .navbar-title {
        grid-area: navbar-title;
        color: var(--navbar-title-text);
        font-size: var(--navbar-tile-size);
        align-items: center;
        display: grid;
        font-weight: bold;
    }
    .navbar-searchbar {
        grid-area: navbar-searchbar;
    }
    .navbar-links {
        grid-area: navbar-links;
        text-align: end;
    }
    @media screen and (max-width: 980px) {
        .navbar {
            grid-template-columns: auto 0 1fr 0 0;
        }
        .navbar-title {
            display: none;
        }
    }
    @media screen and (max-width: 640px) {
        .navbar {
            gap: 0;
            grid-template-columns: 0 0 1fr 0 auto;
        }
        .navbar-menu-link:not(.hidden) {
            display: block;
            padding-left: 1rem;
            position: relative;
        }
        .navbar-logo {
            display: none;
        }
        .navbar-title {
            display: none;
        }
        .navbar-links {
            display: none;
        }
    }
</style>

<script lang="ts">
    import logo from "$lib/assets/logo.png"
    import Icon from "$lib/components/icons/icon.svelte"
    import Image from "$lib/components/image.svelte"
    import Searchbar from "$lib/components/searchbar.svelte"
    import { href } from "$lib/scripts/core/href"
    import { IS_BROWSER } from "$lib/scripts/core/is_browser"
    import { base } from "$lib/scripts/strings/base"
    import { mdiFunction, mdiGithub } from "@mdi/js"
    type Props = {
        search: string
        prefix: string
        focused: boolean
        noMenuLink?: boolean
    }
    let { search = $bindable(""), focused = $bindable(false), noMenuLink = false, prefix }: Props = $props()
</script>

<div class="navbar">
    <div class="navbar-menu-link" class:hidden={noMenuLink}>
        <a {...href(base("/full_screen_menu", { prefix }))}>
            <Icon path={mdiFunction} size="2rem" />
        </a>
    </div>
    <div class="navbar-logo">
        <Image src={logo} height="3rem" alt="logo" />
    </div>
    <div class="navbar-title"></div>
    <div class="navbar-searchbar">
        {#if IS_BROWSER}
            <Searchbar bind:query={search} bind:focused placeholder="Start typing to search." {prefix} />
        {/if}
    </div>
    <div class="navbar-links">
        <a target="_blank" href="https://github.com/razshare/frizzante">
            <Icon size="2rem" path={mdiGithub} />
        </a>
    </div>
</div>
