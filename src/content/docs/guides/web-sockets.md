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

func Welcome(con *connections.Connection) {
    alive := con.IsAlive()             // Tracks request status.
    con.SendWsUpgrade()                // Sends ws upgrade.
    for *alive {                       // Loops until cancellation.
        name := con.ReceiveMessage()   // Receives message.
        con.SendMessage("hello "+name) // Sends message.
        time.Sleep(time.Second)        // Sleeps for 1 second.
    }
}
```


Then consume the web socket on the client.

```svelte
<script lang="ts">
    import {source} from "$frizzante/scripts/source.ts";
    const messages = [] as string[]
    const con = new WebSocket("/ws") // Connects to handler.
    con.send("hello")                // Sends message.
    con.addEventListener(            // Listens for messages.
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