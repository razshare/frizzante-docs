<script lang="ts">
    import Caution from "$lib/components/caution.svelte"
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
    import { href } from "$lib/scripts/core/href.svelte"
    import { base } from "$lib/scripts/strings/base"
    import { mdiCodeBraces } from "@mdi/js"
    let { prefix } = $props()
</script>

<Page title="Views" {prefix}>
    <Title text="Views" />
    <span>
        Views are svelte components exported by <InlineCode source="app/exports.server.ts" /> and/or
        <InlineCode source="app/exports.client.ts" />.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="app" expanded>
                <File name="exports.client.ts" icon={mdiCodeBraces} />
                <File name="exports.server.ts" icon={mdiCodeBraces} />
            </Directory>
        {/snippet}
    </FileTree>
    <br />
    <br />
    <Title text="Server Exports" />
    <span>
        Views that are meant to be rendered on the server should be exported by
        <InlineCode source="app/exports.server.ts" />.
    </span>
    <Code
        lang="go"
        source={`
            import Welcome from '$lib/views/welcome.svelte'
            import Profile from '$lib/views/profile.svelte'
            export const views = {
                "Welcome": Welcome,
                "Profile": Profile,
            }
        `}
    />
    <br />
    <br />
    <Title text="Client Exports" />
    <span>
        Views that are meant to be rendered on the client should be exported by
        <InlineCode source="app/exports.client.ts" />.
    </span>
    <Code
        lang="go"
        source={`
            export const views = {
                "Welcome": () => import('$lib/views/welcome.svelte'),
                "Profile": () => import('$lib/views/profile.svelte'),
            }
        `}
    />
    <Note>
        <span>
            These views are being imported asynchronously in order to split them in different bundles, however you can
            simply create fake promises in order to bundle them all together and eliminate network latency when
            transitioning between views.
        </span>
        <Code
            lang="go"
            source={`
                import Welcome from '$lib/views/welcome.svelte'
                import Profile from '$lib/views/profile.svelte'
                export const views = {
                    "Welcome": () => Promise.resolve(Welcome),
                    "Profile": () => Promise.resolve(Profile),
                }
            `}
        />
    </Note>
    <Note>
        <span>
            Keys in <InlineCode source="app/exports.server.ts" /> and
            <InlineCode source="app/exports.client.ts" /> are not mutually exclusive.
        </span>
        <br />
        <span>You can render the same component on both the server and the client at the same time.</span>
    </Note>
    <br />
    <br />
    <Title text="Send Views" />
    <span>
        In order to send a view you need to create a new
        <InlineCode source="render" /> function using either
        <InlineCode source="ssr.New()" /> or
        <InlineCode source="csr.New()" /> then pass that render function to
        <InlineCode source="send.View()" /> along with your embedded file system.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "embed"
                "main/lib/core/routes"
                "main/lib/core/send"
                "main/lib/core/ssr"
                "main/lib/core/views"
                "net/http"
            )

            //go:embed app/dist
            var efs embed.FS
            var render = ssr.New(ssr.Options{Efs: efs, Limit: 1})

            func View(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
                send.View(writer, request, render, views.View{Name: "Welcome"}) // Sends view "Welcome".
            }
        `}
    />
    <Note>
        The embedded file system (<InlineCode source="efs" />) must point to the
        <InlineCode source="app/dist" /> directory.
    </Note>
    <span>
        The Name of the view will be used to lookup the view component exported by
        <InlineCode source="app/exports.server.ts" />
        and/or <InlineCode source="app/exports.client.ts" />.
    </span>
    <br />
    <br />
    <Title text="Default View" />
    <span>There is no way to specify a "<strong>default view</strong>”.</span>
    <span>
        However, you can use <InlineCode source="send.RequestedFile()" />
        in order to send the requested file or run custom logic if it doesn’t exist.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "embed"
                "main/lib/core/routes"
                "main/lib/core/send"
                "main/lib/core/ssr"
                "main/lib/core/views"
                "net/http"
            )

            //go:embed app/dist
            var efs embed.FS
            var render = ssr.New(ssr.Options{Efs: efs, Limit: 1})

            func View(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
                // Tries to send the requested file, or else...
                if found, err := send.RequestedFile(writer, request, efs, "/"); err != nil || !found {
                    // ...sends the "Default" view.
                    send.View(writer, request, render, views.View{Name: "Default"})
                }
            }
        `}
    />
    <Tip>
        <span>
            Usually you would map this handler to the default <InlineCode source="GET /" />
            pattern, which automatically captures all unmatched requests.
        </span>
    </Tip>
    <br />
    <br />
    <Title text="View Properties" />
    <span>Optionally, you can specify properties for your View with the Props field.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "embed"
                "main/lib/core/routes"
                "main/lib/core/send"
                "main/lib/core/ssr"
                "main/lib/core/views"
                "net/http"
            )

            //go:embed app/dist
            var efs embed.FS
            var render = ssr.New(ssr.Options{Efs: efs, Limit: 1})

            func View(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
                send.View(writer, request, render, views.View{
                    Name: "Welcome",
                    Props: map[string]string{
                        "name": "world", // ---> Props go here. <---
                    },
                })
            }
        `}
    />
    <span>These properties are passed down to your view component.</span>
    <!-- 
        For some reason svelte tooling will not 
        escape strings that look like svelte code 
        and it gets confused throwing errors around.
    -->
    <Code
        lang="go"
        source={`
            ${"<"}script lang="ts">
                type Props = { name: string }
                let {name}:Props = $props() // Retrieves view props.
            </script>

            <Title  text="Hello {name}"/>
        `}
    />
    <Note>
        <span>
            View properties are initialized with
            <a target="_blank" href="https://svelte.dev/docs/svelte/$state">$state()</a>
            and thus are reactive by default.
        </span>
    </Note>
    <br />
    <br />
    <Title text="Render Modes" />
    <span>
        You can choose how to render views by setting one of 3 values for the
        <InlineCode source="RenderMode" /> field in your <InlineCode source="View" />.
    </span>
    <br />
    <br />
    <KeyedSection key="1" description="views.RenderModeFull">
        <span>
            Using <InlineCode source="views.RenderModeFull" />, the view is rendered on both the server and the client.
        </span>
        <br />
        <span>This is the <strong>default</strong> mode.</span>
        <Code
            lang="go"
            source={`
                package main

                import (
                    "embed"
                    "main/lib/core/routes"
                    "main/lib/core/send"
                    "main/lib/core/ssr"
                    "main/lib/core/views"
                    "net/http"
                )

                //go:embed app/dist
                var efs embed.FS
                var render = ssr.New(ssr.Options{Efs: efs, Limit: 1})

                func View(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
                    send.View(writer, request, render, views.View{
                        Name:       "Welcome",
                        RenderMode: views.RenderModeFull, // Configures render mode
                                                          // to "both server and client".
                    })
                }
            `}
        />
    </KeyedSection>
    <KeyedSection key="2" description="views.RenderModeServer">
        <span>
            Using <InlineCode source="views.RenderModeServer" />, the view is rendered only on the server.
        </span>
        <br />
        <span>
            You’ll have to deal away with apis such as
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
                <span>fetch</span>
            </a>; your new best friend is
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form">
                <span>form</span>
            </a>.
        </span>
        <Code
            lang="go"
            source={`
                package main

                import (
                    "embed"
                    "main/lib/core/routes"
                    "main/lib/core/send"
                    "main/lib/core/ssr"
                    "main/lib/core/views"
                    "net/http"
                )

                //go:embed app/dist
                var efs embed.FS
                var render = ssr.New(ssr.Options{Efs: efs, Limit: 1})

                func View(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
                    send.View(writer, request, render, views.View{
                        Name:       "Welcome",
                        RenderMode: views.RenderModeServer, // Configures render mode
                                                            // to "server only".
                    })
                }
            `}
        />
        <Tip>
            While using <InlineCode source="views.RenderModeServer" /> the view won’t serve a JavaScript bundle, but you can
            still use the <InlineCode source="<svelte:head>" /> special tag in order to load scripts dynamically.
        </Tip>
        <Caution>
            A <InlineCode source="csr" /> function will always render blank page when the view is configured to use
            <InlineCode source="views.RenderModeServer" />.
            <Code
                lang="go"
                source={`
                    package main

                    import (
                        "embed"
                        "main/lib/core/csr"
                        "main/lib/core/routes"
                        "main/lib/core/send"
                        "main/lib/core/views"
                        "net/http"
                    )

                    //go:embed app/dist
                    var efs embed.FS
                    var render = csr.New(csr.Options{Efs: efs}) // Using csr function.

                    func View(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
                        send.View(writer, request, render, views.View{
                            Name:       "Welcome",
                            RenderMode: views.RenderModeServer, // Because this mode attempts to
                                                                // render exclusively on the server,
                                                                // and the csr function cannot render on the
                                                                // server, this handler will send an
                                                                // empty response to the client.
                        })
                    }
                `}
            />
        </Caution>
    </KeyedSection>
    <KeyedSection key="3" description="views.RenderModeClient">
        <span>
            Using <InlineCode source="views.RenderModeClient" />, the view is rendered only on the client by loading a
            JavaScript bundle asynchronously.
        </span>
        <Code
            lang="go"
            source={`
                package main

                import (
                    "embed"
                    "main/lib/core/routes"
                    "main/lib/core/send"
                    "main/lib/core/ssr"
                    "main/lib/core/views"
                    "net/http"
                )

                //go:embed app/dist
                var efs embed.FS
                var render = ssr.New(ssr.Options{Efs: efs, Limit: 1})

                func View(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
                    send.View(writer, request, render, views.View{
                        Name:       "Welcome",
                        RenderMode: views.RenderModeClient, // Configures render mode
                                                            // to "client only".
                    })
                }
            `}
        />
        <Tip>
            <span>You can combine any of these render modes with adaptive hyperlinks and forms.</span>
            <br />
            <span>Read more about <a {...href(base("/web_standards", { prefix }))}>web standards</a>.</span>
        </Tip>
    </KeyedSection>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Views" },
                { shift: 0, text: "Server Exports" },
                { shift: 0, text: "Client Exports" },
                { shift: 0, text: "Send Views" },
                { shift: 0, text: "Default View" },
                { shift: 0, text: "View Properties" },
                { shift: 0, text: "Render Modes" },
                { shift: 1, text: "views.RenderModeFull" },
                { shift: 1, text: "views.RenderModeServer" },
                { shift: 1, text: "views.RenderModeClient" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Guards", href: base("/guards", { prefix }) }}
            next={{ label: "Web Standards", href: base("/web_standards", { prefix }) }}
        />
    {/snippet}
</Page>
