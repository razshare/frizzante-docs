<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Snapshots" {prefix}>
    <Title text="Snapshots" />
    <span>You can take a snapshot of your server and statically generate its resources.</span>
    <br />
    <span>This is achieved by launching and crawling the web server locally using the cli.</span>
    <br />
    <br />
    <span>
        This technique is also known as
        <a target="_blank" href="https://en.wikipedia.org/wiki/Static_site_generator">
            <span>SSG, Static Site Generation</span>
        </a>.
    </span>
    <br />
    <Note>
        <span>
            Although the comparison to <strong>SSG</strong> makes sense, frizzante snapshots are a bit more powerful.
        </span>
        <br />
        <br />
        <span>
            The final snapshot itself contains static content, but the local web server used to generate the snapshot
            can be seeded with dynamic content, for example, retrieved from a local database or a third party source.
        </span>
    </Note>
    <br />
    <br />
    <KeyedSection key="1" description="List statics">
        <span>
            Before taking a snapshot of your server, you need to expose a server route that lists all static routes
            available for snapshotting.
        </span>
        <br />
        <span>You can do this with <InlineCode source="statics.NewRouteHandler()" />.</span>
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
                    "errors"
                    "log"
                    "os"

                    "main/lib/core/routes"
                    "main/lib/core/routes/statics"
                    "main/lib/core/servers"
                    "main/lib/core/ssr"
                )

                //go:generate frizzante clean
                //go:generate frizzante configure
                //go:embed app/dist
                var efs embed.FS
                var errorLog = log.New(os.Stderr, "[error]: ", log.Ldate|log.Ltime)
                var infoLog = log.New(os.Stdout, "[info]: ", log.Ldate|log.Ltime)
                var render = ssr.New(ssr.Options{
                    Efs:      efs,
                    ErrorLog: errorLog,
                    InfoLog:  infoLog,
                    Limit:    1,
                })
                var props = map[string]any{"prefix": os.Getenv("PREFIX")}
                var appRoutes = []routes.Route{
                    // ---> Routes go here. <---
                }
                var srverr = servers.Start(servers.StartOptions{
                    ErrorLog: errorLog,
                    InfoLog:  infoLog,
                    Routes: append(
                        appRoutes,
                        routes.Route{
                            Pattern: "GET /@statics",
                            Handler: statics.NewRouteHandler(appRoutes), // ---> Adds the statics handler. <---
                        },
                    ),
                })

                func main() {
                    if err := errors.Join(srverr); err != nil {
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
    <KeyedSection key="3" description="Snapshot">
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
                            frizzante generate snapshot http://127.0.0.1:8080/@statics
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
            next={{ label: "Docker", href: base("/docker", { prefix }) }}
        />
    {/snippet}
</Page>
