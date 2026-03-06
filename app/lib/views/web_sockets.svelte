<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import MenuItem from "$lib/components/menu_item.svelte"
    import Page from "$lib/components/page.svelte"
    import Title from "$lib/components/title.svelte"
</script>

<Page title="Web Sockets">
    <Title text="Web Sockets" />
    <span>Use <InlineCode source="send.WsUpgrade()" /> to upgrade the connection to web sockets.</span>
    <Code lang="go" source={`routes.Route{Pattern: "GET /ws", Handler: welcome.View}`} />
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
                alive := receive.IsAlive(client)          // Tracks request status.
                send.WsUpgrade(client)                    // Sends ws upgrade.
                for *alive {                              // Loops until cancellation.
                    name := receive.Message(client)       // Receives message.
                    send.Message(client, "Hello " + name) // Sends message.
                    time.Sleep(time.Second)               // Sleeps for 1 second.
                }
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

        <Title  text="Messages"/>
        {#each messages as message, id (id)}      <!-- Iterates the list of messages. -->
            <div>{message}</div>                  <!-- Renders message. -->
        {/each}

    `}
    />
    {#snippet rightSidebar()}
        <MenuItem><a href="#web-sockets">Web Sockets</a></MenuItem>
    {/snippet}
</Page>
