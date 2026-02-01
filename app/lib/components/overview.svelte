<style>
    :root {
        --welcome-gap: 1rem;
        --welcome-features-gap: 1rem;
    }
    .welcome {
        position: relative;
        display: grid;
        gap: var(--welcome-gap);
        grid-template-areas:
            "title title"
            "description description"
            "get-started view-on-github"
            "features features";
    }
    .title {
        grid-area: title;
    }
    .description {
        grid-area: description;
    }
    .get-started {
        grid-area: get-started;
    }
    .view-on-github {
        grid-area: view-on-github;
    }
    .features {
        grid-area: features;
        display: flex;
        flex-flow: column;
        gap: var(--welcome-features-gap);
    }
</style>

<script lang="ts">
    import Icon from "$lib/components/icons/icon.svelte"
    import Button from "$lib/components/button.svelte"
    import { logo } from "$lib/scripts/logo"
    import { mdiArrowRight, mdiBrushOutline, mdiDiamond, mdiHeartOutline, mdiLinkBoxOutline, mdiLinux } from "@mdi/js"
    import Feature from "$lib/components/feature.svelte"
    import { renderModes } from "$lib/scripts/examples/render_modes"
    import { ws } from "$lib/scripts/examples/ws"
    import { sse } from "$lib/scripts/examples/sse"
</script>

<div class="welcome">
    <h1 class="title">Welcome to Frizzante</h1>
    <p class="description">An opinionated web server framework written in Go that uses Svelte to render web pages.</p>
    <div class="get-started">
        <Button>
            <span>Get Started</span>
            {#snippet end()}
                <Icon path={mdiArrowRight} />
            {/snippet}
        </Button>
    </div>
    <div class="view-on-github">
        <Button ghost>
            <span>View on GitHub</span>
            {#snippet end()}
                <Icon path={mdiLinkBoxOutline} />
            {/snippet}
        </Button>
    </div>
    <div class="features">
        <Feature
            icon={mdiLinux}
            title="Standalone Binary"
            description="Compile your whole application, including your assets, to a standalone binary."
        />
        <Feature
            icon={mdiDiamond}
            title="Web Standards"
            description="Promotes leverage of web standards to improve robustness."
        />
        <Feature
            icon={mdiBrushOutline}
            title="Render Modes"
            description="Switch rendering modes at runtime."
            example={{
                lang: "go",
                code: renderModes,
            }}
        />
        <Feature
            icon={mdiHeartOutline}
            title="Web Sockets"
            description="Simple Web Sockets api."
            example={{
                lang: "go",
                code: ws,
            }}
        />
        <Feature
            icon={mdiHeartOutline}
            title="Server Sent Events"
            description="Simple Server Sent Events api."
            example={{
                lang: "go",
                code: sse,
            }}
        />
    </div>
</div>
