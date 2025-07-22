---
title: Web Sockets
---

Use `connections.SendWsUpgrade()` to upgrade the connection to web sockets.

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

func Welcome(con *connections.Connection) {
    // Tracks request status.
    alive := connections.IsAlive(con)
    // Sends ws upgrade.
    connections.SendWsUpgrade(con)
    // Loops until cancellation.
    for *alive {
        // Receives message.
        name := connections.ReceiveMessage(con)
        // Sends message.
        connections.SendMessage(con, "hello "+name)
        // Sleeps for 1 second.
        time.Sleep(time.Second)
    }
}
```


Then consume the web socket on the client.

```svelte
<script lang="ts">
    import {source} from "$frizzante/scripts/source.ts";
    const messages = [] as string[]
    // Connects to handler.
    const socket = new WebSocket("/ws")
    // Sends message.
    socket.send("hello")
    // Listens for messages.
    socket.addEventListener(
        "message", 
        function incoming(e){
            messages.push(e.data)
        },
    )
</script>

<h1>Messages</h1>
{#each messages as message, id (id)}
    <div>{message}</div>
{/each}
```