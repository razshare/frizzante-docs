---
title: Server Sent Events
---

Use `connections.SendSseUpgrade()` to upgrade the connection to server sent events.

```go
routes.Route{Pattern: "GET /sse", Handler: handlers.Welcome}
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
    // Sends sse upgrade.
    ev := connections.SendSseUpgrade(con)
    // Loops until cancellation.
    for *alive {
        // Switches to "channel-1".
        ev("channel-1")
        // Sends message.
        connections.SendMessage(con, "hello 1")
        // Switches to "channel-2".
        ev("channel-2")
        // Sends message.
        connections.SendMessage(con, "hello 2")
        // Sleeps for 1 second.
        time.Sleep(time.Second)
    }
}
```

Then consume the stream on the client.

```svelte
<script lang="ts">
    import {source} from "$frizzante/scripts/source.ts";
    // Connects to the handler.
    const con = source("/sse")
    // Listens to "channel-1"
    const c1 = con.select("channel-1")
    // Listens to "channel-2"
    const c2 = con.select("channel-2")
</script>

<h1>Channel 1</h1>
<span>{$c1}</span>

<h1>Channel 2</h1>
<span>{$c2}</span>
```