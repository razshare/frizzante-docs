<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Snapshots" {prefix}>
    <Title text="Snapshots" />
    <span>You can take a snapshot of a server using the cli and statically generate your website.</span>
    <br />
    <span>
        This technique is also known as
        <a target="_blank" href="https://en.wikipedia.org/wiki/Static_site_generator">
            <span>SSG, Static Site Generation</span>
        </a>.
    </span>
    <br />
    <br />
    <KeyedSection key="1" description="List statics">
        <span>
            Before taking a snapshot of your server, you need to list the static routes you would like to snapshot using
            a server route.
        </span>
        <br />
        <span>You can do this by hand</span>
        <Code
            lang="go"
            source={`
                package main

                import (
                    "embed"
                    "log"

                    "main/lib/core/clients"
                    "main/lib/core/routes"
                    "main/lib/core/send"
                    "main/lib/core/servers"
                    "main/lib/core/ssr"
                    "main/lib/routes/fallback"
                    "main/lib/routes/about"
                    "main/lib/routes/projects"
                )

                //go:generate frizzante clean
                //go:generate frizzante configure
                //go:generate frizzante generate types
                //go:generate frizzante package
                //go:embed app/dist
                var efs embed.FS
                var server = servers.New()

                func main() {
                    server.Efs = efs
                    server.Render = ssr.New(1)
                    server.Routes = []routes.Route{
                        {Pattern: "GET /", Handler: fallback.View},
                        {Pattern: "GET /about", Handler: about.View},
                        {Pattern: "GET /projects", Handler: projects.View},
                        {Pattern: "GET /@statics", Handler: func(client *clients.Client) {
                            send.Json(client, []string{ // <======= Manually listing all routes.
                                "/",
                                "/about",
                                "/projects",
                            })
                        }},
                    }
                    if err := servers.Start(server); err != nil {
                        log.Fatal(err)
                    }
                }
            `}
        />
        <span>or you can use <InlineCode source="statics.New()" />.</span>
        <br />
        <span>
            It will generate a route using the given <InlineCode source="pattern" />; the resulting route will list all
            available GET routes for the given <InlineCode source="server" /> as <InlineCode
                source="application/json"
            />.
        </span>
        <Code
            lang="go"
            source={`
                package main

                import (
                    "embed"
                    "log"

                    "main/lib/core/routes"
                    "main/lib/core/routes/statics"
                    "main/lib/core/servers"
                    "main/lib/core/ssr"
                    "main/lib/routes/about"
                    "main/lib/routes/fallback"
                    "main/lib/routes/projects"
                )

                //go:generate frizzante clean
                //go:generate frizzante configure
                //go:generate frizzante generate types
                //go:generate frizzante package
                //go:embed app/dist
                var efs embed.FS
                var server = servers.New()

                func main() {
                    server.Efs = efs
                    server.Render = ssr.New(1)
                    server.Routes = []routes.Route{
                        {Pattern: "GET /", Handler: fallback.View},
                        {Pattern: "GET /about", Handler: about.View},
                        {Pattern: "GET /projects", Handler: projects.View},
                        statics.New("GET /@statics", server), // <========== This will automatically generate a route that 
                                                              //             lists all static routes of the given server.
                    }
                    if err := servers.Start(server); err != nil {
                        log.Fatal(err)
                    }
                }

            `}
        />
    </KeyedSection>
    <KeyedSection key="2" description="Start the application">
        <span>
            It doesn't matter how you start the application, you can do it in development mode, in production mode or
            whatever other mode you're using.
        </span>
        <br />
        <span>All that matters is that <InlineCode source="GET /@statics" /> is reachable.</span>
        <br />
        <br />
        <KeyedSection key="A" description="Start development server">
            <Code lang="bash" source="frizzante dev" />
        </KeyedSection>
        <KeyedSection key="B" description="Start production server">
            <Code lang="bash" source="frizzante build && ./.gen/bin/app" />
        </KeyedSection>
        <KeyedSection key="C" description="Start development server using makefile" noLink>
            <Code lang="bash" source="make dev" />
        </KeyedSection>
    </KeyedSection>
    <KeyedSection key="3" description="Snapshot" noLink>
        <span>
            Run the frizzante cli and point it to the <InlineCode source="GET /@statics" /> route.
        </span>
        <Code lang="bash" source="frizzante generate snapshot http://127.0.0.1:8080/@statics" />
        <span>
            This will retrieve the list of static routes from
            <InlineCode source="http://127.0.0.1:8080/@statics" /> and generate the output in
            <InlineCode source="./.gen/snapshot" />.
        </span>
        <Tip>
            <span>
                The default frizzante project comes with a <InlineCode source="makefile" /> which already defines a shortcut
                <Code
                    lang="makefile"
                    source={`
                        snapshot:
                            frizzante generate snapshot http://127.0.0.1:8080/@statics .gen/snapshot
                    `}
                />
                so you could also run
                <Code source="make snapshot" />
            </span>
        </Tip>
        <FileTree>
            {#snippet children({ Directory, File })}
                <Directory name=".gen" expanded>
                    <Directory name="snapshot" expanded>
                        <Directory name="about" expanded>
                            <File name="index.html" />
                            <File name="data.json" />
                        </Directory>
                        <Directory name="assets" expanded>
                            <File name="index-[hash].css" />
                            <File name="index-[hash].js" />
                            <File name="projects-[hash].css" />
                            <File name="projects-[hash].js" />
                            <File name="about-[hash].css" />
                            <File name="about-[hash].js" />
                            <File name="[other scripts and assets...]" />
                        </Directory>
                        <Directory name="projects" expanded>
                            <File name="index.html" />
                            <File name="data.json" />
                        </Directory>
                        <File name="index.html" />
                        <File name="data.json" />
                    </Directory>
                </Directory>
            {/snippet}
        </FileTree>
        <br />
        <span>
            You can publish the <InlineCode source=".gen/snapshot" />
            directory to a CDN and your website should render statically.
        </span>
    </KeyedSection>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Snapshots" },
                { shift: 1, text: "List statics" },
                { shift: 1, text: "Start the application" },
                { shift: 2, text: "Start development server" },
                { shift: 2, text: "Start production server" },
                { shift: 2, text: "Start development server using makefile" },
                { shift: 1, text: "Snapshot" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Type Definitions", href: base("/type_definitions", { prefix }) }}
            next={{ label: "Todos Example", href: base("/todos_example", { prefix }) }}
        />
    {/snippet}
</Page>
