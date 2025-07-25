---
title: Server Sent Events
---

Use `SendSseUpgrade()` to upgrade the connection to server sent events.

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
    alive := con.IsAlive()         // Tracks request status.
    ev := con.SendSseUpgrade()     // Sends sse upgrade.
    for *alive {                   // Loops until cancellation.
        ev("channel-1")            // Switches to "channel-1".
        con.SendMessage("hello 1") // Sends message.
        ev("channel-2")            // Switches to "channel-2".
        con.SendMessage("hello 2") // Sends message.
        time.Sleep(time.Second)    // Sleeps for 1 second.
    }
}
```

Then consume the stream on the client.

```svelte
<script lang="ts">
    import {source} from "$frizzante/scripts/source.ts";
    const con = source("/sse")         // Connects to the handler.
    const c1 = con.select("channel-1") // Listens to "channel-1".
    const c2 = con.select("channel-2") // Listens to "channel-2".
</script>

<h1>Channel 1</h1>
<span>{$c1}</span>                     <!-- Renders the most recent value of channel-1. -->

<h1>Channel 2</h1>
<span>{$c2}</span>                     <!-- Renders the most recent value of channel-2. -->
```