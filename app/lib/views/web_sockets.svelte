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

<Page title="Web Sockets" {prefix}>
    <Title text="Web Sockets" />
    <span>Use <InlineCode source="negotiate.WsUpgrade()" /> to upgrade the connection to web sockets.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "io"
                "main/lib/core/negotiate"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
                "time"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter) {
                    negotiate.WsUpgrade(&writer, request) // Negotiates ws upgrade with the client
                                                          // and replaces writer and request with 
                                                          // ws compliant ones.
                    for {
                        _, _ = io.ReadAll(request.Body)      // Receives message.
                        _, _ = writer.Write([]byte("hello")) // Sends message.
                        time.Sleep(time.Second)              // Sleeps for 1 second.
                    }
                },
            }
        `}
    />
    <span>Then consume the web socket on the client.</span>
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                const messages: string[] = $state([]) // Creates reactive list of messages.
                const socket = new WebSocket("/ws")   // Connects to handler.
                socket.addEventListener("message", function listen(event:MessageEvent) {
                    messages.push(event.data)         // Appends incoming messages to the 
                                                      // reactive list of messages for later use.
                })
                socket.send("Hello")                  // Sends message.
            </script>

            <Title text="Messages"/>
            {#each messages as message, id (id)}      <!-- Iterates the list of messages. -->
                <div>{message}</div>                  <!-- Renders message. -->
            {/each}
        `}
    />
    {#snippet rightSidebar({ body })}
        <RightSidebar {body} items={[{ shift: 0, text: "Web Sockets" }]} />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Basics", href: base("/basics", { prefix }) }}
            next={{ label: "Server Sent Events", href: base("/server_sent_events", { prefix }) }}
        />
    {/snippet}
</Page>
