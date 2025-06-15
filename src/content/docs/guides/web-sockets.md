---
title: Web Sockets
---

Use `SendWsUpgrade()` to upgrade the connection to web sockets.

```go
frz.Route{Pattern: "GET /ws", Handler: handlers.Hello}
```

```go
//lib/handlers/hello.go
package handlers

import (
    "github.com/razshare/frizzante/frz"
    "time"
)

func Hello(c *frz.Connection) {
    alive := c.IsAlive()             // Tracks request status.
    c.SendWsUpgrade()                // Sends ws upgrade.
    for *alive {                     // Loops until cancellation.
        name := c.ReceiveMessage()   // Receives message.
        c.SendMessage("hello "+name) // Sends message.
        time.Sleep(time.Second)      // Sleeps for 1 second.
    }
}
```


Then consume the web socket on the client.

```svelte
<script lang="ts">
    import {source} from "$lib/utilities/scripts/source.ts";
    const messages = [] as string[]
    const c = new WebSocket("/ws") // Connects to handler.
    c.send("hello")                // Sends a message.
    c.addEventListener(            // Listens for messages.
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