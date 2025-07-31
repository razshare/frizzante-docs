---
title: Web Sockets
---

Use `SendWsUpgrade()` to upgrade the connection to web sockets.

```go
routes.Route{Pattern: "GET /ws", Handler: handlers.Welcome}
```

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/connections"
    "time"
)

func Welcome(connection *connections.Connection) {
    alive := connection.IsAlive()             // Tracks request status.
    connection.SendWsUpgrade()                // Sends ws upgrade.
    for *alive {                              // Loops until cancellation.
        name := connection.ReceiveMessage()   // Receives message.
        connection.SendMessage("hello "+name) // Sends message.
        time.Sleep(time.Second)               // Sleeps for 1 second.
    }
}
```

Then consume the web socket on the client.

```svelte
<script lang="ts">
    import {source} from "$frizzante/scripts/source.ts";
    const messages:string[] = []                             // Creates a list of messages.
    const socket = new WebSocket("/ws")                      // Connects to handler.
    socket.send("hello")                                     // Sends message.
    socket.addEventListener("message", function incoming(e){ // Listens for incoming messages.
        messages.push(e.data)                                // Appends the incoming messages to
                                                             // the list of messages for later use.
    })
</script>

<h1>Messages</h1>
{#each messages as message, id (id)}                         <!-- Iterates the list of messages. -->
    <div>{message}</div>                                     <!-- Renders the message. -->
{/each}
```