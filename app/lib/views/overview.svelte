<style>
    :root {
        --overview-gap: 1rem;
        --overview-features-gap: 1rem;
    }
    .overview {
        position: relative;
        display: grid;
        gap: var(--overview-gap);
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
        gap: var(--overview-features-gap);
    }
</style>

<script lang="ts">
    import Page from "$lib/components/page.svelte"
    import Icon from "$lib/components/icons/icon.svelte"
    import Button from "$lib/components/button.svelte"
    import { mdiArrowRight, mdiBrushOutline, mdiDiamond, mdiHeartOutline, mdiLinkBoxOutline, mdiLinux } from "@mdi/js"
    import Feature from "$lib/components/feature.svelte"
</script>

<Page title="Overview">
    <div class="overview">
        <h1 class="title">Welcome to Frizzante</h1>
        <p class="description">
            An opinionated web server framework written in Go that uses Svelte to render web pages.
        </p>
        <div class="get-started">
            <Button href="/get_started">
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
                    source: `
                        send.View(client, views.View{
                            Name: "Welcome",
                            RenderMode: view.RenderModeFull,
                            // RenderMode: view.RenderModeServer,
                            // RenderMode: view.RenderModeClient,
                        })
                    `,
                }}
            />
            <Feature
                icon={mdiHeartOutline}
                title="Web Sockets"
                description="Simple Web Sockets api."
                example={{
                    lang: "go",
                    source: `
                        send.WsUpgrade(client)
                        for {
                            name := receive.Message(client)
                            send.Message(client, "Hello " + name)
                        }
                    `,
                }}
            />
            <Feature
                icon={mdiHeartOutline}
                title="Server Sent Events"
                description="Simple Server Sent Events api."
                example={{
                    lang: "go",
                    source: `
                        send.SseUpgrade(client)
                        for {
                            send.Message(client, "Hello.")
                            time.Sleep(time.Second)
                        }
                    `,
                }}
            />
        </div>
    </div>
</Page>
