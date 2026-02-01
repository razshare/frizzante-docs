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
        grid-template-columns: auto 1fr auto;
        grid-template-areas: "logo title links";
    }
    .logo {
        grid-area: logo;
    }
    .title {
        grid-area: title;
        color: var(--navbar-title-text);
    }
    .links {
        grid-area: links;
        text-align: end;
    }
</style>

<script>
    import { logo } from "$lib/scripts/logo"
    import { mdiGithub } from "@mdi/js"
    import Icon from "./icons/icon.svelte"
</script>

<div class="navbar">
    <div class="logo">
        <img src={logo} width="32" height="32" alt="logo" />
    </div>
    <div class="title">Frizzante Docs</div>
    <div class="links">
        <a href="https://github.com/razshare/frizzante"><Icon size="2rem" path={mdiGithub} /></a>
    </div>
</div>
