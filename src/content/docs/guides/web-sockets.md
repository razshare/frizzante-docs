---
title: Web Sockets
---

Use `send.WsUpgrade()` to upgrade the connection to web sockets.

```go
route.Route{Pattern: "GET /ws", Handler: welcome.View}
```

```go
//lib/routes/handlers/welcome/view.go
package welcome

import (
    "main/lib/core/client"
    "main/lib/core/receive"
    "main/lib/core/send"
    "time"
)

func View(client *client.Client) {
    alive := receive.IsAlive(client)         // Tracks request status.
    send.WsUpgrade(client)                   // Sends ws upgrade.
    for *alive {                             // Loops until cancellation.
       name := receive.Message(client)       // Receives message.
       send.Message(client, "Hello " + name) // Sends message.
       time.Sleep(time.Second)               // Sleeps for 1 second.
    }
}
```

Then consume the web socket on the client.

```svelte
<script lang="ts">
    import {source} from "$lib/scripts/core/source.ts";
    const messages:string[] = $state([])                         // Creates reactive list of messages.
    const socket = new WebSocket("/ws")                          // Connects to handler.
    socket.send("Hello")                                         // Sends message.
    socket.addEventListener("message", function incoming(event){ // Listens for incoming messages.
       messages.push(event.data)                                 // Appends the incoming messages to
                                                                 // the list of messages for later use.
    })
</script>

<h1>Messages</h1>
{#each messages as message, id (id)}                         <!-- Iterates the list of messages. -->
    <div>{message}</div>                                     <!-- Renders message. -->
{/each}
```