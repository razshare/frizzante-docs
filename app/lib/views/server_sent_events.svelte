<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
</script>

<Page title="Server Sent Events">
    <Title text="Server Sent Events" />
    <span>Use <InlineCode source="send.SseUpgrade()" /> to upgrade the connection to server sent events.</span>
    <Code lang="go" source={`routes.Route{Pattern: "GET /sse", Handler: welcome.View}`} />
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
                "time"
            )

            func View(client *clients.Client) {
                alive := receive.IsAlive(client)    // Tracks request status.
                event := send.SseUpgrade(client)    // Sends sse upgrade.
                for *alive {                        // Loops until cancellation.
                    event("channel-1")              // Switches to "channel-1".
                    send.Message(client, "Hello 1") // Sends message.
                    event("channel-2")              // Switches to "channel-2".
                    send.Message(client, "Hello 2") // Sends message.
                    time.Sleep(time.Second)         // Sleeps for 1 second.
                }
            }
        `}
    />
    <span>Then consume the stream on the client.</span>
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

        <Title  text="Messages"/>
        {#each messages as message, id (id)}      <!-- Iterates the list of messages. -->
            <div>{message}</div>                  <!-- Renders message. -->
        {/each}
    `}
    />
    {#snippet rightSidebar()}
        <RightSidebar items={[{ shift: 0, text: "Server Sent Events" }]} />
    {/snippet}
    {#snippet footer()}
        <Footer previous={{ label: "Web Sockets", href: "/web_sockets" }} next={{ label: "Guards", href: "/guards" }} />
    {/snippet}
</Page>
