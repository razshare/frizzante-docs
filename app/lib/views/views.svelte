<script lang="ts">
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Code from "$lib/components/code.svelte"
    import Note from "$lib/components/note.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Link from "$lib/components/links/link.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Caution from "$lib/components/caution.svelte"
    import MenuItem from "$lib/components/menu_item.svelte"
    import Title from "$lib/components/title.svelte"
    import { mdiCodeBraces } from "@mdi/js"
</script>

<Page title="Views">
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
    <Title text="Send Views" />
    <span>Use <InlineCode source="send.View()" /> to send a view.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{Name: "Welcome"}) // Sends view "Welcome".
            }
        `}
    />
    <span>
        The Name of the view will be used to lookup the view component exported by
        <InlineCode source="app/exports.server.ts" />
        and/or <InlineCode source="app/exports.client.ts" />.
    </span>
    <Title text="Default View" />
    <span>There is no way to specify a "<strong>default view</strong>”.</span>
    <span>
        However, you can use <InlineCode source="send.RequestedFile()" />
        in order to send the requested file or run custom logic if it doesn’t exist.
    </span>
    <Code
        lang="go"
        source={`
            package welcome
            
            import (
                "os"

                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
                "main/lib/routes/welcome"
            )

            func View(client *clients.Client) {
                if !send.RequestedFile(client) { // Tries to send the requested file, or else...
                    welcome.View(client)         // ...sends the welcome view.
                }
            }
        `}
    />
    <span>
        Usually you would map this handler to the default <InlineCode source="GET /" />
        pattern, which automatically captures all unmatched requests.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "embed"
                "main/lib/core/clients"
                "main/lib/core/servers"
                "main/lib/routes/welcome"
            )

            //go:embed app/dist
            var efs embed.FS
            var server = servers.New()                              // Creates server.

            func main() {
                defer servers.Start(server)                         // Starts server.
                server.Efs = efs                                    // Sets embedded file system.
                server.Routes = append(server.Routes, routes.Route{ // Adds route to the server.
                    Pattern: "GET /",
                    Handler: welcome.View,
                })
            }
        `}
    />
    <Title text="View Properties" />
    <span>Optionally, you can specify properties for your View with the Props field.</span>
    <Code
        lang="go"
        source={`
            package welcome
            
            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{ // Sends view.
                    Name: "Welcome",          // Sets view name.
                    Props: map[string]string{ // Sets view props, which will be injected into the svelte component.
                        "name": "world",      // Adds property "name" with value "world".
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
            <a href="https://svelte.dev/docs/svelte/$state">$state()</a>
            and thus are reactive by default.
        </span>
    </Note>
    <Title text="Render Modes" />
    <span>
        You can choose how to render views by setting one of 3 values for the
        <InlineCode source="RenderMode" /> field in your <InlineCode source="View" />.
    </span>
    <br />
    <br />
    <KeyedSection key="1">
        <Title type="h3" text="RenderModeFull" />
        <br />
        <span>
            Using <InlineCode source="RenderModeFull" />, the view is rendered on both the server and the client.
        </span>
        <br />
        <span>This is the <strong>default</strong> mode.</span>
        <Code
            lang="go"
            source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{        // Sends view.
                    Name: "Welcome",                 // Sets view name.
                    RenderMode: view.RenderModeFull, // Renders view on server and client.
                })
            }
        `}
        />
    </KeyedSection>
    <KeyedSection key="2">
        <Title type="h3" text="RenderModeServer" />
        <br />
        <span>
            Using <InlineCode source="RenderModeServer" />, the view is rendered only on the server.
        </span>
        <br />
        <span>
            You’ll have to deal away with apis such as
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">fetch</a>; your new best friend is
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form">form</a>.
        </span>
        <Code
            lang="go"
            source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets view name.
                    RenderMode: view.RenderModeServer, // Renders view only on server.
                })
            }
        `}
        />
        <Tip>
            While using <InlineCode source="RenderModeServer" /> the view won’t serve a JavaScript bundle, but you can still
            use the <InlineCode source="<svelte:head>" /> special tag in order to load scripts dynamically.
        </Tip>
    </KeyedSection>
    <KeyedSection key="3" noLink>
        <Title type="h3" text="RenderModeClient" />
        <br />
        <span>
            Using <InlineCode source="RenderModeClient" />, the view is rendered only on the client by loading a
            JavaScript bundle asynchronously.
        </span>
        <Code
            lang="go"
            source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets view name.
                    RenderMode: view.RenderModeClient, // Renders view only on client.
                })
            }
        `}
        />
        <Tip>
            <span>You can combine any of these render modes with adaptive hyperlinks and forms.</span>
            <br />
            <span>Read more about <Link href="/web_standards">web standards</Link>.</span>
        </Tip>
        <Tip>
            When using <InlineCode source="RenderModeFull" /> or <InlineCode source="RenderModeServer" />, You can
            configure how many JavaScript runtimes are executed in parallel by setting the
            <InlineCode source="FRIZZANTE_JS_RUNTIME_LIMIT" /> environment variable.
            <Code lang="shell" source="FRIZZANTE_JS_RUNTIME_LIMIT=3 ./app" />
            <Caution>
                <span>Settings this limit too high could lead to large memory usage by your JavaScript runtimes.</span>
                <br />
                <span>
                    For most use cases a limit of 1 runtime (the default) is more than enough, after all, the Svelte
                    compiler is simply concatenating strings together when rendering pages on the server. Modify this
                    field based on actual performance measurements.
                </span>
            </Caution>
        </Tip>
    </KeyedSection>
    <Title text="Disabling the server-side JavaScript runtime" />
    <span>
        You can add the <InlineCode source="no_js_runtime" /> tag to your build process to completely disable the server-side
        JavaScript runtime.
    </span>
    <Code lang="shell" source="frizzante --build --tags=no_js_runtime" />
    <span>This will reduce the minimum size of the final binary from 25MB to 10MB.</span>
    {#snippet rightSidebar()}
        <MenuItem><a href="#views">Views</a></MenuItem>
        <MenuItem><a href="#server-exports">Server Exports</a></MenuItem>
        <MenuItem><a href="#client-exports">Client Exports</a></MenuItem>
        <MenuItem><a href="#send-views">Send Views</a></MenuItem>
        <MenuItem><a href="#default-view">Default View</a></MenuItem>
        <MenuItem><a href="#view-properties">View Properties</a></MenuItem>
        <MenuItem>
            <a href="#render-modes">Render Modes</a>
            {#snippet menu()}
                <MenuItem><a href="#rendermodefull">RenderModeFull</a></MenuItem>
                <MenuItem><a href="#rendermodeserver">RenderModeServer</a></MenuItem>
                <MenuItem><a href="#rendermodeclient">RenderModeClient</a></MenuItem>
            {/snippet}
        </MenuItem>
        <MenuItem>
            <a href="#disabling-the-server-side-javascript-runtime">
                <span>Disabling the server-side JavaScript runtime</span>
            </a>
        </MenuItem>
    {/snippet}
</Page>
