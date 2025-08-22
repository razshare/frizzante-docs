---
title: Web Sockets
---

Use `send.WsUpgrade()` to upgrade the connection to web sockets.

```go
route.Route{Pattern: "GET /ws", Handler: welcome.View}
```

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
    "github.com/razshare/frizzante/send"
    "time"
)

func View(c *client.Client) {
    a := receive.IsAlive(c)        // Tracks request status.
    send.WsUpgrade(c)              // Sends ws upgrade.
    for *a {                       // Loops until cancellation.
       n := receive.Message(c)     // Receives message.
       send.Message(c, "Hello "+n) // Sends message.
       time.Sleep(time.Second)     // Sleeps for 1 second.
    }
}
```

Then consume the web socket on the client.

```svelte
<script lang="ts">
    import {source} from "$frizzante/scripts/source.ts";
    const messages:string[] = $state([])                     // Creates reactive list of messages.
    const socket = new WebSocket("/ws")                      // Connects to handler.
    socket.send("Hello")                                     // Sends message.
    socket.addEventListener("message", function incoming(e){ // Listens for incoming messages.
       messages.push(e.data)                                 // Appends the incoming messages to
                                                             // the list of messages for later use.
    })
</script>

<h1>Messages</h1>
{#each messages as message, id (id)}                         <!-- Iterates the list of messages. -->
    <div>{message}</div>                                     <!-- Renders message. -->
{/each}
```