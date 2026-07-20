<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Server Sent Events" {prefix}>
    <Title text="Server Sent Events" />
    <span>Use <InlineCode source="send.SseUpgrade()" /> to upgrade the connection to server sent events.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "main/lib/core/send"
                "net/http"
                "time"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter) {
                    event := send.SseUpgrade(&writer) // Sends sse upgrade to the client
                                                      // and replaces writer with one 
                                                      // that is sse compliant.
                    for {
                        event("channel-1")                     // Switches to "channel-1".
                        _, _ = writer.Write([]byte("hello 1")) // Sends message.
                        event("channel-2")                     // Switches to "channel-2".
                        _, _ = writer.Write([]byte("hello 2")) // Sends message.
                        time.Sleep(time.Second)                // Sleeps for 1 second.
                    }
                },
            }
        `}
    />
    <span>Then consume the stream on the client.</span>
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                import {source} from "$lib/scripts/core/source";
                const connection = source("/sse")               // Connects to the handler.
                const channel1 = connection.select("channel-1") // Listens to "channel-1".
                const channel2 = connection.select("channel-2") // Listens to "channel-2".
            </script>

            <h1>Channel 1</h1>
            <span>{$channel1}</span>                            <!-- Renders most recent value of channel-1. -->

            <h1>Channel 2</h1>
            <span>{$channel2}</span>                            <!-- Renders most recent value of channel-2. -->
        `}
    />
    {#snippet rightSidebar({ body })}
        <RightSidebar {body} items={[{ shift: 0, text: "Server Sent Events" }]} />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Web Sockets", href: base("/web_sockets", { prefix }) }}
            next={{ label: "Guards", href: base("/guards", { prefix }) }}
        />
    {/snippet}
</Page>
